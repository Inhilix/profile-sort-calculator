import type { ProfileData } from "../../hooks/useProfileScore";

interface Props { data: ProfileData; onChange: (d: Partial<ProfileData>) => void; errors: Record<string,string>; }

export default function AcademicStep({ data, onChange, errors }: Props) {
  return (
    <div className="step">
      <h2>Academic Background</h2>
      <p className="step-desc">Enter your most recent academic results.</p>

      <div className="field-row">
        <div className="field">
          <label>GPA</label>
          <input type="number" step="0.01" min="0" max="10" value={data.gpa || ""}
            onChange={e => onChange({ gpa: parseFloat(e.target.value) || 0 })} />
          {errors.gpa && <span className="error">{errors.gpa}</span>}
        </div>
        <div className="field">
          <label>GPA Scale</label>
          <select value={data.gpaScale} onChange={e => onChange({ gpaScale: parseFloat(e.target.value) })}>
            <option value={4}>4.0</option>
            <option value={5}>5.0</option>
            <option value={10}>10.0</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>IELTS Overall</label>
          <input type="number" step="0.5" min="0" max="9" value={data.ielts || ""}
            onChange={e => onChange({ ielts: parseFloat(e.target.value) || 0 })} />
          {errors.ielts && <span className="error">{errors.ielts}</span>}
        </div>
        <div className="field">
          <label>IELTS Writing Band</label>
          <input type="number" step="0.5" min="0" max="9" value={data.ieltsWriting || ""}
            onChange={e => onChange({ ieltsWriting: parseFloat(e.target.value) || 0 })} />
        </div>
      </div>
    </div>
  );
}
