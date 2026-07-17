// ============================================================================
// MODIFIED CAD MODEL: MG996R SERVO WITH REAL ROUND SEGMENTED RIBBON WIRES & HORN
// ============================================================================
$fn = 32;

// --- Physical Dimension Configuration ---
servo_l       = 40.7; 
servo_w       = 19.7; 
servo_h_main  = 36.0; 
flange_l      = 55.0; 
flange_h      = 2.5;  
flange_z_pos  = 26.5; 
gear_z_total  = 42.9; 

// --- Color Palette ---
color_case        = [0.15, 0.15, 0.16]; 
color_gear        = [0.78, 0.62, 0.18]; 
color_horn_metal  = [0.82, 0.83, 0.85]; // Brushed Aluminum Metal Horn
color_label_purp  = [0.38, 0.15, 0.50]; 
color_label_text  = [0.95, 0.95, 0.95]; 
color_wire_brown  = [0.45, 0.30, 0.20]; 
color_wire_red    = [0.85, 0.15, 0.12]; 
color_wire_orange = [0.95, 0.50, 0.10]; 
color_conn_blk    = [0.08, 0.08, 0.08]; 

// --- Macro Module for Generating Smooth Round Wire Paths ---
module smooth_wire(points, diameter) {
    for (i = [0 : len(points) - 2]) {
        hull() {
            translate(points[i]) sphere(d=diameter);
            translate(points[i+1]) sphere(d=diameter);
        }
    }
}

// --- UPDATED: Round Circular Wheel Horn Module ---
// --- UPDATED: Single-Arm Straight Half-Horn Module ---
module metal_horn() {
    horn_thick = 4.0;      // Thickness changed to 4.5mm per spec
    center_d   = 13.0;     // Circle width around the 25T output gear
    arm_w      = 6.0;      // Width of the straight extension line
    overall_l  = 35.0;     // Total end-to-end physical length from back of circle to tip
    
    // Distance from the spline rotation center to the absolute tip of the extension line
    arm_reach = overall_l - (center_d / 2); 
    
    color(color_horn_metal) {
        difference() {
            union() {
                // 1. One clean circle directly wrapped around the main gear spline
                cylinder(h=horn_thick, d=center_d, center=true);
                
                // 2. A straight line/bar extending out from the gear center
                translate([0, 0, 0]) {
                    hull() {
                        // Starts at the center circle axis
                        cylinder(h=horn_thick, d=center_d, center=true);
                        // Extends straight out to the terminal point
                        translate([arm_reach, 0, 0]) 
                            cylinder(h=horn_thick, d=arm_w, center=true);
                    }
                }
                
                // Slight raised collar for standard 25T spline depth seating
                translate([0, 0, horn_thick/2])
                    cylinder(h=1.0, d=8.5, center=true);
            }
            
            // 3. Central 25T Spline Pin-Hole Axis (approx. 3mm bore for locking bolt)
            cylinder(h=horn_thick + 4, d=3.0, center=true);
            
            // 4. Standard linear sequence of linkage mounting holes along the straight line
            // Spaced incrementally from the gear center towards the tip
            translate([10, 0, 0]) cylinder(h=horn_thick + 2, d=2.0, center=true);
            translate([15, 0, 0]) cylinder(h=horn_thick + 2, d=2.0, center=true);
            translate([20, 0, 0]) cylinder(h=horn_thick + 2, d=2.0, center=true);
            translate([25, 0, 0]) cylinder(h=horn_thick + 2, d=2.0, center=true);
        }
    }
}

module mg996r_servo() {
    
    // 1. MAIN LOWER & MID HOUSING CASE
    color(color_case) {
        difference() {
            union() {
                translate([0, 0, servo_h_main/2])
                    cube([servo_l, servo_w, servo_h_main], center=true);
                
                translate([0, 0, flange_z_pos])
                    cube([flange_l, servo_w, flange_h], center=true);
            }
            
            for(x = [-flange_l/2 + 2.5, flange_l/2 - 2.5]) {
                for(y = [-servo_w/4, servo_w/4]) {
                    translate([x, y, flange_z_pos])
                        cylinder(h=flange_h + 1, d=4.2, center=true);
                }
                translate([x + (x > 0 ? -1 : 1), 0, flange_z_pos])
                    cube([3, servo_w + 1, flange_h + 1], center=true);
            }
        }
    }

