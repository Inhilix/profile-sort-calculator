import { useState, useReducer } from "react";
import { calcScore } from './hooks/useProfileScore';
import type { ProfileData } from './hooks/useProfileScore';
import AcademicStep from "./components/steps/AcademicStep";
import FinancialStep from "./components/steps/FinancialStep";
import ScoreCard from "./components/ScoreCard";

const STEPS = ["Academic", "Financial & Experience", "Your Score"];

const initial: ProfileData = { gpa: 0, gpaScale: 4, ielts: 0, ieltsWriting: 0, financialProof: 0, workMonths: 0, gapYears: 0 };

function reducer(state: ProfileData, patch: Partial<ProfileData>): ProfileData {
  return { ...state, ...patch };
}

function validate(step: number, data: ProfileData): Record<string,string> {
  const e: Record<string,string> = {};
  if (step === 0) {
    if (!data.gpa || data.gpa <= 0) e.gpa = "GPA is required";
    if (!data.ielts || data.ielts <= 0) e.ielts = "IELTS score is required";
  }
  if (step === 1) {
    if (!data.financialProof || data.financialProof <= 0) e.financialProof = "Financial proof amount is required";
  }
  return e;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [data, dispatch] = useReducer(reducer, initial);
  const [errors, setErrors] = useState<Record<string,string>>({});

  function next() {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  }

  const score = calcScore(data);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Profile Score Calculator</h1>
        <p>Find out how competitive your academic profile is for studying abroad.</p>
      </header>

      <div className="stepper">
        {STEPS.map((label, i) => (
          <div key={label} className={`step-indicator ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <div className="step-dot">{i < step ? "✓" : i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="card">
        {step === 0 && <AcademicStep data={data} onChange={dispatch} errors={errors} />}
        {step === 1 && <FinancialStep data={data} onChange={dispatch} errors={errors} />}
        {step === 2 && <ScoreCard result={score} />}

        <div className="btn-row">
          {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
          {step < 2 && <button className="btn btn-primary" onClick={next}>Next →</button>}
          {step === 2 && <button className="btn btn-secondary" onClick={() => { setStep(0); }}>Start over</button>}
        </div>
      </div>

      {step < 2 && (
        <div className="live-score">
          <span>Live score: </span>
          <strong style={{ color: score.band === "Strong" ? "#276749" : score.band === "Moderate" ? "#975a16" : "#c53030" }}>
            {score.total}/100 — {score.band}
          </strong>
        </div>
      )}
    </div>
  );
}
