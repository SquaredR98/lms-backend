import React from "react";
import { FcDeleteRow, FcEditImage } from 'react-icons/fc';


export default function Table({ headers, data }) {
  return (
    <table className="rounded-md w-full shadow-md my-10">
      <thead className="">
        <tr className="bg-blue-200">
          <th className="w-8 text-left px-4 py-2 rounded-tl-md">#</th>
          {headers.map((el, idx) => (
            <th className="text-left px-4" key={idx}>
              {el}
            </th>
          ))}
          <th className="w-8 text-left px-4 py-2 rounded-tr-md">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, idx) => (
          <tr key={idx} className="h-4 hover:bg-blue-50 transition-all duration-200 ease-linear border last:border-b-0">
            <td className="w-8 p-4">{idx + 1}</td>
            {Object.entries(el).map(([key, value], indx) => (
              <td className="p-4" key={key}>
                {value}
              </td>
            ))}
            <td className="flex">
              <FcEditImage className="text-2xl hover:cursor-pointer mx-2" />
              <FcDeleteRow className="text-2xl hover:cursor-pointer mx-2" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