    // 2. TIERED UPPER COVER
    top_cover_h = 4.5;
    translate([0, 0, servo_h_main]) color(color_case) {
        union() {
            translate([0, 0, top_cover_h/2])
                cube([servo_l, servo_w, top_cover_h], center=true);
            
            translate([servo_l/2 - 10, 0, top_cover_h])
                cylinder(h=2.0, d=15.0);
            
            translate([-6, 0, top_cover_h + 0.5])
                cube([22, servo_w - 2, 1.0], center=true);
        }
    }

    // 3. BRANDING LABEL DECAL OVERLAY
    translate([-6, 0, servo_h_main + top_cover_h + 1.05]) {
        color(color_label_purp) cube([20.5, servo_w - 3, 0.1], center=true);
        color(color_label_text) {
            translate([-4, 2, 0.06]) cube([10, 2.5, 0.1], center=true);  
            translate([-2, -2, 0.06]) cube([13, 3.5, 0.1], center=true); 
            translate([6, 0, 0.06]) cube([2, 12, 0.1], center=true);     
        }
    }

    // 4. BRASS METAL OUTPUT SPLINE
    gear_base_z = servo_h_main + top_cover_h + 2.0;
    gear_height = gear_z_total - gear_base_z;
    gear_center_x = servo_l/2 - 10;
    
    translate([gear_center_x, 0, gear_base_z]) color(color_gear) {
        difference() {
            union() {
                cylinder(h=1.2, d=8.0);
                translate([0, 0, 1.2]) cylinder(h=gear_height - 1.2, d=5.8);
                for(i = [0 : 15 : 360]) {
                    rotate([0, 0, i]) translate([2.8, 0, 1.2]) 
                        cylinder(h=gear_height - 1.2, d=0.5);
                }
            }
            translate([0, 0, gear_height - 4.0])
                cylinder(h=4.5, d=2.5);
        }
    }

    // 5. METAL HORN ATTACHMENT NODE
    translate([gear_center_x, 0, gear_base_z + gear_height + 1.0]) {
        metal_horn();
    }

    // 6. REALISTIC ROUND RIBBON WIRE CHANNELS
    wire_exit_x = -servo_l/2 + 0.2;
    wire_exit_z = 5.0; 
    wire_d = 1.3;
    
    path_orange = [
        [wire_exit_x,       -1.3, wire_exit_z],
        [wire_exit_x - 5,   -1.3, wire_exit_z - 1],
        [wire_exit_x - 12,  -6.0, wire_exit_z + 2],
        [wire_exit_x - 14,  -12.0, wire_exit_z + 8],
        [wire_exit_x - 10,  -16.7, wire_exit_z + 14]
    ];
    
    path_red = [
        [wire_exit_x,       0.0,  wire_exit_z],
        [wire_exit_x - 5,   0.0,  wire_exit_z - 1],
        [wire_exit_x - 12,  -4.7, wire_exit_z + 2],
        [wire_exit_x - 14,  -10.7, wire_exit_z + 8],
        [wire_exit_x - 10,  -15.4, wire_exit_z + 14]
    ];
    
    path_brown = [
        [wire_exit_x,       1.3,  wire_exit_z],
        [wire_exit_x - 5,   1.3,  wire_exit_z - 1],
        [wire_exit_x - 12,  -3.4, wire_exit_z + 2],
        [wire_exit_x - 14,  -9.4,  wire_exit_z + 8],
        [wire_exit_x - 10,  -14.1, wire_exit_z + 14]
    ];

    color(color_wire_orange) smooth_wire(path_orange, wire_d);
    color(color_wire_red)    smooth_wire(path_red, wire_d);
    color(color_wire_brown)  smooth_wire(path_brown, wire_d);

    // 7. 3-PIN FEMALE SERVO PLUG CONNECTOR
    translate([wire_exit_x - 10, -15.4, wire_exit_z + 14]) rotate([22, -12, 25]) {
        color(color_conn_blk) difference() {
            cube([3.0, 7.8, 10.0], center=true);
            translate([1.2, 0, -4.5]) cube([1.0, 7.0, 2.0], center=true);
        }
    }
}

// --- Live View Global Render Call Node ---
mg996r_servo();