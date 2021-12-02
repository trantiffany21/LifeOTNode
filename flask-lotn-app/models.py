from peewee import *
import datetime
from flask_login import UserMixin

DATABASE = SqliteDatabase('lotn.sqlite')

class User(UserMixin, Model):
    username = CharField(unique=True)
    email = CharField(unique=True)
    password = CharField()

    class Meta: 
        database = DATABASE

#trip model
class Trip(Model):
    name = CharField(unique=True)
    origin = CharField()
    destination = CharField()
    lodging = {
        "lodging_name": CharField(), 
        "lodging_address": CharField(), 
        "lodging_lat": CharField(), 
        "lodging_long": CharField()
    }
    pointsOfInterest = [{
        "poi_name": CharField(), 
        "poi_address": CharField(), 
        "poi_lat": CharField(), 
        "poi_long": CharField()
    }]
    user = ForeignKeyField(User, backref='trips') 
    class Meta: 
        database=DATABASE

#point of interest model
# class PointOfInterest(Model):
#     name = CharField(unique=True)
#     address = CharField() 
#     lat = CharField() 
#     long = CharField()
#     trip = ForeignKeyField(Trip, backref='poi') 
#     class Meta: 
#         database=DATABASE

def initialize():
    DATABASE.connect()
    DATABASE.create_tables([User,Trip], safe=True)
    print('Connected to the DB and craeted tables if they dont already exist')
    DATABASE.close()
