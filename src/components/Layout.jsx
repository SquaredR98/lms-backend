import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { setTitle } from "../store/header/slice";
import menuItem from "../constants/menuItem";

export default function Layout({ children }) {
  const { title, profileInfo } = useSelector((state) => state.header);
  const { menuActiveIndex, subMenuActiveIndex } = useSelector(
    (state) => state.sidebar
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(menuItem[menuActiveIndex].name));
  }, [menuActiveIndex, subMenuActiveIndex]);

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="lg:w-9/12 xl:w-10/12">
        <Header title={title} profileInfo={profileInfo} />
        <div className="mx-8">{children}</div>
      </div>
    </div>
  );
}
