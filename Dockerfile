# Taken from:
# https://docs.docker.com/guides/golang/build-images/
FROM golang:1.25 AS build-stage
WORKDIR /app
COPY . .
RUN go install github.com/a-h/templ/cmd/templ@v0.3.943
RUN templ generate
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /toxic-chronos-bin

FROM gcr.io/distroless/base-debian11 AS build-release-stage
ENV ENV=production
WORKDIR /
COPY --from=build-stage /toxic-chronos-bin /toxic-chronos-bin
COPY --from=build-stage /app/templates /templates
COPY --from=build-stage /app/static /static
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/toxic-chronos-bin"]
