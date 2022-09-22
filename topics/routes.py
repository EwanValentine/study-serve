import os

from flask import Request, Flask, request, send_from_directory
from elasticsearch import Elasticsearch

# Setup deps
es = Elasticsearch('http://localhost:9200')
app = Flask(__name__)

from topics.controllers import Controllers
from topics.repository_artefact import ArtefactRepository
from topics.repository_topic import TopicRepository
from topics.model_topic import ModelTopic
from topics.model_artefact import ModelArtefact

artefact_repository = ArtefactRepository(es)
topic_repository = TopicRepository(es)

controllers = Controllers(artefact_repository=artefact_repository, topic_repository=topic_repository)


###### API Routes ######

@app.route("/topics", methods=["POST"])
def create_topic():
  return controllers.create_topic(ModelTopic(request.json))

@app.route("/topics", methods=["GET"])
def list_topics():
    return controllers.list_topics()

@app.route("/topics/<topic_name>/artefacts", methods=["POST"])
def create_artefact(topic_name):
  return controllers.create_artefact(topic_name, ModelArtefact(request.json))

@app.route("/topics/<topic_name>/artefacts", methods=["GET"])
def list_artefacts(topic_name):
  return controllers.list_artefacts(topic_name)

@app.route("/topics/<topic_name>/artefacts/search/<term>", methods=["GET"])
def search_artefacts(topic_name, term):
  return controllers.search_artefacts(topic_name, term)

@app.route("/topics/<topic_name>/artefacts/<artefact_id>", methods=["GET"])
def get_artefact(topic_name, artefact_id):
  return controllers.get_artefact(topic_name, artefact_id)

@app.route("/topics/<topic_name>/artefacts/<artefact_id>", methods=["DELETE"])
def delete_artefact(topic_name, id):
  return controllers.delete_artefact(topic_name, id)

@app.route("/topics/<id>", methods=["DELETE"])
def delete_topic(id):
  return controllers.delete_topic(id)
