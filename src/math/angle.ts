// Get the angle between two vectors.
export function pointAngle(u:Float32Array, v:Float32Array) {
   return Math.atan2(-(v[1] - u[1]), v[0] - u[0]) * (180 / Math.PI);
 }

// Get the angle between two angles.
export function angleDifference(angle0: number, angle1: number) {
   return ((((angle0 - angle1) % 360) + 540) % 360) - 180;
}

//
export function keyboardAngle(right, up, left, down) {
  if (up)
    return 90 - ((right - left) * 45);
  else if (down)
    return 270 + ((right - left) * 45);

  return 0 + (left * 180);
}
