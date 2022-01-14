# README

[toc]

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
