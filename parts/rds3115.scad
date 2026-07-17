// ============================================================================
// COMPREHENSIVE ANKLE MODULE IMPLEMENTATION
// Spine Length: 55.0mm | Width: 20.0mm | Plate Thickness: 5.0mm
// Central Axle Bore: 6.0mm | Satellite Pattern: 7.0mm x 7.0mm (4x M3)
// Spatial Envelope: 63.0mm Clearance Gap before Mount Face
// ============================================================================

$fn = 64;

// --- Precise Dimensional Specifications (mm) ---
sheet_t        = 5.0;   // Solid plate face thickness (0.5 cm)
bracket_w      = 20.0;  // Frame width (2.0 cm)
large_u_h      = 55.0;  // Total spine length (5.5 cm)

// True Hardware Pattern Specifications
main_screw_d   = 6.0;   // Central axle screw diameter (6.0 mm)
pattern_pitch  = 7.0;   // Square center-to-center spacing grid (7.0 mm)
satellite_d    = 3.0;   // Surrounding fastening screw diameter (M3 thread)

// Actuator Space / Leg Clearance Placeholder Parameters
placeholder_thickness = 20.0; // 20mm thick block
placeholder_width     = 55.0; // 55mm wide block
clearance_space       = 63.0; // 63mm clear gap before the mount face

// --- Structural Color Palette ---
color_metal    = [0.88, 0.90, 0.92];  // Satin aluminum bracket frame
color_hardware = [0.70, 0.70, 0.72];  // Bright steel main screw axle
color_anchors  = [0.25, 0.26, 0.28];  // Dark steel alignment fasteners
color_space    = [0.15, 0.60, 0.85, 0.40]; // Semi-translucent clearance envelope

// ============================================================================
// MODULE GENERATORS
// ============================================================================

// Phase 2 & Phase 3: Structural Interlocking Bracket Assembly
module active_interlocking_bracket() {
    union() {
        // Main Metal Bracket Frame (Includes Integrated Top and Bottom Flanges)
        color(color_metal) {
            difference() {
                union() {
                    // Vertical mounting spine face
                    cube([sheet_t, bracket_w, large_u_h], center=true);
                    
                    // Upper interlocking parallel flange arm
                    translate([12.0, 0, large_u_h/2 - 2.5])
                        cube([24.0, bracket_w, 5.0], center=true);
                        
                    // Lower interlocking parallel flange arm
                    translate([12.0, 0, -large_u_h/2 + 2.5])
                        cube([24.0, bracket_w, 5.0], center=true);
                }
                
                // Cut the central 6mm structural axle bore clear through the spine
                rotate([0, 90, 0])
                    cylinder(d=main_screw_d, h=sheet_t + 2, center=true);
                
                // Cut the 4 satellite screw holes out using the measured 7mm grid
                for (z_off = [-pattern_pitch/2, pattern_pitch/2]) {
                    for (y_off = [-pattern_pitch/2, pattern_pitch/2]) {
                        translate([0, y_off, z_off]) rotate([0, 90, 0])
                            cylinder(d=satellite_d, h=sheet_t + 2, center=true);
                    }
                }
            }
        }
        
        // Phase 4: Central Heavy-Duty Screw Axle Shaft Simulation
        color(color_hardware) {
            translate([sheet_t/2, 0, 0]) rotate([0, 90, 0]) {
                cylinder(d=main_screw_d, h=12.0, center=false);
                translate([0, 0, -sheet_t]) cylinder(d=10.0, h=2.0, center=true);
            }
        }
        
        // Phase 4: 4 Fastening Screws arrayed perfectly on the opposite back face
        color(color_anchors) {
            for (z_pos = [-pattern_pitch/2, pattern_pitch/2]) {
                for (y_pos = [-pattern_pitch/2, pattern_pitch/2]) {
                    translate([-sheet_t/2, y_pos, z_pos]) rotate([0, -90, 0]) {
                        cylinder(d=satellite_d, h=6.0, center=false);
                        translate([0, 0, -0.5]) cylinder(d=5.0, h=1.0, center=true);
                    }
                }
            }
        }
    }
}

// Phase 1: Leg Structure / Space Envelope Bounds
module lower_leg_clearance_box() {
    // Offset outwards to maintain exactly 63.0mm space behind the front mounting surface face
    translate([-clearance_space - sheet_t/2, 0, 0]) {
        color(color_space) {
            difference() {
                // Main clearance check dimensions (20mm thick x 55mm wide x 63mm span)
                cube([placeholder_thickness, placeholder_width, clearance_space], center=true);
                
                // Central cross-axis indicator line for visual alignment tracking
                cube([placeholder_thickness + 4, 2.0, 2.0], center=true);
            }
        }
    }
}

// ============================================================================
// SYSTEM ASSEMBLY EXECUTION
// ============================================================================
module generate_ankle_system() {
    active_interlocking_bracket();
    lower_leg_clearance_box();
}

generate_ankle_system();