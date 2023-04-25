import React from "react";
import Slider from "react-slick";
//import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css";
import { dataPlaces } from './data';
import Image from "next/image";


function PlaceCards() {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <Slider {...settings}>
    {dataPlaces.map((item) => (
      <div className="card" key={item.id}>
        <div className="card-top">
          <Image src={''} alt={item.title} width={100} height={100}/>
          <h1>{item.title}</h1>
        </div>
        <div className="card-bottom">
          <h3>{item.description}</h3>
          <p>{item.rating}</p>
        </div>
      </div>
    ))}
    </Slider>
    </>
  )
}

export default PlaceCards;