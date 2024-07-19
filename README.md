<p align="center"><image alt="cubeit-intranet" width="800" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/42533041-556f-4c6b-b013-a9d4d9bdb956" align="center" style="border-radius: 20px" /></p>
<p align="center">  
 URL: https://dev-fe-1.github.io/idle-intranet-service/signin  
</p>

## 팀원소개

|                                                             **👑 이서윤**                                                              |                                                             **김다은**                                                              |                                                             **양해석**                                                              |                                                                  **김난아**                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/89791868?v=4" height=150 width=150> <br/> @seoyoonyi](https://github.com/seoyoonyi) | [<img src="https://avatars.githubusercontent.com/u/108856689?v=4" height=150 width=150> <br/> @devdeun](https://github.com/devdeun) | [<img src="https://avatars.githubusercontent.com/u/107895537?v=4" height=150 width=150> <br/> @HSjjs98](https://github.com/HSjjs98) | [<img src="https://avatars.githubusercontent.com/u/170427166?v=4" height=150 width=150> <br/> @nanafromjeju](https://github.com/nanafromjeju) |
|                                                   근무/휴가페이지 개발 <br> UI디자인                                                   |                                                   프로필페이지 개발<br> UI디자인                                                    |                                                 로그인페이지,<br> 구성원페이지 개발                                                 |                                                           홈페이지 개발<br> 디자인                                                            |

## 📌 설치 및 실행

