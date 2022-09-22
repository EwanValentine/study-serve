from flask import Flask
from flask_cors import CORS

from topics.routes import *

CORS(app)

if __name__ == "__main__":
    app.run(debug=True, host='study.local', port=8000)
