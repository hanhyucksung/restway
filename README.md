# 쉼표 RESTWAY · shadcn/ui 기반 프런트엔드

휴게소를 중심으로 경로/통행료/유류비/먹거리/편의시설을 비교하는 **모바일 우선 개발 프리뷰**입니다. `src/components/ui`는 shadcn/ui의 소스 포함형 컴포넌트 패턴을 따르고, `components.json`에 shadcn CLI 설정을 포함합니다. React 19 + TypeScript + Vite + Tailwind CSS 4 + Radix UI로 구성했습니다.

> **주의: 아직 실서비스 배포 준비 완료가 아닙니다.** 지도·휴게소·메뉴·가격·통행료·경로는 전부 시연용 가상 데이터입니다. GPS 좌표는 확인만 가능하며 진행거리와 연결되지 않습니다. 안전한 실제 길안내를 제공하지 않습니다.

## 로컬 실행

```bash
npm install
npm run dev
# http://127.0.0.1:5173
```

Node 20.19+ 권장. 운영 빌드: `npm run build`; 서버 구동: `npm start` (기본 5174 포트). 앱은 빌드된 `dist/`를 사용합니다.

## 테스트

```bash
npm test    # Node 순수 모듈/API 어댑터 데이터 검증
npm run check # TypeScript 점검 (npm install 선행)
npm run build # 컴파일 및 프로덕션 번들
```

## 구현된 내용

- 서울→부산/서울→강릉 가상 경로 각각 3종 비교, 통행료·유류비 합계
- 차량 연료/연비/단가 설정 및 브라우저 자동 저장
- 방향별 휴게소 시연 목록, 식사/간식/음료 및 편의시설 필터
- 메뉴·가격 상세, 즐겨찾기, 검색 및 빈 결과 UX
- 주행용 큰 숫자 레이아웃, 이동거리 시뮬레이션, 수동 음성 안내
- GPS 권한 요청/중단. 실제 도로·휴게소 거리 매칭은 비활성화
- 모바일 하단 핵심 CTA 및 터치 타깃, 접근성 레이블
- API 키는 서버 환경변수에서만 조회. `/api/directions`에는 실제 Directions 5 어댑터가 있으나 **프런트는 예시 데이터만 사용**.

## 실제 서비스로 가기 전 필수 조건

1. 지도·경로 및 출발지 검색 서비스 키 신청, API 가격/쿼터 검토
2. 휴게소 목록, 노선, 상행·하행, 실제 진입좌표 검증 및 한국도로공사 데이터 계약/이용조건 확인
3. 휴게소 메뉴 가격·영업 정보 최신성 확보와 관리자 검수 체계
4. GPS map-matching, 경로이탈 시 재탐색, 경유지 재탐색, 위치 권한/배경 동작 검증
5. 실도로 재현 테스트, 차량형태별 요금, 유가 최신성, 개인정보 처리 및 보안 점검
6. 연결된 서버와 실기기 E2E 테스트, 장애·모니터링·운영 배포 구성

## 환경변수 (서버만)

`.env.example` 참조. 절대로 `VITE_`로 시작하는 키에 서버 비밀키를 넣지 마세요.

```text
NAVER_MAPS_KEY_ID=...
NAVER_MAPS_KEY=...
PORT=5174
```

### 안전 원칙

운전 중 운전자 조작을 유도하지 않습니다. '주행 모드'는 동승자 혹은 정차 시 이용합니다. 시연 데이터로 길안내를 시작하지 않습니다. 실제 서비스 준비 전 안전·접근성·오프라인 여부를 반드시 검증하세요.

## 구조

- `src/App.tsx` : 화면 및 기능
- `src/components/ui/` : shadcn/ui 스타일 복사형 Button/Card/Badge/Input/Dialog
- `src/data/demo.json` : **가상** 경로, 휴게소, 메뉴
- `src/lib/utils.ts` : 비용 및 단위 변환
- `server/providers/naver-directions.mjs` : 서버 전용 공식 API 어댑터
- `server/route.test.mjs` : 테스트
- `docs/RELEASE_CHECKLIST.md` : 실서비스 전 점검 항목

## 개발 환경 주의

이번 코드 작성 환경에서는 npm 레지스트리 DNS 조회가 실패해 패키지 다운로드 및 React 빌드/브라우저 E2E 테스트는 수행하지 못했습니다. `npm test` 등 **의존성이 없는 테스트만 검증 가능**했습니다. 패키지 설치 후 `npm run check && npm run build`를 반드시 수행해야 합니다.
