/* GaimControl prototype · cross-flow navigator strip
 Injected into every per-flow HTML page + the two cover pages.
 Adds a sticky top bar with: back-to-index · current-flow indicator · all-flow dots · prev/next-flow buttons.
 Keyboard: Shift+← / Shift+→ jump between flows (Plain ←/→ stay reserved for within-flow screen nav.)
*/
(function () {
 const MOBILE_FLOWS = [
 { id: '04', name: 'Auth & session', file: 'mobile-auth.html' },
 { id: '05', name: 'Onboarding', file: 'mobile-onboarding.html' },
 { id: '06', name: 'Banking', file: 'mobile-banking.html' },
 { id: '07', name: 'Cards + sponsor', file: 'mobile-cards.html' },
 { id: '08', name: 'Anna · CBT', file: 'mobile-anna.html' },
 { id: '09', name: 'Loan + SECCI', file: 'mobile-loan.html' },
 { id: '10', name: 'Repayment + Hold', file: 'mobile-repayment.html' },
 { id: '11', name: 'Safeguarding', file: 'mobile-safeguarding.html' },
 { id: '12', name: 'Profile & settings', file: 'mobile-profile.html' },
 { id: '15', name: 'Sponsor onboarding', file: 'mobile-sponsor-onboarding.html' },
 { id: '16', name: 'Off-boarding', file: 'mobile-offboarding.html' },
 ];
 const WEB_FLOWS = [
 { id: '04', name: 'Auth & session', file: 'web-auth.html' },
 { id: '05', name: 'Onboarding', file: 'web-onboarding.html' },
 { id: '06', name: 'Banking', file: 'web-banking.html' },
 { id: '07', name: 'Cards + sponsor', file: 'web-cards.html' },
 { id: '08', name: 'Anna · CBT', file: 'web-anna.html' },
 { id: '09', name: 'Loan + SECCI', file: 'web-loan.html' },
 { id: '10', name: 'Repayment + Hold', file: 'web-repayment.html' },
 { id: '11', name: 'Safeguarding', file: 'web-safeguarding.html' },
 { id: '12', name: 'Profile & settings', file: 'web-profile.html' },
 { id: '13', name: 'Admin · ops', file: 'web-admin.html' },
 { id: '14', name: 'Marketing site', file: 'web-marketing.html' },
 { id: '15', name: 'Sponsor onboarding', file: 'web-sponsor-onboarding.html' },
 { id: '16', name: 'Off-boarding', file: 'web-offboarding.html' },
 ];

 const STYLE = `
:root { --gc-fc-h: 48px; }
.gc-fc { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; display: flex; align-items: center; gap: 12px; padding: 0 14px; background: rgba(11,15,28,0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; color: #F1F2F5; font-size: 12.5px; height: var(--gc-fc-h); box-sizing: border-box; }
[data-theme="light"].gc-fc { background: rgba(255,255,255,0.94); color: #161B2D; border-bottom-color: rgba(22,27,45,0.10); box-shadow: 0 1px 2px rgba(22,27,45,0.04); }
.gc-fc * { box-sizing: border-box; }
.gc-fc__back { font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 6px 10px; border-radius: 7px; background: rgba(255,255,255,0.07); color: inherit; text-decoration: none; flex-shrink: 0; font-weight: 600; letter-spacing: 0.02em; }
[data-theme="light"].gc-fc__back { background: rgba(22,27,45,0.05); }
.gc-fc__back:hover { background: rgba(255,255,255,0.14); }
[data-theme="light"].gc-fc__back:hover { background: rgba(22,27,45,0.12); }
.gc-fc__title { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.04em; opacity: 0.7; flex-shrink: 0; text-transform: uppercase; font-weight: 600; }
.gc-fc__title b { font-weight: 700; opacity: 1; color: #fff; letter-spacing: 0.04em; }
[data-theme="light"].gc-fc__title b { color: #161B2D; }
.gc-fc__title em { font-style: normal; font-family: 'Inter', sans-serif; text-transform: none; letter-spacing: -0.005em; opacity: 0.9; font-weight: 500; margin-left: 4px; }
[data-theme="light"].gc-fc__title em { color: #161B2D; }
.gc-fc__dots { flex: 1; display: flex; gap: 3px; align-items: center; justify-content: center; min-width: 0; padding: 0 8px; }
.gc-fc__dot { display: inline-flex; align-items: center; justify-content: center; height: 26px; min-width: 30px; padding: 0 7px; border-radius: 6px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.45); font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; text-decoration: none; letter-spacing: 0.04em; transition: all 140ms ease; flex-shrink: 0; }
[data-theme="light"].gc-fc__dot { background: rgba(22,27,45,0.05); color: rgba(22,27,45,0.45); }
.gc-fc__dot:hover { background: rgba(255,255,255,0.13); color: #fff; transform: translateY(-1px); }
[data-theme="light"].gc-fc__dot:hover { background: rgba(22,27,45,0.1); color: #161B2D; }
.gc-fc__dot.is-on { background: linear-gradient(120deg, #8576C2, #4D608C, #399971); color: #fff; box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 4px 10px -3px rgba(133,118,194,0.45); }
.gc-fc__nav { display: flex; gap: 6px; flex-shrink: 0; }
.gc-fc__btn { padding: 7px 12px; border-radius: 7px; background: rgba(255,255,255,0.07); color: inherit; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 5px; transition: all 140ms ease; }
[data-theme="light"].gc-fc__btn { background: rgba(22,27,45,0.05); }
.gc-fc__btn:hover { background: rgba(255,255,255,0.16); }
[data-theme="light"].gc-fc__btn:hover { background: rgba(22,27,45,0.12); }
.gc-fc__btn[aria-disabled="true"] { opacity: 0.32; pointer-events: none; }
.gc-fc__btn--primary { background: linear-gradient(120deg, #8576C2, #4D608C, #399971); color: #fff; box-shadow: 0 4px 14px -4px rgba(133,118,194,0.4); }
.gc-fc__btn--primary:hover { filter: brightness(1.1); box-shadow: 0 6px 18px -4px rgba(133,118,194,0.55); }
.gc-fc__kbd { display: none; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 1px 5px; border-radius: 4px; background: rgba(0,0,0,0.3); margin-left: 4px; opacity: 0.7; font-weight: 700; letter-spacing: 0; }
[data-theme="light"].gc-fc__kbd { background: rgba(255,255,255,0.6); color: #161B2D; }
.gc-fc__btn--primary:hover.gc-fc__kbd,.gc-fc__btn:hover.gc-fc__kbd { display: inline-block; }
body { padding-top: var(--gc-fc-h); }
@media (max-width: 1100px) {
.gc-fc__dots { display: none; }
}
@media (max-width: 720px) {
.gc-fc { gap: 8px; padding: 0 10px; }
.gc-fc__title { font-size: 10px; }
.gc-fc__back { padding: 5px 8px; font-size: 10px; }
.gc-fc__btn { padding: 5px 10px; font-size: 10px; }
}
.gc-fc-flash { animation: gc-fc-flash-anim 700ms ease; }
@keyframes gc-fc-flash-anim { 0% { box-shadow: 0 0 0 0 rgba(133,118,194,0.65); } 100% { box-shadow: 0 0 0 6px rgba(133,118,194,0); } }
`;

 function getCurrentPath() {
 return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
 }

 function init() {
 const path = getCurrentPath();
 let flows = null, label = '';

 if (path.startsWith('mobile-')) { flows = MOBILE_FLOWS; label = 'Mobile'; }
 else if (path.startsWith('web-')) { flows = WEB_FLOWS; label = 'Web'; }
 else { return; /* skip index.html and others */ }

 const isMobileCover = path === 'mobile-prototype.html';
 const isWebCover = path === 'web-prototype.html';
 const isCover = isMobileCover || isWebCover;

 let idx = -1;
 if (!isCover) {
 idx = flows.findIndex(f => f.file === path);
 if (idx === -1) return;
 }

 // Inject styles
 const styleEl = document.createElement('style');
 styleEl.textContent = STYLE;
 document.head.appendChild(styleEl);

 // Build strip
 const strip = document.createElement('div');
 strip.className = 'gc-fc';

 const titleHtml = isCover
 ? `<span>${label}</span> · <b>Combined prototype</b> <em>· ${flows.length} flows · click any §, or start the tour</em>`
 : `<span>${label}</span> · <b>${idx + 1} / ${flows.length}</b> <em>· §${flows[idx].id} ${flows[idx].name}</em>`;

 const dotsHtml = flows.map((f, i) => {
 const on = !isCover && i === idx;
 return `<a href="${f.file}" class="gc-fc__dot${on ? ' is-on' : ''}" title="§${f.id} · ${f.name}">${f.id}</a>`;
 }).join('');

 let prevHref, prevLabel, prevDisabled = false;
 let nextHref, nextLabel, nextDisabled = false;
 const coverHref = label === 'Mobile' ? 'mobile-prototype.html' : 'web-prototype.html';

 if (isCover) {
 prevHref = 'index.html';
 prevLabel = 'index';
 nextHref = flows[0].file;
 nextLabel = `Start · §${flows[0].id} ${flows[0].name}`;
 } else if (idx === 0) {
 prevHref = coverHref;
 prevLabel = 'cover';
 nextHref = flows[1].file;
 nextLabel = `§${flows[1].id} ${flows[1].name}`;
 } else if (idx === flows.length - 1) {
 prevHref = flows[idx - 1].file;
 prevLabel = `§${flows[idx - 1].id} ${flows[idx - 1].name}`;
 nextHref = coverHref;
 nextLabel = 'End · cover';
 } else {
 prevHref = flows[idx - 1].file;
 prevLabel = `§${flows[idx - 1].id} ${flows[idx - 1].name}`;
 nextHref = flows[idx + 1].file;
 nextLabel = `§${flows[idx + 1].id} ${flows[idx + 1].name}`;
 }

 strip.innerHTML = `
 <a href="index.html" class="gc-fc__back">← Index</a>
 <div class="gc-fc__title">${titleHtml}</div>
 <div class="gc-fc__dots">${dotsHtml}</div>
 <div class="gc-fc__nav">
 <a href="${prevHref}" class="gc-fc__btn"${prevDisabled ? ' aria-disabled="true"' : ''} data-fc-prev>← ${prevLabel}<span class="gc-fc__kbd">⇧ ←</span></a>
 <a href="${nextHref}" class="gc-fc__btn gc-fc__btn--primary"${nextDisabled ? ' aria-disabled="true"' : ''} data-fc-next>${nextLabel} →<span class="gc-fc__kbd">⇧ →</span></a>
 </div>
 `;
 document.body.insertBefore(strip, document.body.firstChild);

 // Brief flash on the active dot
 const activeDot = strip.querySelector('.gc-fc__dot.is-on');
 if (activeDot) activeDot.classList.add('gc-fc-flash');

 // Keyboard: Shift+arrows jump flows (plain arrows stay reserved for within-flow nav)
 document.addEventListener('keydown', (e) => {
 // ignore when typing in inputs / textareas
 const tag = (e.target && e.target.tagName) || '';
 if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
 if (!e.shiftKey) return;
 if (e.key === 'ArrowLeft' && !prevDisabled) {
 e.preventDefault();
 location.href = prevHref;
 } else if (e.key === 'ArrowRight' && !nextDisabled) {
 e.preventDefault();
 location.href = nextHref;
 }
 });
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', init);
 } else {
 init();
 }
})();
