/**
 * On-device warning-light classification.
 *
 *   classify(imageBitmap) -> { candidates: [{ symbolId, confidence }], modelVersion }
 *
 * Returns TOP THREE for operator confirmation. The UI never states that the
 * symbol was identified — the operator taps the match. That confirmation is
 * also the labelled data that improves the model.
 *
 * Low confidence or model unavailable -> full symbol grid, works offline.
 */
// TODO
