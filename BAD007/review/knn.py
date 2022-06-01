# %%
import numpy as np
from scipy.stats  import mode
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# %%
position = np.array([1,2,3,4])
position

# %%
sample = np.random.random(100).reshape(25,4)
# sample = np.array(range(100)).reshape(25,4).reshape(5,5,4)
# .reshape(6,2,3)
sample

# %%
sample

# %%
diff = sample - position
diff

# sample.__minus__(position)

# %%
a2 = diff[:,0] ** 2
b2 = diff[:,1] ** 2
c2 = diff[:,2] ** 2
d2 = diff[:,3] ** 2

# 3 ** 2

# %%
a2

# %%

dist2 = a2 + b2 + c2 + d2
dist2

# %%
3 ** 2
9 ** 0.5

dist = dist2 ** 0.5
dist

# %%
n = len(dist)
index = (range(n))
dist_with_index = list(zip(index, dist))
dist_with_index

# %%
# sorted(dist_with_index,key=lambda x: x[1])
# dist_with_index[0][1]

def sort_key(x):
	return x[1]

sorted_dist_with_index = sorted(dist_with_index,key=sort_key)
sorted_dist_with_index

# %%
k = 3
sorted_dist_with_index[-3:] # farest k sample
sorted_dist_with_index[0:3] # closest k sample
top_k_pairs = sorted_dist_with_index[0:3]

# %%
[(x,x+10) for x in range(0, 10)]

[(x,y,z) for x in range(3) for y in range(3) for z in range(3)]

top_k_indices = [t[0] for t in top_k_pairs]
top_k_indices

# %%
class KNNClassifier:

    def __init__(self, X_train, y_train, k_neighbors = 3):
        self.k_neighbors = k_neighbors
        self._X_train = X_train
        self._y_train = y_train
        self._y_set = set(y_train)

    """calculate the euclidean distance here"""
    def euclidean_dist(self, point_1, point_2):
        n = point_1.shape[0]
        # dist2 = np.array([0 for x in range(n)]) # we are not calculating in batch, hence should a single zero
        dist2 = 0
        for i in range(n):
            a = point_1[i] - point_2[i]
            a2 = a ** 2
            dist2 = dist2 + a2
        dist = dist2 ** 0.5
        return dist

    """accept multiple inputs here and predict one by one with predict_single()"""
    def predict(self, X_test_array):
        return [ self.predict_single(X_test) for X_test in X_test_array ]

    """predict single input here"""
    def predict_single(self, input_data_single):
        all_dist = [
            self.euclidean_dist(X_train_single, input_data_single) for
              X_train_single in self._X_train
        ]
        n = self._X_train.shape[0]
        index = range(n)
        all_dist_with_index = zip(index, all_dist)
        k = self.k_neighbors
        top_k_y = [
            self.get_y(t[0])
            for t in sorted(all_dist_with_index,key=lambda x: x[1])[0:k]
        ]

        pred = sorted([(y,top_k_y.count(y)) for y in self._y_set],key=lambda x: x[1])[-1][0]

        return pred
    
    def get_y(self, index_train):
        return self._y_train[index_train]


iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(X_train.shape)    # (120, 4)
print(X_test.shape)     # (30, 4)
print(y_train.shape)    # (120,)
print(y_test.shape)     # (30,)


# %%
len([x for x in [1,2,3,2,1,2,2,3,3,1,2,3] if x == 2])
[1,2,3,2,1,2,2,3,3].count(2)

# %%
X_train.shape[1]
n = X_train[0].shape[0]
np.array([0 for x in range(n)])
X_train[:,0]

set(y_train)

# %%

iris_knn_classifier = KNNClassifier(X_train, y_train)
y_pred = iris_knn_classifier.predict(X_test)
y_pred

# X_train
# y_train
# X_test

# %%

print(classification_report(y_test, y_pred, target_names=[
      'Iris-Setosa', 'Iris-Versicolour', 'Iris-Virginica']))

# %%
import matplotlib.pyplot as plt

test_petal_length = X_test[:,2]
test_petal_width = X_test[:,3]

plt.scatter(test_petal_length, test_petal_width, c=y_test)
plt.title("Distribution of Test Data")
plt.show()

# %%
# plt.scatter(X_train[:,2],X_train[:,3],c=y_train)


