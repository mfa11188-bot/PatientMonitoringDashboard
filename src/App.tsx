import { useEffect, useState } from "react";
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer
} from "recharts";

// ---------- i18n ----------
type Lang = "ar" | "en";

const T = {
  ar: {
    dir: "rtl" as const,
    brandSub: "منصة التنبؤ الذكي بتدهور المرضى — متكاملة مع أجهزة DINAMAP",
    toggleBtn: "English",
    patientName: "خالد عبدالله المطيري",
    mrn: "الملف",
    ageSex: "العمر/الجنس",
    ageSexVal: "62 / ذكر",
    location: "الموقع",
    locationVal: "الطوارئ — سرير E-12",
    arrival: "وقت الوصول",
    arrivalVal: "12:32 (منذ ساعتين)",
    chiefComplaint: "الشكوى الرئيسية: ألم في الصدر وضيق تنفس",
    aiLabel: "تصنيف الذكاء الاصطناعي — تحديث كل دقيقة",
    riskTitle: "حرج — خطر تدهور وشيك",
    riskDesc: "النمط التصاعدي في معدل النبض والتنفس مع هبوط ضغط الدم وتشبع الأكسجين وارتفاع الحرارة يطابق مسار تطور نحو صدمة إنتانية. المنصة ترصد الاتجاه وليس فقط القراءة اللحظية.",
    statLabels: ["دقة نموذج التنبؤ", "نقاط الإنذار المبكر (NEWS2)", "الوقت المتوقع لتجاوز الحد الحرج"],
    statVals: ["92٪", "9 — مرتفع", "~45 دقيقة"],
    vitalsSectionTitle: "العلامات الحيوية الحالية",
    vitalsSectionHint: "— القيمة الآن مقارنة بخط الأساس عند الوصول",
    vitals: [
      { name: "معدل ضربات القلب" },
      { name: "ضغط الدم (انقباضي)" },
      { name: "تشبع الأكسجين" },
      { name: "درجة الحرارة" },
      { name: "معدل التنفس" },
    ],
    statusLabels: { critical: "حرج", watch: "تنبيه", normal: "طبيعي" },
    baseline: "عن خط الأساس",
    chartTitle: "مسار الخطورة المتوقع",
    chartSub: "القراءات الفعلية مقابل توقّع الذكاء الاصطناعي لاتجاه الحالة خلال الساعتين القادمتين",
    legendActual: "قراءات فعلية",
    legendPred: "توقع الذكاء الاصطناعي",
    legendThreshold: "الحد الحرج (80)",
    callout: ["⚠ عند الدقيقة ", "+45", " يتوقع النموذج تجاوز درجة الخطورة الحد الحرج (80) وبلوغها ذروة قريبة من ", "97", " خلال ساعتين ما لم يتم التدخل."],
    compTitle: "مضاعفات محتملة (بالاحتمالية)",
    compSub: "مبنية على نمط القراءات المجتمعة، وليس مؤشرًا واحدًا بمفرده",
    complications: [
      { name: "صدمة إنتانية (Septic Shock)", pct: 78, level: "critical" },
      { name: "فشل تنفسي حاد",               pct: 54, level: "critical" },
      { name: "اضطراب نظم قلبي",             pct: 31, level: "watch"    },
    ],
    intTitle: "التدخلات الموصى بها",
    intSub: "أُنشئت آليًا بناءً على بروتوكول الإنتان السريري",
    interventions: [
      "سحب مزرعة دم فورًا قبل بدء المضاد الحيوي",
      "بدء مضاد حيوي واسع الطيف خلال الساعة القادمة",
      "سوائل وريدية 30 مل/كجم ومراقبة الاستجابة",
      "زيادة تركيز الأكسجين المكمّل ومراقبة SpO2",
      "قياس اللاكتات وإعادة القياس كل 5 دقائق",
      "تجهيز نقل محتمل إلى العناية المركزة",
    ],
    tlTitle: "سجل التنبيهات",
    tlSub: "من رصد المنصة حتى تدخل الفريق الطبي",
    timeline: [
      { time: "12:32",        text: "وصول المريض للطوارئ — العلامات ضمن الحدود الأولية",                                                      badge: "تسجيل",      badgeType: "sent", crit: false },
      { time: "13:47",        text: "رصد نمط تدهور تدريجي — تنبيه مراقبة لطاقم التمريض",                                                      badge: "تم الإرسال", badgeType: "sent", crit: false },
      { time: "14:15",        text: "ارتفاع درجة الخطورة إلى 61 — تنبيه للطبيبة المناوبة د. سارة العتيبي",                                   badge: "تم الاطلاع", badgeType: "ack",  crit: false },
      { time: "14:32 — الآن", text: "تصنيف الحالة «حرج» (87/100) — تنبيه فوري لفريق الاستجابة السريعة والعناية المركزة",                    badge: "عاجل",       badgeType: "crit", crit: true  },
    ],
    chartLabels: ["-3h","-2:30","-2h","-1:30","-1h","-30m","Now","+15m","+30m","+45m","+60m","+90m","+120m"],
    riskScore: "درجة الخطورة",
    footer: "بيانات المريض والقراءات في هذا العرض تجريبية بالكامل لأغراض التصميم فقط.",
  },
  en: {
    dir: "ltr" as const,
    brandSub: "AI-Powered Patient Deterioration Platform — Integrated with DINAMAP Devices",
    toggleBtn: "عربي",
    patientName: "Khaled Abdullah Al-Mutairi",
    mrn: "MRN",
    ageSex: "Age/Sex",
    ageSexVal: "62 / Male",
    location: "Location",
    locationVal: "ED — Bed E-12",
    arrival: "Arrival",
    arrivalVal: "12:32 (2 hrs ago)",
    chiefComplaint: "Chief Complaint: Chest pain and shortness of breath",
    aiLabel: "AI Classification — Updated every minute",
    riskTitle: "Critical — Imminent Deterioration Risk",
    riskDesc: "Rising trend in heart rate and respiratory rate combined with falling blood pressure, SpO₂, and elevated temperature closely matches a septic shock deterioration trajectory. The platform monitors trends, not just instantaneous readings.",
    statLabels: ["Model Accuracy", "Early Warning Score (NEWS2)", "Estimated Time to Critical Threshold"],
    statVals: ["92%", "9 — High", "~45 minutes"],
    vitalsSectionTitle: "Current Vital Signs",
    vitalsSectionHint: "— Present value vs. admission baseline",
    vitals: [
      { name: "Heart Rate" },
      { name: "Blood Pressure (Systolic)" },
      { name: "Oxygen Saturation" },
      { name: "Temperature" },
      { name: "Respiratory Rate" },
    ],
    statusLabels: { critical: "Critical", watch: "Watch", normal: "Normal" },
    baseline: "from baseline",
    chartTitle: "Predicted Risk Trajectory",
    chartSub: "Actual readings vs. AI-predicted risk trend over the next 2 hours",
    legendActual: "Actual readings",
    legendPred: "AI prediction",
    legendThreshold: "Critical threshold (80)",
    callout: ["⚠ At minute ", "+45", " the model predicts the risk score will breach the critical threshold (80) and peak near ", "97", " within 2 hours without intervention."],
    compTitle: "Likely Complications (by probability)",
    compSub: "Based on the combined vital-sign pattern, not any single indicator",
    complications: [
      { name: "Septic Shock",             pct: 78, level: "critical" },
      { name: "Acute Respiratory Failure", pct: 54, level: "critical" },
      { name: "Cardiac Arrhythmia",        pct: 31, level: "watch"    },
    ],
    intTitle: "Recommended Interventions",
    intSub: "Auto-generated based on clinical sepsis protocol",
    interventions: [
      "Draw blood cultures immediately before starting antibiotics",
      "Initiate broad-spectrum antibiotic therapy within the next hour",
      "Administer 30 mL/kg IV fluids and monitor response",
      "Increase supplemental oxygen concentration and monitor SpO2",
      "Measure lactate and recheck every 5 minutes",
      "Prepare for potential transfer to ICU",
    ],
    tlTitle: "Alert Log",
    tlSub: "From platform detection to clinical team response",
    timeline: [
      { time: "12:32",       text: "Patient arrived in ED — vitals within initial limits",                                              badge: "Registered", badgeType: "sent", crit: false },
      { time: "13:47",       text: "Gradual deterioration pattern detected — watch alert sent to nursing staff",                        badge: "Sent",        badgeType: "sent", crit: false },
      { time: "14:15",       text: "Risk score rose to 61 — alert sent to attending physician Dr. Sarah Al-Otaibi",                    badge: "Acknowledged", badgeType: "ack", crit: false },
      { time: "14:32 — Now", text: "Case classified 'Critical' (87/100) — immediate alert to rapid response team and ICU",            badge: "Urgent",      badgeType: "crit", crit: true  },
    ],
    chartLabels: ["-3h","-2:30","-2h","-1:30","-1h","-30m","Now","+15m","+30m","+45m","+60m","+90m","+120m"],
    riskScore: "Risk Score",
    footer: "All patient data and readings in this view are fully simulated for design purposes only.",
  },
} as const;

