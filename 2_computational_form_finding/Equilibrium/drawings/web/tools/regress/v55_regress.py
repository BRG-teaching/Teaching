"""Sondericker 1903, Plate II Fig 3/3A: windward rib of a symmetrical
three-hinged braced arch (dead + wind), reconstruction + full Cremona.
Geometry (all from the book/plate):
  end hinge at origin; feet at -1.5 (inner) and +1.25 (outer);
  vertical end post +5, +6, +8.05 -> B3;
  OUTER chord: STRAIGHT at slope 30 deg ("SLOPE 30"), divisions
  8.05 + 5x5 to gh, then one 5-ft division kinking onto the crown hinge;
  INNER chord: 30-ft-radius arc ("30' R.") from vertical tangent at the
  foot, sweeping 60 deg, then STRAIGHT at 30 deg (parallel chords) to the
  crown; struts perpendicular to the outer line, except B3's member 7-4
  whose foot bisects the inner arc between its neighbours.
Loads: book table. Verifies H,V (14860, 9900), c-8 = 35250 C, and the
full-line diagonals 8-9 / 16-17 = the rising family, in tension."""
import numpy as np
from scipy.optimize import brentq

I_FOOT = np.array([-1.5, 0.0])
O1 = np.array([1.25, 5.0]); O2 = np.array([1.25, 11.0]); B3 = np.array([1.25, 19.05])
CIN = np.array([-31.5, 0.0]); RIN = 30.0
PHI_END = np.deg2rad(60.0)
ARC_END = CIN + RIN*np.array([np.cos(PHI_END), np.sin(PHI_END)])
T30 = np.array([-np.cos(np.deg2rad(30)), np.sin(np.deg2rad(30))])
U30 = T30
TH30 = np.deg2rad(150.0)

# the middle hinge is DESIGN DATA digitised from the plate: BOTH chords kink
# into it (the old rule "crown on the inner straight" invented a zero member
# that the plate shows carrying ~5000 lbs -- audit 2026-08-14)
CROWN_PT = np.array([-31.64, 36.33])
OUT = [B3.copy()]
for L in [8.05, 5, 5, 5, 5, 5]:
    OUT.append(OUT[-1] + L*U30)
GH = OUT[-1]
OUT.append(CROWN_PT.copy())
OUT = np.array(OUT)
CROWN = OUT[-1]
T_LAST = np.arctan2(*(CROWN - GH)[::-1])

def inner_hit(p, d):
    f = p - CIN; b = np.dot(f, d); c = np.dot(f, f) - RIN*RIN
    disc = b*b - c; cands = []
    if disc >= 0:
        for t in (-b - np.sqrt(disc), -b + np.sqrt(disc)):
            if t > 0.1:
                q = p + t*d
                phi = np.arctan2(q[1], q[0]-CIN[0])
                if -0.02 <= phi <= PHI_END + 1e-9: cands.append((t, q))
    n = np.array([-T30[1], T30[0]]); den = np.dot(d, n)
    if abs(den) > 1e-12:
        t = np.dot(ARC_END - p, n)/den
        if t > 0.1:
            q = p + t*d; s2 = np.dot(q - ARC_END, T30)
            if -1e-6 <= s2 <= 40: cands.append((t, q))
    return min(cands)[1]

I1 = inner_hit(O1, np.array([-1., 0.])); I2 = inner_hit(O2, np.array([-1., 0.]))
dperp = np.array([np.sin(TH30), -np.cos(TH30)])
if np.dot(dperp, CIN - B3) < 0: dperp = -dperp
I4to9 = [inner_hit(OUT[k], dperp) for k in range(1, 7)]
def arc_phi(q): return np.arctan2(q[1], q[0]-CIN[0])
ph2, ph4 = arc_phi(I2), arc_phi(I4to9[0])
I3 = CIN + RIN*np.array([np.cos((ph2+ph4)/2), np.sin((ph2+ph4)/2)])
INNER = [I1, I2, I3] + I4to9

