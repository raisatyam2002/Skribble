import React from "react";
import { useEffect, useState } from "react";

export const UsersCard = ({ users }: any) => {
  const userItemHeight = 60; // height for each user item in pixels
  const listHeight = users.length * userItemHeight;

  const postions = [
    {
      x: "200%",
      y: "1000%",
    },
    {
      x: "800%",
      y: "800%",
    },
    {
      x: "200%",
      y: "0%",
    },
    {
      x: "800%",
      y: "1000%",
    },
    {
      x: "600%",
      y: "900%",
    },
    {
      x: "900%",
      y: "800%",
    },
  ];
  return (
    <div
      className="bg-white rounded-sm UserCard"
      style={{
        height: `${listHeight}px`,
        overflowY: "auto",
        width: "180px",
      }}
    >
      <ul className="UserCard">
        {users.map((user: any, index: any) => (
          <li key={index} className="flex gap-2 justify-between border-2 h-12 ">
            {index + 1} {user}
            <div className="face w-1/2">
              <div
                className="color"
                style={{
                  backgroundPosition: `${postions[index].x} ${postions[index].y}`,
                }}
              ></div>
              <div
                className="eyes"
                style={{
                  backgroundPosition: `${postions[index].x} ${postions[index].y}`,
                }}
              ></div>
              <div
                className="mouth"
                style={{
                  backgroundPosition: `${postions[index].x} ${postions[index].y}`,
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
