import React, { useState } from "react";
import AllFood from "./components/Header/allFood";
import CarouselEffect from "./components/Header/CarouselEffect";
import SubHeader from "./components/SubHeader/SubHeader"

const Home = ( { dark, setDark}) => {
  const [foodType, ritik] = useState("all");

  function filterFood(x) {
    ritik(x);
  }

  return (
    <div>
      <CarouselEffect  dark={dark} setDark={setDark} />
      <SubHeader  filterFood={filterFood}  />
      <AllFood foodType={foodType} dark={dark} setDark={setDark}  />
    </div>
  );
};

export default Home;
