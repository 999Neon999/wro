// =====================================================================
// 12A 300W DC-DC Buck Converter Step-Down Power Module
// Input:  7-32V   |   Output: 0.8-28V (adjustable)
// =====================================================================
// Approximate real-world dims of the common "XL4016 / DPS-style"
// 300W buck module: ~68 x 39mm PCB, finned aluminum heatsink,
// large toroidal inductor, blue trimpot, screw terminals both ends.
// =====================================================================

$fn = 48;

// ---------------- PARAMETERS ----------------
board_length   = 68;    // PCB length (X)
board_width    = 39;    // PCB width  (Y)
board_thick    = 1.6;   // PCB thickness (Z)

mount_hole_d   = 3.2;
mount_inset    = 3.5;

// --- Input terminal block (VIN+, VIN-) : left short edge ---
term_size      = [10, 12.5, 10];   // one 2-pin screw terminal block
in_term_pos    = [term_size[0]/2 + 2, board_width/2, board_thick];
out_term_pos   = [board_length - term_size[0]/2 - 2, board_width/2, board_thick];

// --- Large toroidal power inductor ---
toroid_od      = 25;     // outer diameter
toroid_id      = 10;     // inner hole diameter
toroid_h       = 14;     // height
toroid_pos     = [board_length*0.36, board_width*0.28, board_thick];

// --- Heatsink (over MOSFETs / Schottky diode) ---
hs_base        = [26, 16, 3];      // heatsink base block
hs_fin_count   = 7;
hs_fin_h       = 10;
hs_fin_t       = 1.4;
hs_pos         = [board_length*0.62, board_width*0.62, board_thick];

// --- Trimpot (blue voltage-adjust potentiometer) ---
pot_size       = [6.5, 6.5, 5];
pot_pos        = [board_length*0.60, board_width*0.22, board_thick];

// --- Filter capacitors (input side + output side) ---
cap_in_d       = 8;
cap_in_h       = 12;
cap_in_pos     = [board_length*0.22, board_width*0.72, board_thick];

cap_out_d      = 6.3;
cap_out_h      = 9;
cap_out_pos    = [board_length*0.86, board_width*0.30, board_thick];

// --- Status LED ---
led_d          = 3;
led_h          = 3;
led_pos        = [board_length*0.86, board_width*0.70, board_thick];

// ---------------- COLORS ----------------
col_pcb    = [0.05, 0.05, 0.05];   // this module family is typically BLACK PCB
col_term   = [0.10, 0.55, 0.15];   // green screw terminal blocks
col_screw  = [0.65, 0.65, 0.65];
col_toroid = [0.08, 0.08, 0.08];   // black ferrite core
col_wire   = [0.75, 0.55, 0.10];   // copper winding hint
col_hs     = [0.75, 0.75, 0.78];   // aluminum heatsink
col_pot    = [0.10, 0.25, 0.75];   // blue trimpot body
col_cap_in = [0.05, 0.05, 0.05];   // black electrolytic cap
col_cap_out= [0.10, 0.35, 0.70];   // blue electrolytic cap
col_led    = [0.85, 0.05, 0.05];   // red LED
col_silk   = [0.9, 0.9, 0.9];

// ---------------- MODULES ----------------

module mounting_hole(x, y) {
    translate([x, y, -0.5])
        cylinder(d = mount_hole_d, h = board_thick + 1);
}

module pcb_board() {
    color(col_pcb)
    difference() {
        cube([board_length, board_width, board_thick]);
        mounting_hole(mount_inset, mount_inset);
        mounting_hole(board_length - mount_inset, mount_inset);
        mounting_hole(mount_inset, board_width - mount_inset);
        mounting_hole(board_length - mount_inset, board_width - mount_inset);
    }
}

module terminal_block(pos) {
    color(col_term)
    translate([pos[0] - term_size[0]/2, pos[1] - term_size[1]/2, pos[2]])
        cube(term_size);

    // 2 screw heads on top
    for (s = [-1, 1]) {
        color(col_screw)
        translate([pos[0], pos[1] + s * term_size[1]/4, pos[2] + term_size[2]])
            cylinder(d = 4.5, h = 1.5);
        // screw slot marker
        color([0.2,0.2,0.2])
        translate([pos[0] - 1.6, pos[1] + s * term_size[1]/4 - 0.4, pos[2] + term_size[2]])
            cube([3.2, 0.8, 1.6]);
    }
}

