// ============================================================================
// PROJECT AEVUM - SIMPLE INTERCONNECTED BASE MODEL
// Fake servo blocks + strong structural connections
// ============================================================================

$fn = 40;

servo_size = [40, 20, 38];     // Fake servo dimensions (L,W,H)
bone_thick = 4;

// Colors
color_frame   = [0.18, 0.18, 0.22];
color_bone    = [0.0, 0.65, 0.9, 0.7];
color_servo   = [0.1, 0.1, 0.12];
color_armor   = [0.05, 0.4, 0.4];

// Fake Servo Module
module fake_servo(pos=[0,0,0], rot=[0,0,0]) {
    translate(pos) rotate(rot) {
        color(color_servo) cube(servo_size, center=true);
        // Simple shaft
        color([0.7,0.7,0.7]) translate([22,0,0]) rotate([0,90,0]) cylinder(d=7, h=10, center=true);
    }
}

// Bone / Link
module bone(length=50, width=14, height=bone_thick, pos=[0,0,0], rot=[0,0,0]) {
    translate(pos) rotate(rot)
        color(color_bone) cube([width, height, length], center=true);
}

// Main Interconnected Chassis
module aevum_base() {
    
    // === CENTRAL BASE / PELVIS ===
    color(color_frame) translate([0,0,5]) cube([70, 40, 15], center=true);
    
    // === UPPER BODY (Neck + Arms) ===
    fake_servo([0, 0, 48]);                    // Neck
    
    for (side = [1, -1]) {
        // Shoulder
        fake_servo([42*side, 0, 52], [90, 0, 90*side]);
        
        // Upper arm bone
        bone(45, 14, bone_thick, [42*side + 25*side, 0, 52], [0,90,0]);
        
        // Elbow
        fake_servo([42*side + 55*side, 0, 52], [0, 90, 0]);
        
        // Forearm bone
        bone(45, 12, bone_thick, [42*side + 85*side, 0, 48]);
    }
    
    // === LOWER BODY (Legs - 6 Servos) ===
    for (side = [1, -1]) {
        // Hip
        fake_servo([34*side, 0, -8], [0,0,90*side]);
        bone(55, 16, bone_thick, [34*side, 0, -38]);
        
        // Knee
        fake_servo([34*side, 0, -68], [90,0,0]);
        bone(52, 14, bone_thick, [34*side, 0, -98]);
        
        // Ankle
        fake_servo([34*side, 0, -130]);
        
        // Foot base
        color(color_frame) translate([34*side, 0, -150]) cube([30, 60, 6], center=true);
    }
    
    // === INTERCONNECTING STRUCTURE ===
    // Spine / Torso column
    color(color_frame) {
        translate([8,0,25]) cube([6, 12, 55], center=true);
        translate([-8,0,25]) cube([6, 12, 55], center=true);
    }
    
    // Shoulder cross beam
    color(color_frame) translate([0,0,52]) cube([90, 22, 8], center=true);
    
    // Hip reinforcement plate
    color(color_frame) translate([0,0,-12]) cube([80, 38, 6], center=true);
    
    // Outer Armor Shell (simplified)
    color(color_armor, 0.6) {
        // Torso
        translate([0,0,32]) cube([68, 28, 48], center=true);
        // Head
        translate([0,-3,82]) cube([38, 32, 42], center=true);
    }
}

aevum_base();

echo("=== Simple Interconnected Base Model Ready ===");
echo("All fake servos are linked via bones and structural plates.");