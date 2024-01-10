# Booking Application

This is a booking system built with NestJS, which allows users to book various objects such as cars, hotel rooms, and apartments.
## Prerequisites

- Node.js (LTS version if you plan to run it without Docker)
- Docker & Docker Dekstop
- PostgreSQL (if you plan to run it without Docker)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/Fluffymuzzy/booking-nest.git
cd booking-nest
```

## Installation

Install the dependencies and devDependencies
```sh
npm i
```
## Environment Configuration
1. Create a `.env` file
2. Fill in the .env file with your database credentials and field such as:
- DATABASE_HOST=
- DATABASE_PORT=
- DATABASE_USERNAME=
- DATABASE_PASSWORD=
- DATABASE_NAME=

## Docker
After filling in the `.env` file with your production environment variables:
```bash
docker-compose build
docker-compose up
```
or just 
```bash
docker-compose up --build
```