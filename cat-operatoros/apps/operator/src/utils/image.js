/**
 * Camera capture helpers, shared by hazard photos and fault lookup.
 *
 * USE <input type="file" accept="image/*" capture="environment">, NOT
 * getUserMedia. It opens the native camera on mobile, falls back to a file
 * picker on a laptop, needs no permission prompt, and cannot fail on stage.
 *
 *   downscale(file, maxPx = 800) -> Promise<dataUrl>   // canvas, jpeg q0.7
 *   thumbnail(dataUrl) -> dataUrl
 */
export async function downscale(file, maxPx = 800) {
  // TODO(Block 6)
}
