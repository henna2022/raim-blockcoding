// 라이미 블록코딩 연구소 — 한국어/영어 문구 (모든 한국어 안내문은 존댓말)
export const I18N = {
  ko: {
    appTitle: "라이미의 블록코딩 연구소",
    appSub: "코딩과 파이썬에 대해 차근차근 알아가봐요!",
    homeBtn: "🏠 처음으로",
    backToHome: "← 처음 화면으로",
    installApp: "📲 앱 설치",
    iosTitle: "홈 화면에 앱으로 추가하기",
    iosBody: "사파리 아래(또는 위)의 <b>공유 버튼 ⬆️</b>을 누르고,<br><b>'홈 화면에 추가'</b>를 선택하면 앱처럼 쓸 수 있어요!",
    iosClose: "알겠어요",

    introHi: "안녕하세요! 저는 코딩 친구 라이미예요 🤖",
    introTitle: "라이미와 함께 코딩을 배워봐요!",
    introBody: "블록을 <b>쏙쏙</b> 끼우면 그게 바로 코딩이에요!\n퀴즈로 코딩을 알아보고,\n직접 <b>게임</b>도 만들어 봐요.\n준비됐나요? 🚀",
    introStart: "좋아요, 시작할까요? 🚀",

    homeH1: "오늘은 뭘 해볼까요?",
    homeP: "번호 순서대로 하면 가장 좋아요. 골라 보세요! ✨",
    cardQuizTitle: "코딩이 뭐예요?",
    cardQuizDesc: "코딩과 파이썬이 무엇인지<br><b>O/X · 4지선다 퀴즈</b>로 알아봐요",
    cardQuizTag: "퀴즈 · 3분",
    cardGameTitle: "게임 만들기",
    cardGameDesc: "미로를 풀며 라이미를<br><b>블록</b>으로 움직여요",
    cardGameTag: "블록코딩 · 5분",
    cardPythonTitle: "파이썬 배우기",
    cardPythonDesc: "블록으로 <b>파이썬 문법</b>과<br>알고리즘을 익혀요",
    cardPythonTag: "문법 · 알고리즘",

    modeH1: "어떻게 도전할까요?",
    modeP: "라이미가 도와줄까요, 혼자 해볼까요? 🤔",
    modeBeginnerTitle: "초보자 모드",
    modeBeginnerDesc: "라이미가 <b>한 단계씩</b><br>알려줄게요",
    modeBeginnerTag: "라이미가 도와줘요 😊",
    modeChallengerTitle: "도전자 모드",
    modeChallengerDesc: "도움 없이 <b>스스로</b><br>미로를 풀어요",
    modeChallengerTag: "혼자서 척척! 💪",

    soonBody: "이 코너는 <b>곧</b> 만들어질 거예요! 🛠️",

    hatLabel: "시작하면",
    blkMove: "앞으로 가기",
    blkLeft: "왼쪽으로 돌기",
    blkRight: "오른쪽으로 돌기",
    blkRepeat: "반복",
    blkRepeatPre: "",
    blkRepeatPost: "번 반복하기",
    blkPrint: "출력하기",
    blkIfPre: "만약",
    blkIfPost: "이면",
    palTitle: "블록 보관함 — 끌어다 오른쪽에 놓아 보세요",
    wsTitle: "내 코드",
    emptyHint: "여기로 블록을 끌어다 놓아 보세요!\n위에서 아래 순서로 실행돼요.",
    bodyEmpty: "여기에 블록을 넣어 주세요",
    runBtn: "▶ 실행",
    resetBtn: "↺ 처음부터",
    pyHead: "파이썬 코드 — 블록이 이렇게 바뀌어요",
    guideGoal: "별까지 라이미를 데려가 주세요!",
    arrowLegend: "빨간 화살표는 라이미가 바라보는 방향이에요",

    toastEmpty: "블록을 넣고 ▶ 실행을 눌러 보세요!",
    toastBump: "앗! 벽에 부딪혔어요 😵\n코드를 고쳐 볼까요?",
    toastNotYet: "조금만 더예요!\n별까지 못 갔어요. 다시 해볼까요?",
    clearNext: "다음 미로 ▶",
    clearRetry: "다시 풀기",
    clearMenu: "처음으로",
    allClearTitle: "미로를 모두 깼어요! 🎉",
    allClearBody: "축하해요! 이제 진짜 <b>코더</b>예요.\n블록 하나하나가 곧 파이썬 코드였어요!",
    clearTitleWord: "성공!",

    LEVELS: [
      {
        name: "곧장 가기",
        guide: "별이 오른쪽에 있어요! <b>앞으로 가기</b> 블록을 끌어다 넣고 ▶실행을 눌러 보세요. 코드는 위에서 아래로 순서대로 움직여요!",
        lesson: "잘했어요! 코드는 <b>위에서 아래로, 순서대로</b> 실행돼요. 이걸 '순차'라고 해요. 코딩의 첫걸음이에요!"
      },
      {
        name: "모퉁이 돌기",
        guide: "이번엔 꺾어야 해요! 앞으로 가다가 <b>왼쪽으로 돌기</b>로 방향을 바꾼 다음 다시 앞으로 가 보세요.",
        lesson: "라이미는 <b>바라보는 방향</b>으로만 가요. '돌기' 블록으로 방향을 바꾼다는 걸 알았네요! 멋져요 👏"
      },
      {
        name: "반복의 마법",
        guide: "똑같은 동작이 계속 반복되네요? 하나하나 넣지 말고 <b>반복 블록</b> 안에 넣어 보세요. 코드가 훨씬 짧아져요!",
        lesson: "같은 일을 여러 번 할 땐 <b>반복문(for)</b>을 써요! 긴 코드를 몇 줄로 줄였어요. 이렇게 똑똑하게 푸는 게 바로 <b>알고리즘</b>이에요."
      }
    ],

    // ===== 퀴즈 (카테고리) =====
    quizPickH1: "어떤 퀴즈를 풀어볼까요?",
    quizPickP: "주제를 골라 보세요! 🧐",
    quizBackToCat: "다른 퀴즈 풀기",
    quizDoneTitle: "퀴즈 완료!",
    quizRetry: "다시 풀기",
    quizGoGame: "게임 만들러 가기 ▶",
    qResOk: "딩동댕! 정답이에요 🎉",
    qResNo: "아쉬워요!",
    qNextBtn: "다음 ▶",
    qSeeResult: "결과 보기 ▶",
    qTypeOx: "O / X 퀴즈",
    qTypeMc: "4지선다 퀴즈",
    QUIZ: [
      {
        key: "basic", title: "코딩이 무엇인지 배워봐요!", icon: "💡",
        q: [
          { t: "ox", q: "코딩은 컴퓨터에게 할 일을 순서대로 알려주는 거예요.", a: true,
            ex: "맞아요! 코딩은 컴퓨터에게 내리는 '명령'이에요." },
          { t: "ox", q: "컴퓨터는 코드의 순서를 바꿔도 똑같이 알아들어요.", a: false,
            ex: "아니에요! 컴퓨터는 적힌 순서 그대로 실행해요. 순서가 정말 중요해요." },
          { t: "mc", q: "같은 일을 여러 번 반복할 때 쓰는 것은 무엇일까요?", o: ["반복문 (for)", "변수", "주석", "글자색"], a: 0,
            ex: "반복문(for)을 쓰면 같은 코드를 여러 번 안 써도 돼요." },
          { t: "mc", q: "'만약 ~라면'처럼 조건에 따라 다르게 행동하게 하는 것은 무엇일까요?", o: ["조건문 (if)", "반복문 (for)", "변수", "함수"], a: 0,
            ex: "if는 조건이 맞을 때만 안쪽 코드를 실행해요." },
          { t: "ox", q: "블록코딩의 블록은 사실 파이썬 같은 진짜 코드로 바꿀 수 있어요.", a: true,
            ex: "맞아요! 블록 하나하나가 실제 코드와 똑같아요." }
        ]
      },
      {
        key: "func", title: "함수에 대해 배워봐요!", icon: "pylogo",
        q: [
          { t: "mc", q: "화면에 글자를 보여주는 함수는 무엇일까요?", o: ["print()", "input()", "range()", "import"], a: 0,
            ex: "print()는 화면에 글자를 출력하는 함수예요." },
          { t: "mc", q: "글자나 목록의 길이(개수)를 알려주는 함수는 무엇일까요?", o: ["len()", "max()", "print()", "sum()"], a: 0,
            ex: "len()은 글자 수나 목록의 개수를 알려줘요." },
          { t: "mc", q: "여러 숫자 중 가장 큰 값을 골라 주는 함수는 무엇일까요?", o: ["max()", "min()", "len()", "int()"], a: 0,
            ex: "max()는 가장 큰 값을, min()은 가장 작은 값을 골라요." },
          { t: "ox", q: 'print("3 + 5")를 실행하면 숫자 8이 출력돼요.', a: false,
            ex: "아니에요! 따옴표 안은 글자라서 '3 + 5'가 그대로 나와요. 따옴표가 없어야 계산해요." },
          { t: "ox", q: "함수 이름 뒤에는 괄호 ()를 붙여요.", a: true,
            ex: "맞아요! print(), len()처럼 함수는 괄호와 함께 써요." }
        ]
      }
    ],

    // ===== 파이썬 배우기 =====
    goalLabel: "🎯 목표",
    consoleHead: "실행 결과 (출력창)",
    consoleEmpty: "▶ 실행을 누르면 여기에 결과가 나와요",
    pyWrong: "출력이 목표와 달라요.\n코드를 다시 볼까요?",
    pyStep: "문제",
    clearNextPy: "다음 문제 ▶",
    pyAllClearTitle: "파이썬 마스터!",
    pyAllClearBody: "대단해요! 순차·변수·함수·반복·조건까지 배웠어요.\n이제 진짜 파이썬의 기초를 안 거예요!",
    PYLAB: [
      {
        goal: "'안녕하세요!' 다음에 '저는 라이미예요'를\n차례로 출력해 주세요.",
        intro: "print()는 화면에 글자를 보여주는 함수예요, 블록 두 개를 순서대로 놓아 보세요!",
        lesson: "<b>print()</b>는 화면에 글자를 보여줘요. 코드는 <b>위에서 아래로 순서대로</b> 실행되니까 순서가 중요해요!",
        blocks: [{ kind: "print", text: "안녕하세요!" }, { kind: "print", text: "저는 라이미예요" }],
        expected: ["안녕하세요!", "저는 라이미예요"]
      },
      {
        goal: "name 상자에 '라이미'를 담아\n출력해 주세요.",
        intro: "변수는 값을 담는 상자예요, name에 이름을 담고, print로 꺼내서 보여줘요!",
        lesson: "<b>변수</b>는 값을 담아 두는 상자예요. name에 담은 값을 <b>print(name)</b>으로 꺼내 썼어요!",
        blocks: [{ kind: "setvar", name: "name", value: "라이미", isStr: true }, { kind: "printvar", name: "name" }, { kind: "print", text: "name" }],
        expected: ["라이미"]
      },
      {
        goal: "10 더하기 5의 결과(숫자)를\n출력해 주세요.",
        intro: "따옴표 없이 숫자를 넣으면, 컴퓨터가 계산을 해줘요!",
        lesson: "따옴표가 없으면 <b>계산</b>을 해요. \"10 + 5\"는 글자, 10 + 5는 계산이에요!",
        blocks: [{ kind: "printsum", a: 10, b: 5 }, { kind: "print", text: "10 + 5" }],
        expected: ["15"]
      },
      {
        goal: "'python'이 몇 글자인지\n숫자로 출력해 주세요.",
        intro: "len()은 글자 수를 세어 주는 함수예요, 안쪽 글자의 개수를 알려줘요!",
        lesson: "<b>len()</b>은 글자나 목록의 개수를 알려줘요. 'python'은 6글자네요!",
        blocks: [{ kind: "printlen", text: "python" }, { kind: "print", text: "python" }],
        expected: ["6"]
      },
      {
        goal: "별 ⭐ 을 정확히 3번\n출력해 주세요.",
        intro: "별을 3번이요! print를 세 번 놓아도 되지만, 반복 블록을 쓰면 훨씬 똑똑해져요. 반복 안에 출력을 넣어 보세요!",
        lesson: "같은 출력을 3번이요! <b>for 반복문</b>을 쓰면 단 두 줄로 끝나요. 똑똑하게 푸는 방법, 이게 바로 <b>알고리즘</b>이에요!",
        blocks: [{ kind: "repeat" }, { kind: "print", text: "⭐" }],
        expected: ["⭐", "⭐", "⭐"]
      },
      {
        goal: "점수(score)가 80점 이상이면\n'합격!'을 출력해 주세요.",
        intro: "지금 점수는 90점이에요, '만약 ~이면' 블록 안에 출력을 넣어 보세요. 조건이 맞을 때만 실행돼요!",
        lesson: "<b>if</b>는 조건이 맞을 때만 안쪽을 실행해요. 상황에 따라 다르게 행동하게 만드는 것도 <b>알고리즘</b>의 핵심이에요!",
        prelude: { kind: "var", name: "score", value: 90 },
        vars: { score: 90 },
        blocks: [{ kind: "if", cond: "score >= 80" }, { kind: "print", text: "합격!" }],
        expected: ["합격!"]
      },
      {
        goal: "8과 3 중 더 큰 수를\n출력해 주세요.",
        intro: "max()는 여러 값 중 가장 큰 값을 골라 줘요, 8과 3 중 무엇이 더 클까요?",
        lesson: "<b>max()</b>는 가장 큰 값을, min()은 가장 작은 값을 골라요. 컴퓨터가 비교해서 고르는 것도 알고리즘이에요!",
        blocks: [{ kind: "printmax", a: 8, b: 3 }, { kind: "printmin", a: 8, b: 3 }],
        expected: ["8"]
      }
    ]
  },

  en: {
    appTitle: "Raimi's Block Coding Lab",
    appSub: "Let's explore coding and Python, step by step!",
    homeBtn: "🏠 Home",
    backToHome: "← Back to start",
    installApp: "📲 Install app",
    iosTitle: "Add to Home Screen",
    iosBody: "Tap the <b>Share ⬆️</b> button in Safari,<br>then choose <b>'Add to Home Screen'</b> to use it like an app!",
    iosClose: "Got it",

    introHi: "Hi! I'm Raimi, your coding buddy 🤖",
    introTitle: "Let's learn to code with Raimi!",
    introBody: "Snap blocks together and you're <b>coding</b>!\nLearn with a quick quiz,\nthen build your own <b>game</b>.\nReady? 🚀",
    introStart: "Okay, let's go! 🚀",

    homeH1: "What shall we do today?",
    homeP: "Doing them in order works best. Pick one! ✨",
    cardQuizTitle: "What is coding?",
    cardQuizDesc: "Find out about coding & Python<br>with an <b>O/X · quiz</b>",
    cardQuizTag: "Quiz · 3 min",
    cardGameTitle: "Make a Game",
    cardGameDesc: "Move Raimi with <b>blocks</b><br>to solve the maze",
    cardGameTag: "Block coding · 5 min",
    cardPythonTitle: "Learn Python",
    cardPythonDesc: "Learn <b>Python syntax</b> &<br>algorithms with blocks",
    cardPythonTag: "Syntax · Algorithms",

    modeH1: "How will you take it on?",
    modeP: "Want Raimi's help, or go solo? 🤔",
    modeBeginnerTitle: "Beginner Mode",
    modeBeginnerDesc: "Raimi guides you<br><b>step by step</b>",
    modeBeginnerTag: "Raimi helps you 😊",
    modeChallengerTitle: "Challenger Mode",
    modeChallengerDesc: "Solve the maze<br><b>all by yourself</b>",
    modeChallengerTag: "You've got this! 💪",

    soonBody: "This corner is <b>coming soon</b>! 🛠️",

    hatLabel: "when started",
    blkMove: "move forward",
    blkLeft: "turn left",
    blkRight: "turn right",
    blkRepeat: "repeat",
    blkRepeatPre: "repeat",
    blkRepeatPost: "times",
    blkPrint: "print",
    blkIfPre: "if",
    blkIfPost: ":",
    palTitle: "Block box — drag a block to the right",
    wsTitle: "My Code",
    emptyHint: "Drag blocks here!\nThey run from top to bottom.",
    bodyEmpty: "drop blocks in here",
    runBtn: "▶ Run",
    resetBtn: "↺ Reset",
    pyHead: "Python code — your blocks become this",
    guideGoal: "Get Raimi to the star!",
    arrowLegend: "The red arrow shows the way Raimi is facing",

    toastEmpty: "Add some blocks, then press ▶ Run!",
    toastBump: "Oops! Hit a wall 😵\nLet's fix the code.",
    toastNotYet: "Almost!\nRaimi didn't reach the star. Try again?",
    clearNext: "Next maze ▶",
    clearRetry: "Try again",
    clearMenu: "Home",
    allClearTitle: "You solved every maze! 🎉",
    allClearBody: "Congrats! You're a real <b>coder</b> now.\nEvery block was really Python code!",
    clearTitleWord: "Success!",

    LEVELS: [
      {
        name: "Straight Ahead",
        guide: "The star is to your right! Drag <b>move forward</b> blocks in and press ▶Run. Code runs top to bottom, in order!",
        lesson: "Nice! Code runs <b>top to bottom, in order</b>. That's called 'sequence' — the first step of coding!"
      },
      {
        name: "Turn the Corner",
        guide: "Time to turn! Go forward, then use <b>turn left</b> to change direction, and move forward again.",
        lesson: "Raimi only moves the way it's <b>facing</b>. You learned that 'turn' blocks change direction! 👏"
      },
      {
        name: "Loop Magic",
        guide: "The same moves keep repeating! Instead of adding them one by one, put them inside a <b>repeat</b> block. Much shorter!",
        lesson: "When you do the same thing many times, use a <b>loop (for)</b>! You shrank long code into a few lines. Solving smart like this is an <b>algorithm</b>."
      }
    ],

    quizPickH1: "Which quiz shall we try?",
    quizPickP: "Pick a topic! 🧐",
    quizBackToCat: "Other quiz",
    quizDoneTitle: "Quiz complete!",
    quizRetry: "Try again",
    quizGoGame: "Go make a game ▶",
    qResOk: "Ding ding! Correct 🎉",
    qResNo: "Not quite!",
    qNextBtn: "Next ▶",
    qSeeResult: "See result ▶",
    qTypeOx: "O / X Quiz",
    qTypeMc: "Multiple choice",
    QUIZ: [
      {
        key: "basic", title: "What is coding?", icon: "💡",
        q: [
          { t: "ox", q: "Coding means telling a computer what to do, in order.", a: true,
            ex: "Right! Coding is a set of 'commands' for the computer." },
          { t: "ox", q: "A computer understands your code even if you shuffle the order.", a: false,
            ex: "Nope! A computer runs code exactly in the order written. Order really matters." },
          { t: "mc", q: "What do you use to repeat the same thing many times?", o: ["a loop (for)", "a variable", "a comment", "text color"], a: 0,
            ex: "A loop (for) saves you from writing the same code again and again." },
          { t: "mc", q: "What makes the program act differently depending on a condition?", o: ["if (condition)", "for (loop)", "a variable", "a function"], a: 0,
            ex: "if runs the inner code only when the condition is true." },
          { t: "ox", q: "Coding blocks can actually be turned into real code like Python.", a: true,
            ex: "Yes! Each block is the same as real code." }
        ]
      },
      {
        key: "func", title: "Learn about functions!", icon: "pylogo",
        q: [
          { t: "mc", q: "Which function shows text on the screen?", o: ["print()", "input()", "range()", "import"], a: 0,
            ex: "print() shows text on the screen." },
          { t: "mc", q: "Which function tells you the length (count) of text or a list?", o: ["len()", "max()", "print()", "sum()"], a: 0,
            ex: "len() tells you the number of letters or items." },
          { t: "mc", q: "Which function picks the biggest of several numbers?", o: ["max()", "min()", "len()", "int()"], a: 0,
            ex: "max() picks the biggest value; min() picks the smallest." },
          { t: "ox", q: 'Running print("3 + 5") prints the number 8.', a: false,
            ex: "Nope! Inside quotes it's text, so '3 + 5' prints as-is. Remove the quotes to calculate." },
          { t: "ox", q: "A function name is followed by parentheses ().", a: true,
            ex: "Yes! Functions are written with parentheses, like print() and len()." }
        ]
      }
    ],

    goalLabel: "🎯 Goal",
    consoleHead: "Output",
    consoleEmpty: "Press ▶ Run to see the output here",
    pyWrong: "The output doesn't match the goal yet.\nCheck your code?",
    pyStep: "Problem",
    clearNextPy: "Next problem ▶",
    pyAllClearTitle: "Python master!",
    pyAllClearBody: "Amazing! You learned sequence, variables, functions, loops and conditions.\nThat's the real basics of Python!",
    PYLAB: [
      {
        goal: "Print 'Hello!' and then 'I'm Raimi'\nin order.",
        intro: "print() shows text on the screen, place the two blocks in the right order!",
        lesson: "<b>print()</b> shows text. Code runs <b>top to bottom, in order</b>, so order matters!",
        blocks: [{ kind: "print", text: "Hello!" }, { kind: "print", text: "I'm Raimi" }],
        expected: ["Hello!", "I'm Raimi"]
      },
      {
        goal: "Put 'Raimi' in the box called name\nand print it.",
        intro: "A variable is a box that holds a value, put a name in 'name', then print it out!",
        lesson: "A <b>variable</b> is a box that holds a value. You stored it in name and read it with <b>print(name)</b>!",
        blocks: [{ kind: "setvar", name: "name", value: "Raimi", isStr: true }, { kind: "printvar", name: "name" }, { kind: "print", text: "name" }],
        expected: ["Raimi"]
      },
      {
        goal: "Print the result of 10 plus 5\n(a number).",
        intro: "Put numbers without quotes, and the computer does the math!",
        lesson: "Without quotes it <b>calculates</b>. \"10 + 5\" is text, but 10 + 5 is math!",
        blocks: [{ kind: "printsum", a: 10, b: 5 }, { kind: "print", text: "10 + 5" }],
        expected: ["15"]
      },
      {
        goal: "Print how many letters\n'python' has.",
        intro: "len() counts the characters, it tells you how many are inside!",
        lesson: "<b>len()</b> tells you the count of letters or items. 'python' has 6!",
        blocks: [{ kind: "printlen", text: "python" }, { kind: "print", text: "python" }],
        expected: ["6"]
      },
      {
        goal: "Print a star ⭐ exactly\n3 times.",
        intro: "Three stars! You could place print three times, but a repeat block is smarter. Put print inside the repeat!",
        lesson: "Printing the same thing 3 times! A <b>for loop</b> does it in just two lines. Solving smart like this is an <b>algorithm</b>!",
        blocks: [{ kind: "repeat" }, { kind: "print", text: "⭐" }],
        expected: ["⭐", "⭐", "⭐"]
      },
      {
        goal: "If score is 80 or higher,\nprint 'Pass!'.",
        intro: "The score is 90 right now, put print inside the 'if' block. It runs only when the condition is true!",
        lesson: "<b>if</b> runs the inside only when the condition is true. Acting differently by situation is the heart of an <b>algorithm</b>!",
        prelude: { kind: "var", name: "score", value: 90 },
        vars: { score: 90 },
        blocks: [{ kind: "if", cond: "score >= 80" }, { kind: "print", text: "Pass!" }],
        expected: ["Pass!"]
      },
      {
        goal: "Print the bigger number\nbetween 8 and 3.",
        intro: "max() picks the biggest of several values, which is bigger, 8 or 3?",
        lesson: "<b>max()</b> picks the biggest value; min() picks the smallest. Comparing and choosing is an algorithm too!",
        blocks: [{ kind: "printmax", a: 8, b: 3 }, { kind: "printmin", a: 8, b: 3 }],
        expected: ["8"]
      }
    ]
  }
};
