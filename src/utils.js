
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: utils.js
// Utility functions for project

// Multiply a 4x4 homogeneous matrix by a Vector4 considered as point (ie, subject to translation).
// taken from https://github.com/processing/p5.js/issues/1553
function multMatrixVector(m, v) {
  if (!(m instanceof p5.Matrix) || !(v instanceof p5.Vector)) {
    print('multMatrixVector : Invalid arguments');
    return;
  }

  var _dest = createVector();
  var mat = m.mat4;

  // Multiply in column major order.
  _dest.x = mat[0] * v.x + mat[4] * v.y + mat[8] * v.z + mat[12];
  _dest.y = mat[1] * v.x + mat[5] * v.y + mat[9] * v.z + mat[13];
  _dest.z = mat[2] * v.x + mat[6] * v.y + mat[10] * v.z + mat[14];
  var w = mat[3] * v.x + mat[7] * v.y + mat[11] * v.z + mat[15];

  if (Math.abs(w) > Number.EPSILON) {
    _dest.mult(1.0 / w);
  }

  return _dest;
}

// Project a vector from Canvas to World coordinates
// taken from https://github.com/processing/p5.js/issues/1553
function projectCanvasToWorld(canvas, vCanvas) {
  // Retrieve the ModelView and Projection matrices.
  var mv = canvas.uMVMatrix.copy();
  var p = canvas.uPMatrix.copy();

  // Compute the ModelViewProjection matrix.
  var mvp = mv.mult(p);

  // Inverts the MVP.
  var invMVP = mvp.invert(mvp);

  // Transform the canvas vector to Normalized Device Coordinates (in [-1, 1]³),
  // Here viewport is (0, 0, drawingBufferWidth, drawingBufferHeight).
  var vNDC = createVector();
  vNDC.x = (-1.0 + 2.0 * (vCanvas.x / windowWidth));
  vNDC.y = -(-1.0 + 2.0 * (vCanvas.y / windowHeight));
  vNDC.z = (-1.0 + 2.0 * (vCanvas.z));

  // Transform vector from NDC to world coordinates.
  var vWorld = multMatrixVector(invMVP, vNDC);

  return vWorld;
}

// Project a vector from World to Canvas coordinates
// taken from https://github.com/processing/p5.js/issues/1553
function projectWorldToCanvas(canvas, vWorld) {
  // Calculate the ModelViewProjection Matrix.
  var mvp = (canvas.uMVMatrix.copy()).mult(canvas.uPMatrix);

  // Transform the vector to Normalized Device Coordinate.
  var vNDC = multMatrixVector(mvp, vWorld);

  // Transform vector from NDC to Canvas coordinates.
  var vCanvas = createVector();
  vCanvas.x = 0.5 * (vNDC.x + 1.0) * windowWidth;
  vCanvas.y = 0.5 * (vNDC.y + 1.0) * windowHeight;
  vCanvas.z = 0.5 * (vNDC.z + 1.0);

  return vCanvas;
}

// returns a 2d vector of mouse projected on XY plane in actual view.
function mouseToXYPlane(canvas, camera) {
  // x(t) = worldCamera.x + delta.x * t
  // y(t) = worldCamera.y + delta.y * t
  // z(t) = worldCamera.z + delta.z * t
  // -----------------------------------
  // 0 = worldCamera.z + delta.z * t
  // t = worldCamera.z / -delta.z
  //

  var mouseWorld = projectCanvasToWorld(canvas, createVector(pmouseX, pmouseY));
  var delta = mouseWorld.sub(camera.Position);

  return camera.Position.copy()
    .add(delta.mult(camera.Position.z / -delta.z));
}
