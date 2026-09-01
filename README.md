# 🏥 PredixAI — Real-Time Clinical Deterioration & Vital Signs Monitoring
### ITU AI Readiness Hackathon — Kingdom of Saudi Arabia (Healthcare Track) 🇸🇦

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-patient--do.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://patient-do.vercel.app/)
[![Figma Prototype](https://img.shields.io/badge/Figma-Make%20Prototype-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/make/QdD2Fh6JH8G0gB2RjLQfkD?node-id=)
[![ITU-T Standard](https://img.shields.io/badge/ITU--T-Y.3172%20Compliant-00843D?style=for-the-badge)](https://www.itu.int/rec/T-REC-Y.3172)
[![Saudi AI Ethics](https://img.shields.io/badge/SDAIA-AI%20Ethics%20Aligned-0E6E69?style=for-the-badge)](https://sdaia.gov.sa/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205.7-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>An AI-powered clinical deterioration early-warning dashboard engineered for Emergency Departments (ED) and Intensive Care Units (ICU).</b>
  <br />
  Compliant with the <b>ITU-T Y.3172 ML pipeline architecture</b> and aligned with the <b>Saudi Data & AI Authority (SDAIA) AI Ethics Framework</b> and <b>MOH Clinical Protocols</b>.
</p>

[**🚀 Explore Live Demo**](https://patient-do.vercel.app/) · [**🎨 View Figma Prototype**](https://www.figma.com/make/QdD2Fh6JH8G0gB2RjLQfkD?node-id=) · [**💻 GitHub Repository**](https://github.com/mfa11188-bot/PatientMonitoringDashboard)

</div>

---

## 📑 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Project Links & Submission Deliverables](#-project-links--submission-deliverables)
3. [ITU-T Y.3172 Standard Architecture Mapping](#-itu-t-y3172-standard-architecture-mapping)
4. [ITU AI Readiness 2.0 Dimensions Alignment](#-itu-ai-readiness-20-dimensions-alignment)
5. [Saudi Healthcare & Regulatory Framework (SDAIA / PDPL / MOH)](#-saudi-healthcare--regulatory-framework-sdaia--pdpl--moh)
6. [Key Features & Clinical Capabilities](#-key-features--clinical-capabilities)
7. [Clinical Evaluation Scenarios](#-clinical-evaluation-scenarios)
8. [Knowledge Base & Official References](#-knowledge-base--official-references)
9. [Technology Stack](#-technology-stack)
10. [Local Setup & Development](#-local-setup--development)
11. [Repository Structure](#-repository-structure)
12. [License & Disclaimer](#-license--disclaimer)

---

## 🩺 Executive Summary

In emergency care and acute inpatient settings, delayed recognition of physiological decompensation is a primary cause of preventable mortality from conditions such as **Septic Shock**, **Acute Respiratory Failure**, and **Cardiac Arrhythmias**.

**PredixAI** is an intelligent clinical decision-support system (CDSS) interface that continuously ingests temporal vital streams (simulating bedside monitors like DINAMAP) and forecasts patient risk trajectories up to **120 minutes in advance**, enabling rapid response teams (RRT) and attending physicians to intervene before irreversible damage occurs.

---

## 🔗 Project Links & Submission Deliverables

| Deliverable / Artifact | Link | Description |
| :--- | :--- | :--- |
| **🚀 Production Web App** | [https://patient-do.vercel.app/](https://patient-do.vercel.app/) | Functional live dashboard deployed on Vercel |
| **🎨 Figma Make Prototype** | [Figma Prototype Link](https://www.figma.com/make/QdD2Fh6JH8G0gB2RjLQfkD?node-id=) | Interactive UI/UX design blueprint |
| **💻 Public GitHub Repository** | [mfa11188-bot/PatientMonitoringDashboard](https://github.com/mfa11188-bot/PatientMonitoringDashboard) | Source code, configuration, and documentation |

---

## 🏛️ ITU-T Y.3172 Standard Architecture Mapping

PredixAI is mapped directly to the **7 logical components** of the **ITU-T Y.3172** architectural framework for machine learning pipelines:

```
  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                    ITU-T Y.3172 PIPELINE                                    │
  └─────────────────────────────────────────────────────────────────────────────────────────────┘
  
  [ SRC: Data Sources ] ──► [ CDB: Data Broker ] ──► [ DPoP: Preprocessing ] ──► [ ML Model / Engine ]
   • DINAMAP Monitors        • Telemetry Ingest       • Signal Smoothing          • NEWS2 Calculation
   • Bedside HL7 Feeds       • Timestamp Sync         • Baseline Deviation        • 2-Hour Trajectory (92% Acc)
                                                                                          │
  [ MND: Monitoring ] ◄─── [ DST: Decision Target ] ◄─────────────────────────────────────┘
   • Real-Time Audit Log     • Doctor Alert Interface
   • Incident Escalation     • Sepsis Protocol Actions
   • System Telemetry        • Bi-lingual RTL/LTR UI
```

1. **SRC (Source):** Bedside vital monitors (Heart Rate, Systolic/Diastolic BP, SpO₂, Temperature, Respiration Rate).
2. **CDB (Collector & Data Broker):** High-frequency ingestion broker synchronizing multi-parameter time-series packets.
3. **DPoP (Data Pre-Processing):** Noise filtering, outlier clamping, and continuous deviation calculation against patient admission baseline.
4. **ML Model / ML Engine:** Multimodal time-series regression and classification forecasting risk scores (0–100) and confidence envelopes over a 2-hour forward horizon.
5. **MLFO (ML Function Orchestrator):** Dynamic confidence interval estimation and threshold escalation orchestration.
6. **DST (Decision Support / Target):** Responsive clinical UI providing visual trajectory charts, complication probability matrix, and protocol action checklists.
7. **MND (Monitoring & Diagnostics):** Chronological alert audit log tracking incident discovery, physician acknowledgment, and ICU rapid-response dispatch.

---

## 📊 ITU AI Readiness 2.0 Dimensions Alignment

PredixAI aligns directly with the **ITU AI Readiness Framework (Report 2.0)** across key dimensions:

- **D1 (Strategy & Sectoral Deployment — Healthcare):** AI-driven early detection targeting high-burden clinical emergencies.
- **D4 (Data Infrastructure & Interoperability):** Continuous data pipeline architecture ready for HL7/FHIR bedside device integration.
- **D8 (Safety, Reliability & Ethics):** Human-in-the-loop decision support with dynamic confidence bounds and non-autonomous advisory design.
- **D11 (Human Capital & Clinical Empowerment):** Streamlined cognitive workload for nursing staff and emergency physicians via automated scoring.

---

## 🇸🇦 Saudi Healthcare & Regulatory Framework (SDAIA / PDPL / MOH)

PredixAI adheres strictly to the Kingdom's regulatory and clinical governance standards:

1. **SDAIA AI Ethics Principles (مبادئ أخلاقيات الذكاء الاصطناعي):**
   - **Explainability & Transparency:** Displaying dynamic uncertainty intervals and contributing vital factors rather than black-box scores.
   - **Human Oversight (Human-in-the-Loop):** AI generates recommendations; clinical execution requires authorized medical team validation.
   - **Fairness & Safety:** Validated against standardized clinical NEWS2 physiological criteria.

2. **Saudi Personal Data Protection Law (PDPL - نظام حماية البيانات الشخصية):**
   - **Zero PHI Retention:** Prototype operates entirely on synthetic, de-identified telemetry data for demonstration and training safety.

3. **MOH & CBAHI Sepsis Clinical Guidelines (بروتوكول وزارة الصحة للتعامل مع الإنتان):**
   - Automated intervention checklist directly reflects the national Rapid Response Team (RRT) and Saudi Sepsis Pathway (Blood cultures, 1-hour broad-spectrum antibiotics, 30 mL/kg IV fluids, lactate serial monitoring).

---

## ✨ Key Features & Clinical Capabilities

- 📈 **Dynamic Predictive Risk Trajectory:** Recharts-powered visualization plotting actual historical vitals against AI forecasted risk with critical threshold alarms (Score > 80).
- 🫀 **Continuous Sparkline Vital Indicators:** Interactive micro-charts for Heart Rate, Blood Pressure, Oxygen Saturation, Temperature, and Respiration with baseline percentage shifts.
- 🎯 **Automated NEWS2 Early Warning Score:** Rapid stratification of clinical deterioration severity.
- ⚠️ **Multivariate Complication Probabilities:** Statistical likelihood breakdown for Septic Shock (78%), Acute Respiratory Failure (54%), and Cardiac Arrhythmia (31%).
- 📋 **Protocol-Driven Action Checklist:** Interactive clinical resuscitation tasks aligned with emergency protocols.
- 🕒 **Incident Audit Stream (Alert Log):** Step-by-step historical event tracker from initial telemetry drift to ICU mobilization.
- 🌍 **Full Dual-Language & Bi-directional RTL/LTR:** Native Arabic and English support powered by `IBM Plex Sans Arabic` and `IBM Plex Mono`.

---

## 🧪 Clinical Evaluation Scenarios

| Scenario | Simulated Patient State | AI System Response | Clinical Outcome |
| :--- | :--- | :--- | :--- |
| **Scenario 1: Baseline Drift** | HR rises from 88 to 104 bpm, BP decreases to 106 mmHg | System flags "Watch" alert (Score 44) | Nursing team alerted for increased bedside monitoring frequency |
| **Scenario 2: Impending Sepsis (+45m)** | HR reaches 128 bpm, BP falls to 88/56, Temp 38.9°C | Model predicts breach of critical threshold (Score 80+) at +45 min | Immediate notification dispatched to attending physician (Dr. Sarah Al-Otaibi) |
| **Scenario 3: Acute Shock Escalation** | Multimodal pattern indicates 78% Septic Shock probability | Risk score hits 87/100 ("Critical" status) | Automated RRT and ICU transfer protocol activation with sepsis checklist |

---

## 📚 Knowledge Base & Official References

The platform design and clinical logic are grounded in the following official sources:

- 🌐 [ITU-T Recommendation Y.3172](https://www.itu.int/rec/T-REC-Y.3172) — *Architectural framework for machine learning in future networks.*
- 🇸🇦 [SDAIA AI Ethics Principles](https://sdaia.gov.sa/) — *National Strategy for Data and AI (NSDAI) Ethics Framework.*
- 🇸🇦 [Saudi Personal Data Protection Law (PDPL)](https://sdaia.gov.sa/en/SDAIA/about/Pages/PDPL.aspx) — *Royal Decree No. M/19.*
- 🏥 [Saudi Ministry of Health (MOH) Clinical Protocols](https://www.moh.gov.sa/) — *Sepsis Management & Early Warning Guidelines.*
- 🇬🇧 [Royal College of Physicians NEWS2 Guidelines](https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2) — *Standardising the assessment of acute-illness severity in the NHS.*

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript 5.7
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Data Visualization:** Recharts 3.x
- **Typography:** IBM Plex Sans Arabic & IBM Plex Mono
- **Prototyping:** Figma Make

---

## 🚀 Local Setup & Development

```bash
# 1. Clone the repository
git clone https://github.com/mfa11188-bot/PatientMonitoringDashboard.git
cd PatientMonitoringDashboard

# 2. Install dependencies
pnpm install
# or: npm install

# 3. Start local development server
pnpm dev
# or: npm run dev

# 4. Build for production
pnpm build
```

---

## 📂 Repository Structure

```text
PatientMonitoringDashboard/
├── src/
│   ├── App.tsx          # Main clinical monitoring dashboard component
│   ├── index.css        # Tailwind theme tokens & font configurations
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # TypeScript definitions
├── index.html           # HTML5 shell
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite & Tailwind plugins configuration
├── LICENSE              # MIT Open Source License
└── README.md            # Comprehensive project documentation
```

---

## 📄 License & Disclaimer

- **License:** Licensed under the [MIT License](LICENSE).
- **Clinical Disclaimer:** *All patient records, vital values, and telemetry trends displayed are synthetically generated for demonstration, prototyping, and evaluation purposes.*
