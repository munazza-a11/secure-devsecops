# Security Requirements Document (SRD)

## 1. Introduction

This document defines the security requirements for the **Secure DevSecOps Cloud-Native Platform** developed as part of **CYC386 Secure Software Design & Development**. The requirements are aligned with **OWASP ASVS**, **NIST CSF**, and modern secure software practices.

---

## 2. Assets

- User credentials (email, password hash, roles)
- JWT access tokens and refresh tokens
- Application data (profiles, products, orders – example domain)
- Configuration & secrets (JWT secret, DB password, API keys)
- Audit & security logs
- Service-to-service communication metadata

---

## 3. Assumptions

- All external traffic enters through an **API Gateway**.
- No microservice is directly exposed to the public internet.
- All production traffic uses **HTTPS (TLS 1.2+)**.
- Secrets are injected via environment variables or a **secret manager (Vault)**.
- The database is only reachable from inside the cluster / Docker network.

---

## 4. Functional Security Requirements (OWASP ASVS aligned)

| ID   | Requirement                                                                 | Source (ASVS) | Owner   | Status   |
|------|------------------------------------------------------------------------------|---------------|---------|----------|
| SR-01| System MUST require login with email/password and issue a JWT on success.    | ASVS 2.1      | Dev     | Planned  |
| SR-02| Passwords MUST be hashed using **bcrypt** (cost factor ≥ 10).               | ASVS 2.1      | Dev     | Planned  |
| SR-03| All endpoints except **/health**, **/login**, **/register** MUST require JWT.| ASVS 3.1      | Dev     | Planned  |
| SR-04| JWT access tokens MUST expire in ≤ 15 minutes; refresh tokens ≤ 7 days.     | ASVS 3.2      | Dev     | Planned  |
| SR-05| Only **TLS 1.2+** is allowed for external communication in production.      | ASVS 9.1      | DevOps  | Planned  |
| SR-06| All request parameters MUST be validated server-side (type, length, pattern).| ASVS 5.1      | Dev     | Planned  |
| SR-07| Sensitive data at rest MUST be encrypted using **AES-256** or managed keys. | ASVS 8.1      | DevOps  | Planned  |
| SR-08| All auth & security events MUST be logged with timestamp, user, action, result.| ASVS 10.1  | Dev/Sec | Planned  |
| SR-09| Error messages MUST NOT expose stack traces, SQL details, or secrets.       | ASVS 10.3     | Dev     | Planned  |
| SR-10| Login endpoint MUST be protected by rate limiting (≤ 5 attempts/min/IP).    | ASVS 4.1      | DevOps  | Planned  |
| SR-11| Secrets MUST NOT be hard-coded; only env vars or Vault are allowed.         | ASVS 14.2     | DevOps  | Planned  |
| SR-12| **RBAC** MUST restrict ADMIN-only actions (roles: USER, ADMIN).             | ASVS 1.1      | Dev     | Planned  |
| SR-13| The database MUST NOT be publicly accessible from the internet.             | ASVS 9.3      | DevOps  | Planned  |

---

## 5. Non-Functional Security Requirements

- SR-NF-01: All **high-severity** SAST and DAST findings must be fixed before release.  
- SR-NF-02: Security logging must be sufficient to support basic forensic analysis.  
- SR-NF-03: The system should degrade gracefully under DoS attempts (no crash, just slower).

---