// ---------- static chart data (labels re-used per lang) ----------
const RISK_LINE =  [22,28,35,44,53,61,71,78,86,91,94,96,97];
const UPPER_BAND = [null,null,null,null,null,null,71,82,90,95,98,99,100] as (number|null)[];
const LOWER_BAND = [null,null,null,null,null,null,71,74,80,86,89,92,93] as (number|null)[];
const NOW_IDX = 6;

function makeChartData(labels: readonly string[]) {
  return labels.map((label, i) => ({
    label,
    riskActual: i <= NOW_IDX ? RISK_LINE[i] : null,
    riskPred:   i >= NOW_IDX ? RISK_LINE[i] : null,
    bandBase:   LOWER_BAND[i],
    bandRange:  (UPPER_BAND[i] != null && LOWER_BAND[i] != null)
      ? (UPPER_BAND[i]! - LOWER_BAND[i]!) : null,
  }));
}

// ---------- vitals raw data (language-agnostic) ----------
const VITALS_DATA = [
  { unit: "bpm",  status: "critical", hist:[88,92,97,104,112,120,128], pred:[128,134,138,141,143,145,146], base:88 },
  { unit: "mmHg", status: "critical", hist:[128,122,115,106,98,92,88],  pred:[88,84,80,77,74,72,71],       base:128, display:"88/56" },
  { unit: "%",    status: "critical", hist:[97,96,95,93,91,90,89],       pred:[89,88,87,86,85,84,84],       base:97 },
  { unit: "°C",   status: "watch",    hist:[37.1,37.4,37.8,38.2,38.5,38.7,38.9], pred:[38.9,39.1,39.3,39.4,39.5,39.6,39.6], base:37.1 },
  { unit: "/min", status: "critical", hist:[16,18,20,23,25,27,28],       pred:[28,30,31,32,33,34,34],       base:16 },
];

