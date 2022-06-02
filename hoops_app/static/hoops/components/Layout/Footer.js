import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const date = new Date();
  return (
    <footer className="flex items-center justify-between bg-slate-200  min-h-[50px] mt-2 p-4">
      <div className="container mx-auto flex justify-between flex-col sm:flex-row gap-6">
        <section className="content flex items-center gap-4 info flex-col sm:flex-row">
          <h5>© {date.getFullYear()} - Pure Hoops</h5>
          <h5>
            <Link href="">
              <a>About</a>
            </Link>
          </h5>
          <h5>
            <Link href="">
              <a>Contact Us</a>
            </Link>
          </h5>
        </section>
        <section className="social icons flex items-center gap-8 self-center sm:self-auto">
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl" />
          </a>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
