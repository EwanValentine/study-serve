from elasticsearch import Elasticsearch

from .repository_artefact import ArtefactRepository
from .repository_topic import TopicRepository
from .model_topic import ModelTopic
from .model_artefact import ModelArtefact

class Controllers:
  def __init__(self, artefact_repository: ArtefactRepository, topic_repository: TopicRepository):
    self.artefact_repository = artefact_repository
    self.topic_repository = topic_repository

  def list_topics(self):
      return self.topic_repository.list_topics()

  def create_topic(self, topic: ModelTopic):
      return self.topic_repository.create_topic(topic)

  def create_artefact(self, topic_name: str, artefact: ModelArtefact):
      return self.artefact_repository.create_artefact(topic_name, artefact)

  def list_artefacts(self, topic_name: str):
      return self.artefact_repository.list_artefacts(topic_name)

  def search_artefacts(self, topic_name: str, term: str):
      return self.artefact_repository.search(topic_name, term)

  def get_artefact(self, topic_name: str, artefact_id: str):
      return self.artefact_repository.get(topic_name, artefact_id)

  def delete_topic(self, id: str):
    return self.topic_repository.delete(id)

  def delete(self, topic_name: str, id: str):
    return self.artefact_repository.delete(topic_name, id)
