from flask import Flask, jsonify, render_template
import pymongo
from bson.json_util import dumps, loads 


app = Flask(__name__)


# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Define the 'classDB' database in Mongo
db = client.sun_data

cities = db.sun_data.find()
list_cities = list(cities)
json_data = dumps(list_cities)

# for city in cities:
#     print(city)
 
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/home")
def normal():
    return render_template('home.html')

@app.route("/json")
def jsonified():
    return json_data


if __name__ == "__main__":
    app.run(debug=True)


