import React from "react";
import "../../App.css";

import { CartState } from "../../context/Context";
import Foods from "./foods";

function SearchAllFood({dark, setDark}) {
  const {
    state: { Food },
    searchState: { searchQuery },
  
  } = CartState();
 

  const transformFood = () => { 
    let sortedFood = Food;
    let query = searchQuery.toLowerCase();
    const results = sortedFood.filter(item => {
      const lowercaseItem = item.title.toLowerCase();
      return lowercaseItem.includes(query) || item.title.includes(query);
    });
    
    return results;
  };
  console.log(transformFood.length);
  return (
    <div id="search">

        <div
          id="Chicken"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
         
          <div className="container-fluid">
            <div className="row">
              {transformFood().map((item) => {
                if (item.category === item.category)
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

    
    </div>
  );
}

export default SearchAllFood;
