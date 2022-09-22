from dataclasses import dataclass
import uuid

@dataclass
class ModelTopic:
    """
    A topic is an index in Elasticsearch. Which houses a set of 
    documents. Each document represents an artefact, or snippet
    relating to that particular topic.
    """
    id: uuid.UUID
    name: str
    description: str

    def __init__(self, args={}):
        self.args = args
        self.name = args.get('name', '')
        self.description = args.get('description', '')
        self.id = self.generate_id()

    def generate_index_name(self):
        return f"topic-{self.name.lower().replace(' ', '-')}"

    def generate_id(self) -> uuid.UUID:
        return uuid.uuid4()
