// ============================================================================
// BRAND: SMARTELEX SPEAKER MODULE FOR ARDUINO
// MODEL NUMBER: TIFCC0274
// Footprint: Exactly 40mm x 40mm Square PCB Board Profile
// Fully detailed standalone component representation
// Base sits completely flush at Z = 0
// ============================================================================

$fn = 80; // High precision rendering for round speaker components

// --- PARAMETRIC HARDWARE STRUCTURAL ENVELOPES (mm) ---
pcb_w        = 60.0;   
pcb_l        = 60.0;   
pcb_t        = 2;    // Standard FR4 board thickness

// Speaker physical properties
speaker_outer_d = 28.0; 
speaker_inner_d = 24.0;
speaker_magnet_d= 13.0;
speaker_total_h = 5.0;

m3_hole_d    = 3.2;    // M3 Standard mounting through-holes
m3_dist      = 34.0;   // Mounting hole centers pitch distance

pot_w        = 6.5;    // Blue trimmer width
pot_h        = 4.5;    // Potentiometer vertical projection height
ic_w         = 6.2;    // DIP-8 package width
ic_l         = 9.5;    // DIP-8 package length

// --- VISUAL MATERIAL COLOR PALETTE ---
color_pcb         = [0.05, 0.05, 0.06];    // Deep Matte Black Soldermask
color_silkscreen  = [0.95, 0.95, 0.95];    // White Silk Mask lettering/accents
color_gold_pads   = [0.85, 0.65, 0.12];    // Plated mounting pads / vias
color_speaker_rim = [0.70, 0.71, 0.73];    // Polished Metallic Steel Outer Ring
color_speaker_cone= [0.12, 0.12, 0.14];    // Matte Black Acoustic Paper/Rubber Diaphragm
color_center_dome = [0.18, 0.18, 0.20];    // Glossy Carbon Center Dust Cap
color_pot_body    = [0.00, 0.44, 0.80];    // SmartElex Signature Ocean Blue Trim Housing
color_pot_dial    = [0.90, 0.91, 0.93];    // White Calibration Turning Dial Adjustment Head
color_ic_body     = [0.15, 0.15, 0.16];    // Molded Epoxy Matte Black Package (LM386)
color_pins        = [0.78, 0.78, 0.80];    // Tin-plated component leads
color_header_base = [0.10, 0.10, 0.10];    // Injection-molded black plastic pin carrier
color_header_pin  = [0.88, 0.72, 0.18];    // Gold-flash connection terminals

// ============================================================================
// COMPONENT STRUCTURAL GENERATORS
// ============================================================================

module printed_circuit_board() {
    difference() {
        // Base FR4 substrate floor
        color(color_pcb) cube([pcb_w, pcb_l, pcb_t], center=true);
        
        // 4x Corner M3 Alignment Fastener Mount Channels
        for(x = [-m3_dist/2, m3_dist/2]) {
            for(y = [-m3_dist/2, m3_dist/2]) {
                translate([x, y, 0]) cylinder(h=pcb_t + 2, d=m3_hole_d, center=true);
            }
        }
        
        // 3-Pin Interface Breakout Interface Port Drill Grid Holes
        for(y = [-1, 0, 1]) {
            translate([pcb_w/2 - 4.0, y * 2.54, 0]) cylinder(h=pcb_t + 2, d=1.0, center=true);
        }
    }
    
    // Plated Gold Pad Rings around corner holes
    for(x = [-m3_dist/2, m3_dist/2]) {
        for(y = [-m3_dist/2, m3_dist/2]) {
            translate([x, y, pcb_t/2 + 0.005]) color(color_gold_pads)
                difference() {
                    cylinder(h=0.03, d=m3_hole_d + 2.0, center=true);
                    cylinder(h=0.1, d=m3_hole_d + 0.1, center=true);
                }
        }
    }
    
    // Mimic Silk Screen Border Frames
    color(color_silkscreen) {
        translate([0, 0, pcb_t/2 + 0.01]) {
            // Outer geometric protection edge layout track lines
            difference() {
                cube([pcb_w - 2, pcb_l - 2, 0.02], center=true);
                cube([pcb_w - 2.5, pcb_l - 2.5, 0.1], center=true);
            }
            // Outline boundary box framework tracking for the speaker zone
            translate([-4.5, 0, 0]) difference() {
                cylinder(h=0.02, d=speaker_outer_d + 1.5, center=true);
                cylinder(h=0.1, d=speaker_outer_d + 1.0, center=true);
            }
        }
    }
}

