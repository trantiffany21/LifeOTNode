from operator import mod
from flask.helpers import make_response
from flask.json import jsonify
import models

from flask import Blueprint, request
from flask_login import login_user, login_required, current_user
from playhouse.shortcuts import model_to_dict

trips = Blueprint('trips', 'trips')

#---------------SHOW ROUTE --------------------------------------
@trips.route('/')
#@login_required
def trips_index():
    result = models.Trip.select()

    trip_dicts = []
    for trip in result: 
        trip_dict = model_to_dict(trip)
        trip_dicts.append(trip_dict)
    #change to current user's dogs
    # current_user_dog_dicts = [model_to_dict(dog) for dog in current_user.dogs]

    # for dog_dict in current_user_dog_dicts:
    #     dog_dict['owner'].pop('password')

    return jsonify({
        'data': trip_dicts,
        'message': f"Successfully found {len(trip_dicts)} trips", 
        'status': 200
    }),200

#---------------POST/CREATE ROUTE -------------------------------
@trips.route('/', methods=['POST'])
def create_trip():
    payload = request.get_json()
    print(f"payload {payload}")
    new_trip = models.Trip.create(
    **payload
    # name = payload['name'],
    # origin = payload['origin'],
    # destination = payload['destination'],
    # lodging = payload['lodging'],
    # pointsOfInterest = payload['pointsOfInterest']
    # user = payload['user']
    )
    trip_dict = model_to_dict(new_trip)
    print(f"trip dict {trip_dict}")
    return jsonify(
        data = trip_dict,
        message = "Successfully create trip",
        status=201
    ),201

#---------------PUT/EDIT ROUTE ----------------------------------
#---------------DELETE/DESTROY ROUTE ----------------------------