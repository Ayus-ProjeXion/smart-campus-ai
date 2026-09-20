// app.js - Smart Campus AI Logic & Simulator

// ----------------------------------------------------
// 1. DATASETS: CAMPUS NOTICES & STUDENT PERSONAS
// ----------------------------------------------------

const CAMPUS_NOTICES = [
  {
    id: "not-1",
    title: "TCS Digital Campus Recruitment Drive 2026",
    tag: "PLACEMENT",
    type: "Career",
    issuer: "Training & Placement Cell",
    deadline: "2026-10-28",
    criteria: {
      allowedBranches: ["CSE", "IT", "AI-DS"],
      minCgpa: 7.5,
      minYear: 4,
      maxBacklogs: 0
    },
    rawSnippet: "TCS Digital announces campus drive for final year B.Tech students. Minimum 7.5 CGPA throughout academics with zero active backlogs. Branches: CSE, IT. Register before 28th October, 5:00 PM.",
    compensation: "₹ 7.50 LPA",
    actionRequired: "Submit TCS NextStep ID and academic marksheets to placement portal"
  },
  {
    id: "not-2",
    title: "Semester VI Examination Fee Registration Extension",
    tag: "ACADEMICS",
    type: "Mandatory",
    issuer: "Office of the Controller of Examinations",
    deadline: "2026-11-05",
    criteria: {
      allowedBranches: ["ALL"],
      minCgpa: 0.0,
      minYear: 3,
      maxBacklogs: 99
    },
    rawSnippet: "Students of Year 3 (Sem VI) are informed that examination portal is extended till 5th Nov with late fee of ₹500. Hall tickets will not be issued without fee receipt.",
    compensation: "Fee: ₹2,450",
    actionRequired: "Pay exam fee online via SBI Collect and upload challan receipt"
  },
  {
    id: "not-3",
    title: "Smart India Hackathon (SIH) Internal Campus Hack",
    tag: "HACKATHON",
    type: "Competition",
    issuer: "Centre for Innovation & Incubation",
    deadline: "2026-11-12",
    criteria: {
      allowedBranches: ["CSE", "IT", "ECE", "MECH", "CIVIL"],
      minCgpa: 6.0,
      minYear: 2,
      maxBacklogs: 2
    },
    rawSnippet: "Registrations open for SIH 2026 College Round. Teams of 6 mandatory with at least one female teammate. Problem statements uploaded on campus repository. Top 5 teams represent university.",
    compensation: "Prizes: ₹1.5 Lakhs + TCS Mentorship",
    actionRequired: "Submit 3-slide PPT proposal and team roster to incubation coordinator"
  },
  {
    id: "not-4",
    title: "L&T Heavy Engineering Campus Recruitment",
    tag: "CORE PLACEMENT",
    type: "Career",
    issuer: "Placement Directorate",
    deadline: "2026-11-18",
    criteria: {
      allowedBranches: ["MECH", "CIVIL", "EEE"],
      minCgpa: 6.8,
      minYear: 4,
      maxBacklogs: 1
    },
    rawSnippet: "L&T Heavy Engineering hiring Graduate Engineer Trainees. Mechanical and Civil final year students with 6.8+ CGPA eligible. Online test scheduled for 20th November.",
    compensation: "₹ 6.20 LPA",
    actionRequired: "Register on L&T careers portal using campus placement code 'LNT-UNIV-26'"
  }
];

const STUDENT_PERSONAS = [
  {
    id: "p-aarav",
    name: "Aarav Sharma",
    avatar: "👨‍💻",
    branch: "CSE",
    year: 4,
    cgpa: 8.4,
    activeBacklogs: 0,
    interests: ["AI", "Full Stack", "TCS Digital"]
  },
  {
    id: "p-sneha",
    name: "Sneha Patel",
    avatar: "👩‍🔧",
    branch: "MECH",
    year: 4,
    cgpa: 7.1,
    activeBacklogs: 0,
    interests: ["Design", "Manufacturing", "Core Engineering"]
  },
  {
    id: "p-vikram",
    name: "Vikram Rao",
    avatar: "🧑‍🎓",
    branch: "ECE",
    year: 2,
    cgpa: 6.8,
    activeBacklogs: 1,
    interests: ["Robotics", "IoT", "Hackathons"]
  }
];

// ----------------------------------------------------
// 2. STATE MANAGEMENT
// ----------------------------------------------------

