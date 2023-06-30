# syntax=docker/dockerfile:1

FROM golang:1.20.2

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY ./ ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /youknow-backend-image

EXPOSE 8000

CMD ["/youknow-backend-image"]