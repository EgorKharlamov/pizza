frun:
		docker-compose up -d --build mariadb && \
		docker-compose up -d --build api && \
		docker-compose up -d --build client && \
		docker-compose up -d --build nginx 
		
run:
		docker-compose up -d

clean-docker-all: 
		docker-compose down && docker rmi -f `docker images -a -q`

db-dev:
		docker-compose -f dbdev.yml up -d
