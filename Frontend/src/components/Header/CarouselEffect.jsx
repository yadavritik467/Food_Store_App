import React, { useEffect, useState } from "react";
import "../Header/CaroEffect.css";
import Carousel from "react-bootstrap/Carousel";

import axios from "axios";
// import { Fade } from 'react-reveal';




function CarouselEffect({ dark }) {
  const [caro, setCaro] = useState([]);
//  const[load,setLoad] = useState(false)
  const getAllCarousel = async () => {
    // setLoad(true);
    const { data } = await axios.get("https://food-backend-zeta.vercel.app/caro/caro-get");
    // setLoad(false);
    if (data) {
      setCaro(data.caro);
    }
    // console.log(data.caro);
  };

  useEffect(() => {
    getAllCarousel();
  }, []);
  return (
    <div>
    
      <Carousel className={`carouse ${!dark ? "carousel" : "carousel_1"}`}>
        {caro.map((c) => {
          return (
            <Carousel.Item interval={1000} className=""  key={c._id}>

       
            <img className="img" src={c.image.URL} alt="First slide" />
        
              <Carousel.Caption className="caption1">
                <h3>{c.heading}</h3>
                <p>
                 {c.title}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel> <br /> <br />
      </div>
  );
}

export default CarouselEffect;
