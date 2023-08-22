import React from "react";
import "../../components/SubHeader/SubHeader.css";
import ReactGA from 'react-ga';

const SubHeader = ( { filterFood }) => {
  return (
    
      <div className="container ">
        <div className=" nav-list">
         

          

          <button id="all" onClick={() => filterFood("all")}> All</button>
          <button id="Chicken" onClick={() => filterFood("Chicken") & ReactGA.event({
        category: 'chicken',
        action: 'chicken',
        label: 'chicken',
      })}>
            Chicken
          </button>
          <button id="Fish" onClick={() => filterFood("Fish") & ReactGA.event({
        category: 'Fish',
        action: 'Fish',
        label: 'Fish',
      })}>
            Fish
          </button>
          <button id="Mutton" onClick={() => filterFood("Mutton") & ReactGA.event({
        category: ' Mutton',
        action: ' Mutton',
        label: ' Mutton',
      })}>
            Mutton
          </button>
          <button id="SeaFood" onClick={() => filterFood("SeaFood") & ReactGA.event({
        category: 'Sea Food',
        action: 'Sea Food',
        label: 'Sea Food',
      })}>
            Sea Food
          </button>
          <button id="Egg" onClick={() => filterFood("Egg") & ReactGA.event({
        category: 'egg',
        action: 'egg',
        label: 'egg',
      })}>
            Egg
          </button>
        </div>
      </div>
    
  );
};

export default SubHeader;
