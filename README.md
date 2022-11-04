# sutd_devtools

Steps to set up
1. Clone the files from this repo
2. Create and run docker files
  a. cd into frontend and create a Dockerfile with follow content
  ````
    # syntax=docker/dockerfile:1
    FROM node:19-alpine
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

4. Change nginx configuration to the following
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
  
Possible Vulnerabilities
1. DDOS
  - While nginx is being used, load balancing isn't set up properly. If a lot of requests are made at the same time, the server might crash. This is also a single point of failure as if the server goes down, the entire service will also be down.
  - One possible fix to this is to deploy front-end containers across a cluster of servers, then setting up a load balancer in front of the containers will help to distribute the traffic efficiently and be more resilient to attacks It also helps to eliminate single-point of failure, as even if a single server goes down, traffic can still be directed to other live servers.

2. "SQL" Injection
  - Currently, there isn't any data validation done when a user edits or inserts data. So it is entirely possible to insert malicious injection codes when making post requests.
  - One possible fix is to validate the fields and prevent adding of special characters. 

3. Authentication
  - Currently, everyone accessing the page can perform all available crud requests. Hence, an attacker can wipe the data or edit the character cards to show false information.
  - One possible fix is to set up an authentication page and ensure users are authenticated before they are allowed to add and edit character cards.
