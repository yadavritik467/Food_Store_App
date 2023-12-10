import React, { useEffect } from "react";
import "./CaroEffect.css";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarousel } from "../../../redux/action/carouselAction";


function CarouselEffect({ dark }) {
 const {carousel}= useSelector((state)=>state.carousel)
const dispatch= useDispatch()
  useEffect(() => {
   if(carousel.length === 0){
    dispatch(getAllCarousel())
   }
  }, [dispatch,carousel]);
  return (
    <div>
      <Carousel className={`carouse ${!dark ? "carousel" : "carousel_1"}`}>
        {carousel.map((c) => {
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