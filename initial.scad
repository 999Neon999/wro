// ============================================================================
// PROJECT AEVUM: DECOUPLED TWO-LAYER CYBERNETIC CHASSIS
// INTEGRATED WITH TRUE/FALSE COMPONENT TOGGLES & SKELETON SERVO CAGES
// ============================================================================

$fn = 35; // Fine resolution rendering

// --- Parametric Framework Tolerances ---
servo_w = 20;   // Servo Width (mm)
servo_l = 40;   // Servo Length
servo_h = 40;   // Servo Height
bone_thick = 3; // Polycarbonate sheet gauge

// --- Material Color Palettes ---
color_chassis   = [0.2, 0.2, 0.22];     // Dark Slate Gray
color_skeleton  = [0.15, 0.15, 0.17];   // Matte Dark Gray (Internal Rigidity)
color_poly_bone = [0.0, 0.6, 0.85, 0.5]; // Transparent Cyan (Milled Polycarbonate Links)
color_silicon   = [0.12, 0.5, 0.2];      // PCB Green (Pi 5, MPU6050, Camera)
color_armor     = [0.0, 0.4, 0.4, 0.99]; // Stealth Matte Black Shell (Outside Armor)
color_reactor   = [0.0, 1.0, 0.7, 0.9];   // Neon Mint Blue (Chest Power Core)

// --- VIEW CONTROL FLAGS (TRUE / FALSE CONFIG) ---
show_skeleton       = true;  // Toggle to view structural skeleton paths
show_exoshell       = true; // Toggle to view outer aesthetic paneling
show_servos         = true;  // [NEW] True/False switch to show/hide core actuators
show_silicon_boards = true;  // [NEW] True/False switch to show/hide Pi 5, MPU6050, Camera PCBs

// ============================================================================
// COMPONENT CORE MODULES
// ============================================================================

// [NEW] Skeleton structural component that wraps completely around the servo
id=1;
module servo_cage() {
    if (show_skeleton) {
        color(color_skeleton) difference() {
            // Outward shielding bracket box wrapping the servo body
            cube([servo_w + 5, servo_l + 6, servo_h + 4], center=true);
            // Internal pocket to snugly isolate the servo body
            cube([servo_w + 0.4, servo_l + 0.4, servo_h + 10], center=true);
        }
    }
    if (show_servos) {
        color([0.1, 0.1, 0.12]) cube([servo_w, servo_l, servo_h], center=true);
        color([0.2, 0.5, 0.95]) translate([0, 0, servo_h/2]) cylinder(h=2, r=4.5, center=true);
    }
}

module parallel_poly_bone(length, width=14, spacing=22) {
    if (show_skeleton) {
        color(color_poly_bone) {
            translate([0, spacing/2, 0]) cube([width, bone_thick, length], center=true);
            translate([0, -spacing/2, 0]) cube([width, bone_thick, length], center=true);
        }
    }
}

// ============================================================================
// LAYER 1: INTERNAL LOAD-BEARING SKELETON LAYER
// ============================================================================
module inner_skeleton() {
    // 1. Central Pelvic Rigidity Block (Houses MPU6050 Bed)
    if (show_skeleton) {
        translate([0, 0, 0]) color(color_skeleton) cube([64, 34, 10], center=true);
    }
    
    // Telemetry Center: MPU6050 Board at Absolute Center of Mass
    if (show_silicon_boards) {
        translate([0, 0, 6]) color(color_silicon) cube([18, 14, 1.6], center=true);
    }
    
    // 2. Dual-Column Structural Spine
    if (show_skeleton) {
        translate([8, 0, 24]) color(color_skeleton) cube([5, 8, 38], center=true);
        translate([-8, 0, 24]) color(color_skeleton) cube([5, 8, 38], center=true);
        // 3. Primary Shoulder Structural Cross-Beam
        translate([0, 0, 46]) color(color_skeleton) cube([68, 22, 8], center=true);
    }
    
    // 4. Computation Stack Mount (Raspberry Pi 5 Core Deck)
    if (show_silicon_boards) {
        translate([0, -14, 24]) color(color_silicon) {
            cube([46, 1.6, 36], center=true); // Pi 5 Footprint
            color([0.6, 0.6, 0.62]) translate([4, -3, 3]) cylinder(h=4, r=11, center=true); // Active Cooler Module
        }
    }

    // 5. Neck Rotational Actuator Caged Node
    translate([0, 0, 52]) servo_cage();

    // 6. Right & Left Leg Kinematic Struts (6 DOF Per Side)
    for (side = [1, -1]) {
        translate([34 * side, 0, -14]) {
            servo_cage(); // Caged Hip Joint Hub
            translate([0, 0, -32]) parallel_poly_bone(48, width=15, spacing=20); // Thigh
            
            translate([0, 0, -60]) {
                servo_cage(); // Caged Knee Joint Hub
                translate([0, 0, -32]) parallel_poly_bone(48, width=13, spacing=20); // Shin
                
                translate([0, 0, -60]) {
                    servo_cage(); // Caged Ankle Joint Hub
                    // Load-Bearing Internal Foot Anchor Plate
                    if (show_skeleton) {
                        translate([0, 0, -20]) color(color_skeleton) cube([26, 56, 4], center=true);
                    }
                }
            }
        }
    }

