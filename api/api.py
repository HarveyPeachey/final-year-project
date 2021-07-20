from flask import Flask, request
import time

app = Flask(__name__)

@app.route("/classify", methods=['POST'])
def classify():
    print(request.files['file'])
    time.sleep(5)
    return {'name': 'Fender Stratocaster'}
