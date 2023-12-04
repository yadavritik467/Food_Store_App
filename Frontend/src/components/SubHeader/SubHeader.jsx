import React from "react";
import "../../components/SubHeader/SubHeader.css";

const SubHeader = ({ filterFood }) => {
  return (
    <div className="container ">
      <div className=" nav-list">
        <button  onClick={() => filterFood("all")}>
          {" "}
          All
        </button>
        <button  onClick={() => filterFood("Chicken")}>
          Chicken
        </button>
        <button onClick={() => filterFood("Fish")}>
          Fish
        </button>
        <button onClick={() => filterFood("Mutton")}>
          Mutton
        </button>
        <button  onClick={() => filterFood("SeaFood")}>
          Sea Food
        </button>
        <button onClick={() => filterFood("Egg")}>
          Egg
        </button>
      </div>
    </div>
  );
};
export default SubHeader;