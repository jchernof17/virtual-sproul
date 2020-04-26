import time
from flask import Flask, redirect, request, url_for, g
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
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
    #image = db.Column(db.String(140), nullable=True)

    def __repr__(self):
        return '<Club: ' + self.name + '>'

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)
    club = db.relationship("Club", backref=db.backref("club", uselist=False))

#k for k
# https://upload.wikimedia.org/wikipedia/commons/e/e6/World_Aids_Day_Ribbon.png

# prb
# data:image/png;base64,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

# # Flask-Login helper to retrieve a user from our db
# @login_manager.user_loader
# def load_user(user_id):
#     return User.get(user_id)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/clubs')
def get_clubs():
    queried_clubs = Club.query.all()
    body = {
        "clubs": [{"name": club.name, "image": "", "purpose": club.purpose, "id": club.id} for club in queried_clubs]
    }
    return body

@app.route('/events')
def get_events():
    queried_events = Event.query.all()
    body = {
        "events": [{"name": event.name, "date": event.date, "club": event.club, "id": event.id} for event in queried_events]
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
