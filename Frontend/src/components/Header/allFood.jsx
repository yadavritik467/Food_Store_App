import React, { useState } from "react";
import "../../App.css";

import { CartState } from "../../context/Context";
import Foods from "./foods";

function AllFood({  foodType, dark, setDark }) {
  const {
    state: { Food },
  
  } = CartState();

 
  
  return (
    <div id="search">
      {(  foodType === "all" || foodType === "Chicken") && (
        <div
          id="Chicken"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
          <h3 className="heading"> Chicken</h3>
          <div className="container-fluid">
            <div className="row">
              {Food.map((item) => {
                if (item.category === "Chicken")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}

      {(foodType === "Egg" || foodType === "all") && (
        <div
          id="Egg"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
          <h3 className="heading"> Egg</h3>
          <div className="container-fluid">
            <div className="row">
              {Food.map((item) => {
                if (item.category === "Egg")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}

      {(foodType === "Fish" || foodType === "all") && (
        <div
          id="Fish"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
          <h3 className="heading"> Fish</h3>
          <div className="container-fluid">
            <div className="row">
              {Food.map((item) => {
                if (item.category === "Fish")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}
      {(foodType === "SeaFood" || foodType === "all") && (
        <div
          id="SeaFood"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
          <h3 className="heading"> SeaFood</h3>
          <div className="container-fluid">
            <div className="row">
              {Food.map((item) => {
                if (item.category === "SeaFood")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}
      {(foodType === "Mutton" || foodType === "all") && (
        <div
          id="Mutton"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
          <h3 className="heading"> Mutton</h3>
          <div className="container-fluid">
            <div className="row">
              {Food.map((item) => {
                if (item.category === "Mutton")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllFood;
