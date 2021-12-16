from flask_login.utils import login_required
import models

from flask import Blueprint, json, request, jsonify, session
from flask_bcrypt import generate_password_hash, check_password_hash
from playhouse.shortcuts import model_to_dict
from flask_login import login_user, current_user, logout_user
users = Blueprint('users', 'users')

#---------------SHOW ALL ROUTE --------------------------------------
@users.route('/')
def users_index():
    result = models.User.select()

    user_dicts = []
    for user in result: 
        user_dict = model_to_dict(user)
        user_dicts.append(user_dict)

    return jsonify({
        'data': user_dicts,
        'message': f"Successfully found {len(user_dicts)} users", 
        'status': 200
    }),200



#---------------PUT/EDIT ROUTE --------------------------------------


#---------------POST/CREATE ROUTE -----------------------------------
@users.route('/register', methods=['POST'])
def register():
    payload = request.get_json()

    payload['email'] = payload['email'].lower()
    payload['username'] = payload['username'].lower()
    print(payload)

    try: 
        models.User.get(models.User.email == payload['email'])
        return jsonify(
            data={},
            type="email", 
            message= f"A user with the email {payload['email']} already exists",
            status=401
        ),401
    except models.DoesNotExist: 
        try: 
            models.User.get(models.User.username == payload['username'])
            return jsonify(
                data={}, 
                type="username", 
                message= f"A user with the username {payload['username']} already exists",
                status=401
            ),401
        except models.DoesNotExist: 
            pw_hash = generate_password_hash(payload['password'])
            created_user = models.User.create(
                username=payload['username'],
                email=payload['email'],
                password=pw_hash
            )

            session.permanent = True
            login_user(created_user)

            created_user_dict = model_to_dict(created_user)
            print(created_user_dict)

            created_user_dict.pop('password')
            return jsonify(
                data=created_user_dict,
                message="Successfully registered user",
                status=201
            ),201
        

#---------------POST/CREATE ROUTE FOR LOGIN-------------------------
@users.route('/login', methods=['POST'])
def login():
    payload = request.get_json()
    payload['username'] = payload['username'].lower()
    # payload['username'] = payload['username'].lower()

    try: 
        user = models.User.get(models.User.username == payload['username'])

        user_dict = model_to_dict(user)
        password_is_good = check_password_hash(user_dict['password'], payload['password'])
        print(password_is_good)
        if (password_is_good):
            session.permanent = True
            login_user(user)
            user_dict.pop('password')
            return jsonify(
                data=user_dict,
                message=f"Successfully logged in {user_dict['email']}",
                status=200
            ),200
        else:
            return jsonify(
                data={},
                message="Email or password is incorrect",
                status=200
            ),200
    except models.DoesNotExist:
        print('email not found')
        return jsonify(
            data={},
            message="Email or password is incorrect", 
            status=401
        ),401

#---------------SHOW USER ROUTE ------------------------------------
@users.route('/logged_in_user', methods=['GET'])
def get_logged_in_user():
    print(current_user)

    if not current_user.is_authenticated:
        return jsonify(
            data={},
            message="No user is currently logged in", 
            status=401
        ),401
    else:
        print(f"{current_user.username} is current_user.name in GET logged_in_user")
        user_dict = model_to_dict(current_user)
        user_dict.pop('password')
        return jsonify(
            data=user_dict,
            message=f"Currently logged in as {user_dict['username']}.",
            status=200
        ),200

#---------------LOGOUT USER ROUTE --------------------------------
@users.route('/logout', methods=['GET'])
@login_required
def logout():
    current_name = current_user.username
    logout_user()
    return jsonify(
        data={},
        message=f"Successfully logged out {current_name}.",
        status=200
    ),200