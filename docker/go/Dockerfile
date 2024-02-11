FROM golang:1.22.0-bullseye

# for hot reload
# see: https://github.com/toml-lang/toml
RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY ../.. /app

EXPOSE 8080

# go execution via air
CMD ["air", "-c", ".air.toml"]