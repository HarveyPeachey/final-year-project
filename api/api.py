from flask import Flask, request
from PIL import Image
import mahotas
import numpy as np
import pickle
import time
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)

# Preprocessing Functions
def add_padding(image):
    width, height = image.size
    if width == height:
        return image
    elif width > height:
        newimg = Image.new(image.mode, (width, width), (255, 255, 255, 0))
        newimg.paste(image, (0, (width - height) // 2))
        return newimg
    else:
        newimg = Image.new(image.mode, (height, height), (255, 255, 255, 0))
        newimg.paste(image, ((height - width) // 2, 0))
        return newimg

def resize(image):
    return image.resize((224,224))

def to_grayscale(image):
    return image.convert('L')

def format_label(label):
    if label == 'fender_jaguar':
        label = 'Fender Jaguar'
    elif label == 'fender_stratocaster':
        label = 'Fender Stratocaster'
    elif label == 'fender_telecaster':
        label = 'Fender Telecaster'
    elif label == 'gibson_flying_v':
        label = 'Gibson Flying V'
    elif label == 'gibson_les_paul':
        label = 'Gibson Les Paul'
    elif label == 'gibson_sg':
        label = 'Gibson SG'
    else:
        label = 'Rickenbacker 330'

    return label

def extract_features(image):
    zernike_moments = mahotas.features.zernike_moments(np.asarray(image), 224)
    zernike_moments_list = []
    for zernike_moment in zernike_moments:
        zernike_moments_list.append(zernike_moment)

    return zernike_moments_list

def classifier(features):
    with open('guitar_trained_knn.pickle','rb') as handle:
        knn_model = pickle.load(handle)
    with open('guitar_scaler.pickle','rb') as handle:
        scaler = pickle.load(handle)
    scaled_features = scaler.transform([features])

    return knn_model.predict(scaled_features)

# Main entry functuion
def process_image(image_file):
    image = Image.open(image_file)
    image = add_padding(image)
    image = resize(image)
    image = to_grayscale(image)

    return image

@app.route("/classify", methods=['POST'])
def classify():
    processed_image = process_image(request.files['file'])
    features = extract_features(processed_image)
    prediction = classifier(features)
    name = format_label(prediction)

    processed_image.close()
    time.sleep(3)
    return {'name': name}
