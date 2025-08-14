# Gemini CLI → Noma CLI 마이그레이션 가이드

## 🎯 프로젝트 개요

Apache 2.0 라이선스 하에 공개된 [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)를 포크하여 독립적인 **Noma CLI**로 변환하는 프로젝트입니다.

### 최종 목표
- Google 의존성 완전 제거 (OAuth, Gemini API)
- OpenAI API 호환 인터페이스로 전환
- 오픈소스 LLM 모델 지원
- 완전히 독립적인 CLI 도구 완성

---

## ✅ 완료된 작업 (Phase 1: 브랜딩 변경)

### 1. 프로젝트 이름 및 브랜딩 변경
- **패키지명 변경**
  - `@google/gemini-cli` → `@noma/noma-cli`
  - `@google/gemini-cli-core` → `@noma/noma-cli-core`
  - `@google/gemini-cli-test-utils` → `@noma/noma-cli-test-utils`
  - `gemini-cli-vscode-ide-companion` → `noma-cli-vscode-ide-companion`

- **저장소 정보 업데이트**
  - Repository URL: `https://github.com/DBrider3/noma-cli`
  - 모든 package.json 파일 업데이트 완료

### 2. 명령어 및 바이너리 변경
- **CLI 명령어**: `gemini` → `noma`
- **바이너리 파일**: `bundle/gemini.js` → `bundle/noma.js`
- **스크립트 파일들** 모두 업데이트 (`create_alias.sh` 등)

### 3. 소스 코드 내부 참조 변경
- **파일명 변경**
  ```
  gemini.tsx → noma.tsx
  gemini.test.tsx → noma.test.tsx
  GeminiRespondingSpinner.tsx → NomaRespondingSpinner.tsx
  GeminiMessage.tsx → NomaMessage.tsx
  GeminiMessageContent.tsx → NomaMessageContent.tsx
  GeminiPrivacyNotice.tsx → NomaPrivacyNotice.tsx
  useGeminiStream.ts → useNomaStream.ts
  ```

- **Import 경로 변경**: 모든 `@google/gemini-cli-*` → `@noma/noma-cli-*`
- **내부 문자열**: 사용자 대면 텍스트 모두 Gemini → Noma로 변경

### 4. UI/UX 업데이트
- **ASCII 로고**: 완전히 새로운 NOMA 로고로 교체
  ```
  ██╗       ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ 
  ╚██╗      ████╗  ██║██╔═══██╗████╗ ████║██╔══██╗
   ╚██╗     ██╔██╗ ██║██║   ██║██╔████╔██║███████║
   ██╔╝     ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║
  ██╔╝      ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║
  ╚═╝       ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
  ```

- **헬프 메시지**: "Usage: noma [options] [command]"
- **About 다이얼로그**: "About Noma CLI"
- **설정 파일**: `GEMINI.md` → `NOMA.md` 참조로 변경

### 5. 문서 업데이트
- **README.md**: 완전히 Noma CLI로 리브랜딩
- **설치 가이드**: npm, brew 명령어 모두 업데이트
- **사용 예제**: 모든 `gemini` 명령어 → `noma`로 변경

---

## 🏗️ 프로젝트 구조 분석

### 패키지 구성
```
packages/
├── cli/                     # 메인 CLI 애플리케이션 (970개 소스파일)
│   ├── src/ui/             # 사용자 인터페이스 컴포넌트
│   ├── src/commands/       # CLI 명령어 구현
│   ├── src/config/         # 설정 및 인증 관리
│   └── src/services/       # 서비스 계층
├── core/                   # 핵심 로직 및 API 통신
│   ├── src/core/          # Gemini API 통신 로직
│   ├── src/tools/         # CLI 도구들
│   ├── src/services/      # 백엔드 서비스
│   └── src/utils/         # 유틸리티 함수들
├── test-utils/            # 테스트 유틸리티
└── vscode-ide-companion/  # VS Code 확장
```

### 핵심 의존성
```json
{
  "@google/genai": "1.9.0",  // 🚨 제거 대상
  "openai": "^4.x.x",        // 🔄 추가 예정
  "@modelcontextprotocol/sdk": "^1.15.1"
}
```

