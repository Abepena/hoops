"""Main Api Routes"""
import json
from os import environ
from datetime import datetime
from venv import create

from flask import Blueprint, request, jsonify
from flask_login import logout_user, login_required, current_user
from marshmallow import Schema
from .models import (
    Event,
    Location,
    UserSchema,
    EventSchema,
    LocationSchema,
    PaymentSchema,
)

from . import db

# Stripe Config
import stripe

stripe_keys = {
    "secret_key": environ["STRIPE_SECRET_KEY"],
    "publishable_key": environ["STRIPE_PUBLISHABLE_KEY"],
}

stripe.api_key = stripe_keys["secret_key"]


# Blueprint Configuration
api = Blueprint(
    "api",
    __name__,
    template_folder="templates",
    static_folder="static",
    url_prefix="/api",
)

#############
# Locations
#############


@api.route("/locations", methods=["GET"])
def all_locations():
    """Returns JSON list of all locations"""
    all_locations = [
        LocationSchema().dump(location) for location in Location.query.all()
    ]
    return (jsonify(locations=all_locations), 201)


@api.route("/locations", methods=["POST"])
def create_location():
    """Logic to create an location from API call. Login required"""
    name = request.json["name"]
    description = request.json.get("description")
    address1 = request.json.get("address1")
    address2 = request.json.get("address2")
    city = request.json.get("city")
    state = request.json.get("state")
    zipcode = request.json.get("zipcode")
    country = request.json.get("country")
    latitude = request.json.get("latitude")
    longitude = request.json.get("longitude")

    new_location = Location(
        name=name,
        description=description,
        address1=address1,
        address2=address2,
        city=city,
        state=state,
        country=country,
        zipcode=zipcode,
        latitude=latitude,
        longitude=longitude,
    )

    db.session.add(new_location)
    db.session.commit()

    return (jsonify(LocationSchema().dump(new_location)), 201)


@api.route("/locations/<int:id>", methods=["GET"])
def get_location(id):
    location = Location.query.get_or_404(id)
    return jsonify(location=LocationSchema().dump(location))


@api.route("/locations/<int:id>", methods=["PATCH"])
def update_location(id):
    location = Location.query.get_or_404(id)
    db.session.query(Location).filter_by(id=id).update(request.json)
    db.session.commit()

    return jsonify(location=LocationSchema().dump(location))


@api.route("/locations/<int:id>", methods=["DELETE"])
def delete_location(id):
    location = Location.query.get_or_404(id)
    db.session.delete(location)
    db.session.commit()
    return jsonify(message=f"Deleted location {id}")


#############
# EVENTS
#############


@api.route("/events", methods=["GET"])
def all_events():
    all_events = [EventSchema().dump(event) for event in Event.query.all()]
    return (jsonify(events=all_events), 201)


@api.route("/events", methods=["POST"])
def create_event():
    """Logic to create an event from API call. Login required"""
    name = request.json["name"]
    description = request.json["description"]
    event_date = datetime.strptime(request.json["event_date"], "%Y-%m-%dT%H:%M:%S.%fZ")
    created_at = datetime.utcnow()
    organizer_id = request.json["organizer_id"]
    location_id = request.json["location_id"]

    new_event = Event(
        name=name,
        description=description,
        event_date=event_date,
        created_at=created_at,
        organizer_id=organizer_id,
        location_id=location_id,
    )

    db.session.add(new_event)
    db.session.commit()

    return (jsonify(event=new_event.serialize()), 201)


@api.route("/events/<int:id>", methods=["GET"])
def get_event(id):
    event = Event.query.get_or_404(id)
    return jsonify(event=event.serialize)


@api.route("/events/<int:id>", methods=["PATCH"])
def update_event(id):
    event = Event.query.get_or_404(id)
    db.session.query(Event).filter_by(id=id).update(request.json)
    db.session.commit()

    return jsonify(event=event.serialize())


@api.route("/events/<int:id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify(message=f"Deleted event {id}")


@api.route("/events/upcoming", methods=["GET"])
def upcoming():
    """
    TODO: Fix logic on next n events,
    should be filtered for first n events after today
    """
    upcoming_events = [
        EventSchema().dump(event)
        for event in db.session.query(Event).order_by(Event.id.desc()).limit(8)
    ]
    upcoming_events = upcoming_events[::-1]
    return (jsonify(events=upcoming_events), 200)


@api.route("/config")
def get_publishable_key():
    stripe_config = {"publicKey": stripe_keys["publishable_key"]}
    return jsonify(stripe_config)


@api.route("/create-checkout-session")
def create_checkout_session():
    """Create a stripe checkout session """
    domain_url = "http://127.0.0.1:5000/"  # development
    stripe.api_key = stripe_keys["secret_key"]

    try:
        # Create new Checkout Session for the order
        # Other optional params include:
        # [billing_address_collection] - to display billing address details on the page
        # [customer] - if you have an existing Stripe Customer ID
        # [payment_intent_data] - capture the payment later
        # [customer_email] - prefill the email input in the form
        # For full details see https://stripe.com/docs/api/checkout/sessions/create

        # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param

        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "cancelled",
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {
                    "name": "Event Ticket",
                    "quantity": 1,
                    "currency": "usd",
                    "amount": "1000",
                }
            ],
        )
        return jsonify({"sessionId": checkout_session["id"]})
    except Exception as e:
        return jsonify(error=str(e)), 403


@api.route("/success")
def success():
    return render_template("success.html")


@api.route("/cancelled")
def cancelled():
    return render_template("cancelled.html")