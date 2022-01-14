# README

### 0114 (금)
- ERD 최종 완성

![Untitled](/uploads/cef9c7b6e23dfd480e30c88af498191a/Untitled.png)

### 0113 (목)
<hr>
- 기능별 테이블 설계 및 테이블 연결 관계 정립

- 회원관리
    - 회원가입
        - userid
        - email
        - username
        - password
        - admin(status)
    - 로그인
        - userid
        - password
        
- 검색
    - 검색 내용
        - team_name
        - user_name
        - hashtag
- 프로필
    - about
        - content
        - user_id
        - hashtag
    - image
        - image_id
        - image_name
    - skill
        - skill_name
        - skill_id
        - level
        
- 메세지
    - 메세지
        - message_id
        - content
        - time
        - date
        - type
        - user_id
    - 팀 요청
        - user_id
        - type
        - team_id
        - time
        - date
        - request_id
- 팀관리
    - 팀만들기
        - team_id
        - team_name
    - 팀 피드
        - title
        - content
        - regist_date
        - update_date
        - file
    - 팀 설정
        - team_id
        - team_name
        - team_intro
        - team_hashtag
        - team_icon(img)
        - user_id
        - user_name
    - 팀 멤버 관리
        - team_id
        - user_id
        - user_name
        - position
        - 
- 알림
    - 알림연결
        - message_id
        - alert_id
        - type
    - 알림내용
        - content
        - time

- ![Image_Pasted_at_2022-1-13_16-24](/uploads/983447d2bce3db00291b9ecbf0520eae/Image_Pasted_at_2022-1-13_16-24.png)

### 0112 (수)
<hr>

- 전날 회의결과를 바탕으로 관계형데이터베이스 ERD 수정 및 보완
- ![Copy_of_Copy_of_ERD](/uploads/f9c73684ee7f0c64b5f8190d86cdd96a/Copy_of_Copy_of_ERD.png)
- 프로필테이블 부분이 noSQL로 하는 것이 좋을 것이라 생각하여 noSQL 공부
- 프로필 부분 noSQL 모델링
- ![Image_Pasted_at_2022-1-12_17-40](/uploads/c1054c094b32f697aa2943238b20c88d/Image_Pasted_at_2022-1-12_17-40.png)

* noSQL 공부 & noSQL과 관계형데이터베이스 같이 사용할 수 있는지
### 0111 (화)
<hr>

- 주제

 특정 소속의 팀 구성을 위한 SNS 서비스(ex, 학교, 싸피, 팀프로젝트)

- 개요

**어느 조직**에 소속한 사람들이 프로젝트를 진행하기전 팀 or 스터디 팀원을 구성할 때 다른 외부 매체를 통해 연락을 주고 받음. 표준화된 매체가 없어 상대방과의 커뮤니케이션이 부족함을 인지함.

- 설명

각종 목적에 맞는 팀 구성을 위한 조직 표준화 SNS/커뮤니티를 개발. 

서버를 관리하는 관리자를 통해서 채널을 참가할 수 있음.

사용자는 해당 채널에서 팀 구성을 원활하게 할 수 있음.

URL을 통해서 소속에 참가하게 되면 팀을 구성할수있게됨.

소속 > 팀(ZOI) > 개인

배경을 변경할수있다 테마 같은 느낌

→ UI쪽에서 다시 의논하기로

팀 카드를 클릭시 팀에 대한 정보가 표시된다.(팀원 정보 표시)

사람 카드를 클릭시 사람에 대한 정보가 표시된다. (관련 팀원들도 표시됨)

채팅, 프로필에 중점을 둬야한다.

개인정보는 이름 이메일 비밀번호 이상으론 없음.

웹을 기본으로 생각하고 진행

<hr>


### 0110 (월)

<hr>

- TO do list 작성

- 명세서 기반 & 프로젝트 주요 기능을 바탕으로 ERD 작성

<hr>
![ERD](/uploads/015efcc4e98df4cac26715a59306499f/ERD.png)

