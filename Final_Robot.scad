// ============================================================================
// 13-DOF HUMAN ROBOT: 3x3 MATRIX (9 HOLES) ENCLOSURE WITH SOLID FRONT PANEL
// Front panel is solid. Back, Left, and Right panels feature 9 grid-arranged holes.
// ============================================================================
$fn = 64;

// --- VISUALIZATION & EXPORT CONFIGURATION ---
// Set to "assembly" to view everything put together.
// Set to "base", "front_panel", "back_panel", "left_panel", or "right_panel" to render single parts for STL export.
render_mode    = "assembly"; 

// --- Global Footprint Dimensions ---
pelvis_l       = 150.0; // 15 cm Long Base
pelvis_w       = 100.0; // 10 cm Wide Base
sheet_t        = 5.0;   // Plate structural thickness
corner_r       = 8.0;   
eps            = 0.02;  

// --- Panel Enclosure Dimensions ---
panel_l        = 150.0; // Side panels are exactly 15 cm long
panel_h        = 150.0; // Height of the side panels covering the mounts
panel_t        = 3.0;   // Thickness of the side panels

// --- 🛑 9-HOLE MATRIX GRID CONFIGURATION 🛑 ---
wire_pass_d    = 10.0;  // Slightly reduced to 10mm so 9 holes fit cleanly in a grid array
grid_spacing_x = 25.0;  // Horizontal spacing between grid columns
grid_spacing_z = 30.0;  // Vertical spacing between grid rows

// --- Leg Link Spacing Constants ---
chassis_hole_d = 3.0;   
wing_y_pos     = (20.0 / 2) - 3.5; 
wing_z_pos     = (55.0 / 2) - 3.5; 

// --- User Applied Offset Configuration ---
inset_x = pelvis_l / 2 - 30.0; 
inset_y = pelvis_w / 2 - 15.0; 

// ============================================================================
// MAIN EXECUTION ROUTER
// ============================================================================
if (render_mode == "assembly") {
    large_pelvic_plate();
    
    // Front Panel (SOLID - NO HOLES)
    translate([0, pelvis_w/2 + panel_t/2, panel_h/2 - sheet_t/2])
        color([0.4, 0.6, 0.8, 0.7]) front_panel_solid();
        
    // Back Panel (9 HOLES - 3x3 GRID)
    translate([0, -pelvis_w/2 - panel_t/2, panel_h/2 - sheet_t/2])
        rotate([0, 0, 180]) color([0.4, 0.6, 0.8, 0.7]) panel_9_hole_grid(panel_l + 2*panel_t);
        
    // Left Side Panel (9 HOLES - 3x3 GRID)
    translate([-panel_l/2 - panel_t/2, 0, panel_h/2 - sheet_t/2])
        rotate([0, 0, 90]) color([0.3, 0.5, 0.7, 0.7]) panel_9_hole_grid(pelvis_w);
        
    // Right Side Panel (9 HOLES - 3x3 GRID)
    translate([panel_l/2 + panel_t/2, 0, panel_h/2 - sheet_t/2])
        rotate([0, 0, -90]) color([0.3, 0.5, 0.7, 0.7]) panel_9_hole_grid(pelvis_w);
} 
else if (render_mode == "base") {
    large_pelvic_plate();
} 
else if (render_mode == "front_panel") {
    front_panel_solid();
} 
else if (render_mode == "back_panel") {
    panel_9_hole_grid(panel_l + 2*panel_t);
} 
else if (render_mode == "left_panel" || render_mode == "right_panel") {
    panel_9_hole_grid(pelvis_w);
}

