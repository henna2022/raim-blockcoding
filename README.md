# 라이미의 블록코딩 연구소 (Raimi's Block Coding Lab)

블록 코딩으로 **코딩과 파이썬**을 배우고, 직접 **게임**을 만들어 보는 체험형 웹앱입니다.
초등학교 고학년부터 성인까지, 코딩이 처음인 누구나 5~10분 안에 즐길 수 있어요.

> A hands-on web app where you learn coding & Python with block coding, and build your own game.
> For upper-elementary kids through adults — anyone new to coding can enjoy it in 5–10 minutes.

## 구성 (3 activities)

1. **🧠 코딩이 뭐예요? (퀴즈)** — O/X·4지선다 퀴즈로 코딩과 함수를 알아봐요. (카테고리: 코딩 기초 / 함수)
2. **🎮 게임 만들기 (블록코딩)** — 엔트리 스타일 블록으로 미로 속 라이미를 ⭐별까지 이동.
   - 초보자 모드(라이미가 단계별 안내) · 도전자 모드(혼자서 도전)
   - 블록이 실시간으로 **파이썬 코드**로 바뀌어요 (순차 · 방향 · 반복).
3. **🐍 파이썬 배우기** — 블록을 조립하면 출력창에 결과가 나오는 미니 인터프리터.
   - print · 변수 · 연산(+) · len() · for 반복 · if 조건 · max() (총 7문제, 알고리즘 학습)

## 특징

- 순수 **HTML / CSS / JavaScript** (빌드 도구·백엔드 없음), PWA(오프라인 지원)
- 한국어 / 영어 전환 (🌐)
- 키오스크 가로 화면(1340×800)에 비율 유지 자동 맞춤

## 실행 방법

ES 모듈을 쓰므로 로컬 서버로 열어야 합니다.

```bash
# 프로젝트 폴더에서
python3 -m http.server 8731
# 브라우저에서 http://localhost:8731 접속
```

## 폴더 구조

```
index.html          화면 구조 (인트로/홈/모드/게임/퀴즈/파이썬)
css/styles.css      디자인 (엔트리 스타일 블록 포함)
js/app.js           셸 · 화면 라우팅 · 언어 · 스케일
js/i18n.js          한/영 문구 + 퀴즈/문제 데이터
js/maze.js          미로 게임 엔진
js/quiz.js          퀴즈
js/pylab.js         파이썬 배우기 (블록 → 출력 시뮬레이션)
assets/             라이미 캐릭터 · 로고 · 아이콘
```

---

Created by **Juwon Lee · Seoul RAIM**
