/**
 * This module contains logic for various easing functions.
 * Interpoliation between two values could depend on various gradients,
 * Such as the linear, quadratic, exponential, inverse, etc.
 */

// Linearly interpolates between a and b by r.
export function lerp(a:number, b:number, r:number) {
  return b * r + a;
}

// Quadradically interpolates between a and b by r.
export function inQuad(a:number, b: number, r: number) {
  return b * r * r + a;
}