module toroid_inductor(pos) {
    color(col_toroid)
    translate(pos)
    difference() {
        cylinder(d = toroid_od, h = toroid_h);
        translate([0,0,-0.5])
            cylinder(d = toroid_id, h = toroid_h + 1);
    }

    // hint of copper winding wrap around the visible core
    color(col_wire)
    translate(pos)
    for (a = [0 : 24 : 340]) {
        rotate([0, 0, a])
        translate([toroid_od/2 - 1, 0, toroid_h/2])
            rotate([90,0,0])
                cylinder(d = 1.4, h = 2, center = true);
    }
}

module heatsink(pos) {
    color(col_hs)
    translate([pos[0] - hs_base[0]/2, pos[1] - hs_base[1]/2, pos[2]])
        cube(hs_base);

    fin_pitch = hs_base[0] / hs_fin_count;
    color(col_hs)
    for (i = [0 : hs_fin_count - 1]) {
        translate([pos[0] - hs_base[0]/2 + fin_pitch*i + fin_pitch/2 - hs_fin_t/2,
                   pos[1] - hs_base[1]/2,
                   pos[2] + hs_base[2]])
            cube([hs_fin_t, hs_base[1], hs_fin_h]);
    }
}

module trimpot(pos) {
    color(col_pot)
    translate([pos[0] - pot_size[0]/2, pos[1] - pot_size[1]/2, pos[2]])
        cube(pot_size);

    // adjustment screw slot on top (yellow-ish brass wiper)
    color([0.8,0.7,0.2])
    translate([pos[0], pos[1], pos[2] + pot_size[2]])
        cylinder(d = 3, h = 0.8);
    color([0.15,0.15,0.15])
    translate([pos[0] - 1.1, pos[1] - 0.25, pos[2] + pot_size[2]])
        cube([2.2, 0.5, 1]);
}

module electrolytic_cap(pos, d, h, col) {
    color(col)
    translate(pos)
        cylinder(d = d, h = h);
    // top vent mark
    color([0.85,0.85,0.85])
    translate([pos[0], pos[1], pos[2] + h])
        cylinder(d = d*0.6, h = 0.2);
}

module status_led(pos) {
    color(col_led)
    translate(pos)
        cylinder(d = led_d, h = led_h);
    color([1,1,1,0.3])
    translate([pos[0], pos[1], pos[2] + led_h])
        sphere(d = led_d);
}

module label_text() {
    color(col_silk)
    translate([board_length/2, board_width - 5, board_thick + 0.05])
        linear_extrude(height = 0.2)
            text("300W BUCK  IN 7-32V  OUT 0.8-28V  12A",
                 size = 2.6, halign = "center", valign = "center",
                 font = "Liberation Sans:style=Bold");
}

module in_out_labels() {
    color(col_silk)
    translate([in_term_pos[0], in_term_pos[1] - term_size[1]/2 - 2, board_thick + 0.05])
        linear_extrude(height = 0.2)
            text("IN", size = 3.5, halign = "center", font = "Liberation Sans:style=Bold");

    color(col_silk)
    translate([out_term_pos[0], out_term_pos[1] - term_size[1]/2 - 2, board_thick + 0.05])
        linear_extrude(height = 0.2)
            text("OUT", size = 3.5, halign = "center", font = "Liberation Sans:style=Bold");
}

// ---------------- FULL ASSEMBLY ----------------
module buck_converter_module() {
    pcb_board();
    terminal_block(in_term_pos);
    terminal_block(out_term_pos);
    toroid_inductor(toroid_pos);
    heatsink(hs_pos);
    trimpot(pot_pos);
    electrolytic_cap(cap_in_pos, cap_in_d, cap_in_h, col_cap_in);
    electrolytic_cap(cap_out_pos, cap_out_d, cap_out_h, col_cap_out);
    status_led(led_pos);
    label_text();
    in_out_labels();
}

buck_converter_module();

// ---------------------------------------------------------------------
// Notes:
//  - All dimensions parametric at top of file.
//  - PCB modeled black (typical for this module family); change col_pcb
//    to green if your specific unit uses a green PCB.
//  - Terminal blocks are 2-pin screw type on each short edge (IN / OUT).
//  - Heatsink fin count/height and toroid size can be tuned to match
//    your exact vendor's module photos.
// ---------------------------------------------------------------------