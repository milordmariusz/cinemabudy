import Link from "next/link";
import React from "react";
import { BiCameraMovie } from "react-icons/bi";
import { ModeToggle } from "./ModeToggle";

export default function NavBar() {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <div className="pointer-events-none flex place-items-center gap-2 p-8">
              <BiCameraMovie size={24} />
              <h1 className="font-bold">CinemaBudy</h1>
            </div>
          </li>
          <li className="p-8">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
