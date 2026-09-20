# 🧠 Project Memory & Architectural Decision Log (ADR)

**Project:** Smart Campus AI  
**Author & Lead Architect:** Ayusman ([@Ayus-ProjeXion](https://github.com/Ayus-ProjeXion))  
**Last Updated:** September 20, 2026  

---

## 1. Project Inception & Ownership Transition

* **Origin:** Originally conceptualized during the TCS Hackathon. 
* **Transition:** The project has officially transitioned to full **solo ownership and leadership by Ayusman (@Ayus-ProjeXion)**. All historical team dependencies are decommissioned. Ayusman is the sole architect and developer driving the vision into an enterprise-grade full-stack platform.

---

## 2. Architectural Decisions Log (ADR)

### ADR-001: Separation of Pitch Deck and Functional Prototype
* **Decision:** Build a single integrated web app with a top-level mode switcher between the 6-Slide Pitch Deck and the 3-Column Interactive Simulator.
* **Rationale:** Hackathon judges and university stakeholders want both high-level business vision and hands-on proof of concept without switching URLs.

### ADR-002: Deterministic Rule Engine for Eligibility Verification
* **Decision:** Decouple entity extraction (AI) from eligibility calculation (Deterministic code).
* **Rationale:** LLMs can hallucinate. In academic and placement contexts, telling an ineligible student they are eligible (or vice-versa) destroys trust. Pure mathematical checks guarantee 100% accuracy.

### ADR-003: Removal of Client-Side API Key Input
* **Decision:** Remove the manual "API Key Settings" modal and input prompt from the frontend.
* **Rationale:** Real enterprise web applications never ask end users for API keys. It looks amateurish and exposes security risks. Replaced with an enterprise "AI Engine Online" status badge; real API calls run through serverless proxies.

### ADR-004: Strict Branching Architecture
* **Decision:** Transition from direct `main` commits to isolated feature branches (`frontend`, `backend`, `database`) with CodeRabbit pull request reviews.
* **Rationale:** Reflects standard tier-1 engineering practices and prevents accidental regression on live deployments.

### ADR-005: Adoption of Spec-Driven Development (SDD) Suite
* **Decision:** Maintain 6 synchronized core markdown blueprints (`PRD.md`, `architecture.md`, `rules.md`, `phases.md`, `design.md`, `memory.md`).
* **Rationale:** Ensures AI agents (GSD, Roo Code, Ralph Loop) have persistent, accurate context across all sessions.

---

## 3. Session State & Immediate Next Steps for Tomorrow

* **Current State:** 
  - Working tree clean.
  - Baseline prototype and pitch deck pushed to `origin/main`.
  - Full documentation suite established under Ayusman's solo authorship.
* **Tomorrow's Kickoff Agenda:**
  1. Switch to `backend` branch (`git checkout backend`).
  2. Set up free **Supabase** PostgreSQL database project.
  3. Write migration SQL for students, notices, and interactions tables.
  4. Submit Pull Request and run CodeRabbit review.
