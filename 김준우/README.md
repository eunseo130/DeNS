# README

[toc]


### 0119 (수) 진행사항

| 변경 사항                                   |
| ------------------------------------------- |
| :white_check_mark: jwt 발급 기능 구현 |
| :white_check_mark: 회원가입 시 이메일 인증 기능 구현      |
| :white_check_mark: 비밀번호 변경 기능 구현      |

## jwt 기능 구현 결과
    
  - 웹페이지(임시페이지) 결과

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5aee54e-126c-4517-825e-890e4c32d0fb/Untitled.png)

  - 토큰 발급 확인
      
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3518b9d2-4e2e-41db-aec5-b44dd154bce8/Untitled.png)
          
    
  - 코드

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4adb3522-a60e-43ba-b3c1-8fd35b15992e/Untitled.png)

<hr>

## 이메일 인증 기능 구현 (서예진)

  -  회원가입 시, 이메일 인증을 통하여 회원가입 

  - 회원가입 폼을 통하여 자신의 정보를 보내면, 서버에서 인증이메일 발송

  - name을 기준으로 메일 보내기때문에 name중복 불가능 처리??

  - 가입하려고하는 사람은 이메일의 링크를 누르면 바로 본인인증 완료
  - User테이블의 identity가 1(회원)으로 바뀌면서 로그인 가능

  회원가입 폼 작성 후, 이메일 인증 전 identity는 0(비회원)

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dda68bec-dd1d-4eb2-90a7-ad49e9a39c4d/Untitled.png)

  폼으로 적었던 이메일로 인증메일 발송

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e822458-667d-482a-b33a-2503da023065/Untitled.png)

  링크 클릭 후 identity는 1(회원)로 업데이트

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/614d5789-470d-4ced-986f-b2f240e9eaac/Untitled.png)

<hr>

## 비밀번호 변경 기능 구현 (김은서)
    
  -
    
  ![비밀번호 변경.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1743e732-7d4c-4cba-bd62-ae03acd55c3e/비밀번호_변경.png)
    
  ![비밀번호 db.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0730f9fa-be42-4ab8-8d70-c03bf5afdec3/비밀번호_db.png)
    
- 추가로 해야할 일 : 비밀번호 변경 메일 보내기

<hr>

<hr>

### 0118 (화) 진행사항

| 변경 사항                                   |
| ------------------------------------------- |
| :white_check_mark: 로그인 기능 구현 |
| :white_check_mark: jwt 학습 및 기능 구현       |

## JWT란? (Json Web Token)

