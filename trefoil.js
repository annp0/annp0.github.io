const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Precompute the knot's 3D points using the trefoil knot parametric equations.
// Equations:
//    x = sin(t) + 2 sin(2t)
//    y = cos(t) - 2 cos(2t)
//    z = - sin(3t)
const numPoints = 1000;
const points = [];
let maxRadius = 0; // We'll use this later to compute the proper scale.
for (let i = 0; i < numPoints; i++) {
    const t = i / numPoints * Math.PI * 2;
    const x = Math.sin(t) + 2 * Math.sin(2 * t);
    const y = Math.cos(t) - 2 * Math.cos(2 * t);
    const z = - Math.sin(3 * t);
    points.push({ x, y, z });
    const r = Math.hypot(x, y);
    if (r > maxRadius) {
    maxRadius = r;
    }
}
// Note: Because rotation is an orthonormal transformation, the distance from the origin is preserved.
// However, with perspective projection the apparent size is scaled by factor = distance/(distance-z).
// To be safe we assume the worst-case (largest factor) occurs when z is at its maximum.
const perspectiveDistance = 20;
const worstCaseFactor = perspectiveDistance / (perspectiveDistance - 1); // since |z|<=1

// Global rotation angles.
let angleX = 0, angleY = 0, angleZ = 0;

// We'll compute a scale factor based on the container’s dimensions.
let computedScale = 1;
function resize() {
    
    // Set the internal canvas resolution high for crisp lines.
    canvas.width = 300;
    canvas.height = 300;
    
    // Compute a scale so that the knot fits within the container.
    const margin = 10; // pixels margin around the knot
    const available = Math.min(canvas.width, canvas.height) / 2 - margin;
    // Use maxRadius and worstCaseFactor to ensure the knot will not be cut off.
    computedScale = available / (maxRadius * worstCaseFactor);
}

resize();

// Rotate a point (x, y, z) by angles around X, Y, and Z axes.
function rotate(point, ax, ay, az) {
    let { x, y, z } = point;
    
    // Rotation around X-axis.
    let cosX = Math.cos(ax), sinX = Math.sin(ax);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;
    y = y1; z = z1;
    
    // Rotation around Y-axis.
    let cosY = Math.cos(ay), sinY = Math.sin(ay);
    let x1 = x * cosY + z * sinY;
    let z2 = -x * sinY + z * cosY;
    x = x1; z = z2;
    
    // Rotation around Z-axis.
    let cosZ = Math.cos(az), sinZ = Math.sin(az);
    let x2 = x * cosZ - y * sinZ;
    let y2 = x * sinZ + y * cosZ;
    return { x: x2, y: y2, z };
}

// A simple perspective projection.
function project(point) {
    // The perspective factor; points farther (larger z) appear smaller.
    const factor = perspectiveDistance / (perspectiveDistance - point.z);
    return {
    x: point.x * factor,
    y: point.y * factor
    };
}

// Main drawing loop.
function draw() {
    // Clear the canvas completely (with transparency).
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing parameters for a thin, sharp line.
    const gradient = ctx.createLinearGradient(20, 0, 220, 0);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "green");
    ctx.strokeStyle = gradient;

    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
    // Rotate the point.
    const rotated = rotate(points[i], angleX, angleY, angleZ);
    // Project the 3D point into 2D.
    const proj = project(rotated);
    // Apply the computed scale and translate to the canvas center.
    const x2d = proj.x * computedScale + canvas.width / 2;
    const y2d = proj.y * computedScale + canvas.height / 2;
    if (i === 0) {
        ctx.moveTo(x2d, y2d);
    } else {
        ctx.lineTo(x2d, y2d);
    }
    }
    ctx.closePath();
    ctx.stroke();
    
    // Update rotation angles for continuous animation.
    angleX += 0.01;
    angleY += 0.01;
    angleZ += 0.01;
    
    requestAnimationFrame(draw);
}

draw();