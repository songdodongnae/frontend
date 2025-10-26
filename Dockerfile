# 스테이지 1: React 앱 빌드
FROM node:23-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# 스테이지 2: Nginx 서버로 정적 파일 서비스
FROM nginx:stable-alpine
# builder 스테이지에서 빌드된 결과물을 Nginx의 기본 정적 파일 경로로 복사
COPY --from=builder /app/build /usr/share/nginx/html
# Nginx 포트 노출
EXPOSE 80
# 컨테이너 실행 시 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]