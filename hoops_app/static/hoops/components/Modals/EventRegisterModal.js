import React from "react";

function EventRegisterModal() {
  return (
    <>
      <input type="checkbox" id="event-signup-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* User Form */}
          <form>
            <div className=" border grid grid-flow-col grid-cols-2 gap-6 border-b mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  class="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  class="input input-bordered"
                />
              </div>
            </div>
            <div className="grid gap-2">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  class="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="phone"
                  placeholder="800-555-5555"
                  class="input input-bordered"
                />
              </div>
            </div>
          </form>

          {/* Waiver Form */}
          <section className="waiver h-screen w-full bg-white">
            <div className="waiver-content "></div>
          </section>

          <div className="modal-action">
            <label htmlFor="event-signup-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventRegisterModal;
