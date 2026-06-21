export interface ProfileData {
  gpa: number;
  gpaScale: number;
  ielts: number;
  ieltsWriting: number;
  financialProof: number;
  workMonths: number;
  gapYears: number;
}

export interface ScoreResult {
  total: number;
  band: "Strong" | "Moderate" | "Weak" | "Not Viable";
  breakdown: { gpa: number; ielts: number; financial: number; experience: number };
  verdict: string;
}

export function calcScore(p: ProfileData): ScoreResult {
  // GPA — 0 to 40
  const gpaRatio = p.gpa / p.gpaScale;
  const gpaScore = gpaRatio >= 0.9 ? 40 : gpaRatio >= 0.8 ? 32 : gpaRatio >= 0.7 ? 22 : gpaRatio >= 0.6 ? 12 : 4;

  // IELTS — 0 to 30
  const ieltsScore = p.ielts >= 7.5 ? 30 : p.ielts >= 7.0 ? 24 : p.ielts >= 6.5 ? 18 : p.ielts >= 6.0 ? 10 : 3;

  // Financial — 0 to 20
  const finScore = p.financialProof >= 2000 ? 20 : p.financialProof >= 1500 ? 15 : p.financialProof >= 1000 ? 10 : p.financialProof >= 500 ? 5 : 0;

  // Experience — 0 to 10
  const expScore = Math.max(0, Math.min(10, Math.floor(p.workMonths / 6) * 3 - p.gapYears * 2));

  const total = gpaScore + ieltsScore + finScore + expScore;
  const band = total >= 80 ? "Strong" : total >= 60 ? "Moderate" : total >= 40 ? "Weak" : "Not Viable";

  const verdicts: Record<string, string> = {
    Strong: "Your profile is competitive for most universities in your target countries.",
    Moderate: "Your profile meets requirements for many universities. Focus on IELTS and financial proof to improve.",
    Weak: "Your profile needs improvement before applying. Retake IELTS or strengthen your financial documents.",
    "Not Viable": "Your current profile is unlikely to result in a successful application. Significant improvements are required.",
  };

  return { total, band, breakdown: { gpa: gpaScore, ielts: ieltsScore, financial: finScore, experience: expScore }, verdict: verdicts[band] };
}
