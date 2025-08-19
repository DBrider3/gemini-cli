#!/bin/bash

# Noma CLI 실행 스크립트
# 사용법: ./run.sh noma [options] [command]

set -e

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 환경 변수 설정 확인
check_environment() {
    echo -e "${BLUE}🔍 환경 설정 확인 중...${NC}"
    
    if [ -z "$OPENAI_API_KEY" ]; then
        echo -e "${YELLOW}⚠️  OPENAI_API_KEY가 설정되지 않았습니다.${NC}"
        echo -e "${YELLOW}   .env 파일에서 환경 변수를 로드합니다.${NC}"
        
        if [ -f .env ]; then
            export $(grep -v '^#' .env | xargs)
            echo -e "${GREEN}✅ .env 파일에서 환경 변수 로드 완료${NC}"
        else
            echo -e "${RED}❌ .env 파일이 없습니다. OPENAI_API_KEY를 설정해주세요.${NC}"
            echo -e "${YELLOW}   예: export OPENAI_API_KEY=\"your-api-key\"${NC}"
            exit 1
        fi
    fi
    
    if [ -n "$OPENAI_BASE_URL" ]; then
        echo -e "${GREEN}✅ 커스텀 서버: $OPENAI_BASE_URL${NC}"
    else
        echo -e "${BLUE}📡 기본 OpenAI API 사용${NC}"
    fi
}

# 번들 파일 존재 확인
check_bundle() {
    if [ ! -f "./bundle/noma.js" ]; then
        echo -e "${RED}❌ noma.js 번들 파일을 찾을 수 없습니다.${NC}"
        echo -e "${YELLOW}💡 번들을 생성하려면: npm run bundle${NC}"
        exit 1
    fi
}

# 도움말 표시
show_help() {
    echo -e "${BLUE}"
    echo "██╗       ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ "
    echo "╚██╗      ████╗  ██║██╔═══██╗████╗ ████║██╔══██╗"
    echo " ╚██╗     ██╔██╗ ██║██║   ██║██╔████╔██║███████║"
    echo " ██╔╝     ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║"
    echo "██╔╝      ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║"
    echo "╚═╝       ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝"
    echo -e "${NC}"
    echo -e "${GREEN}Noma CLI - 독립적인 오픈소스 LLM CLI 도구${NC}"
    echo ""
    echo -e "${YELLOW}사용법:${NC}"
    echo "  ./run.sh noma [options] [command]"
    echo ""
    echo -e "${YELLOW}예시:${NC}"
    echo "  ./run.sh noma --help              # 도움말 보기"
    echo "  ./run.sh noma -p \"안녕하세요\"       # 간단한 대화"
    echo "  ./run.sh noma -p \"코드 리뷰해줘\" --debug  # 디버그 모드"
    echo ""
    echo -e "${YELLOW}환경 변수:${NC}"
    echo "  OPENAI_API_KEY     - OpenAI API 키 (필수)"
    echo "  OPENAI_BASE_URL    - 커스텀 서버 URL (선택)"
    echo ""
}

# 메인 실행 함수
main() {
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        show_help
        exit 0
    fi
    
    if [ "$1" != "noma" ]; then
        echo -e "${RED}❌ 첫 번째 인수는 'noma'여야 합니다.${NC}"
        echo -e "${YELLOW}💡 사용법: ./run.sh noma [options] [command]${NC}"
        exit 1
    fi
    
    check_environment
    check_bundle
    
    # noma 제거하고 나머지 인수들을 전달
    shift
    
    echo -e "${GREEN}🚀 Noma CLI 실행 중...${NC}"
    echo ""
    
    # Node.js로 noma CLI 실행
    node ./bundle/noma.js "$@"
}

# 스크립트 실행
main "$@"