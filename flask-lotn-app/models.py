from peewee import *
import datetime
from flask_login import UserMixin
from playhouse.sqlite_ext import *

DATABASE = SqliteDatabase('lotn.sqlite')

class User(UserMixin, Model):
    username = CharField(unique=True)
    email = CharField(unique=True)
    password = CharField()

    class Meta: 
        database = DATABASE



# #lodging model
# class Lodging(Model):
#     lodging_name: CharField()
#     lodging_address: CharField() 
#     lodging_lat: CharField() 
#     lodging_long: CharField()
#     class Meta: 
#         database=DATABASE

#trip model
class Trip(Model):
    name = CharField(unique=True)
    origin = CharField()
    destination = CharField()
    lodging = JSONField()
    # pointsOfInterest = [
    #     {
    #     "poi_name": CharField(), 
    #     "poi_address": CharField(), 
    #     "poi_lat": CharField(), 
    #     "poi_long": CharField()
    # }
    # ]
    # ForeignKeyField(PointOfInterest, backref='trips') 
    # user = ForeignKeyField(User, backref='trips') 
    class Meta: 
        database=DATABASE

#point of interest model
class PointOfInterest(Model):
    name = CharField(unique=True)
    address = CharField() 
    lat = CharField() 
    long = CharField() 
    trip = ForeignKeyField(Trip, backref='pois') 
    class Meta: 
        database=DATABASE

def initialize():
    DATABASE.connect()
    DATABASE.create_tables([User,Trip,PointOfInterest], safe=True)
    print('Connected to the DB and created tables if they dont already exist')
    DATABASE.close()
