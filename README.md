# Secure DevSecOps Pipeline & API

![Build Status](https://github.com/munazza-a11/secure-devsecops/actions/workflows/main.yml/badge.svg)
![Security Scan](https://img.shields.io/badge/Security-Trivy%20%26%20Snyk-green)
![Docker](https://img.shields.io/badge/Container-Docker-blue)

## Project Overview
This project demonstrates a complete **Secure Software Development Lifecycle (SSDLC)**. It is a hardened backend API built with a **DevSecOps** approach, integrating security at every stage—from design (Threat Modeling) to deployment (CI/CD & Infrastructure as Code).

The system features a **Zero Trust Architecture** with strict input validation, JWT authentication, and automated vulnerability scanning.

---

## Key Features (The "Secure" Part)

| Feature | Security Implementation |
| :--- | :--- |
| **Authentication** | JSON Web Tokens (JWT) with secure expiration & signing. |
| **Input Validation** | Strict **Whitelisting** using `Joi` (Prevents Injection & Mass Assignment). |
| **Infrastructure** | Fully containerized with **Docker** & **Docker Compose**. |
| **Database** | **PostgreSQL** (Containerized) with least-privilege user access. |
| **CI/CD Pipeline** | **GitHub Actions** automates testing and security scanning on every push. |
| **Logging** | Structured JSON logging with **Winston** for incident auditing. |

---

##  Project Structure

```bash
secure-devsecops/
├── src/                # Source Code (Node.js API)
│   ├── auth/           # Auth Controller & Joi Validation
│   └── utils/          # Security Loggers & Helpers
├── docker/             # Dockerfile (Hardened Image)
├── iac/                # Infrastructure as Code (Docker Compose)
├── docs/               # Security Documentation (Phases 1-7)
│   ├── ThreatModel.md      # STRIDE Analysis
│   ├── Incident-Response.md # Playbook for breaches
│   └── Architecture.md     # C4 Models
└── .github/workflows/  # CI/CD Pipeline Configuration
