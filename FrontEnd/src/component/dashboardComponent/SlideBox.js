import React from "react";
import styled from "styled-components";

export default function SlideBox(props) {
    return (
        <Box>
            <Rect>
                <TopText>{props.content}</TopText>
            </Rect>
            <Rect>
                <BotBox>
                    <BotText>{props.title}</BotText>
                    <BotText></BotText>
                </BotBox>
            </Rect>
        </Box>
    )
    
};

const Box = styled.div`
    border: 1px solid;
    border-radius: 5px;
    width: 70%;
    height: 10vh;
    position:relative;
    left: 50%;
    transform:translate(-50%);
`
const Rect = styled.div`
    height: 50%;
    display:grid;
    grid-template-rows: 50% 50%;
`
const TopText = styled.h3`
    font-size: 18px;
    position: relative;
    top: 50%;
`
const BotBox = styled.div`
    height: 100%;
    width: 100%;
    display:grid;
    grid-template-columns: 50% 50%;
`
const BotText = styled.h3`
    font-size: 24px;
    position: relative;
`