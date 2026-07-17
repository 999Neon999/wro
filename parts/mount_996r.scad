// ============================================================================
// PROJECT: 6MM PUSH-LOCK EXPANSION RIVET CONNECTOR - SCREW-LIKE SNAP TIGHT VERSION
// How to use: Insert the Jacket into the 6mm hole, then firmly press/snap the Pin into it.
// ============================================================================
$fn = 80; // Higher resolution for smoother threads and fits

// --- Geometry Parameters ---
hole_diameter = 6.0;  // Fits a standard 6mm opening
grip_length   = 6.0;  // Thickness of the material/frame panels you are joining
clearance     = 0.15; // Tighter tolerance for very snug fit
thread_pitch  = 1.2;  // Screw-like thread pitch for barbs
barb_height   = 0.4;  // Height of retaining barbs

// ============================================================================
// 1. THE EXPANDING JACKET - with external barbs for screw-like grip
// ============================================================================
module expansion_jacket() {
    difference() {
        union() {
            // Main wide retaining head flange
            cylinder(d = hole_diameter * 1.9, h = 2.2, $fn=60);
            
            // The shaft that drops into the hole - with external screw-like barbs
            translate([0, 0, -grip_length - 3.0]) {
                // Main shaft body
                cylinder(d = hole_diameter - 0.15, h = grip_length + 4.0);
                
                // Screw-like barbs for grip and snap retention
                for (i = [0 : 4]) {
                    translate([0, 0, -grip_length + i * thread_pitch - 1.5])
                        cylinder(d = hole_diameter + barb_height*2, h = 0.6, $fn=60);
                }
            }
            
            // Tapered tip for easy insertion
            translate([0, 0, -grip_length - 3.5])
                cylinder(d1 = hole_diameter + 0.8, d2 = hole_diameter - 0.15, h = 2.0);
        }
        
        // Internal center hole for the locking pin - tapered for tight snap
        translate([0, 0, -grip_length - 6.0])
            cylinder(d1 = 3.4, d2 = 3.7, h = grip_length + 9.0);
        
        // Expansion slots (cross cuts for better flare)
        translate([0, 0, -grip_length/2 - 1])
            cube([hole_diameter + 3, 1.0, grip_length + 7], center = true);
        translate([0, 0, -grip_length/2 - 1])
            cube([1.0, hole_diameter + 3, grip_length + 7], center = true);
    }
}

// ============================================================================
// 2. THE LOCKING PIN - with ratchet barbs for one-way tight snap
// ============================================================================
module locking_pin() {
    translate([hole_diameter * 3, 0, 0]) {  // Offset for printing
        union() {
            // Pin head top grip
            cylinder(d = hole_diameter * 1.6, h = 2.5, $fn=60);
            
            // The solid shaft that drives expansion
            translate([0, 0, -grip_length - 3.0]) {
                cylinder(d = 3.55 - clearance, h = grip_length + 3.5);
                
                // One-way ratchet barbs (screw-like) for strong snap retention
                for (i = [0 : 5]) {
                    translate([0, 0, -grip_length + i * (thread_pitch*0.8) - 1.8])
                        rotate_extrude($fn=60)
                            polygon(points=[[3.4,0], [3.55,0], [3.55 + barb_height, 0.6], [3.4, 0.8]]);
                }
            }
            
            // Tapered tip with final catch
            translate([0, 0, -grip_length - 4.2])
                cylinder(d1 = 2.8, d2 = 3.55 - clearance, h = 1.4);
        }
    }
}

// Render both parts
color([0.2, 0.6, 0.3]) expansion_jacket();
color([0.7, 0.2, 0.2]) locking_pin();