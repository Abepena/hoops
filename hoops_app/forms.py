"""Forms for hoops app."""
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.html5 import DateField
from wtforms.validators import (
    DataRequired,
    Email,
    EqualTo,
    Length,
    Optional,
)


class SignupForm(FlaskForm):
    """User Sign-up Form.
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), primary_key=False, unique=False, nullable=False)
    is_coach = db.Column(db.Boolean, default=False, nullable=True)
    is_player = db.Column(db.Boolean, default=False, nullable=True)
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)
    last_login = db.Column(db.DateTime, index=False,unique=False,nullable=True)
    events = db.relationship('Event', backref='user', lazy=True)
    """

    email = StringField(
        "Email",
        validators=[
            Length(min=6),
            Email(message="Enter a valid email."),
            DataRequired(),
        ],
    )
    password = PasswordField(
        "Password",
        validators=[
            DataRequired(),
            Length(min=6, message="Select a stronger password."),
        ],
    )
    confirm = PasswordField(
        "Confirm Your Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Passwords must match."),
        ],
    )
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    dob = DateField("Date of Birth", validators=[DataRequired()])


class LoginForm(FlaskForm):
    """User Log-in Form."""

    email = StringField(
        "Email", validators=[DataRequired(), Email(message="Enter a valid email.")]
    )
    password = PasswordField("Password", validators=[DataRequired()])


# class PlaylistForm(FlaskForm):
#     """Form for adding playlists."""
#     name = StringField("Playlist Name", validators=[InputRequired()])
#     description = TextAreaField("Description", validators=[InputRequired()])

# class SongForm(FlaskForm):
#     """Form for adding songs."""
#     title = StringField("Title", validators=[InputRequired()])
#     artist = StringField("Artist", validators=[InputRequired()])

# # DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
# class NewSongForPlaylistForm(FlaskForm):
#     """Form for adding a song to playlist."""

#     song = SelectField('Song To Add', coerce=int)
