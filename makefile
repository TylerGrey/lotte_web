docker:
	docker build -t tylergrey/lotte-web .
	docker push tylergrey/lotte-web:latest

.PHONY: docker