from sanic import Sanic
from sanic.response import json
# from iris_model import predict
import iris_model

app = Sanic("TF-Model-Server")


@app.route('/')
def hello(request):
    return json({"message": "Hello World from TF Model Server"})


@app.post('/iris/predict')
def handle_predict(request):
    # iris_model.predict
    print('request:', request)
    body = request.json
    print('body:', body)
    results = list(iris_model.predict(body))
    print('results:', results)
    return json({"results": results})


app.run(host='localhost', port=8100)
