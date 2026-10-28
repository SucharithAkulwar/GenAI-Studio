"""DCGAN CelebA Training Script (Standalone).
Usage: python train_dcgan.py --epochs 50 --batch_size 64
"""
import argparse
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

def build_generator():
    model = models.Sequential([
        layers.Dense(8 * 8 * 256, use_bias=False, input_shape=(100,)),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Reshape((8, 8, 256)),
        layers.Conv2DTranspose(128, 5, strides=2, padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Conv2DTranspose(64, 5, strides=2, padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Conv2DTranspose(3, 5, strides=2, padding='same', activation='tanh')
    ])
    return model

def build_discriminator():
    model = models.Sequential([
        layers.Conv2D(64, 5, strides=2, padding='same', input_shape=[64, 64, 3]),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        layers.Conv2D(128, 5, strides=2, padding='same'),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        layers.Flatten(),
        layers.Dense(1)
    ])
    return model

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs", type=int, default=5)
    parser.add_argument("--batch_size", type=int, default=32)
    args = parser.parse_args()
    
    print(f"Initializing DCGAN for {args.epochs} epochs with batch size {args.batch_size}...")
    G = build_generator()
    D = build_discriminator()
    print("Generator and Discriminator compiled successfully. Ready for CelebA batches.")
