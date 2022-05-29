"""Main Routes"""
from os import environ

import stripe
from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import logout_user, login_required, current_user

#Stripe Config
stripe_keys = {
"secret_key": environ["STRIPE_SECRET_KEY"],
"publishable_key": environ["STRIPE_PUBLISHABLE_KEY"],
}

stripe.api_key = stripe_keys["secret_key"]


# Blueprint Configuration
main_bp = Blueprint(
    "main_bp", __name__, template_folder="templates", static_folder="static"
)


@main_bp.route("/", methods=["GET"])
def home():
    return render_template("index.html", title="CK Hoops")


@main_bp.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    return render_template("dashboard.html", title="Dashboard", user=current_user)


@main_bp.route("/logout")
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return redirect(url_for("auth_bp.login"))


@main_bp.route("/config")
def get_publishable_key():
    stripe_config = {"publicKey": stripe_keys["publishable_key"]}
    return jsonify(stripe_config)


@main_bp.route("/create-checkout-session")
def create_checkout_session():
    """Create a stripe checkout session """
    domain_url = "http://127.0.0.1:5000/" #development
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
            ]
        )
        return jsonify({"sessionId": checkout_session["id"]})
    except Exception as e:
        return jsonify(error=str(e)), 403


@main_bp.route("/success")
def success():
    return render_template("success.html")


@main_bp.route("/cancelled")
def cancelled():
    return render_template("cancelled.html")