# sutd_devtools

Steps to set up
1. Clone the files from this repo
2. Create and run docker files
  a. cd into frontend and create a Dockerfile with follow content
  ````
    # syntax=docker/dockerfile:1
    FROM node:19-alpine
    ENV URL 18.143.140.24:3000
    WORKDIR /app
    COPY . .
    RUN npm install
    CMD ["npm", "start"]
    EXPOSE 3000

  ````
  b. create Image and host the frontend image in container
   ````
   docker build -t front-end .
   docker run -dp 3000:3000 front-end
   ````
  
  c. cd into backend and create a Dockerfile with follow content
  ````
  # syntax=docker/dockerfile:1
  FROM node:19-alpine
  WORKDIR /app
  COPY . .
  RUN npm install
  CMD ["node", "server.js"]
  EXPOSE 3001
  ````
  d. create image and host the backend image in container
  ````
  docker build -t back-end .
  docker run -dp 3001:3001 back-end
  ````
  
3. Install nginx
  ````
  sudo apt-get update
  sudo apt-get install nginx
  ````
5. Change nginx configuration to the following
    ````
    vi /etc/nginx/sites-available/default
    ````
    
    ````
    server {
      listen 80;
      server_name student-2.sutdacademytools.net;


      location / {
        proxy_pass http://student-2.sutdacademytools.net:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
      }

    }
    ````
    close with esc + :wq
5.  Run nginx
  ````
  sudo service nginx start
  ````
