// ============================================================================
// 13-DOF HUMAN ROBOT: 16CM TOP FITMENT PLATE WITH 3CM CENTRAL PASS
// Pristine top structural enclosure lid with a large 30mm utility routing hole.
// ============================================================================
$fn = 64;

// --- Global Footprint Dimensions ---
pelvis_l       = 160.0; // Scaled to exactly 16 cm Long
pelvis_w       = 100.0; // 10 cm Wide to match your chassis width spacing
sheet_t        = 5.0;   // 5mm matching structural thickness rules
corner_r       = 8.0;   // Smooth rounded chassis corners
eps            = 0.02;  

// --- 🛑 TOP UTILITY ROUTING HOLE CONFIGURATION 🛑 ---
top_hole_d     = 30.0;  // Exactly 3 cm diameter center utility opening

// --- Perimeter Mounting Hole Matrix ---
chassis_hole_d = 3.0;   // M3 hardware anchoring clearance holes

// ============================================================================
// MAIN GENERATION
// ============================================================================

// Render the clean top fitment plate template
top_enclosure_plate();

// ============================================================================
// MODULE: TOP ENCLOSURE PLATE
// ============================================================================
module top_enclosure_plate() {
    color([0.35, 0.35, 0.38]) { // Technical mid-gray for distinct structural overlay
        difference() {
            // A. Main Solid Plate Shape
            minkowski() {
                cube([pelvis_l - 2*corner_r, pelvis_w - 2*corner_r, sheet_t/2], center=true);
                cylinder(r=corner_r, h=sheet_t/2, center=true);
            }
            
            // B. Central Wire Gateway / Neck Pan Hole (3cm Diameter)
            cylinder(d=top_hole_d, h=sheet_t + 2, center=true);
            
            // C. Perimeter Structural Answering Holes (Anchors cleanly to standoffs/corners)
            for (x_side = [-pelvis_l/2 + 10, pelvis_l/2 - 10]) {
                for (y_side = [-pelvis_w/2 + 10, pelvis_w/2 - 10]) {
                    translate([x_side, y_side, 0])
                        cylinder(d=chassis_hole_d, h=sheet_t + 2, center=true);
                }
            }
        }
    }
}