자세한 내용은 [💻 프로젝트 실행 가이드](https://github.com/Dev-FE-1/idle-intranet-service/wiki/%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%A4%ED%96%89-%EA%B0%80%EC%9D%B4%EB%93%9C)를 참조하세요!

### 설치

```
npm install
```

### 서버 실행

```
npm run server
```

### 클라이언트 실행

```
npm run dev
```

## 프로젝트 소개

**효율적인 협업과 원활한 소통의 핵심 최적의 사내 인트라넷, Cube.IT Intranet Service**

> 가상의 IT 회사 Cube.IT의 인트라넷을 개발한 팀 **(mbt)idle**입니다!

 <img width="1728" alt="readme2" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/9e54190c-578a-47be-8277-4b9fa7395a46">

  <br>

### 작동화면

|                                                   로그인 페이지                                                   |                                                    홈 페이지                                                     |                                                   구성원 페이지                                                    |                                                    프로필 페이지                                                    |                                             근무/휴가 페이지                                             |
| :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| ![login](https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/4c89b097-c61e-4220-a3dd-14ce443cfa99) | ![home](https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/068c34bf-0b40-4bec-a981-1f227e4993bc) | ![member](https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/6adb74ee-7f73-4078-be8e-69463566ac71) | ![profile](https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/0cf7dc0f-16ab-4edb-bf7e-8747aef087a6) | ![mobile work:vacation](https://github.com/user-attachments/assets/ae6eaf3d-e104-4a54-b3b5-ca101580f28b) |

#### 로그인 페이지

- 서비스 접속 초기화면으로 로그인페이지가 나타납니다.
  - 로그인이 되어 있지 않은 경우 : 로그인 페이지
  - 로그인이 되어 있는 경우 : 인트라넷 홈 화면
- 사용자가 로그인 페이지에 접근하면 '로그인' 버튼은 비활성화 상태입니다.
- 사용자가 이메일이나 비밀번호를 잘못 입력하면 입력창에 유효성 검사가 진행되고 통과하지 못한 경우 에러문구가 입력창 하단에 표시됩니다.
- 이메일과 비밀번호를 양식에 맞게 올바르게 입력하면 '로그인' 버튼이 활성화됩니다.
- 이메일과 비밀번호가 기존에 가입된 정보와 일치하면 사용자는 관리자 또는 사용자에 맞는 페이지로 이동합니다.
- 이메일과 비밀번호가 일치하지 않으면 "로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다"라는 입력창 하단에 표시됩니다.

#### 홈 페이지

- 로그인 후 처음으로 보게 되는 페이지로, 사용자 맞춤형 대시보드를 제공합니다.
- 회사 내정보, 근무시간, 공지사항 등이 표시되어 중요한 정보를 한눈에 확인할 수 있습니다.
- 좌측 navbar 에는 주요 메뉴 접근을 위한 링크가 제공됩니다.

#### 구성원 페이지

- 회사의 모든 구성원을 확인할 수 있는 페이지입니다.
- 검색 기능을 활용하여 원하는 구성원의 이름으로 멤버를 쉽게 찾을 수 있습니다.
- 각 구성원의 이름을 클릭하면 해당 구성원의 상세 정보를 열람할 수 있습니다.
- 사용자의 역할에 따라, 관리자는 상세 정보를, 일반 사용자는 기본 정보만 볼 수 있습니다.

#### 근무/휴가 페이지

- 사용자의 근무 시간과 휴가를 관리하는 페이지입니다.
- 근무 시간 기록을 확인하고, 휴가 및 반차 신청을 진행할 수 있습니다.
- 또한, 이전에 신청한 휴가 내역도 확인 가능합니다.
- 사용자는 새로운 휴가 또는 반차만 신청할 수 있습니다.

#### 프로필 페이지

- 사용자 개인 정보 및 설정을 관리할 수 있는 페이지입니다.
- 프로필 사진, 인사 정보, 개인 및 고용 상세 정보를 확인 및 수정 가능합니다.
- 이번 주 근무 시간을 표시하고, 현재 시각과 근무 시간을 기록할 수 있는 도구를 제공합니다.
- 사용자의 현재 상태(온라인, 오프라인 등)를 확인할 수 있습니다.

### 타임라인

- 기획`(2024.06.10 ~ 2024.06.12)`: 전체적인 서비스 구상 및 컨셉 기획
- 디자인`(2024.06.13~2024.06.16)`: 기획 단계에서 제작한 와이어 프레임을 바탕으로 피그마로 디자인 작업
- 퍼블리싱`(2024.06.18~2024.06.24)`: 역할을 분담해 페이지별 퍼블리싱 작업 진행
- 기능 구현`(2024.06.24~2024.07.12)`: 공통 컴포넌트 작업 및 기능 구현 진행

<br>

## 🔨 기술스택

### Front

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=%3Chtml%3E&logoColor=white">

웹 페이지의 구조를 정의하고 콘텐츠를 배치하는 데 사용

<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=%3Ccss%3E&logoColor=white">

웹 페이지의 스타일링을 담당하여 사용자에게 시각적으로 일관된 디자인을 제공

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=%3CJavaScript%3E&logoColor=white">

웹 페이지의 동적 기능을 구현하고, 사용자 인터랙션을 처리하는 데 사용

### Back-end

<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=%3CNode.js%3E&logoColor=white">

비동기 I/O 및 이벤트 주도 아키텍쳐 설계에 적합한 node.js 사용

<img src="https://img.shields.io/badge/bcrypt-57BCAD?style=for-the-badge&logo=%3CNode.js%3E&logoColor=white">

단방향 해싱과 솔트를 활용하여 안전하고 신뢰성 있게 비밀번호를 저장하기 위해 bcrypt 사용

<img src="https://img.shields.io/badge/sqlite3-0072AA?style=for-the-badge&logo=%3Csqlite%3E&logoColor=white">

간단한 백엔드 요구 사항이 있는 프로젝트에 적합한 SQLite3를 데이터베이스로 사용

<img src="https://img.shields.io/badge/JWT-031B4E?style=for-the-badge&logo=%3Csqlite%3E&logoColor=white">

클라이언트와 서버 간에 보안정보를 안전하게 전달하기 위해 JWT 사용

### 브랜치전략

- **main, develop** 브랜치와 **feature** 보조 브랜치를 운용했습니다.
  - **main**: 배포 단계에서만 사용하는 브랜치
  - **develop**: 개발 단계에서 git-flow의 master 역할을 하는 브랜치
  - **Feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제
    - feature 브랜치 이름 규칙: `feature/기능명-issue번호`

**eslint, prettier, stylelint**

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에, CSS 스타일 관리는 stylelint에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

<br>

## 협업방식

**🗣️ 슬랙을 사용한 활발한 의사소통**

<img width="1054" alt="슬랙" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/f1104bbf-b6d8-4596-a3d2-0623207f775c">

프로젝트 진행 동안 활발한 의사소통을 유지하며 신속하고 효율적인 업무 처리가 가능했습니다.

**⏰ ZEP 회의 협업 진행**

<img width="156" alt="zep" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/8810e6ae-a8d8-4c65-a951-6d016b168e22">

매일 오후 2시부터 4시까지 정기적인 회의를 통해 진행 상황을 점검하고, 각 팀원의 역할을 분담하고 의견을 반영하여 프로젝트의 방향을 조율했습니다.

**📒 노션 회의록**

[6조 회의록](https://github.com/Dev-FE-1/idle-intranet-service/wiki)

회의록은 노션을 통해 관리하며, 모든 팀원이 쉽게 접근할 수 있도록 하였습니다.

**✍️ 피그마를 이용한 디자인**

<img width="1054" alt="피그마" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/9fe8f6a3-5f7f-4928-b1eb-b7b5301c5ac8">

피그마를 사용하여 프로젝트의 디자인을 협업했습니다. 팀원들은 실시간으로 디자인을 검토하고 수정할 수 있었으며, 이는 신속한 디자인 작업과 피드백을 가능하게 하였습니다.

**💬 깃허브를 사용한 Issue 관리와 PR 리뷰**

<img width="1054" alt="PR리뷰" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/f37d3ff1-10d0-479e-a717-814526c840a8">

![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Dev-FE-1/idle-intranet-service?color=73BBA3)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-closed/Dev-FE-1/idle-intranet-service?color=88D66C)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/Dev-FE-1/idle-intranet-service?color=B4E380)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-closed/Dev-FE-1/idle-intranet-service?color=F6FB7A)

팀원들은 서로의 코드를 검토하고, 개선할 점을 제안하며 프로젝트의 코드 품질을 높였습니다. 이를 통해 코드 통합 과정에서 발생할 수 있는 문제를 최소화하였습니다.

- 모든 브랜치에 2명 이상이 Approve를 해야 PR이 Merge될 수 있도록 설정하였습니다.
- 컨벤션 뿐만 아니라 로직 및 아키텍처 관점에서의 의견 공유도 활발히 진행하였습니다.
- 코드 리뷰를 꼼꼼히 진행하면서 팀원 모두가 프로젝트의 전반적인 코드를 이해하는데 도움이 되었습니다.

<br>

## 프로젝트 소감

<img width="1920" alt="소감" src="https://github.com/Dev-FE-1/idle-intranet-service/assets/170427166/4be38753-ab3e-4549-a65e-4ed4ef334b75">

<br>
