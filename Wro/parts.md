## 🧠 Core Compute & Sensors

- [x] **1× Raspberry Pi 5 (2GB or 4GB variant)** – The primary brain running DietPi and the ML models.
    
- [x] **1× Raspberry Pi Active Cooler** – Dedicated heatsink and fan to prevent thermal throttling during live inference loops.
    
- [x] **1× 32GB MicroSD Card (Class 10 / U3 speed)** – High-speed storage for the OS, virtual environments, and PyTorch weights.
    
- [x] **1× MPU6050 6-Axis IMU Breakout Board** – Tracks real-time pitch/roll telemetry for robot balance.
    
- [x] **1× Raspberry Pi Camera Module 2 (OV5647 or IMX219)** – For live computer vision tracking.
    
- [x] **1× 22-pin to 15-pin FPC CSI Flexible Cable** – Custom ribbon cable required specifically to connect standard Pi cameras to the smaller Pi 5 ports.
    

## ⚙️ Actuators (The Hybrid Servo Layout)

- [x] **6× RDS3115 MG Dual-Shaft 15–17kg/cm Servos** – Heavy-duty motors for ankles, knees, and hips.
    
- [x] **11× Mg996r 180° Metal Gear Digital Servos** – High-torque, snappy single-shaft motors for the spine, shoulders, arms, and neck.

## ⚡ Power Infrastructure & Drivers

- [x] **2× PCA9685 16-Channel 12-bit I2C PWM Drivers** – Stacked together via address `0x40` and `0x41` to cleanly run all 17 servos.
    
- [x] **1× High-Current Step-Down Buck Converter (Servo Rail)** – Capable of continuously outputting $6.5\text{V}\text{--}6.8\text{V}$ at 15A–20A peak to satisfy joint torque spikes.
    
- [x] **1× Step-Down Buck Converter (Pi Rail)** – Tuned to exactly $5.1\text{V}$ at 3A–5A to power the Raspberry Pi 5 safely via the GPIO pins.
    
- [x] **1× High-Discharge 2S LiPo Battery (e.g., Bonka 7.4V, 2200mAh–5000mAh, 25C–30C minimum)** – The primary mobile power supply.
    
- [x] **1× LiPo Low-Voltage Buzzer / Tester Alarm** – Plugs into the battery balance lead to protect the cells from over-discharging during testing.
    
- [x] **1× LiPo Balance Charger (e.g., IMAX B6 or equivalent)** – For safe, balanced battery maintenance.
    

## 🔌 Wiring & Connectors

- [x] **1× Pack of Straight 2.54mm Male Header Pins** – For soldering the I2C chaining port on your first PCA9685 board.
    
- [x] **1× Premium Jumper Wire Assortment (Female-to-Female, 20cm length)** – For all I2C connections between the Pi, drivers, and sensor.
    
- [x] **2 meters × 14AWG Flexible Silicone Wire (Red & Black)** – Heavy-gauge wire for the primary battery-to-buck power bus.
    
- [x] **2 meters × 16AWG Flexible Silicone Wire (Red & Black)** – For the buck-converter-to-PCA9685 power rails.
    
- [x] **1× Pack of XT60 Male/Female Connectors** – For quick-disconnect lines to the LiPo battery.
    
- [x] **1× Roll of Heat-Shrink Tubing (Various diameters)** – To insulate soldered power splices.
    
- [ ] **1× Pack of Braided Cable Sleeving or Spiral Wrap (6mm–10mm)** – To bind and protect the 17-servo wiring loom down the limbs.
    

## 🏗️ Hardware Fasteners & Consumables

- [x] **1× 1kg Spool of Numakers PETG Filament (Pitch Black, 1.75mm)** – High-density structural printing material.
    
- [x] **1× Metric Stainless Steel Machine Screw Assortment Box:**
    
    - **M2 & M2.5 Screws and Nuts** (For mounting the Pi 5, MPU6050, and PCA9685 boards).
        
    - **M3 Screws (lengths: 8mm, 12mm, 16mm) and Lock-nuts** (For bolting 3D-printed limbs to servo horns and metal U-brackets).
        
- [ ] **1× Pack of Nylon Standoffs (M2.5 or M3)** – Non-conductive isolation mounts for the electronics inside the torso cavity.
    
- [ ] **1× Small Bottle of Medium-Strength Threadlocker (e.g., Blue Loctite)** – Essential to prevent screws from vibrating loose during high-acceleration dance moves.