/* Password gate for the eQUILIBRIUM pages.
 *
 * NOTE: this is a client-side gate on a *public static site* — it keeps the
 * pages out of casual reach (and out of search results for anyone who lands on
 * them), but it is not real access control: the files themselves are still
 * served to anyone who requests them directly. Do not put anything genuinely
 * private behind it.
 *
 * Load it as a blocking classic script in <head>, BEFORE any content:
 *   <script src="./gate.js"></script>
 * It hides the page until the passphrase is entered, then remembers the unlock
 * in localStorage so it is asked once per browser.
 */
(() => {
  const KEY = 'equilibrium-unlocked';
  const SALT = 'eQUILIBRIUM-2026';
  // sha256(SALT + passphrase), hex
  const EXPECTED = '69baf7106212873a61858b5d9b1276309bbe49aa4a192bddffad043bb0ad9564';
  // fallback for contexts without crypto.subtle: btoa(SALT + passphrase)
  const EXPECTED_WEAK = 'ZVFVSUxJQlJJVU0tMjAyNmJyZw==';

  const hash = async (pw) => {
    if (window.crypto && window.crypto.subtle) {
      const bytes = new TextEncoder().encode(SALT + pw);
      const buf = await window.crypto.subtle.digest('SHA-256', bytes);
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    return null;
  };

  const check = async (pw) => {
    const h = await hash(pw);
    if (h !== null) return h === EXPECTED;
    try { return btoa(SALT + pw) === EXPECTED_WEAK; } catch { return false; }
  };

  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  if (stored === EXPECTED || stored === EXPECTED_WEAK) return;

  // hide everything except the gate itself, from the first byte of <body>
  const root = document.documentElement;
  root.classList.add('gate-locked');
  const style = document.createElement('style');
  style.textContent = `
    html.gate-locked body > *:not(#eq-gate) { display: none !important; }
    html.gate-locked, html.gate-locked body { overflow: hidden; }
    #eq-gate {
      position: fixed; inset: 0; z-index: 2147483647;
      display: grid; place-items: center;
      background: #eef0f2;
      font: 400 15px/1.4 Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #111;
    }
    #eq-gate .box { width: min(420px, calc(100vw - 32px)); text-align: left; }
    #eq-gate h1 {
      background: #2196ea; color: #fff;
      font-size: 24px; font-weight: 700; letter-spacing: -0.02em;
      margin: 0; padding: 22px 24px 8px;
    }
    #eq-gate h1 .wip {
      display: inline-block; vertical-align: middle;
      margin-left: 10px; padding: 3px 8px;
      font: 700 10px/1 Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2196ea; background: #fff;
    }
    #eq-gate .sub {
      background: #2196ea; color: #fff;
      font-size: 13px; margin: 0; padding: 0 24px 6px;
    }
    #eq-gate .note {
      background: #2196ea; color: rgba(255, 255, 255, 0.88);
      font-size: 12px; line-height: 1.45; margin: 0; padding: 0 24px 22px;
    }
    #eq-gate .note a { color: #fff; font-weight: 500; }
    #eq-gate form { background: #fff; padding: 24px; display: flex; gap: 12px; }
    #eq-gate label { display: block; }
    #eq-gate input {
      width: 100%; font: inherit; color: #111;
      padding: 10px 12px;
      border: 1px solid #d3d8dc; border-radius: 0; background: #fff;
    }
    #eq-gate input:focus { outline: 2px solid #2196ea; outline-offset: -1px; }
    #eq-gate button {
      font: 500 13px/1 inherit; letter-spacing: 0.05em; text-transform: uppercase;
      padding: 0 18px; border: none; border-radius: 0;
      background: #2196ea; color: #fff; cursor: pointer;
    }
    #eq-gate .err {
      background: #fff; color: #c62828;
      font-size: 0.875rem; margin: 0; padding: 0 24px 20px;
    }
    #eq-gate .err[hidden] { display: none; }
  `;
  document.head.appendChild(style);

  const build = () => {
    const gate = document.createElement('div');
    gate.id = 'eq-gate';
    gate.innerHTML = `
      <div class="box">
        <h1>e<span>QUILIBRIUM</span> <span class="wip">experimental</span></h1>
        <p class="sub">an interactive environment for graphic statics-based structural design</p>
        <p class="note">Work in progress: these drawings are experimental, may not be fully
          correct, and are likely to contain mistakes. Redrawn after the original
          <a href="https://block.arch.ethz.ch/eq/">eQUILIBRIUM platform</a> by the
          Block Research Group.</p>
        <form>
          <label style="flex:1">
            <input type="password" name="pw" placeholder="Passphrase"
                   autocomplete="current-password" autofocus>
          </label>
          <button type="submit">Enter</button>
        </form>
        <p class="err" hidden>Wrong passphrase — try again.</p>
      </div>`;
    document.body.appendChild(gate);

    const form = gate.querySelector('form');
    const input = gate.querySelector('input');
    const err = gate.querySelector('.err');
    input.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (await check(input.value)) {
        const h = (await hash(input.value)) ?? EXPECTED_WEAK;
        try { localStorage.setItem(KEY, h); } catch {}
        root.classList.remove('gate-locked');
        gate.remove();
        style.remove();
      } else {
        err.hidden = false;
        input.value = '';
        input.focus();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build, { once: true });
  } else {
    build();
  }
})();
