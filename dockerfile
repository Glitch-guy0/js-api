FROM node:18-alpine

WORKDIR /app
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN npm install
RUN npx tsc
EXPOSE 3000
CMD ["node","dist/user/app.js"]
