from datetime import timedelta
from flask import Flask, jsonify, after_this_request, session
from flask_login import LoginManager, login_manager


from resources.trips import trips
from resources.users import users
from resources.pois import pois

import models
from flask_cors import CORS
import os 
from dotenv import load_dotenv
load_dotenv()

DEBUG = True
PORT = os.environ.get("PORT")

app = Flask(__name__)

app.secret_key = os.environ.get("FLASK_APP_SECRET")

app.config['SESSION_COOKIE_SAMESITE'] = "None" 
app.config['SESSION_COOKIE_SECURE'] = True

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    try:
        user = models.User.get_by_id(user_id) #should return None (null) - not raise an exception if the id is not valid
        return user
    except models.DoesNotExist:
        return None

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify(
        data={
            'error': "User not logged in"
        },
        message="You must be logged in to access that resource",
        status=401
    ),401

CORS(trips, origins=['http://localhost:3000','https://lifeonthenode.herokuapp.com'], supports_credentials=True) #from react app
CORS(users, origins=['http://localhost:3000','https://lifeonthenode.herokuapp.com'], supports_credentials=True)
CORS(pois, origins=['http://localhost:3000','https://lifeonthenode.herokuapp.com'], supports_credentials=True)

#use this blueprint (component)
app.register_blueprint(trips,url_prefix='/trips')
app.register_blueprint(pois,url_prefix='/trips/pois')
app.register_blueprint(users,url_prefix='/auth')

@app.before_request # use this decorator to cause a function to run before reqs
def before_request():
    print(session)
    """Connect to the db before each request"""
    print("you should see this before each request") # optional -- to illustrate that this code runs before each request -- similar to custom middleware in express.  you could also set it up for specific blueprints only.
    models.DATABASE.connect()
    session.permanent = True

    @after_this_request # use this decorator to Executes a function after this request
    def after_request(response):
        """Close the db connetion after each request"""
        print("you should see this after each request") # optional -- to illustrate that this code runs after each request
        models.DATABASE.close()
        return response # go ahead and send response back to client
                      # (in our case this will be some JSON)

if os.environ.get('FLASK_ENV') != 'development':
  print('\non heroku!')
  models.initialize()

if __name__ == '__main__':
    #when we start the app, setup our DB and tables as defined in models.py
    models.initialize()
    app.run(debug=DEBUG, port=PORT)