DEAD = [1620, 2620, 2000, 2000, 2000, 2000, 2000, 1000]
WIND = [2430, 3930, 3000, 3000, 3000, 3000, 3000, 1500]
NWIND = np.array([np.sin(TH30), -np.cos(TH30)])
if NWIND[1] > 0: NWIND = -NWIND          # pressure pushes the roof inward/down
LOADS = [np.array([0, -DEAD[k]]) + WIND[k]*NWIND for k in range(8)]

def cross(a, b): return a[0]*b[1] - a[1]*b[0]
Mw = sum(cross(OUT[k], LOADS[k]) for k in range(8))
E2 = np.array([2*CROWN[0], 0.0])
OUTm = [np.array([2*CROWN[0] - p[0], p[1]]) for p in OUT]
Ml = sum(cross(OUTm[k] - E2, np.array([0, -DEAD[k]])) for k in range(8))
A2x2 = np.array([[-CROWN[1], CROWN[0]],
                 [(CROWN-E2)[1], -(CROWN-E2)[0]]])
F = np.linalg.solve(A2x2, np.array([-Mw, -Ml]))
H, V = F
print('crown force on windward rib: (%.0f, %.0f) lbs   book: (14860, 9900)' % (H, V))

joints = {'S': np.array([0., 0.]), 'C': CROWN}
for i, q in enumerate(INNER): joints[f'I{i+1}'] = q
for name, q in zip(['O1','O2','B3','bc','cd','de','ef','fg','gh'],
                   [O1, O2, B3, OUT[1], OUT[2], OUT[3], OUT[4], OUT[5], OUT[6]]):
    joints[name] = q
chords_in = [('S','I1'),('I1','I2'),('I2','I3'),('I3','I4'),('I4','I5'),
             ('I5','I6'),('I6','I7'),('I7','I8'),('I8','I9'),('I9','C')]
post = [('S','O1'),('O1','O2'),('O2','B3')]
chords_out = [('B3','bc'),('bc','cd'),('cd','de'),('de','ef'),('ef','fg'),('fg','gh'),('gh','C')]
struts = [('O1','I1'),('O2','I2'),('B3','I3'),('bc','I4'),('cd','I5'),
          ('de','I6'),('ef','I7'),('fg','I8'),('gh','I9')]
quads = [('I1','O1','O2','I2'),('I2','O2','B3','I3'),('I3','B3','bc','I4'),
         ('I4','bc','cd','I5'),('I5','cd','de','I6'),('I6','de','ef','I7'),
         ('I7','ef','fg','I8'),('I8','fg','gh','I9')]
loads_at = dict(zip(['B3','bc','cd','de','ef','fg','gh','C'], LOADS))

def solve(choice):
    members = chords_in + post + chords_out + struts + \
              [(q[0], q[2]) if c == 0 else (q[1], q[3]) for q, c in zip(quads, choice)]
    idx = {m: i for i, m in enumerate(members)}
    free = [j for j in joints if j != 'S']
    A = np.zeros((2*len(free), len(members))); b = np.zeros(2*len(free))
    for r, j in enumerate(free):
        for m in members:
            if j in m:
                o = m[1] if m[0] == j else m[0]
                u = joints[o] - joints[j]; u = u/np.linalg.norm(u)
                A[2*r, idx[m]] = u[0]; A[2*r+1, idx[m]] = u[1]
        P = loads_at.get(j, np.zeros(2)).copy()
        if j == 'C': P = P + F
        b[2*r] = -P[0]; b[2*r+1] = -P[1]
    x, *_ = np.linalg.lstsq(A, b, rcond=None)
    return members, x, np.abs(A@x - b).max()

from itertools import product
sols = []
for choice in product((0, 1), repeat=8):
    members, x, res = solve(list(choice))
    if res < 1.0 and all(f >= -1.0 for f in x[-8:]):
        sols.append((choice, members, x, res))