module physical_acoustic_speaker() {
    // Elevate slightly off the PCB layer to mimic real solder land seats
    translate([0, 0, 0.2]) {
        // 1. Polished metallic silver base outer structural ring chassis rim
        color(color_speaker_rim) cylinder(h=speaker_total_h, d=speaker_outer_d, center=false);
        
        // 2. Tapered interior acoustic paper/rubber cone diaphragm slope configuration
        translate([0, 0, 0.5]) color(color_speaker_cone) 
            cylinder(h=speaker_total_h - 0.4, d1=speaker_outer_d - 1.5, d2=speaker_magnet_d + 2, center=false);
            
        // 3. Central metallic carbon core magnet voice coil dust shield dome cap
        translate([0, 0, speaker_total_h - 0.2]) color(color_center_dome) 
            cylinder(h=0.6, d1=speaker_magnet_d, d2=speaker_magnet_d - 2, center=false);
    }
}

module standard_3pin_breakout_header() {
    // Injection molded plastic base strip framework block
    color(color_header_base) translate([0, 0, 1.25]) cube([2.5, 7.62, 2.5], center=true);
    
    // 3x High-Conductivity Gold Square Profile Interface Pins
    color(color_header_pin) {
        for(y = [-1, 0, 1]) {
            translate([0, y * 2.54, 3.20]) cube([0.64, 0.64, 6.4], center=true); // External mating side
            translate([0, y * 2.54, -pcb_t]) cube([0.64, 0.64, 3.0], center=true); // Through-board tail side
        }
    }
}

module blue_trim_potentiometer() {
    // Core square blue casing body envelope block
    color(color_pot_body) cube([pot_w, pot_w, pot_h], center=true);
    
    // Top-facing white cross calibration tuning dial head
    translate([0, 0, pot_h/2 + 0.4]) color(color_pot_dial) {
        difference() {
            cylinder(h=0.8, d=4.2, center=true);
            // Phillips style calibration cross slot cutouts
            cube([3.2, 0.6, 1.2], center=true);
            cube([0.6, 3.2, 1.2], center=true);
        }
    }
}

module lm386_dip8_ic_chip() {
    // Molded black plastic packaging frame housing
    color(color_ic_body) {
        difference() {
            cube([ic_w, ic_l, 3.2], center=true);
            // Half-moon registration notch indicator layout
            translate([0, -ic_l/2, 1.0]) cylinder(h=1.5, d=1.8, center=true);
        }
    }
    
    // 8x Tin Plated Through-Hole DIP Lead Footprint Pins
    color(color_pins) {
        for(y = [-3.81, -1.27, 1.27, 3.81]) {
            // Left lead rail row run
            translate([-ic_w/2 - 0.4, y, -0.6]) rotate([0, 12, 0]) cube([0.3, 0.6, 2.8], center=true);
            // Right lead rail row run
            translate([ic_w/2 + 0.4, y, -0.6]) rotate([0, -12, 0]) cube([0.3, 0.6, 2.8], center=true);
        }
    }
}

// ============================================================================
// SYSTEM COMPONENT DISPATCH PIPELINE MATRIX
// ============================================================================

module build_complete_smartelex_speaker_module() {
    // Lock base footprint floor layout flat flush to the Z=0 ground reference layer
    translate([0, 0, pcb_t/2]) {
        
        // 1. Structural FR4 Printed Circuit Board Base Substrate Floor Track
        printed_circuit_board();
        
        // 2. Primary Large Diameter Acoustic Speaker Assembly (Left Quad Center Alignment)
        translate([-4.5, 0, pcb_t/2]) physical_acoustic_speaker();
        
        // 3. DIP-8 Package LM386 Power Audio Amplifier IC Chip (Lower Right Quadrant)
        translate([11.5, -11.0, pcb_t/2 + 1.6]) rotate([0, 0, 0]) lm386_dip8_ic_chip();
        
        // 4. Blue Calibration Gain Potentiometer Module Assembly (Top Right Quadrant)
        translate([13.0, 11.5, pcb_t/2 + pot_h/2]) rotate([0, 0, 90]) blue_trim_potentiometer();
        
        // 5. 2.54mm Standard 3-Pin Right Angle Signal Header Core (VCC / GND / Audio IN)
        translate([pcb_w/2 - 4.0, 0, pcb_t/2]) standard_3pin_breakout_header();
        
        // 6. Passive Component Layout Distribution Profiles (SMD Capacitor/Resistor Networks)
        color([0.65, 0.52, 0.33]) { // Solid Ceramic Multilayer Tuning Capacitors (MLCC Elements)
            translate([13.0, 3.5, pcb_t/2 + 0.4]) cube([2.0, 1.25, 0.85], center=true);
            translate([11.5, -3.0, pcb_t/2 + 0.4]) cube([1.6, 0.80, 0.60], center=true);
            translate([4.5, -14.0, pcb_t/2 + 0.4]) cube([2.0, 1.25, 0.85], center=true);
        }
        color([0.30, 0.31, 0.33]) { // SMT Fixed thick film resistors network lines arrays
            translate([8.0, 3.5, pcb_t/2 + 0.4]) cube([1.6, 0.85, 0.55], center=true);
            translate([4.5, -9.0, pcb_t/2 + 0.4]) cube([1.6, 0.85, 0.55], center=true);
        }
    }
}

// Invoke final compiler build operations engine
build_complete_smartelex_speaker_module();