# HOW_TO_UPDATE.md — 사이트 운영 매뉴얼

> 사이트 만든 후에 **가격·일정·라인업이 바뀌면** 어떻게 반영할지.
> 운영기준.md가 바뀌면 → 사이트 코드도 바꿔야 합니다.

---

## 핵심 원칙

> **운영기준.md가 바뀌면 → `content/ko.json` + `content/en.json` 양쪽을 같이 바꾼다 → git push → Vercel 자동 배포.**

5분이면 끝납니다.

---

## 흔한 변경 사례

### 1. 가격이 바뀌었을 때

**예**: 흰곰이 "얼리버드를 ₩190,000 → ₩170,000으로 인하" 결정

**할 일**:

#### 1-1. 운영기준 먼저
`_brief/운영기준.md` §4를 새 가격으로 업데이트.

#### 1-2. content 양쪽
`content/ko.json` + `content/en.json`의 `tickets.items[0]`:

```json
{
  "id": "fullpack-early",
  "name": "얼리버드 풀팩",
  "price": 170000,                         // ← 190000에서 변경
  "priceLabel": "₩170,000",                // ← 라벨도 변경
  ...
}
```

#### 1-3. Claude Code에 명령
```
운영기준 §4가 바뀌었어 — 얼리버드 가격이 ₩190,000 → ₩170,000으로 인하.
content/ko.json과 en.json의 fullpack-early 가격을 바꿔줘.
혹시 다른 곳(메타 description 등)에 가격 박혀있는지도 확인해서 같이 수정.
```

#### 1-4. push
```bash
git add .
git commit -m "Update earlybird price to ₩170,000"
git push
```

Vercel이 자동 감지 → 1-2분 후 사이트 갱신.

---

### 2. 라인업이 바뀌었을 때

**예**: 존이 "댄서팀 4번째 팀 확정 — Team Aurora"

**할 일**:

#### 2-1. content/*.json `dancers.items[3]`:

```json
{
  "id": "team-aurora",                     // ← 'tba'에서 변경
  "name": "Team Aurora",
  "origin": "Korea",
  "isTBA": false                           // ← true에서 변경
}
```

#### 2-2. 사진 추가
존에게 받은 사진을 `public/images/team-aurora.jpg`로 저장.
Claude Code에 명령:
```
public/images/team-aurora.jpg 사진 추가.
Dancers 컴포넌트에서 4번째 카드가 이 사진을 쓰도록.
```

#### 2-3. push (위와 동일)

---

### 3. 일정이 바뀌었을 때

**예**: 조앤이 "M2 시간 22:00 → 21:00으로 확정"

**할 일**:

#### 3-1. content/*.json `schedule.items[2]`:

```json
{
  "day": "10/3",
  "dow": "SAT",
  "time": "21:00 — 04:00",                 // ← 22:00에서 변경
  ...
}
```

#### 3-2. 운영기준.md §7도 같이.

#### 3-3. push.

---

### 4. 환경 변수 변경 (Vercel 대시보드에서)

코드 수정 없이 환경 변수만 바꾸는 경우도 있어요. 예: 워크샵 운영 결정.

**예**: 조앤이 "워크샵 안 함" 결정

**할 일**:
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. `NEXT_PUBLIC_SHOW_LESSONS`을 `false`로 (이미 false면 그대로)
3. **Redeploy** 버튼 클릭
4. 1-2분 후 사이트 갱신 — Lessons 섹션 자동 사라짐

또는 결정이 바뀌어서 `true`로:
1. 같은 곳 → `true`로 변경
2. Redeploy
3. Lessons 섹션 자동 표시

> 환경 변수 방식은 코드 수정 없이 빠르게 토글 가능. 단, 사이트가 자동 빌드되는 건 환경 변수 추가/변경 후에 Redeploy를 해야 적용.

---

### 5. 카운트다운 활성화 (얼리버드 마감일 결정)

**예**: 흰곰이 "얼리버드 마감 7월 31일까지"

**할 일**:
1. Vercel 대시보드 → Environment Variables
2. `NEXT_PUBLIC_EARLYBIRD_DEADLINE` = `2026-07-31`
3. Redeploy

→ 사이트에 자동으로 카운트다운 활성화.

---

## 체크리스트 — 변경할 때

매번 다음 순서:

- [ ] 운영기준.md 먼저 업데이트
- [ ] content/ko.json + en.json 양쪽 같이 업데이트 (한쪽만 하면 검증 에러)
- [ ] 메타 description / og:image 등 영향 받는지 확인
- [ ] 로컬 `pnpm dev`로 확인 (선택)
- [ ] git commit + push
- [ ] Vercel preview URL에서 확인
- [ ] (필요시) 환경 변수 업데이트 + Redeploy

---

## 자주 묻는 질문

### Q. 한국어만 바꾸고 영어는 그대로 둬도 되나요?
A. 안 됩니다. 양쪽 다 같은 키 구조여야 빌드 통과. 영어 텍스트는 그대로 두더라도 키는 둘 다 있어야.

### Q. content/*.json 직접 못 고치겠어요. Claude Code에 시키면?
A. OK. 사용자가 평소 한국어로 명령:
```
가격이 바뀌었어, ₩190,000을 ₩170,000으로.
ko.json과 en.json 둘 다 fullpack-early 항목을 바꿔줘.
```

### Q. 변경한 게 사이트에 안 보여요.
A. 1) Vercel 빌드가 끝났는지 확인 (대시보드 Deployments). 2) 브라우저 강력 새로고침 (cmd+shift+R). 3) 그래도 안 되면 Claude Code에 "Vercel 배포 로그 확인해줘".

### Q. 잘못 바꿔서 사이트 깨졌어요.
A. 이전 commit으로 되돌리기:
```bash
git log                          # 이전 commit hash 확인
git revert HEAD                  # 마지막 커밋 되돌리기
git push
```
Vercel이 자동 재배포 → 정상 복구.

### Q. 변경 사항 history는 어디?
A. GitHub repo의 commits 탭. 또는 `git log` 터미널에서.

---

## 운영자 권한 분리 (선택)

여러 사람이 사이트 변경할 일 있으면:

1. **GitHub Collaborators**: repo Settings → Collaborators → Add people
2. **Vercel Team Members**: Vercel Settings → Members → Invite

각자 Claude Code로 작업 후 push → Vercel 자동 배포.

> 단순한 정적 사이트라 한 명이 관리하는 게 가장 안정적. 변경이 많아지면 그때 분담 고려.

---

## CMS로 옮길 시점

다음과 같으면 Sanity 또는 Notion CMS 도입 고려:
- 일주일에 3번 이상 변경
- 운영자가 코드 만지기 부담스러움
- 여러 사람이 동시 변경
- 갤러리 같은 동적 콘텐츠 추가 필요

지금은 정적 + 코드 직접 수정으로 충분합니다.

---

**버전**: v1.0 · 2026-05-09
