# -*- coding: utf-8 -*-
"""
Created on Mon Dec  4 19:22:09 2023

@author: hlary
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cargar el dataset sin encabezados
df = pd.read_csv(r"C:\Users\hlary\OneDrive\Escritorio\Skool\2 Big Data\Practicas\ecg.csv", header=None)

# Separar en dos conjuntos: normal y anormal
normal_data = df[df.iloc[:, -1] == 0].iloc[:, :-1]
abnormal_data = df[df.iloc[:, -1] == 1].iloc[:, :-1]

# Imprimir ambos conjuntos individualmente
plt.figure(figsize=(15, 5))
plt.subplot(1, 2, 1)
plt.plot(normal_data.values.T, color='blue', alpha=0.5)
plt.title('Conjunto de Datos Normal')
plt.xlabel('Tiempo')
plt.ylabel('Amplitud')
plt.subplot(1, 2, 2)
plt.plot(abnormal_data.values.T, color='red', alpha=0.5)
plt.title('Conjunto de Datos Anormal')
plt.xlabel('Tiempo')
plt.ylabel('Amplitud')
plt.tight_layout()
plt.show()

# Preprocesamiento y escalamiento de datos
scaler = StandardScaler()
normal_data_scaled = scaler.fit_transform(normal_data)
abnormal_data_scaled = scaler.transform(abnormal_data)

# Dividir los conjuntos en entrenamiento y prueba
X_train_normal, X_test_normal = train_test_split(normal_data_scaled, test_size=0.2, random_state=42)
X_train_abnormal, X_test_abnormal = train_test_split(abnormal_data_scaled, test_size=0.2, random_state=42)

# Autoencoder simple para comparar las diferencias
input_dim = normal_data.shape[1]

# Definir el modelo del autoencoder
input_layer = Input(shape=(input_dim,))
encoded_dim = 32  # Dimensión del espacio latente
encoded = Dense(encoded_dim, activation='relu')(input_layer)
decoded = Dense(input_dim, activation='sigmoid')(encoded)
autoencoder = Model(input_layer, decoded)
autoencoder.compile(optimizer='adam', loss='mse')

import random

# Entrenar el autoencoder en el conjunto de datos normales
x_values = list()
y_values = list()
epochs = 50 # Número total de épocas
for epoch in range(epochs):
    autoencoder.fit(X_train_normal, X_train_normal, epochs=1, batch_size=64, shuffle=True,
                    validation_data=(X_test_normal, X_test_normal))
    x_values.append(epoch)
    y_values.append(autoencoder.history.history['loss'][min(epoch, len(autoencoder.history.history['loss']) - 1)])

# Seleccionar un único índice aleatorio para ambas muestras
random_index = random.randint(0, len(X_test_normal) - 1)
sample_normal = X_test_normal[random_index].reshape(1, -1)
sample_abnormal = X_test_abnormal[random_index].reshape(1, -1)

# Reconstruir las muestras seleccionadas
reconstructed_sample_normal = autoencoder.predict(sample_normal)
reconstructed_sample_abnormal = autoencoder.predict(sample_abnormal)

# Gráfico de la pérdida
plt.plot(x_values, y_values, label='Pérdida')
plt.title('Gráfico de Pérdida')
plt.xlabel('Epoch')
plt.ylabel('Pérdida')
plt.legend()
plt.show()

# Gráfico con las muestras seleccionadas
plt.figure(figsize=(15, 5))
plt.subplot(1, 2, 1)
plt.plot(sample_normal.T, label='Original', color='blue', alpha=0.5)
plt.plot(reconstructed_sample_normal.T, label='Reconstruido', color='orange', alpha=0.5)
plt.title('Muestra Normal Antes y Después del Autoencoder')
plt.xlabel('Tiempo')
plt.ylabel('Amplitud')
plt.legend()
plt.subplot(1, 2, 2)
plt.plot(sample_abnormal.T, label='Original', color='red', alpha=0.5)
plt.plot(reconstructed_sample_abnormal.T, label='Reconstruido', color='orange', alpha=0.5)
plt.title('Muestra Anormal Antes y Después del Autoencoder')
plt.xlabel('Tiempo')
plt.ylabel('Amplitud')
plt.legend()
plt.tight_layout()
plt.show()

# Gráfico con las reconstrucciones superpuestas
plt.figure(figsize=(15, 5))
plt.plot(reconstructed_sample_normal.T, label='Reconstruido Normal', color='orange', alpha=0.5)
plt.plot(reconstructed_sample_abnormal.T, label='Reconstruido Anormal', color='purple', alpha=0.5)
plt.title('Reconstrucciones Superpuestas de Muestras')
plt.xlabel('Tiempo')
plt.ylabel('Amplitud')
plt.legend()
plt.show()

# Definir una ruta para devolver los datos de x e y
@app.route('/data', methods=['GET'])
def obtener_datos():
    respuesta = {
        "x": x_values,
        "y": y_values
    }
    return jsonify(respuesta)

if __name__ == '__main__':
    app.run()