let currentSlide = 1;
const totalSlides = 6;
let currentMode = "deck"; // 'deck' or 'demo'
let selectedNoticeId = "not-1";
let selectedPersonaId = "p-aarav";

// ----------------------------------------------------
// 3. INITIALIZATION
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderSlideDots();
  renderNotices();
  renderPersonas();
  evaluateNoticeMatching();
  setupKeyboardNavigation();
});

// ----------------------------------------------------
// 4. DECK NAVIGATION
// ----------------------------------------------------

function renderSlideDots() {
  const dotsContainer = document.getElementById("slideDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement("div");
    dot.className = `slide-dot ${i === currentSlide ? "active" : ""}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function updateSlideView() {
  document.querySelectorAll(".slide").forEach((s, idx) => {
    s.classList.toggle("active", idx + 1 === currentSlide);
  });
  document.getElementById("currentSlideNum").innerText = currentSlide;
  renderSlideDots();
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlideView();
  } else {
    switchMode("demo"); // Transition to live demo seamlessly after slide 6
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlideView();
  }
}

function goToSlide(num) {
  if (num >= 1 && num <= totalSlides) {
    currentSlide = num;
    updateSlideView();
  }
}

function setupKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    if (currentMode === "deck") {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        prevSlide();
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// ----------------------------------------------------
// 5. VIEW / MODE SWITCHER
// ----------------------------------------------------

function switchMode(mode) {
  currentMode = mode;
  const deckView = document.getElementById("deckView");
  const demoView = document.getElementById("demoView");
  const btnDeck = document.getElementById("btnModeDeck");
  const btnDemo = document.getElementById("btnModeDemo");

  if (mode === "deck") {
    deckView.classList.add("active");
    demoView.classList.remove("active");
    btnDeck.classList.add("active");
    btnDemo.classList.remove("active");
  } else {
    deckView.classList.remove("active");
    demoView.classList.add("active");
    btnDeck.classList.remove("active");
    btnDemo.classList.add("active");
  }
}

// ----------------------------------------------------
// 6. PROTOTYPE LOGIC: RENDER & ENGINE
// ----------------------------------------------------

function renderNotices() {
  const container = document.getElementById("noticePicker");
  if (!container) return;

  container.innerHTML = CAMPUS_NOTICES.map(n => `
    <div class="notice-item ${n.id === selectedNoticeId ? 'selected' : ''}" onclick="selectNotice('${n.id}')">
      <div class="notice-item-head">
        <span class="notice-item-title">${n.title}</span>
        <span class="notice-item-tag">${n.tag}</span>
      </div>
      <div class="notice-item-meta">Deadline: <strong>${n.deadline}</strong> • ${n.issuer}</div>
    </div>
  `).join("");
}

function renderPersonas() {
  const container = document.getElementById("personaPicker");
  if (!container) return;

  container.innerHTML = STUDENT_PERSONAS.map(p => `
    <div class="persona-item ${p.id === selectedPersonaId ? 'selected' : ''}" onclick="selectPersona('${p.id}')">
      <div class="p-avatar">${p.avatar}</div>
      <div>
        <div class="p-name">${p.name}</div>
        <div class="p-meta">Year ${p.year} ${p.branch} • <strong>${p.cgpa} CGPA</strong> • ${p.activeBacklogs} Backlogs</div>
      </div>
    </div>
  `).join("");
}

function selectNotice(id) {
  selectedNoticeId = id;
  renderNotices();
  evaluateNoticeMatching();
}

function selectPersona(id) {
  selectedPersonaId = id;
  renderPersonas();
  evaluateNoticeMatching();
}

// ----------------------------------------------------
// 7. DETERMINISTIC AI ENGINE EVALUATION
// ----------------------------------------------------

function evaluateNoticeMatching() {
  const notice = CAMPUS_NOTICES.find(n => n.id === selectedNoticeId);
  const student = STUDENT_PERSONAS.find(p => p.id === selectedPersonaId);
  if (!notice || !student) return;

  // Simulate rule verification
  const isBranchAllowed = notice.criteria.allowedBranches.includes("ALL") || 
                          notice.criteria.allowedBranches.includes(student.branch);
  const isCgpaAllowed = student.cgpa >= notice.criteria.minCgpa;
  const isYearAllowed = student.year >= notice.criteria.minYear;
  const isBacklogAllowed = student.activeBacklogs <= notice.criteria.maxBacklogs;

  const isEligible = isBranchAllowed && isCgpaAllowed && isYearAllowed && isBacklogAllowed;

  // Priority Calculation
  let priority = "P3 - Normal";
  let priorityClass = "priority-p3";
  if (isEligible) {
    if (notice.tag.includes("PLACEMENT") || notice.tag.includes("EXAM")) {
      priority = "P1 - URGENT ACTION";
      priorityClass = "priority-p1";
    } else {
      priority = "P2 - HIGH RELEVANCE";
      priorityClass = "priority-p2";
    }
  }

  // Reason Explanation
  let reasons = [];
  if (!isBranchAllowed) reasons.push(`Branch '${student.branch}' not eligible (Allowed: ${notice.criteria.allowedBranches.join(", ")})`);
  if (!isCgpaAllowed) reasons.push(`CGPA ${student.cgpa} is below minimum requirement (${notice.criteria.minCgpa})`);
  if (!isYearAllowed) reasons.push(`Year ${student.year} is below minimum required Year ${notice.criteria.minYear}`);
  if (!isBacklogAllowed) reasons.push(`Has ${student.activeBacklogs} active backlogs (Maximum allowed: ${notice.criteria.maxBacklogs})`);

  const reasonText = isEligible 
    ? `Criteria strictly verified: ${student.branch} branch matched, CGPA ${student.cgpa} &ge; ${notice.criteria.minCgpa} minimum threshold, and zero backlog conflicts. Action queued.`
    : `Ineligible: ${reasons.join(". ")}. AI has suppressed noise notification and recommended alternative campus activities.`;

  // Render Result Card
  const resultBox = document.getElementById("resultBox");
  resultBox.innerHTML = `
    <div class="result-badge-row">
      <span class="decision-badge ${isEligible ? 'badge-eligible' : 'badge-ineligible'}">
        ${isEligible ? '✅ ELIGIBLE & ACTIONABLE' : '❌ INELIGIBLE FOR CRITERIA'}
      </span>
      <span class="priority-pill">${isEligible ? priority : 'FILTERED NOISE'}</span>
    </div>

    <div class="result-summary-title">${notice.title}</div>

    <div class="result-details-grid">
      <div><span class="detail-label">Action Deadline:</span> <span class="detail-val">${notice.deadline}</span></div>
      <div><span class="detail-label">Target Audience:</span> <span class="detail-val">${notice.criteria.allowedBranches.join(", ")} (Yr ${notice.criteria.minYear}+)</span></div>
      <div><span class="detail-label">CGPA Cutoff:</span> <span class="detail-val">&ge; ${notice.criteria.minCgpa}</span></div>
      <div><span class="detail-label">Compensation/Value:</span> <span class="detail-val">${notice.compensation}</span></div>
    </div>

    <div class="reasoning-box">
      <strong>Zero-Hallucination Audit Trail:</strong><br>
      ${reasonText}
    </div>

    <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">
      <strong>Next Automated Action:</strong> ${notice.actionRequired}
    </div>
  `;
}

// ----------------------------------------------------
// 8. SIMULATING 1-CLICK ACTIONS
// ----------------------------------------------------

function showToast(message) {
  const toast = document.getElementById("toastPreview");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

function simulateCalendarAdd() {
  const notice = CAMPUS_NOTICES.find(n => n.id === selectedNoticeId);
  const student = STUDENT_PERSONAS.find(p => p.id === selectedPersonaId);
  showToast(`📅 Event scheduled in Google Calendar: "${notice.title}" for ${student.name} on ${notice.deadline}. Reminder set 24h before!`);
}

function simulateWhatsAppAlert() {
  const notice = CAMPUS_NOTICES.find(n => n.id === selectedNoticeId);
  const student = STUDENT_PERSONAS.find(p => p.id === selectedPersonaId);
  showToast(`💬 WhatsApp Dispatch sent to ${student.name} (+91 98XXX XXX12): "[Smart Campus AI] Action required before ${notice.deadline}: ${notice.actionRequired}"`);
}

function simulateAddToTodo() {
  const notice = CAMPUS_NOTICES.find(n => n.id === selectedNoticeId);
  showToast(`✅ Added to Student Checklist: "${notice.actionRequired} (Due: ${notice.deadline})"`);
}

function analyzeCustomNotice() {
  const text = document.getElementById("customNoticeText").value.trim();
  if (!text) {
    alert("Please enter or paste notice text first.");
    return;
  }

  showToast(`⚡ Multimodal Parser parsed custom circular: Detected 1 action deadline and CGPA constraints.`);
}
