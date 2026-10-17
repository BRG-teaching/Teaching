// Password gate for the CAS pages. Include it first in <head>.
// This only keeps casual visitors out: the site and the R2 book bucket are public files,
// so anyone who looks at the source or the bucket URL can still reach them.
(function () {
  var HASH = '00dca445b4369133e58f4ed81dfc61c6c3ddfa99c7abfb9eb77daf45d58c2f4b'; // SHA-256 of the password
  var KEY = 'cas-unlocked';
  var ok = false;
  try { ok = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (ok) return;

  document.documentElement.classList.add('gated');
  var style = document.createElement('style');
  style.textContent =
    'html.gated body > *:not(#gate){display:none!important}' +
    '#gate{position:fixed;inset:0;display:grid;place-items:center;background:#141b3d;color:#fff;font:400 16px/1.5 "Open Sans",Helvetica,Arial,sans-serif;z-index:100;padding:16px}' +
    '#gate form{display:flex;flex-direction:column;gap:14px;width:min(340px,100%)}' +
    '#gate h1{margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em}' +
    '#gate p{margin:0;color:#c9c6dc;font-size:14px}' +
    '#gate .bar{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;height:6px}' +
    '#gate .bar i:nth-child(1){background:#3057b1}#gate .bar i:nth-child(2){background:#5552bb}#gate .bar i:nth-child(3){background:#7750c1}#gate .bar i:nth-child(4){background:#934abd}#gate .bar i:nth-child(5){background:#ae4bb2}#gate .bar i:nth-child(6){background:#ca49a4}#gate .bar i:nth-child(7){background:#dc4b8d}' +
    '#gate input{font:inherit;padding:10px 12px;border:1px solid #5a6080;background:#0e1430;color:#fff}' +
    '#gate input:focus{outline:2px solid #dc4b8d;outline-offset:1px}' +
    '#gate button{font:inherit;font-weight:600;padding:10px 12px;border:0;background:#dc4b8d;color:#fff;cursor:pointer}' +
    '#gate .err{color:#ff9cc6;min-height:1.5em}';
  document.head.appendChild(style);

  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    });
  }

  function mount() {
    var gate = document.createElement('div');
    gate.id = 'gate';
    gate.innerHTML =
      '<form autocomplete="off"><div class="bar" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
      '<h1>CAS Computational Form-finding</h1><p>Block Research Group · ETH Zürich. Enter the course password.</p>' +
      '<label for="gate-pw" style="position:absolute;left:-9999px">Password</label>' +
      '<input id="gate-pw" type="password" placeholder="Password" autofocus>' +
      '<button type="submit">Enter</button><p class="err" role="alert"></p></form>';
    document.body.appendChild(gate);
    var form = gate.querySelector('form'), input = gate.querySelector('input'), err = gate.querySelector('.err');
    input.focus();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sha256(input.value.trim().toLowerCase()).then(function (h) {
        if (h !== HASH) { err.textContent = 'That password is not right.'; input.select(); return; }
        try { localStorage.setItem(KEY, '1'); } catch (e2) {}
        gate.remove();
        document.documentElement.classList.remove('gated');
        window.dispatchEvent(new Event('cas-unlocked'));
      });
    });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
