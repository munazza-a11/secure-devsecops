# NIST Cybersecurity Framework (CSF) Mapping

This document maps the security controls of the Secure DevSecOps Platform to the
five core NIST CSF functions: Identify, Protect, Detect, Respond, Recover.

---

## 1. Identify (ID)

Activities:
- **Asset identification** – documented in the SRD (user data, tokens, DB, logs).
- **System context & architecture** – described in Architecture.md and C4 diagrams.
- **Risk assessment** – STRIDE analysis and Risk Matrix in ThreatModel.md.

NIST Categories:
- ID.AM (Asset Management)
- ID.BE (Business Environment)
- ID.RA (Risk Assessment)

---

## 2. Protect (PR)

Controls:
- **Authentication & access control** – JWT, RBAC, rate limiting (SR-01–SR-04, SR-10, SR-12).
- **Data security** – password hashing, DB not public, encryption at rest (SR-02, SR-07, SR-13).
- **Input validation & secure coding** – server-side validation, safe queries (SR-06).
- **Transport security** – TLS 1.2+ on external endpoints (SR-05).
- **Secrets management** – no hard-coded secrets, use env/secret manager (SR-11).

NIST Categories:
- PR.AC (Access Control)
- PR.DS (Data Security)
- PR.IP (Information Protection Processes and Procedures)
- PR.PT (Protective Technology)

---

## 3. Detect (DE)

Controls:
- **Security logging** – auth attempts, access control decisions, errors (SR-08).
- **Monitoring** – metrics exposed by services and scraped by Prometheus (planned in later phases).
- **Alerting** – threshold-based alerts via Alertmanager (planned).

NIST Categories:
- DE.AE (Anomalies and Events)
- DE.CM (Security Continuous Monitoring)
- DE.DP (Detection Processes)

---

## 4. Respond (RS)

Controls:
- **Incident analysis** – use logs and metrics to investigate issues.
- **Communication** – alert channels (email/Slack) for critical incidents.
- **Remediation** – fix vulnerabilities and redeploy via CI/CD and IaC.

NIST Categories:
- RS.AN (Analysis)
- RS.CO (Communications)
- RS.MI (Mitigation)
- RS.IM (Improvements)

---

## 5. Recover (RC)

Controls:
- **Infrastructure as Code & containers** – environment can be rebuilt quickly using Docker/Compose/Kubernetes.
- **Backups** – database backups allow restoration after incidents.
- **Post-incident improvements** – lessons learned update SRD, architecture, and threat model.

NIST Categories:
- RC.RP (Recovery Planning)
- RC.IM (Improvements)
- RC.CO (Communications)

---
