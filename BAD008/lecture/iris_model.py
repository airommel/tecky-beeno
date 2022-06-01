import tensorflow as tf

model = tf.saved_model.load('./model')
class_names = ['Iris setosa', 'Iris versicolor', 'Iris virginica']


def map_predict_result(logits):
    class_idx = tf.argmax(logits).numpy()
    p = float(tf.nn.softmax(logits)[class_idx])
    name = class_names[class_idx]
    return name, p


def predict(num_array):
    predict_dataset = tf.convert_to_tensor(num_array)
    predictions = model(predict_dataset, training=False)
    results = map(map_predict_result, predictions)
    return results
