# -*- coding: utf-8 -*-
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from tensorflow.keras import layers, losses
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Model
# Web framework that provides the configuration to deploy web applications
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df = pd.read_csv('http://storage.googleapis.com/download.tensorflow.org/data/ecg.csv', header=None)
df.head()

# Now we will separate the data and labels so that it will be easy for us
data = df.iloc[:,:-1].values
labels = df.iloc[:,-1].values
labels

train_data, test_data, train_labels, test_labels = train_test_split(data, labels, test_size = 0.2, random_state = 21)

# Now lets normalize the data
# First we will calculate the maximum and minimum value from the training set 
min = tf.reduce_min(train_data)
max = tf.reduce_max(train_data)

# Now we will use the formula (data - min)/(max - min)
train_data = (train_data - min)/(max - min)
test_data = (test_data - min)/(max - min)

# Converted the data into float
train_data = tf.cast(train_data, dtype=tf.float32)
test_data = tf.cast(test_data, dtype=tf.float32)

# The labels are either 0 or 1, so I will convert them into boolean(true or false) 
train_labels = train_labels.astype(bool)
test_labels = test_labels.astype(bool)

# Now let's separate the data for normal ECG from that of abnormal ones
# Normal ECG data
n_train_data = train_data[train_labels]
n_test_data = test_data[test_labels]

# Abnormal ECG data
an_train_data = train_data[~train_labels]
an_test_data = test_data[~test_labels]

print(n_train_data)

# Create a single subplot for both charts
plt.figure(figsize=(12, 6))

# Normal ECG plot
plt.subplot(1, 2, 1)
plt.plot(np.arange(140), n_train_data[0], color='green')
plt.grid()
plt.title('Normal ECG')

# Abnormal ECG plot
plt.subplot(1, 2, 2)
plt.plot(np.arange(140), an_train_data[0], color='red')
plt.grid()
plt.title('Anormal ECG')

# Design adjustments
plt.tight_layout()
plt.show()


# Now let's define the model!
#  Here I have used the Model Subclassing API (but we can also use the Sequential API)
#  The model has 2 parts : 1. Encoder and 2. Decoder
 
class detector(Model):
  def __init__(self):
    super(detector, self).__init__()
    self.encoder = tf.keras.Sequential([
                                        layers.Dense(32, activation='relu'),
                                        layers.Dense(16, activation='relu'),
                                        layers.Dense(8, activation='relu')
    ])
    self.decoder = tf.keras.Sequential([
                                        layers.Dense(16, activation='relu'),
                                        layers.Dense(32, activation='relu'),
                                        layers.Dense(140, activation='sigmoid')
    ])

  def call(self, x):
    encoded = self.encoder(x)
    decoded = self.decoder(encoded)
    return decoded

# Let's compile and train the model!!
autoencoder = detector()
autoencoder.compile(optimizer='adam', loss='mae')
autoencoder.fit(n_train_data, n_train_data, epochs = 20, batch_size=512, validation_data=(n_test_data, n_test_data))

# Now let's define a function in order to plot the original ECG and reconstructed ones and also show the error
def plot(data, n):
  enc_img = autoencoder.encoder(data)
  dec_img = autoencoder.decoder(enc_img)
  plt.plot(data[n], 'green')
  plt.plot(dec_img[n], 'black')
  plt.fill_between(np.arange(140), data[n], dec_img[n], color = 'lightblue')
  plt.legend(labels=['Input', 'Reconstruction', 'Error'])
  plt.show()


reconstructed = autoencoder(n_train_data)
train_loss = losses.mae(reconstructed, n_train_data)
t = np.mean(train_loss) + np.std(train_loss)

def prediction(model, data, threshold):
  rec = model(data)
  loss = losses.mae(rec, data)
  return tf.math.less(loss, threshold)
print(t)

pred = prediction(autoencoder, n_test_data, t)
print(pred)

# Obtaining data
n_train_data = train_data[train_labels]
n_test_data = test_data[test_labels]

an_train_data = train_data[~train_labels]
an_test_data = test_data[~test_labels]

# Format the data to be sent to our frontend
def format_results(normal_data, abnormal_data):
    results_normal = []
    results_abnormal = []

    for i in range(len(normal_data)):
        result = {"x": i+1, "y": normal_data[i].numpy().tolist()}
        results_normal.append(result)

    for i in range(len(abnormal_data)):
        result = {"x": i+1, "y": abnormal_data[i].numpy().tolist()}
        results_abnormal.append(result)

    return [results_normal, results_abnormal]


# Let's see some more result visually !!

plot(n_test_data, 0)
plot(an_test_data, 0)

# Data
@app.route('/data', methods=['GET'])
def get_formatted_data():
    # Get formatted data
    formatted_results = format_results(an_train_data[0], an_test_data[0])

    # Send the formatted data as a JSON formatted response
    return jsonify(formatted_results)

if __name__ == "__main__":
    app.run()
