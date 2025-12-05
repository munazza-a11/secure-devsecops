# Threat Model (STRIDE)

## 1. System Overview

The system follows a simple microservice pattern:

- Client (Browser / REST client)
- API Gateway
- Auth Service
- User / Product Services
- PostgreSQL Database
- Logging & Monitoring stack

Main data flow:

Client → API Gateway → Auth/Auth-protected services → Database  
All services → Logging / Monitoring

---

## 2. Trust Boundaries

1. **Browser Boundary** – user device & browser (untrusted environment).  
2. **API Boundary** – public-facing API Gateway (first server-side trust boundary).  
3. **App Boundary** – internal microservices network (Auth, User, Product).  
4. **DB Boundary** – database / persistent storage zone.

---

## 3. STRIDE Analysis

| Component             | Threat Type              | Description                                                    | Mitigation (SR-xx)                |
|-----------------------|--------------------------|----------------------------------------------------------------|-----------------------------------|
| Login endpoint        | Spoofing                 | Attacker tries to log in as another user using stolen creds.  | SR-01, SR-02, SR-10               |
| JWT tokens            | Tampering                | Attacker modifies token payload or signature.                 | SR-03, SR-11, HTTPS (SR-05)       |
| Logs                  | Repudiation              | User denies an action if no logs exist.                       | SR-08                             |
| Database              | Information Disclosure   | DB dump or misconfig leaks sensitive data.                    | SR-07, SR-13                      |
| API Gateway           | Denial of Service        | Flood of /login requests overwhelms server.                   | SR-10, infra rate-limiting        |
| Admin-only endpoints  | Elevation of Privilege   | Normal user calls ADMIN APIs.                                 | SR-12                             |

---

## 4. Risk Matrix

| Threat                        | Likelihood | Impact    | Risk Level | Notes                                  |
|------------------------------|-----------|-----------|-----------|----------------------------------------|
| Credential stuffing          | High      | High      | Critical  | Needs strong hashing + rate limiting.  |
| SQL injection                | Medium    | High      | High      | Prevented via SR-06 + ORM/prepared st. |
| Token theft / replay         | Medium    | Medium    | Medium    | Short TTL (SR-04), HTTPS only.         |
| DB breach (dump)             | Low       | Very High | High      | SR-07 + SR-13 + network isolation.     |
| DoS on login endpoint        | High      | Medium    | High      | SR-10 + WAF/gateway.                   |
| Missing/weak logging         | Low       | Medium    | Medium    | SR-08, central logging.                |

---

## 5. Summary

The highest risks relate to **authentication abuse** and **data leakage**. The defined
ASVS-based controls (strong auth, RBAC, encryption, rate limiting, logging) are designed
to mitigate these threats as the system is implemented in later phases.

