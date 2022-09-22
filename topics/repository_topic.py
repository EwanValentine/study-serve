import json
from datetime import datetime

from topics.model_topic import ModelTopic
from shared.base_repository import BaseRepository

# doc = {
#     'author': 'kimchy',
#     'text': 'Elasticsearch: cool. bonsai cool.',
#     'timestamp': datetime.now(),
# }
# resp = es.index(index="test-index", id=1, document=doc)
# print(resp['result'])

# resp = es.get(index="test-index", id=1)
# print(resp['_source'])

# es.indices.refresh(index="test-index")

# resp = es.search(index="test-index", query={"match_all": {}})
# print("Got %d Hits:" % resp['hits']['total']['value'])
# for hit in resp['hits']['hits']:
#     print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])

class TopicRepository(BaseRepository):
    def __init__(self, es):
        self.es = es

    def delete(self, topic_name: str):
        self.es.indices.delete(index=topic_name)
        return {'success': True, 'topic_name': topic_name}

    def create_topic(self, topic: ModelTopic):
        topic_name = topic.generate_index_name()
        result = self.es.indices.create(index=topic_name)
        return {**topic.__dict__, 'name': topic_name}

    def list_topics(self):
        topics = []
        result = self.es.cat.indices(format='json')
        for item in result:
            if item['index'].startswith('topic'):
                topics.append(item['index'])
        return topics
