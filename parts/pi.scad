// ============================================================================
// PROJECT AEVUM: PI 5 BLOCK WITH 90-DEGREE UPWARD VERTICAL CABLE & CAMERA
// ============================================================================

$fn = 30;

// --- Precise Dimensions from User Specs ---
pi_l = 85;    // Length (mm)
pi_w = 56;    // Width (mm)
pi_h = 17;    // Height (mm)

cable_l = 200; // Cable Length (mm)
cable_w = 16;  // Cable Width (mm)
cable_t = 0.3; // Cable Thickness (mm)

cam_w = 25;    // Camera PCB Width (mm)
cam_l = 25;    // Camera PCB Length (mm)
sensor_w = 8.5; // Sensor Block Width (mm)
sensor_l = 8.5; // Sensor Block Length (mm)
sensor_h = 5;   // Lens Height (mm)

// --- Color Scheme ---
color_block   = [0.15, 0.15, 0.18]; // Sleek Dark Block
color_cable   = [0.85, 0.85, 0.80]; // Cream/White Ribbon
color_silicon = [0.12, 0.48, 0.22]; // Pi Green for Camera PCB
color_lens    = [0.05, 0.05, 0.08]; // Camera Optical Lens

// ============================================================================
// ASSEMBLY GENERATION
// ============================================================================

// 1. Raspberry Pi 5 Main Block (Centered on Origin)
color(color_block) cube([pi_l, pi_w, pi_h], center=true);

// 2. Vertical 90-Degree CSI Ribbon Cable
// Positioned right at the front edge of the length axis (X = pi_l/2)
translate([pi_l/2, 0, 0]) {
    // Shifting upwards so the bottom of the cable aligns with the center of the Pi face
    translate([0, 0, cable_l/2]) {
        color(color_cable) cube([cable_t, cable_w, cable_l], center=true);
    }
}

// 3. OV5647 Camera Module Assembly (Facing Upward at the Cable Tip)
// Placed at the very top of the 200mm vertical run (Z = cable_l)
translate([pi_l/2, 0, cable_l]) {
    rotate([0, 0, 0]) { // Sitting completely flat on the horizontal XY plane
        
        // Camera Carrier Board
        color(color_silicon) cube([cam_l, cam_w, 1.6], center=true);
        
        // Lens Housing and Optic Core pointing straight up along Z-axis
        translate([0, 0, 1.6/2]) {
            color([0.2, 0.2, 0.2]) cube([sensor_l, sensor_w, 2], center=true);
            color(color_lens) translate([0, 0, 1]) cylinder(h=sensor_h-2, d=7);
        }
    }
}