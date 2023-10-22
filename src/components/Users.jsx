import React, { useState } from "react";
import Table from "../components/Table";
import { headers, userData } from "../constants/usersData";
import { GrAddCircle } from "react-icons/gr";
import AddUser from "../components/AddUser";

export default function Users() {
  const [addOrUpdateUser, setAddOrUpdateUser] = useState(null);
  const handleClick = (type) => {
    if (addOrUpdateUser !== null) setAddOrUpdateUser(null);
    else setAddOrUpdateUser(type);
  };
  return (
    <React.Fragment>
      <div className="my-4 flex justify-end">
        <button
          onClick={() => handleClick("add-user")}
          className="transition-all duration-200 flex items-center px-4 py-2 bg-blue-300 rounded hover:bg-blue-300/80"
        >
          <GrAddCircle className="text-xl mr-2" /> Add User
        </button>
      </div>
      <div
        className={`grid ${
          addOrUpdateUser !== null ? "lg:grid-cols-2 xl:grid-cols-3 gap-4" : ""
        }`}
      >
        <div className={`col-span-2 transition-all duration-300 ease-in-out`}>
          <Table headers={headers} data={userData} />
        </div>
        {addOrUpdateUser && (
          <div className="col-span-1">
            <AddUser />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
