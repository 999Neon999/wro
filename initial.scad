// ============================================================================
// MOUNTED MG996R SERVO (UPSIDE DOWN ON PLATE) WITH REAR INTEGRATED CAMERA
// ============================================================================
$fn = 32;

// --- Plate Dimensions ---
plate_l = 150;
plate_w = 100;
plate_h = 3;

// --- Servo Configuration Data ---
servo_l       = 40.7; 
servo_w       = 19.7; 
servo_h_main  = 36.0; 
flange_l      = 55.0; 
flange_h      = 2.5;  
flange_z_pos  = 26.5; 
gear_z_total  = 42.9; 

// Top cover and gear heights for calculations
top_cover_h   = 4.5;
gear_base_z   = servo_h_main + top_cover_h + 2.0;
gear_height   = gear_z_total - gear_base_z;
gear_center_x = servo_l/2 - 10;
horn_thickness = 4.0;
collar_h      = 1.0;

// Calculate the maximum high Z point of the horn so it touches Z = 0 when flipped
servo_total_top_z = gear_base_z + gear_height + 1.0 + (horn_thickness/2) + collar_h;

// --- Servo Color Palette ---
color_case        = [0.15, 0.15, 0.16]; 
color_gear        = [0.78, 0.62, 0.18]; 
color_horn_metal  = [0.82, 0.83, 0.85]; 
color_label_purp  = [0.38, 0.15, 0.50]; 
color_label_text  = [0.95, 0.95, 0.95]; 
color_wire_brown  = [0.45, 0.30, 0.20]; 
color_wire_red    = [0.85, 0.15, 0.12]; 
color_wire_orange = [0.95, 0.50, 0.10]; 
color_conn_blk    = [0.08, 0.08, 0.08]; 
color_support     = [0.3, 0.3, 0.3];

// --- Camera Color Palette ---
color_pcb         = [0.08, 0.40, 0.22]; // Pi Green
color_cam_body    = [0.12, 0.12, 0.12]; // Dark Grey Matte
color_lens        = [0.02, 0.02, 0.02]; // Glossy Lens
color_gold        = [0.83, 0.68, 0.21]; 

// --- Smooth Wire Macro ---
module smooth_wire(points, diameter) {
    for (i = [0 : len(points) - 2]) {
        hull() {
            translate(points[i]) sphere(d=diameter);
            translate(points[i+1]) sphere(d=diameter);
        }
    }
}

// --- Metal Horn Module ---
module metal_horn() {
    center_d   = 13.0;     
    arm_w      = 6.0;      
    overall_l  = 35.0;     
    arm_reach  = overall_l - (center_d / 2); 
    
    color(color_horn_metal) {
        difference() {
            union() {
                cylinder(h=horn_thickness, d=center_d, center=true);
                hull() {
                    cylinder(h=horn_thickness, d=center_d, center=true);
                    translate([arm_reach, 0, 0]) 
                        cylinder(h=horn_thickness, d=arm_w, center=true);
                }
                translate([0, 0, horn_thickness/2])
                    cylinder(h=1.0, d=8.5, center=true);
            }
            cylinder(h=horn_thickness + 4, d=3.0, center=true);
            translate([10, 0, 0]) cylinder(h=horn_thickness + 2, d=2.0, center=true);
            translate([15, 0, 0]) cylinder(h=horn_thickness + 2, d=2.0, center=true);
            translate([20, 0, 0]) cylinder(h=horn_thickness + 2, d=2.0, center=true);
            translate([25, 0, 0]) cylinder(h=horn_thickness + 2, d=2.0, center=true);
        }
    }
}

// --- Raspberry Pi Camera v2 Module ---
module pi_camera_v2() {
    pcb_w = 25.0;
    pcb_h = 24.0;
    pcb_t = 1.2;
    
    // PCB base board
    color(color_pcb) {
        difference() {
            cube([pcb_w, pcb_h, pcb_t], center=true);
            // 4 corner holes (M2 size spacing, 21mm x 12.5mm apart)
            for (x = [-10.5, 10.5]) {
                for (y = [-6.25, 6.25]) {
                    translate([x, y, 0]) cylinder(h=pcb_t + 2, d=2.2, center=true);
                }
            }
        }
    }
    
    // Gold contact pads around holes
    color(color_gold) {
        for (x = [-10.5, 10.5]) {
            for (y = [-6.25, 6.25]) {
                translate([x, y, pcb_t/2 + 0.05]) cylinder(h=0.1, d=4.0, center=true);
            }
        }
    }
    
    // Main sensor unit housing block
    color(color_cam_body) {
        translate([0, 0, pcb_t/2 + 2.25]) 
            cube([8.5, 8.5, 4.5], center=true);
        
        // Ribbon connector block
        translate([0, 6.5, pcb_t/2 + 1.25]) 
            cube([10.0, 4.0, 2.5], center=true);
    }
    
    // Round camera lens
    color(color_lens) {
        translate([0, 0, pcb_t/2 + 4.5]) 
            cylinder(h=2.0, d=6.5);
        translate([0, 0, pcb_t/2 + 6.0]) 
            cylinder(h=0.6, d=3.5);
    }
}

// --- Servo Base Assembly ---
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

    // 6. WIRE CHANNELS
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

    // 7. 3-PIN PLUG
    translate([wire_exit_x - 10, -15.4, wire_exit_z + 14]) rotate([22, -12, 25]) {
        color(color_conn_blk) difference() {
            cube([3.0, 7.8, 10.0], center=true);
            translate([1.2, 0, -4.5]) cube([1.0, 7.0, 2.0], center=true);
        }
    }
}

// ============================================================================
// ASSEMBLY RENDER
// ============================================================================

// The 150x100mm plate
color([0.3, 0.6, 0.4]) 
    translate([0, 0, -plate_h/2]) 
        cube([plate_l, plate_w, plate_h], center=true);

// Assembly group containing the servo, bracket, and camera
union() {
    // Shift the servo so the horn face is flush with the top of the plate, 
    // and offset the X axis so the horn center aligns with the plate center.
    translate([-gear_center_x, 0, servo_total_top_z]) 
        rotate([0, 180, 0]) 
            mg996r_servo();

    // Supporting columns to bridge the gap and hold the servo body securely
    support_width = servo_w * 0.8;
    support_length = servo_l * 0.8;
    translate([-gear_center_x, 0, (servo_total_top_z / 2)])
        color(color_support)
            cube([support_length, support_width, servo_total_top_z], center=true);

    // Camera placement on the flat wall with wire exit (now on the +X side due to rotation)
    camera_offset_x = -gear_center_x + (servo_l / 2);
    camera_offset_z = servo_total_top_z - (servo_h_main / 2);

    translate([camera_offset_x + 0.6, 0, camera_offset_z]) 
        rotate([0, 90, 0]) 
            pi_camera_v2();
}