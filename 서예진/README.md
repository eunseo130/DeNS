# README
### 0120 (목)

회원가입 & 로그인 & 이메일 본인인증 & 비밀번호 변경 코드 합친 후 git에 push
git에 대한 전반적인 이해와 공부


### 0119 (수)

회원가입 시, 이메일 인증을 통하여 회원가입

- 회원가입 폼을 통하여 자신의 정보를 보내면, 서버에서 인증이메일 발송
    - name을 기준으로 메일 보내기때문에 name중복 불가능 처리??
- 가입하려고하는 사람은 이메일의 링크를 누르면 바로 본인인증 완료
- User테이블의 identity가 1(회원)으로 바뀌면서 로그인 가능

회원가입 폼 작성 후, 이메일 인증 전 identity는 0(비회원)
- ![Untitled](/uploads/323c05095f537aa846a3927744f7b772/Untitled.png)
폼으로 적었던 이메일로 인증메일 발송
- ![Untitled__1_](/uploads/7547523cc68b0eef1db3f71d4d9e3a8a/Untitled__1_.png)
링크 클릭 후 identity는 1(회원)로 업데이트
- ![Untitled__2_](/uploads/3798bafaf6d53fd7b20056aaaf73025e/Untitled__2_.png)

### 0119 (수)

회원가입 시, 이메일 인증을 통하여 회원가입

- 회원가입 폼을 통하여 자신의 정보를 보내면, 서버에서 인증이메일 발송
    - name을 기준으로 메일 보내기때문에 name중복 불가능 처리??
- 가입하려고하는 사람은 이메일의 링크를 누르면 바로 본인인증 완료
- User테이블의 identity가 1(회원)으로 바뀌면서 로그인 가능

회원가입 폼 작성 후, 이메일 인증 전 identity는 0(비회원)
![Untitled](/uploads/323c05095f537aa846a3927744f7b772/Untitled.png)
폼으로 적었던 이메일로 인증메일 발송
![Untitled__1_](/uploads/7547523cc68b0eef1db3f71d4d9e3a8a/Untitled__1_.png)
링크 클릭 후 identity는 1(회원)로 업데이트
![Untitled__2_](/uploads/3798bafaf6d53fd7b20056aaaf73025e/Untitled__2_.png)

### 0118 (화)

- IDE 인텔리제이로 변경
- Postman으로 데이터 전송 (회원가입, 로그인 데이터 확인)
- 회원가입 이메일 인증 기능 시작 

### 0117 (월)

- 테이블 관계 정립
- JDK관련 IDE 환경변수 재설정
- 로그인 & 회원가입 기능 시작

- 비회원(로그인X)
    - 회원가입
        - 이메일 입력
            - 이메일 중복 체크
            - 이메일 형식 체크
            - 이메일 인증
        - 이름
            - 4자 ~ 10자 사이(미정)
        - 비밀번호
            - 비밀번호 재확인
            - 숫자, 문자, 특수문자 각 1개씩 포함 8~16자 사이(미정)
    - 로그인
        - 아이디 입력
        - 비밀번호 입력
        - 아이디 / 비밀번호 체크
            - 성공 시 로그인
            - 실패 시 경고 알림

- 회원(로그인O)
    - 회원 수정
        - 이름 수정
        - 비밀번호수정
        - 이메일 수정
    - 회원 탈퇴
        - 회원 탈퇴 버튼을 누른다
        - 진짜 탈퇴할 건지 경고 메세지를 출력한다
        - 확인을 누르면 회원 삭제
        - 취소를 누르면 유지
    - 마이페이지
        - 회원의 정보를 확인할 수 있다.

  채널 관리자 페이지(일반 유저가 채널관리자가 될 때, 권한 부임 & 기능 등 생각)

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

