"""Models for hoops app."""
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Location(db.Model):
    """Locations model. Represents a venue / field / court etc..."""

    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    address1 = db.Column(db.String(255), unique=False, nullable=False)
    address2 = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=True)
    state = db.Column(db.String(120), unique=False, nullable=True)
    zipcode = db.Column(db.String(60), unique=False, nullable=True)
    country = db.Column(db.String(60), unique=False, nullable=True)
    latitude = db.Column(db.Float(13), unique=False, nullable=True)
    longitude = db.Column(db.Float(13), unique=False, nullable=True)

    def __repr__(self):
        return f"<Location {self.name}"


class LocationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Location


class Event(db.Model):
    """Events model"""

    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(2083), nullable=True)
    type = db.Column(db.String(20), nullable=True)
    event_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"))
    location = db.relationship("Location", backref="events")

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

    def __repr__(self):
        return f"<User {self.email}>"


class UserSchema(SQLAlchemyAutoSchema):
    """
    TODO: exclude password
    """

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
        db.Integer, db.ForeignKey("users.id"), primary_key=True, nullable=False
    )
    event_id = db.Column(
        db.Integer, db.ForeignKey("events.id"), primary_key=True, nullable=False
    )
    paid = db.Column(db.Boolean, default=False, nullable=False)
    amount = db.Column(db.Integer)

    def __repr__(self):
        return f"<Payment {self.id}>"


class PaymentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Payment