// ---------- spark ----------
function Spark({ v }: { v: typeof VITALS_DATA[0] }) {
  const all = [...v.hist, ...v.pred.slice(1)];
  const min = Math.min(...all), max = Math.max(...all);
  const W = 120, H = 34, n = all.length;
  const sx = (i: number) => (i / (n - 1)) * W;
  const sy = (val: number) => H - ((val - min) / ((max - min) || 1)) * H;
  const nowIdx = v.hist.length - 1;
  let actual = "", pred = "";
  all.forEach((val, i) => {
    const px = sx(i).toFixed(1), py = sy(val).toFixed(1);
    if (i <= nowIdx) actual += (i === 0 ? "M" : "L") + `${px},${py} `;
    if (i >= nowIdx) pred   += (i === nowIdx ? "M" : "L") + `${px},${py} `;
  });
  const dot = v.status === "critical" ? "#BE3327" : "#C6871F";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full block" style={{ height: 34 }}>
      <path d={actual} fill="none" stroke="#0E6E69" strokeWidth="2" />
      <path d={pred}   fill="none" stroke={dot}    strokeWidth="2" strokeDasharray="4 3" />
      <circle cx={sx(nowIdx).toFixed(1)} cy={sy(all[nowIdx]).toFixed(1)} r="2.6" fill={dot} />
    </svg>
  );
}

