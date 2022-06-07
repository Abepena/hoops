import React from "react";
import { TextInput } from "./Fields";

function UserInfoForm() {
  return (
    <>
      <section className="user-info">
        <div className="grid grid-flow-col grid-cols-2 gap-6 mb-2">
          <TextInput
            type="text"
            label="First Name"
            name="firstName"
            placeholder="John"
            className="input input-bordered"
          />
          <TextInput
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            className="input input-bordered"
          />
        </div>
        <div className="grid gap-2 mb-4">
          <TextInput
            type="email"
            label="Email"
            name="email"
            placeholder="john.doe@example.com"
            className="input input-bordered"
          />
          <TextInput
            type="phone"
            label="Phone Number"
            name="phone"
            placeholder="800-500-5555"
            className="input input-bordered"
          />
        </div>
        <div className="flex justify-between mb-4 ">
          <button
            onClick={() => alert(`TODO: Add Guest to order`)}
            className="btn btn-ghost"
          >
            Add guest +
          </button>
          <button
            type="submit"
            //   onClick={() => alert(`TODO: increase step`)}
            className="btn btn-success flex items-center justify-self-end"
          >
            <span className="mr-2">Next</span>
            <i className="fa-solid fa-arrow-right text-lg"></i>
          </button>
        </div>
      </section>
    </>
  );
}

export default UserInfoForm;
