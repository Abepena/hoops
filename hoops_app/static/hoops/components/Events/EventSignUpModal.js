import Modal from "components/Modal";
import React from "react";
import costToString from "utils/costToString";

function EventSignUpModal({ event }) {
  return (
    <div className="mx-4 mb-4">
      <Modal
        text={`Sign Up${event.cost ? ` ${costToString(event.cost)}` : ""}`}
      ></Modal>
    </div>
  );
}

export default EventSignUpModal;
