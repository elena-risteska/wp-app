"use client";

import Image from "next/image";
import React from "react";

import Logo from "../../public/logo.svg";

export default function Navbar() {
  return (
    <nav className="bg-stone-950 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between ml-28 p-4">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={Logo} className="h-8" alt="Logo" />
        </a>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li id="employees">
              <a
                href="/employees"
                className="block p-2 text-white hover:bg-stone-100 hover:text-black target:bg-stone target:text-black"
              >
                Employees
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block p-2 text-white hover:bg-stone-100 hover:text-black"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/logout"
                className="block p-2 text-white hover:bg-stone-100 hover:text-black"
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
