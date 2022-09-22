class BaseRepository:
    def to_data(self, results):
        return [doc for doc in results['hits']['hits']]
