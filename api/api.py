from flask import Flask
import time

app = Flask(__name__)

@app.route("/classify")
def classify():
    time.sleep(5)
    return {'name': 'Fender Stratocaster'}
