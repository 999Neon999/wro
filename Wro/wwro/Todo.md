## 🛠️ Phase 2: CAD, Slicing & 3D Printing

### Model & Print Custom Structural Brackets (OpenSCAD)

- [x] **Ankle Hoisting Foot Plates:** Print 2x of your stylized $110\text{ mm} \times 70\text{ mm}$ heavy-duty foot plates with the integrated vertical risers (pre-spaced M3 holes).
    
- [x] **Leg Link Segments:** Model and print 4x structural spacer bones to bridge the pitch joints (2 for shins connecting ankle to knee, 2 for thighs connecting knee to hip).
    
- [ ] **$90^\circ$ Dual-Servo Shoulder Brackets:** Model and print 2x compact L-brackets that bind two servos together at a perpendicular angle to achieve both forward-back (pitch) and lateral-outward (roll) movement.
- [ ] **Head:** join
    
- [x] **Clamping Cages for MG996R:** Print your verified friction-fit clamping cages for the upper body and shoulder assemblies.
    

### Main Frame & Torso Plate

- [ ] **Rigid Torso Frame:** Model and print a single-unit central chest plate that houses:
    
    - Mounting points for the Raspberry Pi 5 (using $2.5\text{ mm}$ nylon standoffs).
        
    - Mounting points for the MPU6050 (positioned precisely at the physical center of mass).0
        
    - Mounting points for both PCA9685 driver boards.
        
     - Structural mount slots at the bottom for the 2x Hip servos and at the top for the 2x Shoulder assemblies + 1x Neck Pan servo.
        

## ⚙️ Phase 3: Mechanical Assembly & Structural Integration

### Assemble the 6-DOF Lower Body (Pitch-Only Legs)

- [ ] Bolt the RDS3115 metal brackets directly onto your 3D-printed foot risers.
    
- [ ] Interlock the 6 heavy-duty servos (Ankles $\rightarrow$ Knees $\rightarrow$ Hips) using your printed leg link segments.
    
- [ ] **Vibration Defense:** Apply blue thread-locking fluid to all metal-to-metal screws to prevent fast dance vibrations from loosening the joints.
    

### Assemble the Torso & Electronics

- [ ] Secure the Raspberry Pi 5 to the torso frame using non-conductive hardware.
    
- [ ] Mount the MPU6050 using nylon standoffs at the geometric center of mass.
    
- [ ] Mount the left and right hip servos to the bottom of the torso frame.
    

### Assemble the 6-DOF Arms & Head

- [ ] Assemble the 3-axis arm chains (Shoulder Pitch $\rightarrow$ Shoulder Roll $\rightarrow$ Elbow Pitch) using your printed L-brackets and MG996R clamps.
    
- [ ] Mount the neck pan servo to the center-top of the chest.
    
- [ ] Secure the OV5647 camera module into a lightweight pan head bracket directly on the neck servo.
    

## 🔌 Phase 4: Power Distribution & Data Routing

### Solder the Power Grid

- [x] Solder the **A0** address bridge on your second PCA9685 board to change its hardware address to `0x41` (the lower-body board remains at `0x40`).
    
- [ ] Construct a parallel 14AWG/16AWG wiring harness from your XT60 battery connector to the blue screw terminal blocks of both PCA9685 boards.
    

### Calibrate the Dual Buck Converters (CRITICAL)

- [x] Power on the raw battery lines with **nothing plugged into the Pi or servos**.
    
- [x] Use your multimeter on the buck converter output terminals:
    
    - Set Buck #1 (Pi Logic) to exactly **5.1V**.
        
    - Set Buck #2 (Servo Power Rail) to **6.5V–6.8V** to safely maximize the torque of your DS3218 and RDS3115 servos.
         

### Clean Wire Routing

- [ ] Route all 13 servo cables back to the torso cavity using protective expandable cable wrap (ensure enough slack exists for full joint articulation).
    
- [ ] Connect the 6 Leg servos to PCA9685 #1 (`0x40`).
    
- [ ] Connect the 6 Arm servos + 1 Neck Pan servo to PCA9685 #2 (`0x41`).
    
- [ ] Plug your LiPo safety alarm into the white balance port of the battery.
    

## 🧠 Phase 5: AI Stack, Kinematics & Dance Loops

### Install Core Edge ML Libraries

- [ ] Activate `wro_env` on the Pi 5 and install your runtime dependencies:
    
    Bash
    
    ```
    pip install opencv-python mediapipe torch torchvision adafruit-circuitpython-servokit
    ```
    

### Write the 2D Inverse Kinematics (IK) Engine

- [ ] Implement a simplified geometric IK solver for the 3-joint pitch legs. Because all three joints share the same parallel rotation axis, the knee angle $\theta_{knee}$ is calculated cleanly on a 2D plane:
    

$$\theta_{knee} = \pi - \arccos\left(\frac{L_{1}^2 + L_{2}^2 - D^2}{2 L_{1} L_{2}}\right)$$

> Where $L_1$ is the thigh length, $L_2$ is the shin length, and $D$ is the target distance from the hip axis to the ankle axis.

### Build the AI Pose Pipeline

- [ ] Capture training frames of your dance choreography styles via MediaPipe Pose on your main PC.
    
- [ ] Train your LSTM classifier network to output stylized dance poses and export the final `.pth` weights file to the Pi 5.
    
- [x] Write the deployment script (`main_dance.py`) to initialize both PCA9685 boards concurrently:
    
    Python
    
    ```
    from adafruit_servokit import ServoKit
    kit1 = ServoKit(channels=16, address=0x40) # Lower Body (Legs)
    kit2 = ServoKit(channels=16, address=0x41) # Upper Body (Arms + Head)
    ```
    
- [ ] Map the real-time AI classification arrays directly to the physical joint angles of your 13 servos.
    
- [ ] Profile the pipeline to ensure camera frame capture, neural network inference, and physical servo writes execute comfortably under your **15ms target latency window**.