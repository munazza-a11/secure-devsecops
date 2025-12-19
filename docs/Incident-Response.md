# Incident Response Plan

## 1. Detection
- Monitor Prometheus alerts and Falco logs.
- Analyze 'combined.log' for repeated 403 Forbidden errors.

## 2. Containment
- Isolate affected containers using Docker network policies.
- Revoke compromised JWT tokens immediately.

## 3. Eradication
- Patch the vulnerability in the source code.
- Rebuild Docker images with updated dependencies.

## 4. Recovery
- Redeploy services using Terraform/Docker Compose.
- Restore database from the last secure backup.

## 5. Lessons Learned
- Update Threat Model with new attack vectors.
- Improve firewall rules.
