import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import TeamLinkBox from "./TeamLinkBox";
import { myteam } from '../../api/team';
import { store } from "../..";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

function TeamLink() {

    const profileId = store.getState().user.profileid;
    
    const token = store.getState().user.token;
    const [link, setLink] = useState([]);
    const [data, setData] = useState(null);
    const authAxios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
          Authorization: `Bearer "${token}"`,
          withCredentials : true,
      }
    })
    
    useEffect(() => {
      authAxios.get(`/team/myteam/${profileId}`).then((response) => {
        setLink(response.data);
      }).catch();
    }, []);
    

    const settings = {
      dots: true,
      infinite: false,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    const SliderStyle = {
      display: "flex",
    };
    
  return (

    <Container>

      <LinkTitle>팀 링크</LinkTitle>

      <Slider {...settings} style={SliderStyle}>
        <TeamLinkBox title={"내 프로필"}/>
          {link ? link.map((el, key) => {
                      return (
                          <TeamLinkBox 
                            title={el.title}
                            team_id={el.team_id}
                            key={key}/>
                      )})
          : null }
      </Slider>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(244,106,114,1);
  margin-bottom: 10px;
  margin-left: 9px;
`;

export default TeamLink;
