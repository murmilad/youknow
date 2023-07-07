# syntax=docker/dockerfile:1

FROM golang:1.20.2

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY ./ ./

RUN mkdir /log
RUN CGO_ENABLED=0 GOOS=linux go build -o /youknow-backend-image

EXPOSE ${BACKEND_PORT}


CMD ["/youknow-backend-image"]