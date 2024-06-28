run:
	docker compose up

rebuild:
	docker compose up --build

remove:
	docker compose down --volumes

check:
	curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:80/post.v1.PostService/PostList | jq

backend_test:
	cd backend && go vet ./... && go test ./...

generate_backend:
	cd backend && buf generate

generate_frontend:
	cd frontend && pnpm buf:generate

.PHONY: run rebuild remove backend_test
