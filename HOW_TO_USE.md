# HOW_TO_USE.md — 처음부터 끝까지

> 터미널·Claude Code·Git·GitHub·Vercel 처음 다루시는 분도 따라할 수 있게 30초 단위로 끊어 드립니다.

---

## 0. 준비 — 한 번만 해두면 끝

### macOS 사용자 가정 (Windows면 일부 다름, 안내 요청)

### Homebrew 설치 확인 (없으면 설치)
```bash
which brew
```
없으면:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Node.js + pnpm 설치
```bash
brew install node pnpm
```

### Git 설치 확인
```bash
git --version
```

### GitHub 계정 만들기
없으면 https://github.com — Sign up.

### Vercel 계정 만들기
https://vercel.com — "Continue with GitHub" 추천 (계정 연결 자동).

### Claude Code 설치
https://www.anthropic.com/claude-code 에서 다운로드 후 설치.

---

## 1. 노트북에서 폴더 만들고 패키지 풀기

```bash
cd ~/projects                          # 작업 디렉토리로 이동 (없으면 mkdir로 만들기)
mkdir kcctf-website                    # 새 폴더 만들기
cd kcctf-website                       # 새 폴더로 들어가기
unzip ~/Downloads/kcctf-website.zip    # zip 풀기 (Cowork에서 받은 파일)
```

또는 Finder로 직접 폴더 만들고 zip 풀어도 됩니다.

---

## 2. Claude Code 시작

같은 터미널에서 (이미 `kcctf-website` 폴더 안에 있는 상태):

```bash
claude
```

Claude Code가 시작됩니다. 첫 메시지로:

```
이 폴더(kcctf-website)에서만 작업해. 부모/형제 폴더는 절대 안 봐.

CLAUDE.md를 다 읽고 컨텍스트 잡아줘.
그 다음 _brief/운영기준.md, _brief/new_hero_v1.html, _design/README.md, content/ko.json도 훑어봐.

준비됐으면 Phase 4 (Next.js 14 스캐폴딩) 시작해줘.
```

Claude Code가 알아서 진행합니다. 중간에 "OK?" 물어보면 답해주세요.

---

## 3. 로컬에서 사이트 확인

Claude Code가 Phase 4 끝나면 알려줄 거예요. 그러면:

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 접속 → 사이트 보임.

---

## 4. GitHub에 올리기

Claude Code에 명령:
```
git init하고 .gitignore 표준 만들어줘.
첫 commit 메시지는 "Initial scaffold from CLAUDE.md spec".
```

그 다음 GitHub에 새 repo 만들기:

1. https://github.com/new 접속
2. Repository name: `kcctf-website`
3. Privacy: **Private** (권장)
4. **Don't** initialize with README/license/.gitignore (이미 있음)
5. Create repository
6. 화면에 나오는 명령 중 "push an existing repository" 부분 복사:

```bash
git remote add origin git@github.com:YOUR_USERNAME/kcctf-website.git
git branch -M main
git push -u origin main
```

YOUR_USERNAME만 본인 계정으로 바꿔서 터미널에 붙여넣기.

> **SSH 키 처음 설정**이면 한 번만 추가 작업 필요. GitHub가 알려주는 가이드 따라가시면 됩니다.

---

## 5. Vercel에 배포 (자동)

1. https://vercel.com/new 접속
2. "Import Git Repository" → 본인 GitHub 계정 → `kcctf-website` 선택
3. Framework Preset: **Next.js** (자동 감지됨)
4. Environment Variables: `.env.example` 보고 필요한 것 복붙
5. **Deploy** 클릭
6. 1-2분 후 preview URL 받음 → 예: `kcctf-website-xyz.vercel.app`

이후 GitHub에 push할 때마다 자동으로 새 배포됩니다.

---

## 6. 운영팀에 공유

preview URL을 카톡으로:

```
운영팀 여러분, 새 KCCTF 홈페이지 시안입니다.
https://kcctf-website-xyz.vercel.app

확인 부탁드려요:
1) 정보 정확한지 (운영기준.md 대비)
2) 디자인 톤 OK인지
3) 모바일에서 깨지는 부분 있는지
4) 한국어/영어 카피 어색한 곳

피드백 주시면 반영합니다.
```

---

## 7. 수정 반복

피드백 받으면 Claude Code에 명령:

```
운영팀이 알려준 수정사항:
1) Hero 임팩트 숫자 4번째를 "DJs" → "Live Concerts"로 바꿔줘
2) 일정에서 M4 시간을 22:00 → 21:00으로 (조앤 확정)
```

Claude Code가 수정 → `git push` 자동 → Vercel 자동 재배포 → 같은 URL에서 갱신됨.

---

## 8. 완성 후 도메인 변경 (이종화 이사장 협조)

운영팀 OK 떨어지면, 이사장님께 도메인 DNS 변경 요청:

```
이사장님, 새 사이트 컨펌 완료됐습니다.
kcctf.org 도메인을 새 호스팅(Vercel)으로 변경 부탁드립니다.

Vercel 가이드:
1) Vercel 대시보드 → Settings → Domains
2) "Add" → "kcctf.org" 입력
3) 화면에 나오는 A 레코드 또는 CNAME 값을 도메인 등록처에 추가
4) 5-30분 후 자동 적용

기존 Firebase 사이트는 archive.kcctf.org로 옮기거나 그대로 두셔도 됩니다.
DNS 변경 시점은 트래픽 적은 시간(새벽) 권장합니다.
```

---

## 자주 쓰는 터미널 명령 cheat sheet

| 명령 | 무엇 |
|---|---|
| `pwd` | 현재 폴더 위치 보기 |
| `ls` | 현재 폴더 안 파일 목록 |
| `cd 폴더이름` | 폴더 안으로 이동 |
| `cd ..` | 상위 폴더로 |
| `cd ~` | 홈 폴더로 |
| `mkdir 이름` | 새 폴더 만들기 |
| `clear` | 터미널 화면 지우기 |
| `git status` | 어떤 파일 변경됐는지 |
| `git log` | 커밋 히스토리 |
| `pnpm dev` | 로컬 서버 시작 (Next.js) |
| `pnpm build` | 프로덕션 빌드 |

---

## Claude Code 명령 패턴

| 상황 | 명령 |
|---|---|
| 처음 시작 | "CLAUDE.md 읽고 Phase 4 시작" |
| 다음 단계 | "Phase 5 (컴포넌트 구현) 시작" |
| 작은 수정 | "Hero의 X를 Y로 바꿔줘" |
| 데이터 변경 | "운영기준 §4 가격이 바뀌었어, 반영해줘" |
| 막힘 | "이거 어떻게 해야 할지 모르겠어, 추천해줘" |
| 다시 컨텍스트 | "CLAUDE.md 다시 읽어줘" |

---

## 트러블슈팅

### "command not found: claude"
Claude Code 설치 안 됨. https://www.anthropic.com/claude-code

### "command not found: pnpm"
`brew install pnpm` 후 다시.

### Git push 실패 (Permission denied)
SSH 키 설정 안 됨. https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Vercel 배포 실패 (빌드 에러)
Claude Code에 "Vercel 빌드 에러 났어, 로그 확인해서 고쳐줘"라고 명령. 보통 환경 변수 누락이 원인.

### localhost:3000 안 열림
다른 프로그램이 포트 3000 사용 중. `pnpm dev -- -p 3001`로 다른 포트 사용.

---

**도움 필요할 때**: Cowork(이 데스크톱)으로 돌아와서 물어보세요. 노트북 Claude Code 작업과 Cowork 작업은 따로지만, Cowork에서 자료 만들어 보내드릴 수 있습니다.
