import React from "react";
import SVGAvatar from "../assets/avatar.svg";

export default function Header({ title }) {
  return (
    <div className="flex justify-between items-center bg-blue-200 py-2 px-8">
      {/* <input className="px-4 py-1 w-1/3 rounded-lg h-12" /> */}
      <h2 className="text-3xl font-bold">{title || 'UserManagement'}</h2>
      <div className="flex items-center border border-gray-500 rounded-md p-1 hover:cursor-pointer transition-all duration-200 ease-in-out">
        <img className="h-10" src={SVGAvatar} />
        <span className="ml-2">
          <p className="leading-3 text-xl font-bold text-gray-700">Super Admin</p>
          <p className="leading-3 mt-2 text-gray-600">Super Admin</p>
        </span>
      </div>
    </div>
  );
}
