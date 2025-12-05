# Secure Architecture Blueprint

## 1. Overview

This document describes the secure architecture of the **Secure DevSecOps Cloud-Native Platform** for CYC386.

The system is built as a **microservice-based application** with an API gateway, separate services for authentication and business logic, a PostgreSQL database, and basic logging/monitoring. Security is applied end-to-end using **Zero Trust** principles and controls mapped to **OWASP ASVS** and **NIST CSF**.

---

## 2. Microservice-based Architecture

### 2.1 Components (high-level)

- **Client (Browser / REST client)** – frontend that sends HTTP(S) requests.
- **API Gateway** – single external entry point; validates JWT, rate limits, routes.
- **Auth Service** – handles registration, login, password hashing, JWT issuing.
- **User Service** – manages user profile data (view/update profile).
- **Product Service** – example business domain; secure CRUD operations.
- **PostgreSQL Database** – stores users and application data.
- **Logging / Monitoring Stack** – collects logs and metrics (e.g. Prometheus/Grafana).

All runtime components are intended to run as **containers** (Docker / Kubernetes or Docker Compose).

---

## 3. C4 Model (Text Description)

### 3.1 C4 Level 1 – System Context

**Primary actor**

- **User** – interacts with the system via a web browser or REST tools (Postman etc.).

**System**

- **Secure DevSecOps Platform** – provides secure REST APIs for authentication and application features.

**External systems (optional)**

- **Email / Notification Service** – for account emails.
- **Monitoring System** – stores metrics and alerts.

**Main interactions**

- User ↔ Secure DevSecOps Platform via HTTPS.
- Platform → Email Service for notifications.
- Platform → Monitoring System for metrics.

### 3.2 C4 Level 2 – Container View

**Containers**

1. **Web Client** – browser, not part of backend deployment.
2. **API Gateway (Node.js)**  
   - Exposed to the internet.  
   - Terminates TLS, validates JWT, applies rate limiting.  
   - Routes traffic to services based on path (`/auth/*`, `/users/*`, `/products/*`).

3. **Auth Service (Node.js)**  
   - Endpoints: `/auth/register`, `/auth/login`, `/auth/refresh`.  
   - Uses bcrypt to hash passwords.  
   - Issues signed JWT access and refresh tokens.

4. **User Service (Node.js)**  
   - Endpoints: `/users/me`, `/users/update`.  
   - Requires valid JWT (USER or ADMIN).  
   - Reads/writes user profile data.

5. **Product Service (Node.js)**  
   - Endpoints: `/products/*`.  
   - Requires valid JWT; some operations restricted to ADMIN.

6. **PostgreSQL Database**  
   - Stores `users`, `products`, and other tables.  
   - Only accessible from internal network (no public IP).

7. **Monitoring / Logging**  
   - Metrics scraped from services (e.g. `/metrics`).  
   - Logs shipped from containers.

**Data flow**

- Client → API Gateway (HTTPS).  
- API Gateway → Auth Service for auth requests.  
- API Gateway → User/Product Service for application APIs.  
- Each service ↔ PostgreSQL for persistence.  
- All services → Logging/Monitoring for logs and metrics.

### 3.3 C4 Level 3 – Component View (Auth Service)

**Components inside Auth Service**

- **AuthController** – Express.js routes (`/register`, `/login`, `/refresh`).
- **Validation Layer** – Joi schemas for request validation.
- **AuthService** – business logic (check user, verify password, create tokens).
- **UserRepository** – database access for the `users` table.
- **JWTUtility** – signs and verifies JWT tokens (access and refresh).

**Login flow**

1. Request hits `AuthController` at `/auth/login`.
2. `Validation Layer` checks email + password format.
3. `UserRepository` loads user by email.
4. `AuthService` verifies bcrypt password hash.
5. `JWTUtility` generates access + refresh tokens with configured expiry.
6. Response with tokens is returned to client through API Gateway.

---

## 4. Zero Trust Architecture

Zero Trust means **no implicit trust** anywhere. Every request is authenticated and authorized.

### 4.1 Principles

- Every call to backend must include a valid **JWT** (except public health checks and registration).
- The network is treated as untrusted, even between services.
- Access to data and services is granted on a **least-privilege** basis.
- Identities (users and services) are continuously validated.

### 4.2 Perimeters

- **User Perimeter** – user devices and browsers; always untrusted.
- **Edge Perimeter (API Boundary)** – API Gateway exposed on the internet.  
  - Enforces TLS, JWT validation, rate limiting, basic WAF rules.

- **Service Perimeter (App Boundary)** – internal network containing Auth, User, Product services.  
  - Accessible only from API Gateway or from each other over internal network.  
  - Network policies / Docker network isolate them from the outside.

- **Data Perimeter (DB Boundary)** – PostgreSQL database.  
  - No direct external access.  
  - Only services with DB credentials can connect.

### 4.3 Service-to-Service Trust

- Services must **not** trust each other blindly: they validate JWT on internal calls as well.
- Internal traffic can be restricted via network policies (Kubernetes) or Docker networks.
- Secrets for DB and JWT signing are loaded from environment variables / secret manager (no hard-coded secrets).

---

## 5. IAM Roles and Access Control

### 5.1 Application Roles (Users)

- **USER** – default role for authenticated users.  
  - Can access own profile, products list, etc.

- **ADMIN** – privileged role for administrative actions.  
  - Can create/update/delete products, see admin dashboards.

Authorization is enforced using **RBAC** and claims in the JWT (`role` claim).

### 5.2 Database / Infrastructure Roles

Conceptual roles (even for local lab):

- **app_read** – SELECT only on tables.  
- **app_write** – INSERT/UPDATE/DELETE on specific tables.  
- **admin_db** – schema modifications, migrations (not used by application runtime).

Principles:

- Application services use **app_read** and `app_write`, never `admin_db`.  
- Only migration tools / DBA use `admin_db`.

---

## 6. Data Flow (Summary)

1. **Authentication**
   - User submits credentials via Client → API Gateway → Auth Service.
   - Auth Service validates input, checks password, issues JWT tokens.
   - Tokens returned to client.

2. **Authorized Requests**
   - Client sends requests with `Authorization: Bearer <token>`.
   - API Gateway validates JWT (signature, expiry, role).
   - If valid, request is forwarded to User or Product Service.

3. **Database Interaction**
   - Services access PostgreSQL using least-privilege credentials.
   - All queries use parameterization / ORM to avoid SQL Injection.

4. **Logging and Monitoring**
   - Each service sends logs (auth events, errors) to logging stack.
   - Metrics are scraped by monitoring stack (response times, errors, etc.).

---

## 7. Security Controls Overview

- Authentication: JWT with short-lived access tokens and refresh tokens.
- Authorization: RBAC via role claim.
- Transport security: TLS 1.2+ in production.
- Input validation: server-side validation for all requests.
- Data protection: hashed passwords; encryption at rest for DB (or managed by cloud provider).
- Rate limiting: applied at API Gateway for `/auth/*` and other sensitive endpoints.
- Logging/Monitoring: centralized logs; metrics scraped and visualized.

---
