# GETTING STARTED

이 문서는 프로젝트를 처음 세팅하는 팀원을 위한 시작 가이드다.  
순서대로 따라하면 로컬 환경에서 바로 실행할 수 있다.

---

## 사전 준비

- Node.js **v20.19.0 이상** 또는 **v22.12.0 이상** 설치 확인

```bash
node -v
```

---

## 1. 저장소 클론

```bash
git clone (레포 주소)
cd budget-manager
```

---

## 2. 브랜치 설정

> GITHUB_RULE 기준: 모든 작업은 dev 브랜치를 기준으로 시작한다.

```bash
git checkout dev
git pull origin dev
git checkout -b (본인 브랜치명)
```

---

## 3. 패키지 설치

```bash
npm i
```

> `node_modules/` 폴더가 생성되면 정상이다.

---

## 4. 서버 실행 (터미널 2개 필요)

json-server와 Vite 개발 서버를 **각각 별도 터미널**에서 실행해야 한다.

### 터미널 1 — json-server 실행

```bash
son-server --watch db.json --port 3000
```

정상 실행 시 아래처럼 출력된다:

```
Resources
http://localhost:3000/transactions

Home
http://localhost:3000
```

> `db.json`은 프로젝트 루트(`budget-manager/`)에 위치해 있다.  
> 이 서버가 꺼져 있으면 거래 데이터가 불러와지지 않는다.

### 터미널 2 — Vite 개발 서버 실행

```bash
npm run dev
```

정상 실행 시 아래처럼 출력된다:

```
  VITE ready in ...ms

  ➜  Local:   http://localhost:5173/
```

브라우저에서 `http://localhost:5173` 접속하면 앱이 실행된다.

---

## 5. API 엔드포인트 확인

json-server가 켜진 상태에서 아래 주소로 데이터를 확인할 수 있다.

| 동작      | 메서드 | URL                                      |
| --------- | ------ | ---------------------------------------- |
| 전체 조회 | GET    | `http://localhost:3000/transactions`     |
| 단건 조회 | GET    | `http://localhost:3000/transactions/:id` |
| 등록      | POST   | `http://localhost:3000/transactions`     |
| 수정      | PUT    | `http://localhost:3000/transactions/:id` |
| 삭제      | DELETE | `http://localhost:3000/transactions/:id` |

---

## 6. 작업 전 체크리스트

- [ ] `npm run dev` 실행 확인
- [ ] json-server(`port 3000`) 실행 확인
- [ ] 브라우저에서 거래 데이터 정상 출력 확인
- [ ] dev 브랜치 최신화 후 개인 브랜치에서 작업 시작

---

## 주의사항

- `db.json`은 PM 관리 파일이다. 임의로 수정하지 않는다.
- `main` 브랜치에 직접 push 금지. 반드시 개인 브랜치에서 작업 후 dev에 반영.
- push 전에 프로젝트 실행 및 기능 정상 동작 확인 필수.

> 자세한 Git 규칙은 [GITHUB_RULE.md](./GITHUB_RULE.md), 코드 작성 규칙은 [CODE_CONVENTION.md](./CODE_CONVENTION.md) 참고.
