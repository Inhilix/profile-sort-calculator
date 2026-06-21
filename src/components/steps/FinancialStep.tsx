import type { ProfileData } from "../../hooks/useProfileScore";

interface Props { data: ProfileData; onChange: (d: Partial<ProfileData>) => void; errors: Record<string,string>; }

export default function FinancialStep({ data, onChange, errors }: Props) {
  return (
    <div className="step">
      <h2>Financial & Experience</h2>
      <p className="step-desc">This information affects your visa eligibility score.</p>

      <div className="field">
        <label>Monthly Financial Proof (USD)</label>
        <input type="number" min="0" value={data.financialProof || ""}
          onChange={e => onChange({ financialProof: parseFloat(e.target.value) || 0 })} />
        <span className="hint">Amount you can show in bank statements per month</span>
        {errors.financialProof && <span className="error">{errors.financialProof}</span>}
      </div>

      <div className="field-row">
        <div className="field">
          <label>Work Experience (months)</label>
          <input type="number" min="0" value={data.workMonths || ""}
            onChange={e => onChange({ workMonths: parseInt(e.target.value) || 0 })} />
        </div>
        <div className="field">
          <label>Gap Years</label>
          <input type="number" min="0" max="10" value={data.gapYears || ""}
            onChange={e => onChange({ gapYears: parseInt(e.target.value) || 0 })} />
          <span className="hint">Years after study before enrolling again</span>
        </div>
      </div>
    </div>
  );
}
