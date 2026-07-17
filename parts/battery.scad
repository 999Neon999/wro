// ============================================================================ //
// MODIFIED CAD MODEL: GENX POWER+ LIPO BATTERY PACK WITH INTACT WIRES         //
// Form Factor Envelope: Exactly 138.0mm x 43.0mm x 18.0mm                    //
// ============================================================================ //
$fn = 32;

// --- Structural Configuration Variables ---
bat_l = 138.0;
bat_w = 43.0;
bat_h = 18.0;
r_corner = 2.5; // Soft shrink-wrapped protective edge radius

// --- Aesthetic Color Palette Mapping ---
color_wrap = [0.12, 0.12, 0.14];       // Glossy charcoal black protective wrap
color_wire_red = [0.85, 0.15, 0.12];    // High-flex silicone heavy load red (+)
color_wire_black = [0.15, 0.15, 0.16];  // High-flex silicone heavy load black (-)
color_xt60_body = [0.90, 0.72, 0.12];   // High-temp nylon yellow plug frame
color_jst_white = [0.92, 0.92, 0.94];   // Nylon white JST-XH balancing housing
color_gold_pin = [0.78, 0.62, 0.18];    // Exposed brass/gold female bullet sleeves

module genx_5200mah_battery() {
    // 1. MAIN CELL PACK WRAPPER BODY
    translate([0, 0, 0]) {
        color(color_wrap) 
        difference() {
            hull() {
                for (x = [-(bat_l/2 - r_corner), (bat_l/2 - r_corner)]) {
                    for (y = [-(bat_w/2 - r_corner), (bat_w/2 - r_corner)]) {
                        for (z = [-(bat_h/2 - r_corner), (bat_h/2 - r_corner)]) {
                            translate([x, y, z]) sphere(r=r_corner);
                        }
                    }
                }
            }
            // Subtle alignment indentation tracks on the wrapper
            translate([bat_l/2 - 4, 0, 0]) cube([1, bat_w + 1, bat_h - 2], center=true);
        }
    }

    // [REMOVED DECAL GRAPHIC PACK BRANDING LABEL SECTION]

    // 3. REFACTORED INTACT HEAVY POWER LEADS (Continuous Interconnected Paths)
    wire_exit_x = bat_l/2 - 1.0;
    wire_d = 4.2;
    
    // Target position for the XT60 hub connector base
    xt60_pos = [wire_exit_x + 22, 25, 10];

    // Intact Red Cable (Positive Terminal Link)
    color(color_wire_red) hull() {
        translate([wire_exit_x, 10, 3]) sphere(d=wire_d);
        translate([wire_exit_x + 10, 16, 8]) sphere(d=wire_d);
        translate([wire_exit_x + 18, 22, 10]) sphere(d=wire_d);
        translate(xt60_pos + [-1, 2, 0]) sphere(d=wire_d); // Perfectly joins the back of the plug
    }

    // Intact Black Cable (Negative Terminal Link)
    color(color_wire_black) hull() {
        translate([wire_exit_x, 12, -3]) sphere(d=wire_d);
        translate([wire_exit_x + 8, 11, -2]) sphere(d=wire_d);
        translate([wire_exit_x + 16, 15, 3]) sphere(d=wire_d);
        translate(xt60_pos + [-1, -2, 0]) sphere(d=wire_d); // Perfectly joins the back of the plug
    }

    // 4. INTEGRATED XT60 MALE DISCHARGE CONNECTOR HUB
    translate(xt60_pos) rotate([15, -10, -25]) {
        difference() {
            color(color_xt60_body) union() {
                cube([15.5, 8.0, 12.0], center=true);
                translate([-2, 0, 0]) cube([12.5, 7.2, 11.0], center=true);
            }
            translate([0, 4.0, 6.0]) rotate([45, 0, 0]) cube([18, 4, 4], center=true);
            translate([0, -4.0, 6.0]) rotate([-45, 0, 0]) cube([18, 4, 4], center=true);
            translate([0, 2.0, 0]) rotate([0, 90, 0]) cylinder(h=16, d=3.5, center=true);
            translate([0, -2.0, 0]) rotate([0, 90, 0]) cylinder(h=16, d=3.5, center=true);
        }
        color(color_gold_pin) {
            translate([2, 2.0, 0]) rotate([0, 90, 0]) cylinder(h=6, d=2.8, center=true);
            translate([2, -2.0, 0]) rotate([0, 90, 0]) cylinder(h=6, d=2.8, center=true);
        }
    }

    // 5. INTACT 2S BALANCING HARNESS SYSTEM (3-Wire Ribbon Tied Paths)
    jst_pos = [wire_exit_x + 14, -13, 8];
    bal_d = 1.6;

    // Wire 1 (Black 1)
    color(color_wire_black) hull() {
        translate([wire_exit_x, -11, 4]) sphere(d=bal_d);
        translate([wire_exit_x + 6, -13, 5]) sphere(d=bal_d);
        translate(jst_pos + [-1, -2.54, -2.5]) sphere(d=bal_d);
    }

    // Wire 2 (Black 2)
    color(color_wire_black) hull() {
        translate([wire_exit_x, -12.5, 4.5]) sphere(d=bal_d);
        translate([wire_exit_x + 7, -14, 5.5]) sphere(d=bal_d);
        translate(jst_pos + [-1, 0, -2.5]) sphere(d=bal_d);
    }

    // Wire 3 (Red)
    color(color_wire_red) hull() {
        translate([wire_exit_x, -9.5, 3.5]) sphere(d=bal_d);
        translate([wire_exit_x + 5, -12, 4.5]) sphere(d=bal_d);
        translate(jst_pos + [-1, 2.54, -2.5]) sphere(d=bal_d);
    }

    // 6. WHITE 3-PIN JST-XH BALANCING COUPLER
    translate(jst_pos) rotate([5, -10, 20]) {
        color(color_jst_white) difference() {
            cube([6.0, 10.2, 7.5], center=true);
            translate([1, 0, 2.2]) cube([5, 8.5, 2.0], center=true);
            for(y = [-2.54, 0, 2.54]) {
                translate([0, y, -1]) cube([4.5, 1.2, 4.0], center=true);
            }
        }
    }
}

// --- Live View Global Render Call Node ---
genx_5200mah_battery();
