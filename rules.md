# 📜 Engineering Rules & Operational Guardrails

**Project:** Smart Campus AI  
**Author & Lead Architect:** Ayusman ([@Ayus-ProjeXion](https://github.com/Ayus-ProjeXion))  
**Effective Date:** September 2026  
**Status:** Mandatory  

---

## 1. Git & Branching Discipline

* **Rule 1.1: Sacred Trunk (`main`)**
  - Direct pushes to `main` are strictly prohibited during active feature development.
  - `main` must ALWAYS represent clean, production-deployable code.
* **Rule 1.2: Feature Branch Standard**
  - Frontend enhancements: `frontend`
  - Backend and API proxies: `backend`
  - Database migrations and SQL: `database`
* **Rule 1.3: Pull Requests & Peer Reviews**
  - Changes must be merged via Pull Requests.
  - CodeRabbit CLI / GitHub review bot must approve PRs prior to merging into `main`.

---

## 2. Security & Credential Hygiene

* **Rule 2.1: Zero Client-Side Keys**
  - NEVER hardcode API keys, database service-role secrets, or webhook URLs inside `index.html` or `app.js`.
  - All secret keys must reside in server-side environment variables (`.env`) or cloud provider vaults.
* **Rule 2.2: Git Leak Prevention**
  - `.env`, `node_modules`, and temporary build artifacts must be strictly included in `.gitignore`.
  - If a secret is ever accidentally staged, immediate revocation and key rotation are mandatory.

---

## 3. UI/UX & Design Excellence

* **Rule 3.1: No Generic / Plain Aesthetics**
  - Standard unstyled HTML controls (plain gray buttons, default blue hyperlinks) are banned.
  - All interactive elements must follow the dark-mode glassmorphism design system (`--bg-card`, `--border-color`, glowing hover micro-animations).
* **Rule 3.2: Mobile & Desktop Responsiveness**
  - Layout must seamlessly adapt to mobile screens (`< 900px`) via responsive grid stacking without broken overflow.
* **Rule 3.3: Visual Integrity**
  - Critical metrics must be highlighted with glowing color-coded badges:
    - 🔴 Red: Urgent (< 24h deadline)
    - 🟡 Amber: Moderate (2-4 days)
    - 🟢 Green: Safe (> 5 days) / Match Confirmed

---

## 4. Architectural Integrity & Reliability

* **Rule 4.1: Deterministic Decision Making**
  - An LLM must NEVER make the final eligibility decision for student placement eligibility.
  - AI is restricted to entity extraction. The mathematical rule engine determines eligibility.
* **Rule 4.2: Graceful Offline Fallback**
  - The application must always function seamlessly even if external AI network calls fail, utilizing fast pre-calculated local fixtures.
