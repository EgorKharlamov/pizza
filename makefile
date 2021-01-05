# first-run:
# 		docker-compose up -d --build mariadb && \
# 		cd back-end && npm i && npm run build && cd ../ && \
# 		cd front-end && npm i && npm run sass:rebuild && npm run build && cd ../ && \
# 		docker-compose up -d

frun:
		docker-compose up -d --build mariadb && \
		docker-compose up -d --build api && \
		docker-compose up -d --build client && \
		docker-compose up -d --build nginx 

clean-docker-all: 
		docker rmi -f `docker images -a -q`