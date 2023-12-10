import React, { useState } from "react";
import AllFood from "./components/pages/foods/allFood";
import CarouselEffect from "./components/pages/carousel/CarouselEffect";
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
