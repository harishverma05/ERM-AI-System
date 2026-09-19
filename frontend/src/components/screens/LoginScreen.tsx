import React, { useState } from 'react';
import { UserRole } from '../../types';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('john.doe@erm.gov');
  const [password, setPassword] = useState('EmergencySecurePass#99');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setEmail('john.doe@erm.gov');
    } else if (newRole === 'coordinator') {
      setEmail('coord.dispatcher@erm.gov');
    } else {
      setEmail('unit04.tactical@erm.gov');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    setTimeout(() => {
      setIsLoading(false);
      setFeedback({
        type: 'success',
        text: '✓ Biometric & Token clearance verified. Launching Incident Board...'
      });
      setTimeout(() => {
        onLoginSuccess(role);
      }, 700);
    }, 900);
  };

  const handleSSO = () => {
    setFeedback({
      type: 'info',
      text: 'Connecting to Federal PIV/CAC Hardware Module...'
    });
    setTimeout(() => {
      setFeedback({
        type: 'success',
        text: '✓ PIV Card inserted: Commander clearance accepted. Launching...'
      });
      setTimeout(() => {
        onLoginSuccess('admin');
      }, 700);
    }, 1000);
  };

  return (
    <main className="w-full min-h-screen bg-[#080d1d] flex items-center justify-center p-3 md:p-6 select-none">
      <div className="flex flex-col w-full min-h-[921px] justify-center items-center p-2 md:p-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          
          {/* LEFT PANEL: Command Center Overview & Live Telemetry */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 rounded-xl bg-[#161b2b] relative overflow-hidden shadow-xl border border-[#25293a]">
            {/* Ambient Glow & Tactical Radar Vectors */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ff5451]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#4cd7f6]/10 blur-3xl pointer-events-none" />
            
            {/* Subtle Decorative Radar Grid Graphic */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-80 h-80 opacity-20 pointer-events-none">
              <svg className="w-full h-full text-[#4cd7f6] stroke-current fill-none" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="20" strokeDasharray="2 2" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="50" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="80" strokeDasharray="4 4" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="95" strokeWidth="0.5" />
                <line strokeDasharray="3 3" strokeWidth="0.5" x1="100" x2="100" y1="5" y2="195" />
                <line strokeDasharray="3 3" strokeWidth="0.5" x1="5" x2="195" y1="100" y2="100" />
                <circle className="fill-[#ff5451] stroke-none animate-ping" cx="100" cy="50" r="3" />
                <circle className="fill-[#4cd7f6] stroke-none" cx="140" cy="120" r="2.5" />
                <circle className="fill-[#ffb95f] stroke-none" cx="65" cy="135" r="2" />
              </svg>
            </div>

            {/* Top Branding Section */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#2f3446] flex items-center justify-center shadow-md p-1 border border-[#25293a]">
                  <span className="material-symbols-outlined text-[#ffb3ad] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    emergency_home
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-wider text-[#dee1f9] uppercase font-sans">
                      AI-ERM TACTICAL
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ff5451]/15 text-[#ffb3ad] uppercase tracking-widest border border-[#ff5451]/30">
                      v4.8 Live
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] tracking-wider font-semibold">
                    EMERGENCY RESPONSE MANAGEMENT OS
                  </p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-[#dee1f9] mb-2 tracking-tight">
                Next-Gen Incident Command &amp; Autonomous Triage
              </h1>
              <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed">
                Intelligent Emergency Response powered by Machine Learning + Real-time IoT. Sub-second resource dispatch and multi-agency coordination.
              </p>
            </div>

            {/* Operational Stats Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
              {/* Stat 1: Active Incidents */}
              <div className="bg-[#1a1f30] p-4 rounded-xl shadow-md border border-[#25293a] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
                    Active Incidents
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#ff5451] font-code-telemetry">
                    <span className="w-2 h-2 rounded-full bg-[#ff5451] animate-ping" /> LIVE
                  </span>
                </div>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl font-extrabold text-[#dee1f9] font-stat-metric">12</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#ff5451]/15 text-[#ffb3ad] font-semibold">
                    ▲ 3 since last hour
                  </span>
                </div>
                <p className="text-xs text-[#ffb3ad] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  3 Classified as Critical Tier 1
                </p>
              </div>

              {/* Stat 2: AI Model Accuracy */}
              <div className="bg-[#1a1f30] p-4 rounded-xl shadow-md border border-[#25293a] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b] uppercase tracking-wider font-semibold">
                    AI Model Accuracy
                  </span>
                  <span className="material-symbols-outlined text-[#4cd7f6] text-xl">neurology</span>
                </div>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl font-extrabold text-[#4cd7f6] font-code-telemetry">94.7%</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6] font-semibold">
                    F1: 0.938
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] truncate">
                  Severity NLP &amp; Geo-spatial confidence
                </p>
              </div>

              {/* Stat 3: Autonomous AI Dispatch Recommendation */}
              <div className="sm:col-span-2 bg-[#25293a] p-4 rounded-xl shadow-md border border-[#4cd7f6]/30">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">route</span>
                    <span className="text-xs uppercase text-[#4cd7f6] font-bold tracking-wider">
                      AI Dispatch Recommendation #842
                    </span>
                  </div>
                  <span className="font-code-telemetry text-xs bg-[#4cd7f6]/10 text-[#4cd7f6] px-2 py-0.5 rounded-full border border-[#4cd7f6]/20">
                    Optimized via ML-Route
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#dee1f9]">
                  Deploy <span className="text-[#ff5451] font-bold">AMB-03</span> to <span className="text-[#4cd7f6] font-bold">Zone 4 (Oak &amp; 5th)</span> via Oak St Expressway
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#94a3b8]">
                  <span className="flex items-center gap-1 text-[#4cd7f6] font-code-telemetry font-bold">
                    <span className="material-symbols-outlined text-[14px]">timer</span> ETA 4.2 min
                  </span>
                  <span className="flex items-center gap-1 text-[#ffb95f]">
                    <span className="material-symbols-outlined text-[14px]">speed</span> 2.1 min faster than alternatives
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Quick Telemetry Bar */}
            <div className="relative z-10 grid grid-cols-3 gap-2 bg-[#080d1d] p-3 rounded-lg border border-[#25293a] shadow-inner">
              <div className="flex flex-col items-center justify-center p-1 text-center">
                <span className="font-code-telemetry text-lg text-[#dee1f9] font-bold">7</span>
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Units Deployed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 text-center border-x border-[#25293a]">
                <span className="font-code-telemetry text-lg text-[#4cd7f6] font-bold">6.2m</span>
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Avg Response</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 text-center">
                <span className="font-code-telemetry text-lg text-[#ffb95f] font-bold">24</span>
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">IoT Nodes Online</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Command Account Sign In */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1a1f30] p-6 md:p-8 rounded-xl shadow-2xl border border-[#25293a] relative">
            <div>
              {/* Security Header & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#2f3446] rounded-full border border-[#25293a]">
                  <span className="material-symbols-outlined text-[#ff5451] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    security
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#dee1f9]">Gov-Grade 256-Bit</span>
                </div>
                <span className="font-code-telemetry text-[11px] text-[#64748b] flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6]" /> GATEWAY: S2-US-EAST
                </span>
              </div>

              {/* Form Heading */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#dee1f9]">Welcome back</h2>
                <p className="text-xs text-[#94a3b8] mt-0.5">Sign in to your authorized tactical console</p>
              </div>

              {/* Role Selector Tabs */}
              <div className="mb-5">
                <label className="block text-[11px] text-[#64748b] uppercase tracking-wider mb-1.5 font-semibold">
                  Operational Role
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#080d1d] p-1 rounded-lg border border-[#25293a]">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    className={`py-2 px-1 text-center rounded text-xs uppercase transition-colors font-bold ${
                      role === 'admin'
                        ? 'bg-[#ff5451] text-[#5c0008] shadow-sm'
                        : 'text-[#64748b] hover:text-[#dee1f9]'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('coordinator')}
                    className={`py-2 px-1 text-center rounded text-xs uppercase transition-colors font-bold ${
                      role === 'coordinator'
                        ? 'bg-[#ff5451] text-[#5c0008] shadow-sm'
                        : 'text-[#64748b] hover:text-[#dee1f9]'
                    }`}
                  >
                    Coordinator
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('field')}
                    className={`py-2 px-1 text-center rounded text-xs uppercase transition-colors font-bold ${
                      role === 'field'
                        ? 'bg-[#ff5451] text-[#5c0008] shadow-sm'
                        : 'text-[#64748b] hover:text-[#dee1f9]'
                    }`}
                  >
                    Field Officer
                  </button>
                </div>
              </div>

              {/* Auth Form */}
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                {/* Workstation / Email Input */}
                <div>
                  <label className="block text-[11px] text-[#dee1f9] uppercase tracking-wider mb-1 font-semibold" htmlFor="login-email">
                    Command ID or Gov Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px]">
                      badge
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator.id@agency.gov"
                      className="w-full bg-[#080d1d] text-[#dee1f9] text-xs pl-10 pr-3 py-2.5 rounded-lg border border-[#25293a] focus:outline-none focus:border-[#4cd7f6] placeholder-[#64748b] transition-all font-code-telemetry"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-[11px] text-[#dee1f9] uppercase tracking-wider mb-1 font-semibold" htmlFor="login-pass">
                    Terminal Passcode / Token
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px]">
                      lock
                    </span>
                    <input
                      id="login-pass"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#080d1d] text-[#dee1f9] text-xs pl-10 pr-10 py-2.5 rounded-lg border border-[#25293a] focus:outline-none focus:border-[#4cd7f6] placeholder-[#64748b] tracking-wider transition-all font-code-telemetry"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#dee1f9] focus:outline-none flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#94a3b8] hover:text-[#dee1f9]">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded bg-[#080d1d] border-[#25293a] text-[#ff5451] focus:ring-0 w-3.5 h-3.5 cursor-pointer accent-[#ff5451]"
                    />
                    <span>Remember workstation</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedback({
                        type: 'info',
                        text: 'Authorization Reset: Contact Central Command Network Operations Center at ext. 9110.'
                      });
                    }}
                    className="text-[#4cd7f6] hover:underline font-medium cursor-pointer"
                  >
                    Contact SOC
                  </button>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-[#ff5451] text-[#5c0008] hover:bg-[#ffb3ad] font-bold text-xs py-3 px-4 rounded-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-[#ff5451]/20 flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-75"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      <span>Authenticating terminal...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Command Center</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>

                {/* Feedback message box */}
                {feedback && (
                  <div
                    className={`text-center py-2 px-3 rounded-lg text-xs font-semibold ${
                      feedback.type === 'success'
                        ? 'bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/30'
                        : 'bg-[#25293a] text-[#dee1f9] border border-[#25293a]'
                    }`}
                  >
                    {feedback.text}
                  </div>
                )}

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="grow bg-[#25293a] h-px" />
                  <span className="shrink mx-3 text-[#64748b] text-[10px] uppercase tracking-widest font-semibold">
                    or authenticate via
                  </span>
                  <div className="grow bg-[#25293a] h-px" />
                </div>

                {/* Secondary SSO Button */}
                <button
                  type="button"
                  onClick={handleSSO}
                  className="w-full bg-[#25293a] hover:bg-[#2f3446] text-[#dee1f9] text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#25293a] font-medium cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">smart_card_reader</span>
                  <span>Sign in with SSO / Government PIV ID</span>
                </button>
              </form>
            </div>

            {/* Footer Security Attestation */}
            <div className="mt-6 pt-3 bg-[#161b2b] rounded-lg p-2 border border-[#25293a] text-center">
              <p className="text-[10px] text-[#64748b] tracking-wider flex items-center justify-center gap-1.5 flex-wrap font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5451]" /> SECURED
                <span className="text-[#25293a]">•</span> FEDRAMP HIGH AUTHORIZED
                <span className="text-[#25293a]">•</span> AUDIT LOGGING ACTIVE
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
