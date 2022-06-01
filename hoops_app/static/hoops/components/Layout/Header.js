import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/basketball-ball-svgrepo-com.svg";
import { SearchIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";

function Header() {
  const [search, setSearch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };
  return (
    <header className="sticky bg-white top-0 z-50 grid grid-cols-3 shadow-md p-5 md:px-10">
      {/* Left  Logo */}
      <Link href="/">
        <a className="flex items-center h-10 cursor-pointer">
          <div className="h-12 w-12">
            <Image src={logo} alt="Logo" />
          </div>
          <h1 className="ml-2">| Pure Hoops</h1>
        </a>
      </Link>
      {/* Mid Search Bar*/}
      <form
        className="flex items-center border-2 rounded-full p-1"
        onSubmit={handleSubmit}
      >
        <input
          className="flex grow pl-4 sm:pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="">
          <SearchIcon
            onClick={handleSubmit}
            className="hidden md:inline bg-red-400 p-1 rounded-full h-6 text-white cursor-pointer"
          />
        </button>
      </form>
      {/* Right Icons*/}
      <div className="flex space-x-4 justify-end">
        <form className="flex items-center" action="">
          <button className="hidden sm:inline-flex">Logout</button>
        </form>
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6 text-gray-500" />
        </div>
      </div>
    </header>
  );
}

export default Header;
