// =====================================================================
// PCA9685 16-Channel PWM/Servo Driver Board — x2, 3cm gap
// Layout:  [ PCA9685 #1 ] --- 30mm gap --- [ PCA9685 #2 ]
// =====================================================================
// Approximate real-world dims of the common Adafruit-style PCA9685
// breakout board (2.5" x 1.0"): 62.5 x 25.4 x 1.6mm PCB
// =====================================================================

$fn = 48;

// ---------------- PARAMETERS ----------------
board_length   = 62.5;   // PCB length (X)
board_width    = 25.4;   // PCB width  (Y)
board_thick    = 1.6;    // PCB thickness (Z)

gap_between    = 30;     // <-- the "3cm gap" requested

mount_hole_d   = 2.7;    // mounting hole diameter
mount_inset_x  = 4;      // inset of mounting holes from short edges
mount_inset_y  = 3.5;    // inset of mounting holes from long edges

ic_size        = [9, 9, 1.2];   // main PCA9685 IC (black chip)
ic_offset      = [board_length*0.5, board_width*0.42, board_thick]; // roughly centered, biased toward header row

xtal_size      = [3.2, 2, 1.5]; // small oscillator/cap near IC

// I2C header (4-pin, both sides for pass-through) — pins: GND SCL SDA VCC
i2c_pins       = 4;
i2c_pitch      = 2.54;
i2c_pin_d      = 0.6;
i2c_pin_h      = 3;       // pin housing height above board
i2c_offset_y   = 3;       // distance from one short edge

// Servo header block: 16 channels x 3 pins (V+, GND, PWM), spaced along long edge
servo_channels = 16;
servo_pitch    = board_length / (servo_channels + 1); // even spread
servo_row_y    = board_width - 3;   // near far long edge
servo_pin_d    = 0.6;
servo_pin_h    = 3;
servo_pin_row_pitch = 1.6; // spacing between the 3 pins in a row (V+,GND,PWM)

// Power terminal block (2-pin screw terminal) at one short edge
term_size      = [10.5, 8.5, 8];
term_offset    = [board_length - term_size[0]/2 - 2, board_width/2, board_thick];

// External power capacitor (electrolytic, cylindrical) near terminal block
cap_d          = 6.3;
cap_h          = 7;
cap_offset     = [board_length - 15, board_width/2, board_thick];

// ---------------- COLORS ----------------
col_pcb    = [0.05, 0.35, 0.10];   // classic PCB green
col_ic     = [0.05, 0.05, 0.05];   // black chip
col_header = [0.05, 0.05, 0.05];   // black plastic header shroud
col_pin    = [0.85, 0.70, 0.15];   // gold/brass pins
col_term   = [0.10, 0.55, 0.15];   // green screw terminal block
col_cap    = [0.15, 0.15, 0.65];   // blue capacitor
col_silk   = [0.9, 0.9, 0.9];      // white silkscreen (unused geometry, placeholder)

// ---------------- MODULES ----------------

module mounting_hole(x, y) {
    translate([x, y, -0.5])
        cylinder(d = mount_hole_d, h = board_thick + 1);
}

module pcb_board() {
    color(col_pcb)
    difference() {
        cube([board_length, board_width, board_thick]);

        // 4 corner mounting holes
        mounting_hole(mount_inset_x, mount_inset_y);
        mounting_hole(board_length - mount_inset_x, mount_inset_y);
        mounting_hole(mount_inset_x, board_width - mount_inset_y);
        mounting_hole(board_length - mount_inset_x, board_width - mount_inset_y);
    }
}

module main_ic() {
    color(col_ic)
    translate([ic_offset[0] - ic_size[0]/2, ic_offset[1] - ic_size[1]/2, ic_offset[2]])
        cube(ic_size);

    // little pin-1 dot marker
    color(col_silk)
    translate([ic_offset[0] - ic_size[0]/2 + 1, ic_offset[1] - ic_size[1]/2 + 1, ic_offset[2] + ic_size[2]])
        cylinder(d = 0.6, h = 0.3);
}

