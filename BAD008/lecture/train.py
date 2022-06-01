## Check libraries version
import tensorflow as tf
print("TensorFlow version: {}".format(tf.__version__))
print("Eager execution: {}".format(tf.executing_eagerly()))


## loading train_dataset
import os
train_dataset_url = "https://storage.googleapis.com/download.tensorflow.org/data/iris_training.csv"
train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_dataset_url),origin=train_dataset_url)
print("Local copy of the dataset file: {}".format(train_dataset_fp))


## loading test dataset
test_dataset_url = "https://storage.googleapis.com/download.tensorflow.org/data/iris_test.csv"
test_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(test_dataset_url),
                origin=test_dataset_url)
print("Local copy of the test dataset file: {}".format(test_dataset_fp))


## columns name of the train_dataset
feature_names = ['sepal_length','sepal_width',
        'petal_length','petal_width']

label_name = 'species'
column_names = feature_names + [label_name]

print("Features: {}".format(feature_names))
print("Label: {}".format(label_name))


## Reading the datasets from the csv
import pandas as pd
batch_size = 32

train_df = pd.read_csv(train_dataset_fp,skiprows=1,names=column_names)
features_df = train_df[feature_names]
label_df = train_df[label_name]


## Set the train dataset to have a batch size of 32
train_dataset = tf.data.Dataset.from_tensor_slices((features_df,label_df)).batch(batch_size)


## Use matplotlib to visualize the dataset we get.
import matplotlib.pyplot as plt
plt.scatter(features_df['petal_length'],
    features_df['sepal_length'],
    c=label_df,
    cmap='viridis')

plt.xlabel("Petal length")
plt.ylabel("Sepal length")
plt.show()


# Prepare test database
test_df = pd.read_csv(test_dataset_fp,skiprows=1,names=column_names)
features_df = test_df[feature_names]
label_df = test_df[label_name]

test_dataset = tf.data.Dataset.from_tensor_slices((features_df,label_df)).batch(batch_size)


# Prepare Model 
from tensorflow import keras

inputs = keras.Input(shape=(4,))
h1 = keras.layers.Dense(10,activation=tf.nn.relu)(inputs)
h2 = keras.layers.Dense(10,activation=tf.nn.relu)(h1)
outputs = keras.layers.Dense(3)(h2)
model = keras.Model(inputs=inputs, outputs=outputs, name="iris_model")

model.summary()


## Makes predictions based on untrained weights and bias
next_batch_dataset = next(iter(train_dataset))
features,labels = next_batch_dataset
predictions = model(features)
print("First 5 predictions: {}".format(predictions[:5]))

## Use softmax to convert the number to probabilities
tf.nn.softmax(predictions[:5])

## Showing prediction results.
print("Prediction: {}".format(tf.argmax(predictions, axis=1)))
print("    Labels: {}".format(labels))

# Train the Model

## Define loss(The difference between the predictions made and the true value) as Sparse Categorical Cross Entropy
loss_object = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

## Define loss function
def loss(model, x, y, training):
  # training=training is needed only if there are layers with different
  # behavior during training versus inference (e.g. Dropout).
  y_ = model(x, training=training)

  return loss_object(y_true=y, y_pred=y_)

l = loss(model, features, labels, training=False)
print("Loss test: {}".format(l))

## gradient descents for the models with the input and targets
def grad(model, inputs, targets):
  with tf.GradientTape() as tape:
    loss_value = loss(model, inputs, targets, training=True)
  return loss_value, tape.gradient(loss_value, model.trainable_variables)

## Set optimizers to be Stochastic Gradient Descent
optimizer = tf.keras.optimizers.SGD(learning_rate=0.01)

## Single step for training
loss_value, grads = grad(model, features, labels)

print("Step: {}, Initial Loss: {}".format(optimizer.iterations.numpy(),
                                          loss_value.numpy()))

optimizer.apply_gradients(zip(grads, model.trainable_variables))

print("Step: {}, Loss: {}".format(optimizer.iterations.numpy(),
                                          loss(model, features, labels, training=True).numpy()))

## Training Loop for multiple optimization steps
train_loss_results = []
train_accuracy_results = []

num_epochs = 201

for epoch in range(num_epochs):
  epoch_loss_avg = tf.keras.metrics.Mean()
  epoch_accuracy = tf.keras.metrics.SparseCategoricalAccuracy()

  # Training loop - using batches of 32
  for x, y in train_dataset:
    # Optimize the model
    loss_value, grads = grad(model, x, y)
    optimizer.apply_gradients(zip(grads, model.trainable_variables))

    # Track progress
    epoch_loss_avg.update_state(loss_value)  # Add current batch loss
    # Compare predicted label to actual label
    # training=True is needed only if there are layers with different
    # behavior during training versus inference (e.g. Dropout).
    epoch_accuracy.update_state(y, model(x, training=True))

  # End epoch
  train_loss_results.append(epoch_loss_avg.result())
  train_accuracy_results.append(epoch_accuracy.result())

  if epoch % 50 == 0:
    print("Epoch {:03d}: Loss: {:.3f}, Accuracy: {:.3%}".format(epoch,epoch_loss_avg.result(), epoch_accuracy.result()))

## Plot the training progress
fig, axes = plt.subplots(2, sharex=True, figsize=(12, 8))
fig.suptitle('Training Metrics')

axes[0].set_ylabel("Loss", fontsize=14)
axes[0].plot(train_loss_results)

axes[1].set_ylabel("Accuracy", fontsize=14)
axes[1].set_xlabel("Epoch", fontsize=14)
axes[1].plot(train_accuracy_results)
plt.show()


# Evaluate the model with test dataset
test_accuracy = tf.keras.metrics.Accuracy()

for (x, y) in test_dataset:
  # training=False is needed only if there are layers with different
  # behavior during training versus inference (e.g. Dropout).
  logits = model(x, training=False)
  prediction = tf.argmax(logits, axis=1, output_type=tf.int32)
  test_accuracy(prediction, y)

print("Test set accuracy: {:.3%}".format(test_accuracy.result()))

# Save the Model
model.save('./model',overwrite=True)

print('end.')