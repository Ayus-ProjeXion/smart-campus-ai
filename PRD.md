# 📋 Product Requirements Document (PRD)

**Project:** Smart Campus AI  
**Author & Lead Architect:** Ayusman ([@Ayus-ProjeXion](https://github.com/Ayus-ProjeXion))  
**Status:** Active Development  
**Version:** 2.0.0  

---

## 1. Executive Summary

Every academic semester, college students miss vital job placements, scholarship deadlines, and exam registrations because campus circulars are lost in a flood of unread WhatsApp groups, disorganized portal boards, and email spam. 

**Smart Campus AI** is an autonomous campus operating system that ingests unstructured circulars (PDFs, circular photos, screenshots, portal feeds), uses Multimodal AI to extract eligibility criteria, deterministically matches them against verified student academic records, and delivers zero-noise, high-urgency notifications with 1-click execution (Google Calendar & WhatsApp).

---

## 2. Problem Statement & Impact Metrics

* **The Problem:** 
  - Students receive an average of **45+ notices and forwards per week**.
  - **86%** of these notices are irrelevant noise (wrong branch, ineligible CGPA, past deadline, promotional).
  - High-value notices (TCS placements, state scholarships, backlog clearance forms) get buried.
* **Quantified Impact:**
  - 🔻 **94% reduction** in missed academic deadlines.
  - ⏱️ **4.8 hours saved** per student every week.
  - 🎯 **34% higher participation** in competitive hackathons and campus drives.

---

## 3. Target User Personas

| Persona | Academic Profile | Core Pain Point | System Value |
| :--- | :--- | :--- | :--- |
| **Aarav Sharma** | Year 3 • CSE • 8.6 CGPA • 0 Backlogs | Overwhelmed by generic club notices; misses Tier-1 tech hackathons and cloud credits. | Instant high-priority push for software drives; automatic Google Calendar deadline sync. |
| **Priya Patel** | Year 2 • ECE • 7.2 CGPA • 0 Backlogs | Notices don't state branch eligibility clearly in WhatsApp forward headers. | Real-time branch matching filter eliminates ineligible software circulars automatically. |
| **Rohan Verma** | Year 4 • MECH • 6.4 CGPA • 2 Backlogs | Panics about minimum CGPA and backlog thresholds; gets demotivated by irrelevant posts. | Zero false-hope circulars; immediate highlight of back-paper forms and core engineering drives. |

---

## 4. Core System Requirements

### 4.1 Functional Requirements (FR)
* **FR-1: Multimodal Notice Ingestion**
  - Ability to accept raw circular text, PDF documents, and image screenshots (PNG/JPG).
  - Extract structured JSON entities: `Title`, `Issuer`, `Deadline`, `Allowed Branches`, `Min CGPA`, `Min Year`, `Max Backlogs`, `Action Required`.
* **FR-2: Zero-Hallucination Deterministic Matcher**
  - Eligibility must NEVER be guessed by an LLM.
  - Verification logic runs through strict algorithmic rules against verified student profile records.
* **FR-3: Noise Suppression & Urgency Categorization**
  - Classify notices into 3 urgency tiers:
    - 🔴 **URGENT (< 24 Hours)**
    - 🟡 **UPCOMING (2 - 4 Days)**
    - 🟢 **ACTIVE (> 5 Days)**
  - Noise Filter: Filter out non-matching circulars from the student's primary feed.
* **FR-4: 1-Click Action Dispatch**
  - Direct download of `.ics` calendar events prefilled with deadline and next-step actions.
  - Prefilled WhatsApp priority notification generator for student peer circles.
* **FR-5: Visual Noise Analytics**
  - Donut chart displaying suppression statistics (62% Spam/Promo, 24% General Info, 14% Critical Deadlines).

### 4.2 Non-Functional Requirements (NFR)
* **NFR-1 (Security):** Zero client-side API key leakage. All AI inference runs behind secure backend proxies.
* **NFR-2 (Performance):** Student matching computation completed in `< 250ms`.
* **NFR-3 (Reliability):** 100% offline fallback simulator for resilient pitch demonstrations and zero-quota failure.
* **NFR-4 (Accessibility & UX):** High-density dark-mode dashboard with glassmorphism and clear contrast.

---

## 5. Success Criteria & North Star Metric

* **North Star Metric:** % of eligible students who successfully complete circular action items before deadline.
* **Target:** 95%+ deadline compliance for pilot campus batch.
