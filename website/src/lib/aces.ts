/**
 * aces.ts — exact inverse of the three.js ACESFilmic tone mapping.
 *
 * The compas-threejs viewer renders with renderer.toneMapping = ACESFilmic and
 * toneMappingExposure = 2.5, which shifts every flat color.  The drawings need
 * EXACT flat colors (the compression navy, the tension pink...), so instead of
 * fighting the tone mapping we invert it: we ask three.js for the emissive
 * color whose tone-mapped result is exactly the color we want on screen.
 *
 * Verified: every color of the drawing palette round-trips exactly; only pure
 * white saturates (renders as #f5f5f5), uniformly for all whites, so white
 * elements still match each other and the background.
 */

// ACESInputMat / ACESOutputMat and the RRT-and-ODT fit, verbatim from the
// three.js tone-mapping shader (ACESFilmicToneMapping).
const IN = [
  [0.59719, 0.35458, 0.04823],
  [0.076, 0.90834, 0.01566],
  [0.0284, 0.13383, 0.83777],
]
const OUT = [
  [1.60475, -0.53108, -0.07367],
  [-0.10208, 1.10813, -0.00605],
  [-0.00327, -0.07276, 1.07602],
]

function inv3(m: number[][]): number[][] {
  const m00 = m[0]![0]!, m01 = m[0]![1]!, m02 = m[0]![2]!
  const m10 = m[1]![0]!, m11 = m[1]![1]!, m12 = m[1]![2]!
  const m20 = m[2]![0]!, m21 = m[2]![1]!, m22 = m[2]![2]!
  const A0 = m11 * m22 - m12 * m21
  const A1 = -(m10 * m22 - m12 * m20)
  const A2 = m10 * m21 - m11 * m20
  const det = m00 * A0 + m01 * A1 + m02 * A2
  return [
    [A0 / det, -(m01 * m22 - m02 * m21) / det, (m01 * m12 - m02 * m11) / det],
    [A1 / det, (m00 * m22 - m02 * m20) / det, -(m00 * m12 - m02 * m10) / det],
    [A2 / det, -(m00 * m21 - m01 * m20) / det, (m00 * m11 - m01 * m10) / det],
  ]
}

const INi = inv3(IN)
const OUTi = inv3(OUT)

function mul(m: number[][], v: number[]): number[] {
  return [0, 1, 2].map((r) => m[r]![0]! * v[0]! + m[r]![1]! * v[1]! + m[r]![2]! * v[2]!)
}

/** Inverse of RRTAndODTFit: given the mapped value t, find the input v. */
function fitInv(t: number): number {
  const a = 0.983729 * t - 1
  const b = 0.432951 * t - 0.0245786
  const c = 0.238081 * t + 0.000090537
  const disc = b * b - 4 * a * c
  if (disc < 0) return 0
  const r1 = (-b + Math.sqrt(disc)) / (2 * a)
  const r2 = (-b - Math.sqrt(disc)) / (2 * a)
  return Math.max(r1 >= 0 ? r1 : -Infinity, r2 >= 0 ? r2 : -Infinity)
}

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

const EXPOSURE = 2.5 // the viewer's renderer.toneMappingExposure

/**
 * Return the '#rrggbb' emissive color that, tone-mapped by the viewer,
 * displays exactly as `targetHex`.  Out-of-range channels are clamped
 * (only near-white colors hit the clamp).
 */
export function preToneMap(targetHex: string): string {
  const target = [1, 3, 5].map((i) => srgbToLinear(parseInt(targetHex.slice(i, i + 2), 16) / 255))
  const y = mul(OUTi, target)
  const v = y.map(fitInv)
  const x = mul(INi, v)
  // undo the shader's `color * exposure / 0.6` pre-scale
  const emissiveLinear = x.map((ch) => Math.max(0, Math.min(1, (ch * 0.6) / EXPOSURE)))
  return (
    '#' +
    emissiveLinear
      .map((ch) =>
        Math.round(linearToSrgb(ch) * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}