    // 7. Upper Arm Actuators & Bones
    for (side = [1, -1]) {
        translate([42 * side, 0, 46]) {
            rotate([0, 90, 0]) servo_cage(); // Caged Shoulder Actuator
            translate([30 * side, 0, 0]) rotate([0, 90, 0]) parallel_poly_bone(32, width=10, spacing=14); // Bicep Bone
            translate([50 * side, 0, 0]) servo_cage(); // Caged Elbow Actuator
        }
    }
}

// ============================================================================
// LAYER 2: EXTERNAL STREAMLINED CYBERNETIC EXOSHELL LAYER
// ============================================================================
module outer_exoshell() {
    color(color_armor) {
        // 1. Pelvic Girdle Guard / Hip Skirt Armor Panels
        translate([0, 0, -2]) difference() {
            cylinder(h=14, r1=38, r2=34, center=true, $fn=4);
            cylinder(h=16, r=30, center=true, $fn=4); // Inner skeletal pathway clearance
        }
        
        // 2. Head Assembly: Scaled Up Custom Sculpted Sensory Visor
        translate([0, -2, 84]) difference() {
            union() {
                // Main Aggressive Hex-Helmet
                cylinder(h=44, r1=24, r2=20, center=true, $fn=6);
                // Swept Chin and Temple Guard Crests
                translate([0, 16, 4]) cube([26, 8, 16], center=true);
            }
            // Internal Hollow Chamber for Neck Pivot Insertion & Camera PCB Protection
            translate([0, 3, -4]) cylinder(h=40, r=18, center=true, $fn=6);
            // Forward Focal Port: OV5647 Camera Module Lens Window
            translate([0, 22, 6]) rotate([90, 0, 0]) cylinder(h=15, r=5.5, center=true);
            // Dynamic Aero-Vent Lines
            translate([19, -4, 0]) cube([3, 14, 6], center=true);
            translate([-19, -4, 0]) cube([3, 14, 6], center=true);
        }
        
        // Nested OV5647 Internal Optics Camera Frame
        if (show_silicon_boards) {
            translate([0, 10, 90]) rotate([90, 0, 0]) color(color_silicon) {
                cube([24, 1.6, 24], center=true);
                color([0.05, 0.05, 0.05]) translate([0, -2, 0]) rotate([90, 0, 0]) cylinder(h=4, r=3.5, center=true);
            }
        }

        // 3. Upgraded Lower Limbs Exterior Armor Shields
        for (side = [1, -1]) {
            translate([34 * side, 0, -14]) {
                // Thigh Greave Plates
                translate([0, 0, -32]) cube([22, 26, 42], center=true);
                // Shin Guard Deflectors
                translate([0, 0, -92]) cube([20, 24, 42], center=true);
                // Styled Wide-Stance Cyber Foot Armor Shrouds
                translate([0, 0, -136]) cube([36, 72, 8], center=true);
            }
        }

        // 4. Forearm Extensions & Multi-Faceted Robotic Manipulators
        for (side = [1, -1]) {
            translate([42 * side, 0, 46]) {
                // Forearm Guard Shell
                translate([76 * side, 0, 0]) rotate([0, 90, 0]) cube([14, 20, 24], center=true);
                // Stylized Intangible Culture Performance Hand Terminals
                translate([102 * side, 0, 0]) rotate([0, 90, 0]) {
                    cube([5, 22, 18], center=true); // Palm Shield
                    translate([8 * side, 6, 0]) cube([10, 3.5, 3], center=true);  // Mudra Pointer Finger 1
                    translate([11 * side, 0, 0]) cube([13, 3.5, 3], center=true); // Mudra Pointer Finger 2
                    translate([8 * side, -6, 0]) cube([10, 3.5, 3], center=true); // Mudra Pointer Finger 3
                }
            }
        }
    }

    // ------------------------------------------------------------------------
    // UPGRADED CHEST PANEL: RECTANGULAR GEOMETRIC DETAILED REACTOR
    // ------------------------------------------------------------------------
    if (show_exoshell) {
        translate([0, 0, 34]) {
            // Main Outer Tapered Torso Chest Plate
            color(color_armor) difference() {
                translate([0, 3, 0]) cube([66, 22, 38], center=true);
                // Center Recess Cutout to host the Reactor Panel Core
                translate([0, 12, 0]) cube([36, 6, 24], center=true);
                // Angled Shoulder Clearance Trims
                translate([33, 0, 19]) rotate([0, 35, 0]) cube([20, 30, 20], center=true);
                translate([-33, 0, 19]) rotate([0, -35, 0]) cube([20, 30, 20], center=true);
            }
            
            // Core Emissive Energy Layer (Glow Bed)
            color(color_reactor) translate([0, 12.5, 0]) cube([34, 2, 22], center=true);
            
            // Detailed Geometric Matrix Overlays (Faceted Grille Grates across the Reactor)
            color(color_chassis) translate([0, 14, 0]) {
                cube([34, 1, 2], center=true);       // Horizontal Center Splitter Rail
                cube([2, 1, 22], center=true);       // Vertical Stabilizer Column
                translate([10, 0, 0]) cube([1.5, 1, 22], center=true); // Right Grid Segment
                translate([-10, 0, 0]) cube([1.5, 1, 22], center=true); // Left Grid Segment
                
                // Tech Accent Border Rings
                difference() {
                    cube([30, 1.2, 18], center=true);
                    cube([26, 3, 14], center=true);
                }
            }
        }
    }
}

// ============================================================================
// COMPILING ARCHITECTURE VIEWPORTS
// ============================================================================

if (show_skeleton) {
    inner_skeleton();
}

if (show_exoshell) {
    outer_exoshell();
}