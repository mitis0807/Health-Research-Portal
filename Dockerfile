
FROM node:10.19.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install && npm install sails@~1.2.3 --save -g 
RUN npm install -g create-react-app
COPY . /usr/src/app
EXPOSE 1340
EXPOSE 3006
CMD npm run startDocker