print('%d tension-consistent counter sets' % len(sols))
choice, members, x, res = sols[0]
mi = {m: i for i, m in enumerate(members)}
print('active diagonals (tension):')
for q, c, f in zip(quads, choice, x[-8:]):
    d = (q[0], q[2]) if c == 0 else (q[1], q[3])
    print('  %-18s %-8s %+9.0f' % ('-'.join(q), '-'.join(d), f))
print('c-8 (outer bc-cd): %+.0f   book: 35250 C' % x[mi[("bc","cd")]])
print('outer:', np.round([x[mi[m]] for m in chords_out]))
print('inner:', np.round([x[mi[m]] for m in chords_in]))
print('post :', np.round([x[mi[m]] for m in post]))
print('strut:', np.round([x[mi[m]] for m in struts]))
print('crown (%.2f, %.2f); last div heading %.1f deg; residual %.1e'
      % (CROWN[0], CROWN[1], np.rad2deg(T_LAST), res))

# ---------------- Maxwell/Cremona poles (Fig 3A) --------------------------
choice, members, x, res = sols[0]
mi = {m: i for i, m in enumerate(members)}
force = {m: x[mi[m]] for m in members}
J = joints
def mid(m): return (J[m[0]] + J[m[1]])/2

# interior space triangles (given the computed actives)
qs = [('I1','O1','O2','I2'),('I2','O2','B3','I3'),('I3','B3','bc','I4'),
      ('I4','bc','cd','I5'),('I5','cd','de','I6'),('I6','de','ef','I7'),
      ('I7','ef','fg','I8'),('I8','fg','gh','I9')]
tri = {1: ('S','O1','I1'), 18: ('I9','gh','C')}
for k, (q, c) in enumerate(zip(qs, choice)):
    Ilo, Olo, Ohi, Ihi = q
    if c == 0:   # rising diagonal Ilo-Ohi
        tri[2*k+2] = (Ilo, Olo, Ohi); tri[2*k+3] = (Ilo, Ohi, Ihi)
    else:        # dropping diagonal Olo-Ihi
        tri[2*k+2] = (Olo, Ohi, Ihi); tri[2*k+3] = (Ilo, Olo, Ihi)
rep = {sp: (J[a]+J[b]+J[c])/3 for sp, (a, b, c) in tri.items()}
# external space representatives
out_n = np.array([np.cos(np.deg2rad(60)), np.sin(np.deg2rad(60))])  # outward roof normal
rep['a'] = np.array([8.0, 6.0])
for sp, m in zip(['b','c','d','e','f','g','h'],
                 [('B3','bc'),('bc','cd'),('cd','de'),('de','ef'),('ef','fg'),('fg','gh'),('gh','C')]):
    rep[sp] = mid(m) + 4*out_n
rep['i'] = CROWN + np.array([-4.0, 1.0])
rep['p'] = np.array([-12.0, 10.0])

# adjacency derived from the face triangles: a member's two spaces are the
# faces (interior triangles or exterior spaces) containing both endpoints
ext_of = {('B3','bc'): 'b', ('bc','cd'): 'c', ('cd','de'): 'd', ('de','ef'): 'e',
          ('ef','fg'): 'f', ('fg','gh'): 'g', ('gh','C'): 'h',
          ('S','O1'): 'a', ('O1','O2'): 'a', ('O2','B3'): 'a',
          ('S','I1'): 'p', ('I1','I2'): 'p', ('I2','I3'): 'p', ('I3','I4'): 'p',
          ('I4','I5'): 'p', ('I5','I6'): 'p', ('I6','I7'): 'p', ('I7','I8'): 'p',
          ('I8','I9'): 'p', ('I9','C'): 'p'}
