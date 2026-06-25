**Phase 1: Procurement & Asset Verification**
- [ ] **Verify Existing Parts:** - Locate the Raspberry Pi 5 (2GB), Active Cooler, 32GB SD card, and MPU6050 IMU.
    
    - Inspect the OV5647 Camera Module (confirm you have the correct 22-pin to 15-pin FPC CSI camera cable needed for the Pi 5).
        
- [ ] **Procure Serial Bus Servos:** - Select and order 17 Smart Serial Bus Servos (e.g., Feetech STS3215 or Lewansoul LX-16A/224).
    
    - Order a matching **USB-to-UART Serial Bus Servo Driver Board** (or a dedicated Pi GPIO shield).
        
- [ ] **Procure Raw Materials:**
    
    - Order a sheet of **3mm Polycarbonate (Lexan)** or **Delrin (POM)** for the load-bearing leg bones.
        
    - _Optional alternative:_ Get a small block of MDF sheet for cheap, rapid laser-cut prototyping.
        
    - Buy a fresh spool of high-density **PETG or Tough PLA** filament for the Ender 3 V3.
        
- [ ] **Hardware Fasteners:** - Buy a multipack box of M2, M2.5, and M3 stainless steel machine screws, nuts, and washers.
**Phase 2: Headless Brain & Sensor Setup (Software)**
- [ ] **Flash the Operating System:** - Use Raspberry Pi Imager to flash **Raspberry Pi OS Lite (64-bit)** onto the 32GB SD card. (Ensures headless mode to save RAM).
    
- [ ] **Configure Network & SSH:**
    
    - Set up headless Wi-Fi credentials and enable SSH in the imager settings so you can code directly from your laptops.
        
- [ ] **Boot and Run System Updates:**
    
    - Power up the Pi 5, SSH into it, and run: `sudo apt update && sudo apt upgrade -y`.
        
- [ ] **Isolate the Camera Feed:**
    
    - Connect the OV5647 camera, run `libcamera-hello --list-cameras`, and verify the system registers the sensor.
        
- [ ] **Install the Core ML Stack:**
    
    - Install Python virtual environments (`python3 -m venv aevum_env`).
        
    - Install **MediaPipe** and **TensorFlow Lite runtime** inside the environment.
        
- [ ] **Write the I2C Balance Sensor Script:**
    
    - Enable I2C via `sudo raspi-config`.
        
    - Connect the MPU6050 to the Pi's GPIO pins (VCC, GND, SDA, SCL).
        
    - Write a raw Python script to print live, un-filtered Pitch and Roll telemetry to the terminal.
**Phase 3: CAD, Laser-Cutting, & 3D Printing (Hardware)**
- [ ] **Export the OpenSCAD Sub-Components:**
    
    - Take the `servo_cage` parameters from your script and isolate the dimensions.
        
    - Isolate the flat `poly_bone` measurements for thighs, shins, and arms.
        
- [ ] **Draft the 2D Sheet Profiles:**
    
    - Open Inkscape or a CAD program and draw the exact 2D DXF shapes for your flat limb links based on the OpenSCAD proportions.
        
- [ ] **Fabricate the Flat Bones:**
    
    - If your school laser cutter handles Delrin/MDF, cut your prototype shapes.
        
    - If using Polycarbonate, export your DXF files and take them to a local shop to be cut via a CNC router or Water-jet cutter.
        
- [ ] **Print the Servo Clamping Cages on the Ender 3 V3:**
    
    - Import your structural motor cages into your slicer.
        
    - Set infill to **45% Gyroid**, wall counts to **4 perimeters**, and material to **PETG/Tough PLA**.
        
    - Print a single test cage to verify the serial servo slides inside with a perfect friction-fit.
        
    - Print the remaining cages required for the 17-DOF joints.
**Phase 4: Mechanical Integration & Wiring**
- [ ] **Pre-Set Motor IDs:**
    
    - Connect each serial servo one-by-one to your computer or Pi via the driver board.
        
    - Using the manufacturer's software utility, flash a permanent hardware ID (1 through 17) to each individual motor.
        
- [ ] **Assemble the Internal Hybrid Legs:**
    
    - Bolt the 3D-printed cages onto the flat polycarbonate thigh and shin sheets.
        
    - Install the serial servos inside the cages and lock down the horn splines.
        
- [ ] **Assemble the Torso Core:**
    
    - Securely mount the Raspberry Pi 5 to the back deck mount.
        
    - Mount the MPU6050 exactly at the geometric center of mass of the pelvic plate using nylon standoffs.
        
- [ ] **Build the Sensory Head:**
    
    - Slide the OV5647 camera module into its dedicated helmet slot. Mount the head to the neck panning servo.
        
- [ ] **Daisy-Chain the Wiring Bus:**
    
    - Route a single 3-wire serial bus line through the right leg joints up to the controller board.
        
    - Repeat for the left leg, arms, and neck. Secure the lines tightly using zip-ties so wires don't snag during dance routines.
**Phase 5: The Dance Recognition Loop (The Winning Edge)**
- [ ] **Data Sourcing & Video Ingestion:**
    
    - Use `yt-dlp` to download high-resolution videos of classical master dancers performing clean stances.
        
- [ ] **Landmark Extraction script:**
    
    - Run a Python script on your computer to process those dance videos through MediaPipe Pose, saving the raw $x, y, z$ coordinates of the 33 landmarks.
        
- [ ] **Write the Normalization Formula:**
    
    - Code the mathematical translation script: Shift the coordinate origin $(0,0,0)$ to the mid-pelvis, and divide all lengths by the shoulder width (Scale Invariance).
        
- [ ] **Calculate Joint Angles:**
    
    - Implement the Vector Dot Product calculation inside your pipeline to convert raw normalized coordinates into exact physical angles ($\theta$).
        
- [ ] **Train the Lightweight Classifier:**
    
    - Train a dense neural network on your angle datasets to categorize your target dance stances. Export the final model to **TensorFlow Lite (`.tflite`) format**.
        
- [ ] **The Live Telemetry Loop:**
    
    - Run the `.tflite` model live on the Pi 5. Verify it classifies stances in under 10ms with over 90% confidence.
        
- [ ] **The Kinematic Command Handshake:**
    
    - Link the classification script outputs directly to your serial servo Python library. When the code recognizes a human stance, it must instantly write the target angle vectors over the serial bus, forcing your custom polycarbonate robot to mimic the move!