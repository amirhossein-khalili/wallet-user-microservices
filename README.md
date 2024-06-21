---

# SAMPLE‌ NEST JS MICROSERVICES

## Overview

This project consists of a microservices architecture designed to provide various functionalities across different services. The services are built using different technologies and communicate with each other through RabbitMQ. The project is containerized using Docker and includes a convenient `.sh` script for starting all the services. Configuration is managed using `.env` files.

## Microservices

### 1. User Service

- **Framework:** NestJS
- **Database:** MongoDB
- **Description:** Manages user-related operations such as user data management.

### 2. wallet Service

- **Framework:** NestJS
- **Cache:** Redis
- **Database:** MongoDB
- **Description:** Handles operations related to wallet functionalities, leveraging Redis for caching to improve performance.

### 3. API Gateway

- **Framework:** Express
- **Logger:** Integrated logging system
  **RateLimitter:** contains RateLimitter
- **Description:** Acts as an entry point for all client requests, routing them to the appropriate microservices. It also logs all incoming requests for monitoring and debugging purposes.

## Communication

- **Message Broker:** RabbitMQ
  - The microservices communicate with each other asynchronously using RabbitMQ, ensuring reliable message delivery and decoupling between services.

## Environment Configuration

- The project uses `.env` files for configuration. These files contain environment variables required for the services to function correctly.
- Make sure to configure the `.env` file before running the services.

## Dockerization

- All services are containerized using Docker. This ensures that the services run in isolated environments, making deployment and scaling easier.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (if running outside Docker)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Configure environment variables:**

   - Create and edit the `.env` file for each service with the necessary configuration.

3. **Build and run the services:**

   - Use the provided `.sh` script to start all the services.

   ```sh
   ./install.sh
   ```

   ```sh
   ./start.sh
   ```

   - Alternatively, you can use Docker Compose to start the services:

   ```sh
   docker-compose up --build
   ```

## Scripts

### start.sh

- A shell script to start all the services in the correct order.
- Ensure the script has execution permissions:
  ```sh
  chmod +x start.sh
  ```

## Usage

- Once all services are up and running, you can interact with the API Gateway to access different functionalities provided by the microservices.

## Contact

- For any questions or support, please contact [Amir1378khalili@gmail.com@example.com].

---

Make sure to replace placeholders like `<repository-url>` and `<repository-directory>` with actual values specific to your project.
