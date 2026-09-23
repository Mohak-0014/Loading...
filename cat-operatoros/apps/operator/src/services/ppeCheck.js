/**
 * On-device PPE inference.
 *
 *   loadModel()                 -> ONNX Runtime Web session, cached
 *   check(imageBitmap)          -> { result, items, confidence, modelVersion }
 *   buildPayload(checkResult)   -> server payload, STRUCTURED ONLY
 *
 * buildPayload must never include the source image. Add a unit test that
 * asserts the payload contains no image field, and keep it green — this is
 * the one regression that quietly destroys the privacy design.
 *
 * Classes: helmet, hi_vis_vest, eye_protection (gating)
 *          gloves, hearing_protection (advisory, often occluded — say so)
 *
 * Tuned for recall over precision. Explain the asymmetry in the UI copy if
 * asked, not by default.
 *
 * Degrade in this order: model missing -> manual self-declaration checklist
 * -> skip with reason. Never a dead end.
 */
// TODO
