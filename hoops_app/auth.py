"""Routes for user authentication."""
from flask import Blueprint, redirect, render_template, flash, request, session, url_for
from flask_login import login_required, logout_user, current_user, login_user
from datetime import datetime

from . import login_manager
from .forms import LoginForm, SignupForm
from .models import db, User


# Blueprint Configuration
auth_bp = Blueprint(
    "auth_bp",
    __name__,
    template_folder="templates",
    static_folder="static",
    url_prefix="/auth",
)


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    """
    Log-in page for registered users.

    GET requests serve Log-in page.
    POST requests validate and redirect user to dashboard.

    TODO: refactor to JWT login
    """
    # Bypass if user is logged in
    if current_user.is_authenticated:
        return redirect(url_for("main_bp.dashboard"))

    form = LoginForm()
    # Validate login attempt
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and user.check_password(password=form.password.data):
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            next_page = request.args.get("next")
            return redirect(next_page or url_for("main_bp.dashboard"))
        flash("Invalid username/password combination")
        return redirect(url_for("auth_bp.login"))
    return render_template(
        "login.html",
        form=form,
        title="Log in.",
        body="Log in with your User account.",
    )


@auth_bp.route("/register", methods=["GET", "POST"])
def signup():
    """
    User sign-up page.

    GET requests serve sign-up page.
    POST requests validate form & user creation.
    """
    form = SignupForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(email=form.email.data).first()
        if existing_user is None:
            print(form.dob.data)
            user = User(
                first_name=form.first_name.data,
                last_name=form.last_name.data,
                email=form.email.data,
                dob=form.dob.data,
            )
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()  # Create new user
            login_user(user)  # Log in as newly created user
            return redirect(url_for("main_bp.dashboard"))
        flash("A user already exists with that email address.")

    return render_template(
        "register.html",
        title="Create an Account.",
        form=form,
        body="Sign up for a user account.",
    )


@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in on every page load."""
    if user_id is not None:
        return User.query.get(user_id)
    return None


@login_manager.unauthorized_handler
def unauthorized():
    """Redirect unauthorized users to Login page."""
    flash("You must be logged in to view that page.")
    return redirect(url_for("auth_bp.login"))
