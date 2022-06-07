import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import EventRegisterForm from "components/Forms/EventRegisterForm";

const stripePromise = loadStripe("pk_test_p4TrzUQEu2nYIDv5yMoTH8iQ");

function EventRegisterModal({ cost }) {
  return (
    <div className="">
      <input type="checkbox" id="event-signup-modal" class="modal-toggle" />
      <label htmlFor="event-signup-modal" class="modal cursor-pointer">
        <label class="modal-box relative" htmlFor="">
          {/* Modal Steps */}

          {/* User Info + Guest Section */}
          <EventRegisterForm />
         


        </label>
      </label>
    </div>
  );
}

export default EventRegisterModal;
