import React from "react";

function Stepper() {
  return (
    <>
      {/* STEPPER */}
      <ul className="steps w-full mx-auto">
        <li className="step step-success">Register</li>
        <li className="step step-success">Waiver</li>
        <li className="step">Confirm and Pay</li>
      </ul>
    </>
  );
}

export default Stepper;
