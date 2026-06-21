import type { ScoreResult } from "../hooks/useProfileScore";

interface Props { result: ScoreResult }

const bandColors: Record<string, string> = {
  Strong: "#276749",
  Moderate: "#975a16",
  Weak: "#c05621",
  "Not Viable": "#c53030",
};

const bandBg: Record<string, string> = {
  Strong: "#f0fff4",
  Moderate: "#fffbeb",
  Weak: "#fff5f0",
  "Not Viable": "#fff5f5",
};

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ background: "#e2e8f0", borderRadius: 4, overflow: "hidden", height: 10, marginTop: 4 }}>
      <div style={{ width: `${(value / max) * 100}%`, background: color, height: "100%", transition: "width .5s ease", borderRadius: 4 }} />
    </div>
  );
}

export default function ScoreCard({ result }: Props) {
  const color = bandColors[result.band];
  const bg = bandBg[result.band];
  const { breakdown } = result;

  return (
    <div className="score-card" style={{ borderColor: color }}>
      <div className="score-header" style={{ background: bg }}>
        <div className="score-circle" style={{ borderColor: color, color }}>
          <span className="score-num">{result.total}</span>
          <span className="score-denom">/100</span>
        </div>
        <div>
          <div className="score-band" style={{ color }}>{result.band}</div>
          <p className="score-verdict">{result.verdict}</p>
        </div>
      </div>

      <div className="score-breakdown">
        <h4>Score Breakdown</h4>
        {[
          { label: "GPA", value: breakdown.gpa, max: 40 },
          { label: "IELTS", value: breakdown.ielts, max: 30 },
          { label: "Financial", value: breakdown.financial, max: 20 },
          { label: "Experience", value: breakdown.experience, max: 10 },
        ].map(row => (
          <div key={row.label} className="breakdown-row">
            <div className="breakdown-label">
              <span>{row.label}</span>
              <span>{row.value}/{row.max}</span>
            </div>
            <Bar value={row.value} max={row.max} color={color} />
          </div>
        ))}
      </div>
    </div>
  );
}
