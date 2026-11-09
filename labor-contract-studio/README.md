# 근로계약서 스튜디오

공개 실행 주소: https://labor-contract-studio-20261108.skillhur.chatgpt.site

대한민국 매장의 사업장·근로자·근무 일정·임금 조건을 입력하고 검토용 계약서를 작성하는 React + TypeScript 앱입니다.

- `web/`: 공개 웹앱 소스와 HTML. 초안은 방문자 브라우저에 저장하며 PDF를 브라우저에서 생성합니다.
- `desktop/`: Windows PC용 원본 소스. 로컬 Node 서버로 JSON 초안과 PDF를 보관합니다.
- `docs/`: 구현 범위·실행 방법·검수 기록.

## 웹앱 실행

먼저 `npm install`과 `npm run build:web`로 브라우저 파일·한글 글꼴을 준비한 뒤 `web/dist`를 정적 웹서버로 제공하면 됩니다. 예: `python -m http.server 8080 --directory web/dist` 후 http://localhost:8080 접속.

소스 수정·빌드: 저장소의 이 폴더에서 `npm install`, `npm run build:web`.
도메인 테스트: `npm test` (Node 24 권장).

## 범위

계약 작성, 일정 계산, 미리보기, 초안 저장·복제·버전 보관, 검토용 한글 PDF를 구현했습니다. 법률 규칙과 템플릿이 전문가 승인된 상태가 아니므로 최종 확정은 제공하지 않습니다. 로그인·조직 권한·원격 서명·문자/이메일 전송·클라우드 계약 보관은 미구현입니다.

PC 실행기는 최초 작업 PC의 런타임 경로를 사용합니다. 다른 PC에서는 Launch.ps1과 server.mjs의 실행 파일·Playwright 경로를 맞춰야 합니다. 독립 설치형 EXE는 아닙니다.

계약 데이터, 다운로드 PDF, 인증정보, node_modules, 개인별 배포 설정은 포함하지 않았습니다. 웹앱의 PDF 라이브러리와 한글 글꼴 라이선스는 web/dist에 포함되어 있습니다.

## 검수

도메인 자동 테스트 7개 통과. 웹앱 초안 재열기, 방문자별 저장 분리, 360px 화면, PDF 생성·한글 텍스트 추출 및 페이지 시각 검수 완료. 자동 브라우저 환경에서 PDF 다운로드 요청은 확인했으나 파일 저장은 취소되어 생성 Blob을 별도 저장하여 검수했습니다.

