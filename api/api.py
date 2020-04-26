import time
from flask import Flask, redirect, request, url_for, g
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
import requests

# Internal imports
import json
import os
import sqlite3
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    purpose = db.Column(db.String(140), nullable=False)

    def __repr__(self):
        return '<Club: ' + self.name + '>'



# # Flask-Login helper to retrieve a user from our db
# @login_manager.user_loader
# def load_user(user_id):
#     return User.get(user_id)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/clubs')
def get_clubs():
    clubs = [
        {
            "name": "Kars for Kids",
            "purpose": "Donate cars to help underserved children",
        },
        {
            "name": "Policy Review Berkeley Decal",
            "purpose": "Review public policy matters in a concise manner",
        },
        {
            "name": "Berkeley Consulting",
            "purpose": "The premier consulting organization",
        },
        {
            "name": "Friends of Bowles Hall",
            "purpose": "Support the advancement of BHRC",
        },
        {
            "name": "HackNow Hackathon",
            "purpose": "Create apps that help the community",
        },
    ]
    body = {
        "clubs": clubs,
        "status": 200,
    }
    queried_clubs = Club.query.all()
    body = {
        "clubs": [{"name": club.name, "purpose": club.purpose} for club in queried_clubs]
    }
    return body

@app.route("/add_club", methods=['POST'])
def add_club():
    body = request.get_json()
    club = Club(name=body['name'], purpose=body['purpose'])
    db.session.add(club)
    db.session.commit()
    return body

@app.route("/login", methods=['POST'])
def login():
    return request.get_json()

# @app.route("/")
# def index():
#     if current_user.is_authenticated:
#         return (
#             {
#                 "status": 200,
#                 "name": current_user.name, "email": current_user.email, "picture": current_user.profile_pic
#             }
#         )
#     else:
#         return {"status": 400}
