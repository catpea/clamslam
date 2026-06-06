export function createDiagnostic({ kind = 'clamslam-diagnostic', severity = 'info', message = '', detail = {}, hints = [] } = {}) {
  return { kind, severity, message, detail, hints, time: new Date().toISOString() };
}

export function dispatchDiagnostic(target, diagnostic) {
  target?.dispatchEvent?.(new CustomEvent('clamslam-diagnostic', { bubbles: true, composed: true, detail: diagnostic }));
  return diagnostic;
}
