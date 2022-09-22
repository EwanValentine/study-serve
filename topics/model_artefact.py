from dataclasses import dataclass
import uuid

@dataclass
class ModelArtefact:
    """
    An artefact is a snippet of information that is related to a topic.
    """
    id: uuid.UUID
    title: str
    content: str
    topic: str
    tags = []

    def __init__(self, args={}):
        self.args = args
        self.id = self.generate_id()
        self.title = args.get('title', '')
        self.content = args.get('content', '')
        self.topic = args.get('topic', '')
        self.tags = args.get('tags', [])

    def generate_index_name(self):
      return f"artefact-{self.topic.lower().replace(' ', '-')}"

    def generate_id(self) -> uuid.UUID:
      return uuid.uuid4()
