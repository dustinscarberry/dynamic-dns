# Dynamic DNS

DNS IP Sync tool

## Requirements

* [Docker](https://www.docker.com/)

## Installation (Docker)

1. Clone repository

```sh
$ cd /var/docker
$ git clone git@github.com:dustinscarberry/dynamic-dns.git
```

2. Create docker-compose.override.yml and modify ports and env vars for your environment
```sh
$ cd dynamic-dns
$ cp docker-compose.override.example.yml docker-compose.override.yml
```

3. Run docker container via crontab

```sh
0 * * * * docker compose -f /path/to/docker-compose.yml -f /path/to/docker-compose.override.yml run --rm dynamic_dns
```