import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TeamList() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 350,
        slidesToShow: 2,
        slidesToScroll: 2
      };
    return (
        <div>
          <h1>hello</h1>
            <Slider {...settings}>
                
                <div>
                    <h3>hello mather father</h3>
                </div>
                <div>
                    <h3>hello</h3>
                </div>
                <div>
                    <h3>hello</h3>
                </div>
                
            </Slider>
        </div>
    );
}