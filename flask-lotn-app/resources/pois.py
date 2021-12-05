from operator import mod
from flask.helpers import make_response
from flask.json import jsonify
import models

from flask import Blueprint, request
from flask_login import login_user, login_required, current_user
from playhouse.shortcuts import model_to_dict

pois = Blueprint('pois', 'pois')

#---------------SHOW ROUTE --------------------------------------
@pois.route('/')
#@login_required
def pois_index():
    result = models.PointOfInterest.select()

    poi_dicts = []
    for poi in result: 
        poi_dict = model_to_dict(poi)
        poi_dicts.append(poi_dict)
    #change to current user's dogs
    # current_user_dog_dicts = [model_to_dict(dog) for dog in current_user.dogs]

    # for dog_dict in current_user_dog_dicts:
    #     dog_dict['owner'].pop('password')

    return jsonify({
        'data': poi_dicts,
        'message': f"Successfully found {len(poi_dicts)} pois", 
        'status': 200
    }),200

#---------------POST/CREATE ROUTE -------------------------------
@pois.route('/', methods=['POST'])
def create_poi():
    payload = request.get_json()
    print(f"payload {payload}")
    new_poi = models.PointOfInterest.create(
        name = payload['name'],
        address = payload['address'],
        lat = payload['lat'],
        long = payload['long'],
        trip = models.Trip.get(models.Trip.id == payload['trip'])
    )
    poi_dict = model_to_dict(new_poi)
    print(f"poi dict {poi_dict}")
    return jsonify(
        data = poi_dict,
        message = "Successfully create poi",
        status=201
    ),201
#---------------PUT/EDIT ROUTE ----------------------------------
#---------------DELETE/DESTROY ROUTE ----------------------------