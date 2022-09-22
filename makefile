DIR=$(shell pwd)

launch:	
	@docker compose build && docker compose up -d
	@source ./env/bin/activate && pip3 install -r requirements.txt
	@python app.py& cd ui && npm run start
