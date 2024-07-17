# 베이스 이미지로 Node.js를 사용
FROM node:14

# 컨테이너 내부의 작업 디렉토리를 /usr/src/app으로 설정
WORKDIR /usr/src/app

# wait-for-it.sh 스크립트 복사
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# 패키지 매니저 파일을 컨테이너의 /usr/src/app 디렉토리로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 애플리케이션 소스 코드를 컨테이너의 /usr/src/app 디렉토리로 복사
COPY . .

# wait-for-it.sh 스크립트에 실행 권한 부여
RUN chmod +x /usr/src/app/wait-for-it.sh

# 애플리케이션이 바인드할 포트를 지정
EXPOSE 3000

# 애플리케이션 실행 명령
CMD ["./wait-for-it.sh", "db:3306", "--", "node", "index.js"]