import json

from elasticsearch import Elasticsearch
from shared.base_repository import BaseRepository

from topics.model_artefact import ModelArtefact
from shared.base_repository import BaseRepository

class ArtefactRepository(BaseRepository):
    def __init__(self, es: Elasticsearch):
        self.es = es

    def get(self, topic_name:str, id: str):
        result = self.es.get(index=topic_name, id=id)
        return result['_source']

    def search(self, topic: str, term: str):
        return self.to_data(self.es.search(index=topic, query={
          "bool": {
            "should": [
              {
                "match": {
                  "tags": term,
                }
              },
              {
                "match": {
                  "content": term,
                }
              }
            ]
          }
        }))

    def delete(self, topic_name: str, id: str):
        return self.es.delete(index=topic_name, id=id)

    def create_artefact(self, topic: str, artefact: ModelArtefact):
        id = artefact.generate_id()
        doc = {**artefact.__dict__, **{'id': str(id)}}
        self.es.index(index=topic, id=id, document=doc)
        return doc

    def list_artefacts(self, topic: str): 
        return self.to_data(self.es.search(index=topic))

    def refresh(self):
        return self.es.indices.refresh(index=self.index_name)