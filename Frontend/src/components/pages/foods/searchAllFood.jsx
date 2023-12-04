import React, { useState } from "react";
import Foods from "./foods";
import { useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";

function SearchAllFood({ dark, setDark }) {
  const { searchQuery } = useSelector((state) => state.search);
  const { foods } = useSelector((state) => state.food);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const transformFood = () => {
    let sortedFood = foods;
    let query = searchQuery.toLowerCase();
    const results = sortedFood?.filter((item) => {
      const lowercaseItem = item.title.toLowerCase();
      return lowercaseItem.includes(query) || item.title.includes(query);
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return results?.slice(startIndex, endIndex);
  };
  return (
    <div id="search">
      <div
        id="Chicken"
        className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
      >
        <div className="container-fluid">
          <div className="row">
            {transformFood()?.map((item) => {
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
           <Pagination className="mt-5 mx-5">
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
            />
            <h5 className="px-4">{currentPage}</h5>
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) =>
                  Math.min(prevPage + 1, Math.ceil(foods.length / itemsPerPage))
                )
              }
            />
          </Pagination> 
        </div>
      </div>
    </div>
  );
}
export default SearchAllFood;
