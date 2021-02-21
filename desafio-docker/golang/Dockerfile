FROM golang:latest as builder

WORKDIR /go/src/fullcycle
COPY . .
RUN go env -w GO111MODULE=auto
RUN GOOS=linux go build -ldflags="-s -w"
CMD ["./fullcycle"]

FROM scratch
WORKDIR /fullcycle
COPY --from=builder /go/src/fullcycle/fullcycle .
CMD ["./fullcycle"]