adj = {}
for m in members:
    sps = [sp for sp, t in tri.items() if m[0] in t and m[1] in t]
    if m in ext_of: sps.append(ext_of[m])
    assert len(sps) == 2, (m, sps)
    adj[m] = (sps[0], sps[1])

# ---- proper Cremona: joint-by-joint construction -------------------------
# elements at a joint: members + the applied load + hinge forces; between
# consecutive elements (sorted by angle) lies one space; hopping across an
# element adds its outward force vector to the running pole.
REACTION = -(sum(LOADS) + F)
ext_pairs = [('i','h'), ('h','g'), ('g','f'), ('f','e'), ('e','d'), ('d','c'), ('c','b'), ('b','a')]
def joint_elements(j):
    els = []
    for m, (s1, s2) in adj.items():
        if j in m:
            o = m[1] if m[0] == j else m[0]
            u = J[o] - J[j]; u = u/np.linalg.norm(u)
            els.append({'vec': force[m]*u, 'dir': u, 'sp': (s1, s2), 'tag': '-'.join(m)})
    name = {v: k for k, v in
            zip(['B3','bc','cd','de','ef','fg','gh','C'], range(8))}
    for k, nm2 in enumerate(['B3','bc','cd','de','ef','fg','gh','C']):
        if j == nm2:
            v = LOADS[k]
            sp = ext_pairs[7-k]
            els.append({'vec': v, 'dir': -v/np.linalg.norm(v), 'sp': sp, 'tag': f'load{k}'})
    if j == 'C':
        els.append({'vec': F, 'dir': -F/np.linalg.norm(F), 'sp': ('p','i'), 'tag': 'crownF'})
    if j == 'S':
        v = REACTION
        els.append({'vec': v, 'dir': -v/np.linalg.norm(v), 'sp': ('a','p'), 'tag': 'reaction'})
    return els

def build_poles(sigma):
    poles = {'i': np.array([0.0, 0.0])}
    pending = set(J.keys())
    maxerr = 0.0
    for _ in range(40):
        progressed = False
        for j in list(pending):
            els = joint_elements(j)
            els.sort(key=lambda e: np.arctan2(e['dir'][1], e['dir'][0]))
            n = len(els)
            # spaces between consecutive elements: shared space of the pair
            spaces_between = []
            ok = True
            for k in range(n):
                a, b = els[k], els[(k+1) % n]
                shared = set(a['sp']) & set(b['sp'])
                if len(shared) != 1: ok = False; break
                spaces_between.append(next(iter(shared)))
            if not ok: continue
            known = [k for k, sp in enumerate(spaces_between) if sp in poles]
            if not known: continue
            k0 = known[0]
            run = poles[spaces_between[k0]].copy()
            for step in range(1, n+1):
                k = (k0 + step) % n
                run = run + sigma*els[k]['vec']
                sp = spaces_between[k]
                if sp in poles:
                    maxerr = max(maxerr, np.linalg.norm(poles[sp] - run))
                else:
                    poles[sp] = run.copy()
            pending.discard(j)
            progressed = True
        if not pending or not progressed: break
    return poles, maxerr, pending

for sigma in (+1, -1):
    poles, err, pend = build_poles(sigma)
    print('sigma %+d: closure %.3e lbs, unresolved joints: %s, %d poles'
          % (sigma, err, sorted(pend), len(poles)))
    if err < 1.0 and not pend:
        POLES = poles
        break
if 'POLES' in dir():
    print('\nFig 3A poles (lbs), pole(i) = origin:')
    for sp in ['a','b','c','h','i','p'] + list(range(1, 19)):
        print('  %-2s: (%8.0f, %8.0f)' % (sp, *POLES[sp]))
    print('\nP->I = crown reaction: %s   (F = %s)' % (np.round(POLES['i']-POLES['p']), np.round(F)))
    print('A->P = end reaction:  %s   (R = %s)' % (np.round(POLES['p']-POLES['a']), np.round(REACTION)))
