import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "components/Forms/CheckoutForm";
import axios from "axios";

// const stripePromise = loadStripe("pk_test_p4TrzUQEu2nYIDv5yMoTH8iQ");
// const { clientSecret } = await axios.post(
//   "/api/secret",
//   { amount: cost },
//   {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   }
// ).data;
function EventRegisterModal({ cost }) {
  return (
    <div>
      <input type="checkbox" id="event-signup-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Modal Steps */}
          <ul className="steps w-full mx-auto">
            <li className="step step-success">Register</li>
            <li className="step step-success">Waiver</li>
            <li className="step">Confirm and Pay</li>
          </ul>
          {/* User Info + Guest Section */}
          <form className="mb-4 border-b border-neutral-content">
            <div className="grid grid-flow-col grid-cols-2 gap-6 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="grid gap-2 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="phone"
                  placeholder="800-555-5555"
                  className="input input-bordered"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-between mb-4 ">
            <button
              onClick={() => alert(`TODO: Add Guest to order`)}
              className="btn btn-ghost"
            >
              Add guest +
            </button>
            <button
              onClick={() => alert(`TODO: increase step`)}
              className="btn btn-success flex items-center justify-self-end"
            >
              <span className="mr-2">Next</span>
              <i className="fa-solid fa-arrow-right text-lg"></i>
            </button>
          </div>

          {/* Waiver Section */}
          <section className="waiver h-screen w-full bg-white text-neutral">
            <p className="waiver-content ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Mollitia, odio! Rem similique debitis quam, sint possimus aliquid
              sit, ipsam ullam omnis nam itaque quibusdam, recusandae fuga
              veritatis facilis aperiam inventore ab nihil nobis? Dolorem
              corporis libero dignissimos quisquam itaque nemo adipisci
              excepturi vitae similique? Quis incidunt, necessitatibus,
              architecto atque reprehenderit ex aperiam voluptatem quas harum,
              perspiciatis consequuntur possimus iure! Sed aperiam quo veritatis
              veniam itaque dolores expedita delectus, natus harum
              exercitationem voluptates inventore obcaecati repellendus eos
              ratione suscipit ea blanditiis provident non est iure a, mollitia
              quam. Iure, mollitia nobis. Laborum nulla quisquam unde quia autem
              sit, incidunt dolore neque nihil ad mollitia inventore error!
              Cupiditate aliquid ex debitis vitae et, cum ullam mollitia totam
              veritatis, dolore recusandae corporis reiciendis quas, iste quia
              molestias accusamus fugit quaerat officiis ratione similique!
              Voluptatem distinctio, consectetur quisquam rem rerum quasi
              laborum quae dicta reprehenderit ipsam omnis veritatis sequi nulla
              ex expedita possimus aspernatur vitae maxime exercitationem, amet
              pariatur magni eum! Consequuntur voluptatibus similique
              praesentium deserunt placeat possimus a amet sapiente unde enim
              dicta dolorem cupiditate, libero eaque vitae quia? Aspernatur
              facere, doloribus obcaecati sapiente earum error nemo veniam quasi
              voluptates, aut ullam iste recusandae corrupti in!
            </p>
          </section>
          {/* Confirmation / Payment  Section */}
          {/* <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements> */}
          <div className="modal-action">
            <label htmlFor="event-signup-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventRegisterModal;