---

## 🔄 다음 단계 (Phase 2: API 마이그레이션)

### 계획된 작업

#### 1. Google 의존성 제거
- [ ] `@google/genai` 패키지 제거
- [ ] Google OAuth 인증 로직 제거
- [ ] Gemini API 호출 코드 제거
- [ ] Google Cloud Project 설정 제거

#### 2. OpenAI API 통합
- [ ] `openai` 패키지 설치
- [ ] OpenAI API 클라이언트 구현
- [ ] API 키 기반 인증 구현
- [ ] 스트리밍 응답 처리 구현

#### 3. 설정 변경
- [ ] 환경변수 변경: `GEMINI_API_KEY` → `OPENAI_API_KEY`
- [ ] 설정 파일 스키마 업데이트
- [ ] 모델 선택 옵션 변경 (gpt-4, gpt-3.5-turbo 등)

#### 4. 오픈소스 LLM 지원
- [ ] OpenAI 호환 API 엔드포인트 설정 가능
- [ ] 커스텀 모델 지원 (Llama, Mistral, 등)
- [ ] 로컬 LLM 서버 연동 지원

### 주요 변경 파일들
```
packages/core/src/core/
├── client.ts              # API 클라이언트 구현
├── geminiChat.ts         # 🔄 openaiChat.ts로 변경
├── geminiRequest.ts      # 🔄 openaiRequest.ts로 변경
└── contentGenerator.ts   # API 호출 로직 수정

packages/cli/src/config/
├── auth.ts              # 인증 방식 변경
└── settings.ts          # 설정 스키마 업데이트
```

---

## 📊 현재 상태

### ✅ 완료된 항목
- [x] 프로젝트명 변경 (gemini-cli → noma-cli)
- [x] 패키지명 변경 (@google → @noma)
- [x] README.md 업데이트
- [x] 바이너리명 변경 (gemini → noma)
- [x] 내부 gemini 참조 변경
- [x] ASCII 로고 교체
- [x] UI/UX 브랜딩 업데이트
- [x] 빌드 및 테스트 검증

### 🚧 진행 예정
- [ ] 문서 파일 업데이트
- [ ] Google OAuth 제거
- [ ] Gemini API → OpenAI API 교체
- [ ] API 키 인증 구현
- [ ] Google 의존성 제거

### 📈 통계
- **총 파일 수**: 2,623개
- **TypeScript/JavaScript 파일**: 1,943개
- **실제 소스 코드 파일**: 970개 (테스트 제외)
- **테스트 파일**: 973개

---

## 🛠️ 개발 가이드

### 빌드 및 실행
```bash
# 의존성 설치
npm install

# 프로젝트 빌드
npm run build

# 번들 생성
npm run bundle

# 로컬 실행
node bundle/noma.js --help

# 전역 설치 (개발용)
npm link
```

### 테스트 실행
```bash
# 모든 테스트 실행
npm test

# 타입 체크
npm run typecheck

# 린트 검사
npm run lint
```

---

## 📝 참고 자료

- **원본 프로젝트**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
- **라이선스**: Apache 2.0
- **새 저장소**: [DBrider3/noma-cli](https://github.com/DBrider3/noma-cli)

---

## 🎉 마일스톤

### Phase 1: 브랜딩 변경 ✅ (부분 완료)
- 모든 Gemini 브랜딩을 Noma로 변경 ✅
- CLI 명령어 및 패키지명 변경 ✅
- UI/UX 업데이트 
- 빌드 시스템 검증

### Phase 2: API 마이그레이션 🚧 (예정)
- Google 의존성 완전 제거
- OpenAI API 통합
- 오픈소스 LLM 지원
- 독립적인 인증 시스템

### Phase 3: 최적화 및 배포 🔮 (미래)
- 성능 최적화
- 추가 기능 개발
- NPM 패키지 배포
- 사용자 문서 완성

---

*마지막 업데이트: 2025년 8월 13일*