// ============================================================================
// MODULE: BASE PELVIC PLATE WITH RECESSED GLUE RIM
// ============================================================================
module large_pelvic_plate() {
    color([0.25, 0.25, 0.28]) {
        difference() {
            minkowski() {
                cube([pelvis_l - 2*corner_r, pelvis_w - 2*corner_r, sheet_t/2], center=true);
                cylinder(r=corner_r, h=sheet_t/2, center=true);
            }
            
            translate([0, inset_y, 0])
                cube([20.0, 20.0, sheet_t + 2], center=true);
            
            translate([-inset_x, inset_y, 0]) leg_mount_hole_pattern();
            translate([inset_x, inset_y, 0])  leg_mount_hole_pattern();
            
            for (x_side = [-pelvis_l/2 + 10, pelvis_l/2 - 10]) {
                for (y_side = [-pelvis_w/2 + 10, pelvis_w/2 - 10]) {
                    if (y_side < 0) {
                        translate([x_side, y_side, 0])
                            cylinder(d=chassis_hole_d, h=sheet_t + 2, center=true);
                    }
                }
            }
            
            difference() {
                cube([pelvis_l + 2, pelvis_w + 2, sheet_t + 1], center=true);
                cube([pelvis_l - 2, pelvis_w - 2, sheet_t + 2], center=true);
            }
        }
    }
}

// ============================================================================
// MODULES: INDIVIDUAL SIDE WALL PANELS
// ============================================================================

// FRONT PANEL: Completely solid, clean front profile
module front_panel_solid() {
    difference() {
        cube([panel_l + 2*panel_t, panel_t, panel_h], center=true);
        
        // Interlocking lap joint cuts
        translate([-panel_l/2 - panel_t/2, 0, 0])
            cube([panel_t + eps, panel_t + eps, panel_h + 2], center=true);
        translate([panel_l/2 + panel_t/2, 0, 0])
            cube([panel_t + eps, panel_t + eps, panel_h + 2], center=true);
    }
    
    // Base alignment lip
    translate([0, -panel_t/2 + 1, -panel_h/2 - sheet_t/4])
        cube([panel_l - corner_r, 2, sheet_t/2], center=true);
}

// UNIVERSAL GRID PANEL: Reused to punch a perfect 3x3 (9 total) hole layout
module panel_9_hole_grid(length_dimension) {
    difference() {
        cube([length_dimension, panel_t, panel_h], center=true);
        
        // Dynamic 3x3 Nested Loop to layout exactly 9 wiring holes safely
        for (x_pos = [-grid_spacing_x, 0, grid_spacing_x]) {
            for (z_pos = [-grid_spacing_z, 0, grid_spacing_z]) {
                translate([x_pos, 0, z_pos])
                    rotate([90, 0, 0])
                        cylinder(d=wire_pass_d, h=panel_t + 2, center=true);
            }
        }
        
        // Optional top trim layout styling for corner matches
        if (length_dimension == pelvis_w) {
            translate([-pelvis_w/2, 0, panel_h/2])
                rotate([0, 45, 0]) cube([10, panel_t + 2, 10], center=true);
            translate([pelvis_w/2, 0, panel_h/2])
                rotate([0, 45, 0]) cube([10, panel_t + 2, 10], center=true);
        } else {
            // Apply standard front/back edge lap join reliefs
            translate([-panel_l/2 - panel_t/2, 0, 0])
                cube([panel_t + eps, panel_t + eps, panel_h + 2], center=true);
            translate([panel_l/2 + panel_t/2, 0, 0])
                cube([panel_t + eps, panel_t + eps, panel_h + 2], center=true);
        }
    }
    
    // Base alignment lip
    translate([0, -panel_t/2 + 1, -panel_h/2 - sheet_t/4])
        cube([length_dimension - corner_r, 2, sheet_t/2], center=true);
}

// Reusable Mount Hole Module
module leg_mount_hole_pattern() {
    for (z_offset = [-wing_z_pos, wing_z_pos]) {
        for (y_offset = [-wing_y_pos, wing_y_pos]) {
            translate([z_offset, y_offset, 0]) 
                cylinder(d=chassis_hole_d, h=sheet_t + 2, center=true);
        }
    }
}