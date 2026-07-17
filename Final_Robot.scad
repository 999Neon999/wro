// ============================================================================ //
// ROTATED & CENTERED INTEGRATED ROBOTIC ASSEMBLY: SERVO MOUNT & LEG LINK       //
// ============================================================================ //
$fn = 64; // Global high resolution for clean curves and circles

// --- Component 1: Servo Mount Parameter Inputs (DO NOT EDIT) ---
servo_l = 40;        // Servo body length
servo_w = 19.7;      // Servo body width
flange_l = 55.0;     // Total length including mounting ears
flange_h = 1.9;      // Thickness of mounting flange
flange_z_pos = 26.5; // Z position of the mounting flange center

mount_thickness = 4.0; 
clearance       = 0.4; 
wall_thickness  = 2.5; // Compact wall boundaries

wing_width     = 6.0;  
chassis_hole_d = 3;  // M3 holes to bolt this bracket to robot limbs

clip_lip_h    = 4.0;   // Vertical lip height
clip_overhang = 5.0;   // Inward clamp depth over the servo flange

// --- Component 2: MODIFIED Robotic Leg Segment Parameter Inputs ---
plate_length   = 60.0;  // INCREASED: To match and cover the servo bracket length
plate_width    = 40.0;  // INCREASED: To match and cover the servo bracket wings width
sheet_t        = 5.0;   // Solid thickness of the connection structure (0.5 cm)

main_pivot_d   = 6.0;   // KEPT: Primary rotational axis screw remains 6.0mm

// --- Preview Configuration Switch ---
show_servo_preview = false;  

// ============================================================================
// SYSTEM ASSEMBLY GENERATOR
// ============================================================================

// 1. Move the Servo Mount to the left side of the origin (rotated to face the link)
translate([-12, 0, 0]) {
    rotate([0, 90, 0]) {
        // Shift geometry down so the mount assembly center sits exactly at [0,0,0]
        translate([0, 0, -flange_z_pos]) {
            servo_mount_with_clips();

            // Render the simplified servo body inside the rotated frame if enabled
            if (show_servo_preview) {
                %mg996r_servo_simplified();
            }
        }
    }
}

// 2. Center the Leg Link Segment at the origin so it faces the mount perfectly
translate([0, 0, 0]) {
    leg_link_segment();
}

// ============================================================================
// MODULE: STRUCTURAL BRACKET WITH RETENTION CLIPS
// ============================================================================
module servo_mount_with_clips() {
    inner_l = servo_l + clearance;
    inner_w = servo_w + clearance;
    
    plate_l = flange_l + 2 * wall_thickness;
    plate_w = servo_w + 2 * wall_thickness;
    
    z_top = flange_z_pos - (flange_h / 2);
    z_bottom = z_top - mount_thickness;
    z_mid = z_bottom + mount_thickness/2;
    
    union() {
        // Main structural bracket base assembly with cutout
        difference() {
            union() {
                // Main mount bracket plate
                translate([0, 0, z_mid])
                    cube([plate_l, plate_w, mount_thickness], center=true);
                
                // Extended side wings (ears) for mounting to the robot chassis
                translate([0, 0, z_mid])
                    cube([plate_l - 10, plate_w + 2 * wing_width, mount_thickness], center=true);
            }
            
            // Central pass-through cutout for the servo body
            translate([0, 0, z_mid])
                cube([inner_l, inner_w, mount_thickness + 2], center=true);
                
            // Chassis mounting holes
            wing_y_pos = (plate_w / 2) + (wing_width / 2);
            for(x = [-flange_l/2 + 4, flange_l/2 - 4]) {
                for(y = [-wing_y_pos, wing_y_pos]) {
                    translate([x, y, z_bottom - 1])
                        cylinder(h=mount_thickness + 2, d=chassis_hole_d);
                }
            }
        }
        
        // Edge retention clips
        for(x_sign = [-1, 1]) {
            x_pos = x_sign * (plate_l / 2);
            
            translate([x_pos, 0, z_top]) {
                // Vertical clip anchor rising up from the plate surface
                translate([-x_sign * (wall_thickness / 4), 0, (flange_h + clearance) / 2])
                    cube([wall_thickness / 2, plate_w, flange_h + clearance], center=true);
                
                // Inward-facing horizontal hook extending over the servo ears
                translate([-x_sign * (clip_overhang / 2 + wall_thickness / 2), 0, flange_h + clearance])
                    cube([clip_overhang, plate_w, 1.2], center=true);
                
                // Vertical lip running flush along the absolute edge wall
                translate([0, 0, -clip_lip_h / 2])
                    cube([wall_thickness / 2, plate_w, clip_lip_h], center=true);
            }
        }
    }
}

// ============================================================================
// MODULE: LEG LINK SEGMENT (MODIFIED TO MATE WITH SERVO MOUNT)
// ============================================================================
module leg_link_segment() {
    // Derived spatial coordinate parameters to match mounting wing holes perfectly
    plate_w = servo_w + 2 * wall_thickness;
    wing_y_pos = (plate_w / 2) + (wing_width / 2); // Equals 15.35
    wing_z_pos = flange_l/2 - 4;                  // Equals 23.5
    
    // 1. Core Structural Link Arm Plate (Enlarged)
    color([0.85, 0.85, 0.88]) { 
        difference() {
            cube([sheet_t, plate_width, plate_length], center=true);
        }
    }
    
    // 2. Main Rotational Pivot Joint Shaft (Front Face)
    color([0.70, 0.72, 0.75]) {
        translate([sheet_t/2, 0, 0]) rotate([0, 90, 0]) {
            cylinder(d=main_pivot_d, h=10.0, center=false);
            translate([0, 0, -sheet_t]) cylinder(d=10.0, h=2.0, center=true);
        }
    }
    
    // 3. 4 Structural Mating Screws (Now perfectly aligned with the wing holes)
    color([0.22, 0.24, 0.26]) { 
        for (z_pos = [-wing_z_pos, wing_z_pos]) {
            for (y_pos = [-wing_y_pos, wing_y_pos]) {
                translate([-sheet_t/2, y_pos, z_pos]) rotate([0, -90, 0]) {
                    // Stud length is set to pass all the way through the bracket wings
                    cylinder(d=chassis_hole_d, h=8.0, center=false);
                    // Screw cap sits clean on the back of the leg link
                    translate([0, 0, -0.5]) cylinder(d=5.5, h=1.0, center=true);
                }
            }
        }
    }
}

// ============================================================================
// SIMPLIFIED REFERENCE SERVO PREVIEW
// ============================================================================
module mg996r_servo_simplified() {
    color([0.25, 0.25, 0.25, 0.6]) {
        translate([0, 0, 18]) cube([servo_l, servo_w, 36], center=true);
        translate([0, 0, flange_z_pos]) cube([flange_l, servo_w, flange_h], center=true);
    }
}