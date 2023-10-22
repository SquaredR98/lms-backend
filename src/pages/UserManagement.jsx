import React, { useState } from "react";
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";

export default function UserManagement() {
  
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
