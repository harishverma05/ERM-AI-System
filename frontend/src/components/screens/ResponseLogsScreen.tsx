import React, { useState } from 'react';

export const ResponseLogsScreen: React.FC = () => {
  const [filterType, setFilterType] = useState('all');

  const logs: { time: string; type: string; event: string; node: string; status: string }[] = [];

  const filteredLogs = logs.filter((l) => {
    if (filterType === 'all') return true;
    return l.type === filterType;
  });

  return (
    <div className="flex flex-col w-full text-[#dee1f9] select-none p-3 md:p-6 gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">assignment</span>
            <h1 className="text-xl font-bold text-[#dee1f9] tracking-tight">System Response Logs</h1>
          </div>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Immutable tactical event audit trail • Microsecond telemetry timestamps • Node-level telemetry
          </p>
        </div>

        <div className="flex items-center bg-[#080d1d] p-0.5 rounded border border-[#25293a] text-xs">
          {['all', 'DISPATCH', 'AI-MODEL', 'IOT-ALERT'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded transition-colors uppercase font-bold cursor-pointer ${
                filterType === t
                  ? 'bg-[#25293a] text-[#4cd7f6]'
                  : 'text-[#64748b] hover:text-[#dee1f9]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#161b2b] p-4 rounded-lg border border-[#25293a] shadow-md flex flex-col gap-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-code-telemetry">
            <thead>
              <tr className="border-b border-[#25293a] text-[#64748b] uppercase tracking-wider">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Event Narrative</th>
                <th className="py-2.5 px-3">Node Source</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25293a]">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[#1a1f30] transition-colors">
                  <td className="py-2.5 px-3 text-[#4cd7f6] font-bold">{log.time}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-[#25293a] text-[#dee1f9] text-[10px] font-bold">
                      {log.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#dee1f9] font-sans text-xs">{log.event}</td>
                  <td className="py-2.5 px-3 text-[#64748b]">{log.node}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[#4cd7f6] font-bold text-[11px]">{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
