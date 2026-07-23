

## ⚙️ Phase 3: Mechanical Assembly & Structural Integration


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
    
- [ ] Construct a parallel 14AWG/16AWG wiring harness from your XT60 battery connector to the blue screw terminal blocks of both PCA9685 boards.
    

### Clean Wire Routing

- [ ] Route all 13 servo cables back to the torso cavity using protective expandable cable wrap (ensure enough slack exists for full joint articulation).
    
- [ ] Connect the 6 Leg servos to PCA9685 #1 (`0x40`).
    
- [ ] Connect the 6 Arm servos + 1 Neck Pan servo to PCA9685 #2 (`0x41`).
    
- [ ] Plug your LiPo safety alarm into the white balance port of the battery.