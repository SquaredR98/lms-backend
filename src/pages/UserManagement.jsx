import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";

const userData = [
  {
    name: "Andrew Mike",
    role: "Admin",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
  },
  {
    name: "Andrew Drake",
    role: "Sub Admin",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
  },
  {
    name: "Constantine Mike",
    role: "Sub Admin",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
  },
  {
    name: "Mike Durable",
    role: "Staff",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
  },
  {
    name: "Ravi Ranjan",
    role: "Admin",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
  },
];

const headers = ["Name", "Role", "Status", "Last Login"];

export default function UserManagement() {
  return (
    <Layout>
      <Table headers={headers} data={userData} />
    </Layout>
  );
}
