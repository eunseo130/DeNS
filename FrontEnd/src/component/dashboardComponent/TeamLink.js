import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import TeamLinkBox from "./TeamLinkBox";
import { myteam } from '../../api/team';
import { store } from "../..";

function TeamLink() {

    const profileId = store.getState().user.profileid;

    const [link, setLink] = useState('');
    useEffect(() => {
      myTeamLookup();
    }, []);
    
  const myTeamLookup = () => {
    myteam(profileId,
      (response) => {
          // console.log(response);
          
          setLink(response.data);
          // window.location.replace(`/auth/dashboard/`);
    },  
    (error) => {
        console.log("오류가 됨.", (error));
    });

  }
  
  
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
