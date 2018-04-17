FROM node:9-alpine
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 3000
ENV DEBUG acr-patch-sample-web:*
CMD ["npm","start" ] 