![https://media.vlpt.us/images/ehdrms2034/post/86436c80-4b84-4581-85be-de8c013c22e0/image.png](https://media.vlpt.us/images/ehdrms2034/post/86436c80-4b84-4581-85be-de8c013c22e0/image.png)

이름 그대로 JSON을 이용한 Web Token 입니다. 주로 서비스에 대한 인증이나 CSRF 토큰등에 사용될 수 있겠지요. 이런 JWT는 위와 같은 구조를 가집니다.

- Header : 이 JWT가 어떤 방식으로, 어떤 알고리즘을 사용하여 토큰화 했는지 명시
- Payload : 토큰에 사용자가 담고자 하는 정보를 담는 곳
- Signature : 위 토큰이 유효한지 유효하지 않은지에 대한 정보를 가짐. 암호화에 사용되는 키 값은 서버에 저장해놓는다. 그리고 발행된 JWT 값이 서버에 들어왔을 때 두 값을 비교해서 올바른 JWT 토큰이 맞는지 확인한다.


#jwt 흐름도 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3053c2d9-7375-42d4-bfee-2d48ac7c6b56/Untitled.png)

출처 : [https://velog.io/@ehdrms2034/Spring-Security-JWT-Redis를-통한-회원인증허가-구현](https://velog.io/@ehdrms2034/Spring-Security-JWT-Redis%EB%A5%BC-%ED%86%B5%ED%95%9C-%ED%9A%8C%EC%9B%90%EC%9D%B8%EC%A6%9D%ED%97%88%EA%B0%80-%EA%B5%AC%ED%98%84)

<hr>

#jwt 주입 하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73007e64-6190-4361-80cc-8917990516ba/Untitled.png)

#jwt 기본 클래스 만들기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd4290cc-7b6a-4887-b198-43988560211f/Untitled.png)


<hr>

<hr>


### 0117 (월) 진행사항

| 변경 사항                                   |
| ------------------------------------------- |
| :white_check_mark: 기본 기능 구현 |
| :white_check_mark: 백엔드 코드 컨벤션       |

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

<hr>

- 기능 구현
  -로그인 테스트

  ![데이터 보내기.JPG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3b3152cb-fbe9-44e8-ba01-31177d568652/데이터_보내기.jpg)

  -데이터 확인
  ![로그인 데이터받아오기 테스트.JPG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9de1cb5d-01a7-4018-9543-b5d9f83692e7/로그인_데이터받아오기_테스트.jpg)

<hr>


### 0114 (금) 진행사항

| 변경 사항                                   |
| ------------------------------------------- |
| :white_check_mark: ERD 다이어그램 최종 설계 |
| :white_check_mark: 백엔드 코드 컨벤션       |

- 0113(목)에 진행한 관계도를 기반으로 ERD 다이어그램 최종 설계

<hr>

![erd_다이어그램](/uploads/204e7e33d68019a97a890137a8856560/erd_다이어그램.PNG)

<hr>

- 백엔드 코드 컨벤션

<hr>

테이블 필드 명을 변수이름을 똑같이, 테이블명, 변수명 쓸 때

-**스네이크표기법**으로 무조건 소문자 (user_id, team_id)

함수, 메서드, 클래스를 만들게 되면

-**카멜 표기법**으로 접두사 소문자 시작 다음 단어부터 단어의 첫 글자만 대문자 (findById)

<hr>

<hr>

### 0113 (목) 진행사항

| 변경 사항                             |
| ------------------------------------- |
| :white_check_mark: 기능별 흐름도 작성 |

- 기능별로 필요한 데이터 정리

<hr>

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

<hr>

- 정리된 데이터를 바탕으로 흐름관계도 작성

<hr>

![Image_Pasted_at_2022-1-13_16-24](/uploads/bc76f2d4e3953d04d28b51c746c60828/Image_Pasted_at_2022-1-13_16-24.png)

<hr>

<hr>

### 0112 (수) 진행사항

| 변경 사항                                      |
| ---------------------------------------------- |
| :white_check_mark: ERD 다이어그램 수정 및 보완 |
| :white_check_mark: NoSQL 사전학습              |

- MongoDB 학습

<hr>

1. MongDB 쉘 명령어 환경 만들기

![1](/uploads/d6f74e228da1fe9f63e38bc8b3857d23/1.png)

2. books 컬렉션 추가하기

![2](/uploads/845e34fbe96e2bb32e2dbb10160ef58d/2.png)

3. books에 데이터 insert 하기

![3](/uploads/c8941bd69a0dc097fe48f73dfd880d5c/3.png)

4. insert한 데이터 찾기

![4](/uploads/3c86ab909b2ec8b4c76c44dbb5d5893e/4.png)

<hr>

- ERD 수정 및 보완

<hr>

![erd2](/uploads/4b7571a966ae805e8892fd862043d0fe/erd2.png)

<hr>

- NoSQL 설계 하기

<hr>

![nosql](/uploads/19934370ddf48db6966fa1f08fb19567/nosql.png)

<hr>

<hr>

### 0111 (화) 진행사항

| 변경 사항                                                    |
| ------------------------------------------------------------ |
| :white_check_mark: 서비스 범위를 싸피에서 특정 소속으로 확장 |

- 주제

<hr>

특정 소속의 팀을 구성하기 위한 SNS 서비스(ex, 학교, 싸피, 팀프로젝트)

<hr>

- 개요

<hr>
어느 조직에 소속한 사람들이 프로젝트를 진행하기전 팀 or 스터디 팀원을 구성할 때 다른 외부 매체를 통해 연락을 주고 받음. 표준화된 매체가 없어 상대방과의 커뮤니케이션이 부족함을 인지함.

<hr>

- 설명

<hr>

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
<hr>

### 0110 (월) 진행사항

<hr>

- ToDo List 만들기

| 사용 기술                 |
| ------------------------- |
| :white_check_mark: Notion |

1. 로그인 기능
2. 회원 관리
3. Page Not Found 페이지
4. Error 페이지
5. 계정 설정
6. 유저 페이지
7. 팔로우 기능
8. 알림 센터
9. 헤더 및 네비게이션
10. 검색 기능
11. 뉴스피드 기능
12. 댓글 기능
13. 유저 페이지(추가)
14. 큐레이션 세트 설정
15. 게시글 큐레이션
16. 큐레이션 리스트
17. 트렌드

<hr>

- ERD 다이어그램 설계

| 사용 기술                    |
| ---------------------------- |
| :white_check_mark: ERD Cloud |

- 작성내용
- User 테이블
- Profile 테이블
- Team 테이블
- Team Meber 테이블
- Schedule 테이블
- Alert 테이블
- Skill 테이블
- Image 테이블
- Message 테이블
- Follow 테이블
- Article 테이블
- Like 테이블
- Scrap 테이블
- Comment 테이블
- Keyword 테이블
- Curation 테이블
<hr>

* 사진
<hr>
![erd](/uploads/df2b023d364774ef6feea0a717808cf5/erd.png)