module small_osc() {
    color([0.7,0.7,0.7])
    translate([ic_offset[0] + ic_size[0]/2 + 3 - xtal_size[0]/2,
               ic_offset[1],
               board_thick])
        cube(xtal_size);
}

module pin_header(n, pitch, pin_d, pin_h, x0, y0, z0, shroud = true) {
    // n pins along X, black shroud + gold pins poking through
    shroud_len = (n - 1) * pitch + 2.5;
    if (shroud) {
        color(col_header)
        translate([x0 - 1.25, y0 - 1.25, z0])
            cube([shroud_len, 2.5, i2c_pin_h]);
    }
    for (i = [0 : n - 1]) {
        color(col_pin)
        translate([x0 + i * pitch, y0, z0 - 2.5])
            cylinder(d = pin_d, h = pin_h + 2.5);
    }
}

module i2c_headers() {
    // Two 4-pin I2C pass-through headers, one near each short edge, front row
    pin_header(i2c_pins, i2c_pitch, i2c_pin_d, i2c_pin_h,
                x0 = 4, y0 = i2c_offset_y, z0 = board_thick);

    pin_header(i2c_pins, i2c_pitch, i2c_pin_d, i2c_pin_h,
                x0 = board_length - 4 - (i2c_pins-1)*i2c_pitch, y0 = i2c_offset_y, z0 = board_thick);
}

module servo_headers() {
    // 16 groups of 3 pins (V+, GND, PWM) running along the board length,
    // set back from the long edge
    for (ch = [0 : servo_channels - 1]) {
        cx = servo_pitch * (ch + 1);
        // black shroud covering all 3 pins of this channel
        color(col_header)
        translate([cx - 0.9, servo_row_y - 1.25, board_thick])
            cube([1.8, servo_pin_row_pitch * 2 + 1.2, servo_pin_h]);

        for (p = [0 : 2]) {
            color(col_pin)
            translate([cx, servo_row_y + (p - 1) * servo_pin_row_pitch, board_thick - 2.5])
                cylinder(d = servo_pin_d, h = servo_pin_h + 2.5);
        }
    }
}

module power_terminal() {
    color(col_term)
    translate([term_offset[0] - term_size[0]/2,
               term_offset[1] - term_size[1]/2,
               term_offset[2]])
        cube(term_size);

    // two screw heads on top
    for (s = [-1, 1]) {
        color([0.6,0.6,0.6])
        translate([term_offset[0] + s * term_size[0]/4,
                   term_offset[1],
                   term_offset[2] + term_size[2]])
            cylinder(d = 2.2, h = 1.2);
    }
}

module power_cap() {
    color(col_cap)
    translate([cap_offset[0], cap_offset[1] - 6, cap_offset[2]])
        cylinder(d = cap_d, h = cap_h);
}

module label_text() {
    // Silkscreen-style label, raised slightly above PCB for visibility
    color(col_silk)
    translate([board_length/2, 6, board_thick + 0.05])
        linear_extrude(height = 0.2)
            text("PCA9685", size = 4, halign = "center", valign = "center", font = "Liberation Sans:style=Bold");
}

// Full assembled board
module pca9685_board() {
    pcb_board();
    main_ic();
    small_osc();
    i2c_headers();
    servo_headers();
    power_terminal();
    power_cap();
    label_text();
}

// ---------------- ASSEMBLY: 1 PCA -- 3cm gap -- 1 PCA ----------------

module dual_pca9685_layout() {
    // Board 1
    translate([0, 0, 0])
        pca9685_board();

    // Board 2, offset by board length + the 30mm (3cm) gap
    translate([board_length + gap_between, 0, 0])
        pca9685_board();
}

dual_pca9685_layout();

// ---------------------------------------------------------------------
// Notes:
//  - gap_between controls the edge-to-edge spacing (currently 30mm = 3cm)
//  - All other dimensions are parametric at the top of the file
//  - Rendered board approximates the common Adafruit-style PCA9685
//    16-channel PWM/Servo driver breakout (62.5 x 25.4mm PCB)
// ---------------------------------------------------------------------