// ---------- tooltip ----------
function RiskTooltip({ active, payload, label, riskScore }: any) {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p: any) => p.dataKey === "riskActual");
  const pred   = payload.find((p: any) => p.dataKey === "riskPred");
  const val = actual?.value ?? pred?.value;
  if (val == null) return null;
  return (
    <div style={{ background: "#0F2529", color: "#fff", borderRadius: 8, padding: "8px 14px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>
      <div style={{ color: "#8CA0A3", marginBottom: 4 }}>{label}</div>
      <div>{riskScore}: <b>{val}</b></div>
    </div>
  );
}

// ---------- shared styles ----------
const SHADOW = "0 1px 2px rgba(15,37,41,.04),0 8px 24px -12px rgba(15,37,41,.14)";
const P: React.CSSProperties = { background: "#fff", border: "1px solid #DCE6E4", borderRadius: 16, padding: "20px 22px", boxShadow: SHADOW };
const H3: React.CSSProperties = { fontSize: 14.5, margin: "0 0 3px", fontWeight: 700 };
const SUB: React.CSSProperties = { fontSize: 12, color: "#4C6469", marginBottom: 14, marginTop: 0 };
const PULSE = `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`;

function StatusDot({ status }: { status: string }) {
  const map: Record<string,[string,string]> = {
    critical: ["#BE3327","0 0 0 3px #FBE8E5"],
    watch:    ["#C6871F","0 0 0 3px #FBF0DD"],
    normal:   ["#2C9A57","0 0 0 3px #E7F5EC"],
  };
  const [bg, shadow] = map[status] ?? map.normal;
  return <span style={{ width:9, height:9, borderRadius:"50%", background:bg, boxShadow:shadow, marginTop:2, flexShrink:0, display:"inline-block" }} />;
}

function SectionTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"26px 0 12px" }}>
      <span style={{ width:4, height:16, background:"#0E6E69", borderRadius:3, display:"inline-block" }} />
      <h2 style={{ fontSize:14.5, fontWeight:700, margin:0 }}>{title}</h2>
      <span style={{ fontSize:12, color:"#8CA0A3" }}>{hint}</span>
    </div>
  );
}

