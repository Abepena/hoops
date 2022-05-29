"""Models for hoops app."""
from datetime import datetime

from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested


db.metadata.clear()

class Location(db.Model):
    """Locations model. Represents a venue / field / court etc..."""

    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    address1 = db.Column(db.String(120), unique=False, nullable=False)
    address2 = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=True)
    state = db.Column(db.String(120), unique=False, nullable=True)
    zipcode = db.Column(db.String(60), unique=False, nullable=True)
    country = db.Column(db.String(60), unique=False, nullable=True)
    latitude = db.Column(db.Float(13), unique=False, nullable=True)
    longitude = db.Column(db.Float(13), unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "country": self.country,
            "latitude": self.latitude,
            "longitude": self.longitude,
        }

    def __repr__(self):
        return f"<Location {self.name}"


class LocationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Location

class Event(db.Model):
    """Events model"""

    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    event_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # organizer = db.relationship("User", backref="events")
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"))
    location = db.relationship("Location", backref="events")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "event_date": self.event_date,
            "created_at": self.created_at,
            "organizer_id": self.organizer_id,
        }

    def __repr__(self):
        return f"<Event {self.name}>"


class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event

    location = Nested("LocationSchema", many=False)

class User(UserMixin, db.Model):
    """
    User model.

    Every user is a player, players can be made coaches by admins or other coaches.

    In the future would like users to create their own leagues / teams which would flip the is_coach boolean
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Register/Login
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(
        db.String(200), primary_key=False, unique=False, nullable=False
    )

    # Profile
    first_name = db.Column(db.String(100), nullable=False, unique=False)
    last_name = db.Column(db.String(100), nullable=False, unique=False)
    dob = db.Column(db.Date, index=False, unique=False, nullable=False)
    is_coach = db.Column(db.Boolean, default=False, nullable=True)
    is_player = db.Column(db.Boolean, default=True, nullable=True)
    events = db.relationship("Event", backref="user", lazy=True)

    # Relevant Dates
    created_on = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=False,
        default=datetime.utcnow(),
    )
    last_login = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=False,
        default=datetime.utcnow(),
    )

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(password, method="sha256")

    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob,
            "is_coach": self.is_coach,
            "is_player": self.is_player,
            "events": self.events,
            "created_on": self.created_on,
            "last_login": self.last_login,
        }

    def __repr__(self):
        return f"<User {self.email}>"


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User


class Event_Subscription(db.Model):
    """Mapping of users who subscribed/signed up for event"""

    __tablename__ = "event_subscriptions"
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    event_id = db.Column(
        db.Integer, db.ForeignKey("events.id"), primary_key=True, nullable=False
    )


class Payment(db.Model):
    """Mapping of a payment to an event and user"""

    __tablename__ = "payments"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), primary_key=True, nullable=True
    )
    event_id = db.Column(
        db.Integer, db.ForeignKey("events.id"), primary_key=True, nullable=False
    )
    paid = db.Column(db.Boolean, default=False, nullable=False)
    amount = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "paid": self.paid,
            "amount": self.amount,
        }

    def __repr__(self):
        return f"<Payment {self.id}>"


class PaymentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Location