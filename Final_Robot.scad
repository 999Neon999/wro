// ============================================================================ //
// HIGH-QUALITY 3D PRINTABLE WRIST MOUNT ASSEMBLY                               //
// ============================================================================ //
$fn = 64; // High resolution for round, clean structural geometry

// --- Configuration Parameters ---
servo_w = 19.7; // Width reference matching standard servo brackets

// --- Protruding Screw Stud Parameters ---
screw_diameter = 2.8;   // Set to exactly 2.9mm
screw_length   = 9.0;   // 7mm thread length (excluding the nut base)

// ============================================================================
// 🎮 LIVE KINETIC SIMULATION CONTROL
// ============================================================================
elbow_joint_angle = 35; // Change this value to rotate the full mechanism

// ============================================================================
// SYSTEM ASSEMBLY GENERATOR
// ============================================================================

rotate([0, 0, elbow_joint_angle]) {
    // High-Quality 3D Printable Wrist Adapter Mount
    color([0.85, 0.85, 0.9]) {
        hq_wrist_hand_bracket();
    }
}

// ============================================================================
// MODULE: SWIRLY SCREW GENERATOR WITH M3 NUT BASE
// ============================================================================
module swirly_screw_with_nut(d=2.9, h=7.0) {
    // 1. M3 Nut Base (5.5mm flat-to-flat width, 2.4mm height)
    color([0.6, 0.6, 0.6]) {
        cylinder(d=5.5 / cos(30), h=2.4, $fn=6);
    }
    
    // 2. Swirly / Spiral Threaded Shaft (Extending out from the nut base)
    color([0.45, 0.45, 0.45]) {
        translate([0, 0, 2.4]) {
            // We use a twisted linear extrusion to generate actual 3D spiral threads
            linear_extrude(height=h, twist=-360 * (h / 0.8), slices=100) { 
                union() {
                    circle(d=d - 0.4, $fn=16); // Core inner shaft diameter
                    
                    // The "swirly" thread tooth profile
                    translate([(d - 0.4)/2, 0, 0])
                        scale([1, 0.6]) circle(d=0.4, $fn=8);
                }
            }
        }
    }
}

// ============================================================================
// MODULE: HIGH-QUALITY 3D PRINTABLE WRIST MOUNT EFFECTOR
// ============================================================================
module hq_wrist_hand_bracket() {
    // Single screw centered precisely on the lower block (X=27.5)
    screw_x = 27.5;
    
    difference() {
        union() {
            // 1. Lower mounting block
            translate([27.5, 0, 2.5])
                cube([18, 13, 5], center=true);
            
            // 2. Vertical structural neck transition riser
            translate([27.5, 0, 9])
                cube([14, 13, 8], center=true);
            
            // 3. Wide structural wrist mounting flange block
            translate([35, 0, 15])
                cube([12, servo_w + 14, 6], center=true);
            
            // 4. Stylized angled wrist scoop plate extending out
            translate([52, 0, 16])
                rotate([0, 12, 0])
                    cube([32, servo_w + 24, 3], center=true);
            
            // 5. SINGLE CENTERED SWIRLY SCREW WITH M3 NUT (Pointing straight down from Z=0)
            translate([screw_x, 0, 0]) 
                mirror([0, 0, 1]) swirly_screw_with_nut(d=screw_diameter, h=screw_length);
        }
        
        // Weight-reduction triangular cutouts (kept clean on the upper scoop)
        translate([50, 12, 17]) rotate([0, 12, 0]) cylinder(d=8, h=10, center=true, $fn=3);
        translate([50, -12, 17]) rotate([0, 12, 0]) cylinder(d=8, h=10, center=true, $fn=3);
        
        // Wire/chassis routing center slot cutout at the tip of the wrist
        translate([65, 0, 19])
            rotate([0, 12, 0]) cube([12, 14, 10], center=true);
    }
}