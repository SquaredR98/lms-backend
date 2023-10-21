import React, { useState } from "react";
import menuItem from "../constants/menuItem";
import { useSelector, useDispatch } from 'react-redux'
import { setIndex } from "../store/sidebar/slice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { menuActiveIndex, subMenuActiveIndex } = useSelector(state => state.sidebar);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleClick = (menuItem, index, el) => {
    if (menuActiveIndex !== index) {
      dispatch(setIndex({menuItem, index}))
      navigateTo(el?.url || el?.subMenu[0]?.url);
    } else if (subMenuActiveIndex !== index) {
      dispatch(setIndex({menuItem, index}));
      navigateTo(el?.url);
    }
  };
  return (
    <div className="bg-indigo-950 h-screen lg:w-3/12 xl:w-2/12">
      <div className="flex items-center py-2">
        <p className="text-white text-2xl mx-2 px-2 py-2 border-b w-full">
          Back Office
        </p>
      </div>
      <ul>
        {menuItem.map((el, idx) => (
          <React.Fragment key={idx}>
            <li
              className={`px-2 py-2 flex items-center hover:cursor-pointer hover:bg-blue-300 hover:text-black transition-all duration-300 ease-in-out ${
                menuActiveIndex === idx
                  ? "bg-blue-300 text-black"
                  : "text-white"
              }`}
              onClick={() => handleClick('menu', idx, el)}
            >
              <el.icon className="text-xl mr-2" />
              {el.name}
            </li>
            {menuActiveIndex === idx && el?.subMenu && (
              <ul className="bg-blue-300 py-2">
                {el?.subMenu?.map((menu, indx) => (
                  <li
                    className={`transition-all mx-2 my-2 duration-500 ease-in-out pl-9 py-2 hover:bg-blue-200 hover:cursor-pointer ${
                      subMenuActiveIndex === indx ? 'bg-blue-200 shadow-md' : ''
                    } `}
                    onClick={() => handleClick('subMenu', indx, menu)}
                    key={indx}
                  >
                    {menu.name}
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
