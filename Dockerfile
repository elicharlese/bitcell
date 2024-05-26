FROM rust:1.56 AS builder

WORKDIR /app
COPY . .

RUN apt update && apt install -y protobuf-compiler

RUN cargo build --release

FROM gcr.io/distroless/cc

COPY --from=builder /app/target/release/bitcell /usr/local/bin/bitcell

CMD ["bitcell"]