// ---------- app ----------
export default function App() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = T[lang];
  const isRtl = lang === "ar";

  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString(lang === "ar" ? "ar-SA" : "en-GB", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false })
  );
  useEffect(() => {
    const id = setInterval(() =>
      setTime(new Date().toLocaleTimeString(lang === "ar" ? "ar-SA" : "en-GB", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false })), 1000);
    return () => clearInterval(id);
  }, [lang]);

  const chartData = makeChartData(t.chartLabels);

  return (
    <div dir={t.dir} style={{ maxWidth:1220, margin:"0 auto", padding:"20px 24px 56px", fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>
      <style>{PULSE}</style>

      {/* ── language toggle bar ── */}
      <div style={{ display:"flex", justifyContent: isRtl ? "flex-start" : "flex-end", marginBottom:12 }}>
        <button
          onClick={() => setLang(l => l === "ar" ? "en" : "ar")}
          style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"#fff", border:"1px solid #DCE6E4", borderRadius:10,
            padding:"7px 16px", cursor:"pointer", boxShadow:SHADOW,
            fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:13, fontWeight:600,
            color:"#0E6E69", transition:"background .15s,border-color .15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="#E1EFEC"; (e.currentTarget as HTMLButtonElement).style.borderColor="#0E6E69"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="#fff";    (e.currentTarget as HTMLButtonElement).style.borderColor="#DCE6E4"; }}
        >
          <span style={{ fontSize:15 }}>{lang === "ar" ? "🇬🇧" : "🇸🇦"}</span>
          {t.toggleBtn}
        </button>
      </div>

      {/* ── topbar ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 4px 20px", borderBottom:"1px solid #DCE6E4", marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(155deg,#0E6E69,#0A4F4C)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'IBM Plex Mono',monospace", fontWeight:700, fontSize:15, letterSpacing:".5px", boxShadow:SHADOW }}>Px</div>
          <div>
            <h1 style={{ fontSize:17, margin:0, fontWeight:700 }}>PredixAI</h1>
            <p style={{ margin:"1px 0 0", fontSize:12, color:"#4C6469" }}>{t.brandSub}</p>
          </div>
        </div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:"#4C6469", background:"#fff", border:"1px solid #DCE6E4", padding:"6px 12px", borderRadius:8, display:"flex", alignItems:"center", gap:8 }}>
          {time}
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#BE3327", animation:"pulse 1.8s infinite", display:"inline-block" }} />
        </div>
      </div>

      {/* ── patient strip ── */}
      <div style={{ display:"flex", alignItems:"center", gap:18, background:"#fff", border:"1px solid #DCE6E4", borderRadius:14, padding:"16px 20px", boxShadow:SHADOW, marginBottom:16, flexWrap:"wrap" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:"#E1EFEC", color:"#0A4F4C", fontWeight:700, fontSize:19, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          {lang === "ar" ? "خ.م" : "KM"}
        </div>
        <div>
          <p style={{ fontSize:16, fontWeight:700, margin:0 }}>{t.patientName}</p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginTop:4 }}>
            {([
              [t.mrn, "MRN-88231"],
              [t.ageSex, t.ageSexVal],
              [t.location, t.locationVal],
              [t.arrival, t.arrivalVal],
            ] as [string,string][]).map(([k,v]) => (
              <span key={k} style={{ fontSize:12.5, color:"#4C6469" }}>
                {k}: <b style={{ color:"#0F2529", fontFamily:"'IBM Plex Mono',monospace", fontWeight:600 }}>{v}</b>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginInlineStart:"auto", background:"#FBF0DD", color:"#8A5A0F", borderRadius:8, padding:"8px 14px", fontSize:12.5, fontWeight:500 }}>
          {t.chiefComplaint}
        </div>
      </div>

      {/* ── risk banner ── */}
      <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(115deg,#2B1414 0%,#4A1E19 45%,#6B241C 100%)", borderRadius:16, padding:"26px 28px", color:"#fff", marginBottom:22, boxShadow:"0 12px 32px -14px rgba(190,51,39,.45)" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 85% 20%,rgba(255,255,255,.08),transparent 55%)", pointerEvents:"none" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:20, flexWrap:"wrap", position:"relative" }}>
          <div>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.22)", padding:"5px 12px", borderRadius:100, fontSize:12, fontWeight:600, letterSpacing:".3px" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#FF7A66", animation:"pulse 1.8s infinite", display:"inline-block" }} />
              {t.aiLabel}
            </span>
            <div style={{ display:"flex", alignItems:"baseline", gap:10, marginTop:14 }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:52, fontWeight:700, lineHeight:1 }}>87</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, color:"rgba(255,255,255,.6)" }}>/ 100</span>
            </div>
            <div style={{ fontSize:19, fontWeight:700, margin:"8px 0 6px" }}>{t.riskTitle}</div>
            <div style={{ fontSize:13.5, color:"rgba(255,255,255,.82)", maxWidth:640, lineHeight:1.9 }}>{t.riskDesc}</div>
          </div>
          <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
            {t.statLabels.map((k, i) => (
              <div key={k} style={{ minWidth:120 }}>
                <div style={{ fontSize:11.5, color:"rgba(255,255,255,.6)", marginBottom:2 }}>{k}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:18, fontWeight:600 }}>{t.statVals[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── vitals ── */}
      <SectionTitle title={t.vitalsSectionTitle} hint={t.vitalsSectionHint} />
      <div className="vitals-responsive" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:8 }}>
        {VITALS_DATA.map((v, i) => {
          const name = t.vitals[i].name;
          const cur = "display" in v ? v.display! : v.pred[0];
          const delta = v.pred[0] - v.base;
          const sign = delta >= 0 ? "▲" : "▼";
          const lbl = t.statusLabels[v.status as keyof typeof t.statusLabels];
          return (
            <div key={name} style={{ background:"#fff", border:"1px solid #DCE6E4", borderRadius:14, padding:"14px 15px 12px", boxShadow:SHADOW }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <span style={{ fontSize:12, color:"#4C6469", fontWeight:500 }}>{name}</span>
                <StatusDot status={v.status} />
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:26, fontWeight:700, marginTop:6 }}>
                {cur}<span style={{ fontSize:11, color:"#8CA0A3", fontWeight:400, marginInlineStart:3 }}>{v.unit}</span>
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11.5, fontWeight:600, marginTop:2, color:"#BE3327" }}>
                {sign} {Math.abs(delta).toFixed(delta % 1 !== 0 ? 1 : 0)} {t.baseline} · {lbl}
              </div>
              <Spark v={v} />
            </div>
          );
        })}
      </div>

      {/* ── row 1: chart + complications ── */}
      <div className="main-grid-responsive" style={{ display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:16, alignItems:"start", marginTop:16 }}>
        <div style={P}>
          <h3 style={H3}>{t.chartTitle}</h3>
          <p style={SUB}>{t.chartSub}</p>
          <div style={{ display:"flex", gap:18, marginBottom:10, flexWrap:"wrap" }}>
            {[
              { label:t.legendActual,    color:"#0E6E69", dash:false },
              { label:t.legendPred,      color:"#4A3FC9", dash:true  },
              { label:t.legendThreshold, color:"#BE3327", dash:true  },
            ].map(({ label, color, dash }) => (
              <span key={label} style={{ fontSize:11.5, color:"#4C6469", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:20, height:3, borderRadius:2, display:"inline-block", background: dash ? `repeating-linear-gradient(90deg,${color} 0 5px,transparent 5px 9px)` : color }} />
                {label}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={chartData} margin={{ top:4, right:8, left:-20, bottom:0 }}>
              <CartesianGrid stroke="#E5ECEA" strokeWidth={1} vertical={false} />
              <XAxis dataKey="label" tick={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10 }} tickLine={false} axisLine={false} reversed={isRtl} />
              <YAxis domain={[0,105]} tick={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10 }} tickLine={false} axisLine={false} orientation={isRtl ? "right" : "left"} />
              <Tooltip content={<RiskTooltip riskScore={t.riskScore} />} />
              <Area type="monotone" dataKey="bandBase"  stackId="band" fill="transparent"             stroke="none" connectNulls legendType="none" activeDot={false} />
              <Area type="monotone" dataKey="bandRange" stackId="band" fill="rgba(74,63,201,0.12)"   stroke="none" connectNulls legendType="none" activeDot={false} />
              <ReferenceLine y={80} stroke="#BE3327" strokeDasharray="5 4" strokeWidth={1.5} />
              <Line type="monotone" dataKey="riskActual" stroke="#0E6E69" strokeWidth={2.5} dot={(props: any) => {
                const { cx, cy, index } = props;
                if (index === NOW_IDX) return <circle key={index} cx={cx} cy={cy} r={5} fill="#4A3FC9" stroke="#fff" strokeWidth={2} />;
                return <circle key={index} cx={cx} cy={cy} r={2.5} fill="#0E6E69" stroke="#fff" strokeWidth={1.5} />;
              }} connectNulls activeDot={false} legendType="none" />
              <Line type="monotone" dataKey="riskPred" stroke="#4A3FC9" strokeWidth={2.5} strokeDasharray="6 4" dot={(props: any) => {
                const { cx, cy, index } = props;
                if (index === NOW_IDX) return <></>;
                return <circle key={index} cx={cx} cy={cy} r={2.5} fill="#4A3FC9" stroke="#fff" strokeWidth={1.5} />;
              }} connectNulls activeDot={false} legendType="none" />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ marginTop:12, background:"#ECEAFA", border:"1px solid #D9D5F5", borderRadius:10, padding:"10px 14px", fontSize:12.5, color:"#33297F", display:"flex", gap:8, alignItems:"flex-start", lineHeight:1.7 }}>
            {t.callout[0]}<b style={{ fontFamily:"'IBM Plex Mono',monospace" }}>{t.callout[1]}</b>{t.callout[2]}<b style={{ fontFamily:"'IBM Plex Mono',monospace" }}>{t.callout[3]}</b>{t.callout[4]}
          </div>
        </div>

        <div style={P}>
          <h3 style={H3}>{t.compTitle}</h3>
          <p style={SUB}>{t.compSub}</p>
          {t.complications.map((c) => (
            <div key={c.name} style={{ marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                <span style={{ fontWeight:600 }}>{c.name}</span>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontWeight:700, color:c.level==="critical"?"#BE3327":"#C6871F" }}>{c.pct}%</span>
              </div>
              <div style={{ height:7, background:"#F1F5F4", borderRadius:6, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${c.pct}%`, borderRadius:6, transition:"width .6s ease", background:c.level==="critical"?"linear-gradient(90deg,#D8534A,#BE3327)":"linear-gradient(90deg,#E3A94C,#C6871F)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── row 2: interventions + timeline ── */}
      <div className="main-grid-responsive" style={{ display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:16, alignItems:"start", marginTop:16 }}>
        <div style={P}>
          <h3 style={H3}>{t.intTitle}</h3>
          <p style={SUB}>{t.intSub}</p>
          <ul style={{ listStyle:"none", margin:0, padding:0 }}>
            {t.interventions.map((item, i) => (
              <li key={i} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:i<t.interventions.length-1?"1px dashed #DCE6E4":"none", fontSize:13, lineHeight:1.7 }}>
                <span style={{ width:18, height:18, borderRadius:5, border:"2px solid #0E6E69", flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center", color:"#0E6E69", fontSize:12, fontWeight:700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={P}>
          <h3 style={H3}>{t.tlTitle}</h3>
          <p style={SUB}>{t.tlSub}</p>
          <ul style={{ listStyle:"none", margin:0, padding:0 }}>
            {t.timeline.map((item, i) => (
              <li key={i} style={{ position:"relative", paddingInlineEnd:26, paddingBottom:i<t.timeline.length-1?18:0 }}>
                <span style={{ position:"absolute", top:4, insetInlineEnd:0, width:10, height:10, borderRadius:"50%", background:"#fff", border:`2px solid ${item.crit?"#BE3327":"#0E6E69"}`, display:"block" }} />
                {i < t.timeline.length-1 && <span style={{ position:"absolute", top:16, insetInlineEnd:4, width:2, height:"calc(100% - 6px)", background:"#DCE6E4", display:"block" }} />}
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11.5, color:"#8CA0A3" }}>{item.time}</div>
                <div style={{ fontSize:13, marginTop:2, lineHeight:1.6 }}>
                  {item.text}
                  <span style={{ display:"inline-block", fontSize:10.5, padding:"2px 8px", borderRadius:100, marginInlineStart:6, fontWeight:600,
                    ...(item.badgeType==="crit" ? { background:"#FBE8E5", color:"#BE3327" }
                      : item.badgeType==="ack"  ? { background:"#E7F5EC", color:"#1F7A42" }
                      :                           { background:"#E1EFEC", color:"#0A4F4C" })
                  }}>{item.badge}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop:26, textAlign:"center", fontSize:11.5, color:"#8CA0A3" }}>{t.footer}</div>
    </div>
  );
}
