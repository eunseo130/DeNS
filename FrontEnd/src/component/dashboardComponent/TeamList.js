import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideBox from "./SlideBox";
import { team } from '../../api/test';

export default function TeamList() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 200,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        team(
            (response) => {
                setTitle(response.data[0].title);
                setContent(response.data[0].content);
                setInfo(response.data);
            // console.log(response.data);
            // console.log(info)
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
                        <SlideBox title={el.title} content={el.content} key={key}/>
                    )
                })
            : null }

            </Slider>
        </div>
    );
}
const Title = styled.h1`
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    color: rgba(244,106,114,1);
`