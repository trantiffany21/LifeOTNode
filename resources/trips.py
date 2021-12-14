from operator import mod
from flask.helpers import make_response
from flask.json import jsonify
import models

from flask import Blueprint, request
from flask_login import login_user, login_required, current_user
from playhouse.shortcuts import model_to_dict

trips = Blueprint('trips', 'trips')

#---------------SHOW ALL ROUTE --------------------------------------
@trips.route('/')
@login_required
def trips_index():
    result = models.Trip.select()

    # trip_dicts = []
    # for trip in result: 
    #     trip_dict = model_to_dict(trip)
    #     trip_dicts.append(trip_dict)
    #change to current user's trips
    current_user_trip_dicts = [model_to_dict(trip) for trip in current_user.trips]

    for trip_dict in current_user_trip_dicts:
         trip_dict['user'].pop('password')

    return jsonify({
        'data': current_user_trip_dicts,
        'message': f"Successfully found {len(current_user_trip_dicts)} trips", 
        'status': 200
    }),200

#---------------SHOW ONE ROUTE --------------------------------------
@trips.route('/<id>')
@login_required
def get_one_trip(id):
    trip = model_to_dict(models.Trip.get_by_id(id))

    return jsonify({
        'data': trip,
        'message': f"Found trip {trip['name']}", 
        'status': 200
    }),200

#---------------POST/CREATE ROUTE -------------------------------
@trips.route('/', methods=['POST'])
@login_required
def create_trip():
    payload = request.get_json()
    print(f"payload {payload}")
    new_trip = models.Trip.create(
    **payload)
    trip_dict = model_to_dict(new_trip)
    trip_dict['user'].pop('password')
    print(f"trip dict {trip_dict}")
    return jsonify(
        data = trip_dict,
        message = "Successfully create trip",
        status=201
    ),201

#---------------PUT/EDIT ROUTE ----------------------------------
@trips.route('/<id>', methods=['PUT'])
@login_required
def update_trip(id):
    payload = request.get_json()
    update_query = models.Trip.update(**payload).where(models.Trip.id == id).execute()
    updated_trip = model_to_dict(models.Trip.get_by_id(id))
    updated_trip['user'].pop('password')
    
    return jsonify(
        data = updated_trip,
        message = 'Trip updated successfully',
        status = 200
    ),200


#---------------DELETE/DESTROY ROUTE ----------------------------
@trips.route('/<id>', methods=['DELETE'])
@login_required
def delete_trip(id):
    trip = models.Trip.get_by_id(id)
    trip.delete_instance(recursive=True)
    # delete_query_trip = models.Trip.delete().where(models.Trip.id == id)
    # nums_of_rows_delete_trip = delete_query_trip.execute()
    #delete POIs associated
    # delete_query_poi = models.PointOfInterest
    # print(model_to_dict(delete_query_poi))
    #models.PointOfInterest.delete().where(models.PointOfInterest.trip.id == id)
    #nums_of_rows_delete_poi = delete_query_poi.execute()
    return jsonify(
        data={},
        message = f"Successfully deleted trip with id: {id} and  POIs",
        status = 200
    ),200