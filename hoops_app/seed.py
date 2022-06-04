import os
from .models import Location, Event, User
import json

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

def seed_db(db):
    with open(os.path.join(__location__, "seed.json")) as file:
        data = json.load(file)

        users = [User(**user) for user in data["users"]]
        locations = [Location(**location) for location in data["locations"]]
        events = [Event(**event) for event in data["events"]]
        db.session.add_all(users + locations + events)
        db.session.commit()
