import React from "react";
import styled from "styled-components";

export default function TeamListBox(props) {
    return (
        <Box>
            <TopBox>
                <TextBox>
                    <TopText>{props.content}</TopText>
                </TextBox>
            </TopBox>
            <Rect>
                <BotBox>
                    <BotText>{props.title}</BotText>
                    <BotText>#자바</BotText>
                </BotBox>
            </Rect>
        </Box>
    )
    
};
const TopBox = styled.div`
    height: 50%;
`
const TextBox = styled.div`
    display:flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`
const Box = styled.div`
    border-radius: 5px;
    box-shadow: 3px 3px 13px rgba(244,106,114,1);
    
    width: 70%;
    height: 20vh;
    position:relative;
    left: 50%;
    transform:translate(-50%);
`
const Rect = styled.div`
    height: 50%;
`
const TopText = styled.h3`
    font-size: 1em;
    position: relative;
`
const BotBox = styled.div`
    height: 100%;
    width: 100%;
    display:grid;
    grid-template-columns: 50% 50%;
`
const BotText = styled.h3`
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`