import styled from "styled-components";

export default function TeamFeedIndex() {
    return (
        <IndexContainer>
            <Feed>
                우리 팀 스파르탄은 백엔드 개발자를 구하고 있습니다.  현재 프론트엔드 개발자 3명, 백엔드 개발자 2명으로 구성되어있고, 머신러닝과 AI를 기반으로한 영화 추천 서비스를 구현하고자 합니다. 
                사용하고 있는 기술은 다음과 같습니다.
                백엔드 : JAVA, SPRING
                프론트: REACT
                언제나 연락주시면 감사하겠습니다!
                {/* <HorizonLine/> */}
            </Feed>
            <Feed>
                우리 팀 스파르탄은 백엔드 개발자를 구하고 있습니다.  현재 프론트엔드 개발자 3명, 백엔드 개발자 2명으로 구성되어있고, 머신러닝과 AI를 기반으로한 영화 추천 서비스를 구현하고자 합니다. 
                사용하고 있는 기술은 다음과 같습니다.
                백엔드 : JAVA, SPRING
                프론트: REACT
                언제나 연락주시면 감사하겠습니다!
            </Feed>
            <Feed>
                Hello
            </Feed>
            <Feed>
                Hello
            </Feed>
        </IndexContainer>
    )
};

const IndexContainer = styled.div`
    position: relative;
    margin-top: 5%;
    left: 5%;
    width: 90%;
`
const Feed = styled.div`
    margin-top: 20px;
    width: 100%;
    word-break:break-all;
`
const HorizonLine = styled.span`
    margin: 10px 0 20px
    line-height: 0.1em;
    border-bottom: 1px solid #aaa;
    width: 100%;
    background: #fff;
`