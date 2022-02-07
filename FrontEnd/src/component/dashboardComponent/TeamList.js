import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamListBox from "./TeamListBox";
import { team } from '../../api/test';

export default function TeamList() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 200,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    const [info, setInfo] = useState('');
    
    useEffect(() => {
        team(
            (response) => {
                setInfo(response.data);
        },  
        (error) => {
            console.log("오류가 됨.", (error));
        });
    });

    return (
        <div>
          <Title>최근에 본 팀</Title>
            <Slider {...settings}>

                {info ? info.map((el, key) => {
                    return (
                        <TeamListBox title={el.title} content={el.content} key={key}/>
                    )})
                : null }

            </Slider>
        </div>
    );
}
const Title = styled.h3`
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    color: rgba(244,106,114,1);
`