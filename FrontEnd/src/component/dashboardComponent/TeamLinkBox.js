import React from "react";
import styled from "styled-components";

export default function TeamLinkBox(props) {
    return (
        <Box>
            <Title>{props.title}</Title>
        </Box>
    )
};

const Box = styled.div`
    border-radius: 5px;
    
    width: 20vh;
    height: 20vh;
    position:relative;
    left: 50%;
    transform:translate(-50%);

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 13px rgba(244,106,114,1);
`;
const Title = styled.h3`
    font-size: 1em;
`