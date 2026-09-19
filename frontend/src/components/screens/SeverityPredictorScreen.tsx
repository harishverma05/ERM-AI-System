import React, { useState } from 'react';

export const SeverityPredictorScreen: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Caller reports high-pressure natural gas leak behind commercial bakery. Loud hissing heard, strong sulfur odor spreading toward elementary school playground. 3 bystanders exhibiting dizziness.'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    tier: string;
    confidence: number;
    f1Score: number;
    recommendedLevel: string;
    actionUnits: string[];
    evacRadius: string;
    tokens: { word: string; weight: string; severity: 'high' | 'med' | 'alert' }[];
  }>({
    tier: 'TIER-1 CRITICAL',
    confidence: 96.8,
    f1Score: 0.941,
    recommendedLevel: 'Level 1 Immediate Response',
    actionUnits: ['HAZ-01', 'FIRE-02', 'AMB-04', 'POL-01 (Perimeter)'],
    evacRadius: '300 meters immediate',
    tokens: [
      { word: 'High-pressure gas leak', weight: '+0.42', severity: 'high' },
      { word: 'School playground proximity', weight: '+0.38', severity: 'alert' },
      { word: 'Bystanders dizziness', weight: '+0.25', severity: 'high' },
      { word: 'Commercial bakery', weight: '+0.12', severity: 'med' }
    ]
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        tier: inputText.toLowerCase().includes('fire') || inputText.toLowerCase().includes('trapped') || inputText.toLowerCase().includes('gas') ? 'TIER-1 CRITICAL' : 'TIER-2 ELEVATED',
        confidence: 97.4,
        f1Score: 0.948,
        recommendedLevel: 'Level 1 Immediate Multi-Agency CAD Alert',
        actionUnits: ['FIRE-01', 'AMB-03', 'HAZ-01', 'POL-02'],
        evacRadius: '250-400 meters',
        tokens: [
          { word: 'Trapped / Life Risk', weight: '+0.48', severity: 'high' },
          { word: 'Structural Hazard', weight: '+0.34', severity: 'alert' },
          { word: 'Casualty Threat', weight: '+0.29', severity: 'high' },
          { word: 'Atmospheric Dispersion', weight: '+0.15', severity: 'med' }
        ]
      });
    }, 800);
  };

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">psychology</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">
              AI Severity Predictor &amp; NLP Classifier
            </h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Real-time transformer model • Semantic token risk scoring • Automated casualty projection
          </p>
        </div>
        <span className="font-code-telemetry text-xs text-[#4cd7f6] bg-[#1a1f30] px-3 py-1.5 rounded border border-[#25293a] font-semibold">
          MODEL: TRANSFORMER-CAD-V4.2
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] flex flex-col gap-4">
          <span className="text-sm font-bold text-[#dee1f9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">edit_note</span>
            Dispatch Call Narrative Input
          </span>

          <form onSubmit={handlePredict} className="flex flex-col gap-3">
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-[#080d1d] text-[#dee1f9] text-xs p-3 rounded border border-[#25293a] focus:border-[#4cd7f6] focus:outline-none font-sans leading-relaxed"
              placeholder="Enter dispatcher narrative or citizen audio transcript..."
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#64748b]">
                Tokens analyzed: {inputText.split(' ').length} words
              </span>
              <button
                type="submit"
                disabled={analyzing}
                className="px-5 py-2.5 bg-[#4cd7f6] hover:bg-[#03b5d3] text-[#003640] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {analyzing ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    <span>Computing Attention Weights...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">neurology</span>
                    <span>Run Severity Prediction</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preset scenarios */}
          <div className="pt-2 border-t border-[#25293a]">
            <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold block mb-2">
              Quick Test Scenarios
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Chemical Spill Hwy 7', text: 'Overturned tanker truck leaking unidentified liquid with visible vapors on Highway 7. Driver unconscious in cab.' },
                { label: 'Subway Smoke Alarm', text: 'Transit control reporting smoke filling platform at 8th St Subway Station. Power cuts reported, passengers evacuating.' },
                { label: 'Apartment Flashover', text: '3rd floor apartment fire spreading through stairwell. Flames breaching roof, 4 residents waving from balcony.' }
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setInputText(s.text)}
                  className="text-[11px] px-2.5 py-1 bg-[#1a1f30] hover:bg-[#25293a] text-[#dee1f9] rounded border border-[#25293a] transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Model Inference Results */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-[#161b2b] p-4 rounded-lg border border-[#ff5451]/40 flex flex-col gap-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#64748b] uppercase tracking-wider font-semibold">
                MODEL INFERENCE OUTPUT
              </span>
              <span className="font-code-telemetry text-xs px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-bold">
                {result.tier}
              </span>
            </div>

            <div className="p-3 bg-[#080d1d] rounded border border-[#25293a]">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="text-[#94a3b8]">Confidence Score</span>
                <span className="text-[#4cd7f6] font-bold font-code-telemetry">{result.confidence}%</span>
              </div>
              <div className="w-full bg-[#161b2b] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4cd7f6] h-full rounded-full" style={{ width: `${result.confidence}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px] font-code-telemetry text-[#64748b]">
                <span>F1-Score: {result.f1Score}</span>
                <span>Latency: 48ms</span>
              </div>
            </div>

            {/* Semantic Tokens */}
            <div>
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold block mb-1.5">
                Top Attention Attributions
              </span>
              <div className="flex flex-col gap-1.5 font-code-telemetry text-xs">
                {result.tokens.map((t) => (
                  <div key={t.word} className="flex items-center justify-between p-2 rounded bg-[#080d1d] border border-[#25293a]">
                    <span className="text-[#dee1f9]">{t.word}</span>
                    <span className={`font-bold ${t.severity === 'high' ? 'text-[#ff5451]' : 'text-[#ffb95f]'}`}>
                      {t.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Units */}
            <div className="p-3 bg-[#1a1f30] rounded border border-[#25293a] flex flex-col gap-1 text-xs">
              <span className="text-[#4cd7f6] font-bold uppercase tracking-wider text-[10px]">
                Recommended Fleet Complement
              </span>
              <p className="font-code-telemetry text-[#dee1f9] font-bold">
                {result.actionUnits.join(' • ')}
              </p>
              <span className="text-[#94a3b8] text-[11px] mt-1">
                Suggested Evac Perimeter: <strong>{result.evacRadius}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
