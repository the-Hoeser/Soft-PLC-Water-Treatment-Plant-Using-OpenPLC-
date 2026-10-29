Soft-PLC Water Treatment Plant Simulator
A software-only water treatment automation project that models a
drinking-water treatment process using OpenPLC for PLC control logic
and a browser-based SCADA/HMI for monitoring and operator
interaction. The HMI is designed around an industrial dashboard similar
to the supplied reference screenshots: dark control-room styling,
process sections, animated pipelines, tank-level indicators, pump and
valve states, alarms, trends, and simulation controls.
Project status and honesty note: The screenshots show a
browser-based Drinking Water SCADA Trainer. A similar-looking
interface is not, by itself, proof that it is connected to OpenPLC.
This repository should distinguish clearly between (1) a
visual/process simulation and (2) a verified OpenPLC--SCADA
integration. Mark the integration as complete only after testing live
tags over Modbus TCP. The system is for learning and demonstration,
not for controlling a real water-treatment facility.

Contents
- Project objectives
- Treatment process
- System architecture
- Operating modes and control
  rules
- Software requirements
- Implementation workflow
- OpenPLC program design
- SCADA/HMI design
- Modbus integration and tag
  mapping
- Testing and demonstration
  checklist
- Troubleshooting
- Safety and limitations
- References
Project objectives
1. Demonstrate the core concepts of a Programmable Logic Controller
   (PLC) without physical wiring or hardware.
2. Model a simplified drinking-water treatment sequence.
3. Implement deterministic control logic using IEC 61131-3 programming
   concepts in OpenPLC.
4. Display process values and equipment states on a web-based
   SCADA/HMI.
5. Use Modbus TCP for communication between the PLC runtime and SCADA
   client, once configured and verified.
6. Demonstrate interlocks, alarms, manual/automatic operation, trends,
   and operator commands.
7. Document the process so the project can be reproduced and evaluated
   during a college demonstration or viva.
Treatment process
The model is divided into four process areas, matching the reference
HMI:
1. Intake --- raw-water supply
- River/source inlet and wet well or raw-water tank
- Intake valve
- Duty/standby transfer pumps (Pump 1 and Pump 2)
- Simulated flow rate, wet-well level, raw-water turbidity, and screen
  differential pressure
- Low-level and high-level protection
2. Coagulation and flocculation
- Alum dosing pump
- Optional pH-adjustment dosing
- Rapid mixer and slow mixer
- Simulated alum dose, mixer speeds, and floc turbidity
- Interlocks to prevent dosing/mixing when the process is stopped or
  upstream flow is unavailable
3. Sedimentation and filtration
- Clarifier
- Sludge blanket measurement and sludge pump
- Filter and filter-head-loss measurement
- Effluent turbidity and filter-status indication
- Simulated backwash command and status
4. Disinfection and clearwell
- Chlorine-dosing pump and UV-system status
- Simulated plant and distribution chlorine readings
- pH and clearwell level
- High/low level alarms and equipment status
Important: Values such as flow, turbidity, chlorine concentration,
pH, and tank levels are simulated educational values. They are not
measurements from physical sensors and do not establish that water is
safe to drink.
System architecture
Target architecture:
Operator / Browser
       |
       v
SCADA / HMI (FUXA or a custom web interface)
       |
       | Modbus TCP: read process tags, write permitted commands
       v
OpenPLC Runtime
       |
       | PLC scan cycle executes control rules
       v
Simulated inputs and outputs
(tank levels, switches, pumps, valves, mixers, dosing equipment)
The OpenPLC Editor is used to create and compile the PLC program. The
OpenPLC Runtime executes the program. FUXA is one possible web-based
SCADA/HMI client and supports Modbus TCP. A custom web interface can
also be used, but it needs a real communication layer to exchange tags
with the runtime.
Two valid demonstration paths
Path A --- browser-only visual demonstration

Run the existing browser simulation and show the process graphics,
changing values, navigation, and simulation controls. This path may not
require installing OpenPLC, but it must be described as a standalone
visual simulation unless its source and runtime connection have been
verified.

Path B --- PLC + SCADA integration (recommended for an automation
project)

Run an OpenPLC program, configure its Modbus TCP interface, connect a
SCADA client, map the tags, and demonstrate that changing a command or
input changes PLC outputs and that the resulting values appear on the
HMI. This path generally requires installing or running the OpenPLC
Editor and Runtime; FUXA can be run locally or in another supported
environment.
Operating modes and control rules
The intended logic should include the following behaviours. Final
thresholds should be configurable and documented in the PLC program or
HMI.
  Function                            Example control rule
  Start/Stop                          Start enables the sequence; Stop
                                      disables normal equipment outputs

  Intake valve                        Flow is permitted only when the
                                      intake valve command is open

  Pump protection                     A pump must not run when its source
                                      tank is at low-low level

  High-level protection               Stop filling when the receiving
                                      tank reaches its high-level limit

  Duty/standby pumps                  Only run the selected duty pump;
                                      allow standby changeover only if
                                      implemented and tested

  Coagulation                         Enable dosing and mixing only when
                                      the process is enabled and upstream
                                      flow is available

  Sludge pump                         Run only when sludge removal is
                                      enabled and the clarifier condition
                                      calls for it

  Filter/backwash                     Prevent normal filtration and
                                      backwash commands from conflicting

  Disinfection                        Enable simulated dosing/UV status
                                      only when the relevant process
                                      permissives are true

  Alarm handling                      Raise visible alarms for
                                      low-low/high-high levels, equipment
                                  trips, or communication loss
These are example educational rules, not a certified process-control
design. Emergency stop, trip handling, and restart behaviour must be
deliberately implemented and tested rather than represented only by a
decorative HMI button.
Software requirements
Recommended tools
- OpenPLC Editor --- create the PLC project and write Ladder
  Diagram, Function Block Diagram, or Structured Text.
- OpenPLC Runtime --- execute the PLC program.
- FUXA SCADA/HMI (optional) --- create browser-based process
  graphics and connect supported industrial protocols, including
  Modbus TCP.
- A modern browser such as Edge or Chrome.
- Git and a code editor are useful for repository management and
  documentation.
Official resources (choose a compatible runtime/editor pair and follow that version's instructions):
- OpenPLC Runtime v3 (legacy repository): https://github.com/thiagoralves/OpenPLC_v3
- OpenPLC Editor (legacy repository): https://github.com/thiagoralves/OpenPLC_Editor
- OpenPLC Runtime v4: https://github.com/Autonomy-Logic/openplc-runtime
- OpenPLC Editor (current project): https://github.com/Autonomy-Logic/openplc-editor
- FUXA SCADA/HMI: https://github.com/frangoteam/FUXA
- FUXA documentation: https://frangoteam.github.io/FUXA/
The legacy OpenPLC v3 and newer v4 projects may have different installation, runtime, and Modbus configuration steps. Select one version family and document the exact versions tested; do not mix instructions from different versions without verifying compatibility.
Responsibility of each component
Component	Responsibility in this project	Evidence that it works
OpenPLC Editor	Create and compile the IEC 61131-3 PLC program	Program compiles and variables/logic can be tested
OpenPLC Runtime	Execute the compiled PLC program cyclically	Runtime is running and PLC state changes when inputs change
Modbus TCP	Exchange mapped PLC tags with the SCADA client	A known PLC tag can be read, and a permitted test command can be written
FUXA SCADA/HMI	Display the process, status, trends, alarms, and operator controls	HMI values match PLC tags and controls change the intended PLC command tags
Browser process graphic	Visualize the four treatment stages	If it is not connected to PLC tags, label it as a standalone simulation rather than live SCADA


Integration acceptance test
Before describing the project as an integrated PLC–SCADA system, complete this end-to-end test:
1. Start the OpenPLC Runtime and confirm its configured Modbus TCP endpoint.
2. Run the PLC program and identify a harmless test variable in the actual tag/register map.
3. Configure FUXA to connect to that endpoint and read the test variable.
4. Change the variable from the PLC side and confirm the HMI value updates.
5. Write a permitted command from FUXA and confirm that the corresponding PLC command variable changes.
6. Verify that interlocks are still enforced by the PLC, not just by disabling an HMI button.
7. Disconnect the client or stop the runtime and verify that the HMI indicates communication loss or stale data.
Only mark these steps as passed after performing them on the actual running setup.

Software versions and setup procedures can change. Follow the
installation instructions for the version you actually install. Do not
assume OpenPLC Runtime v3 and v4 have identical interfaces or
configuration steps.
Implementation workflow
Step 1 --- create the repository structure
A practical layout is:
soft-plc-water-treatment/
├── README.md
├── LICENSE
├── docs/
│   ├── architecture.md
│   ├── process-flow.md
│   ├── io-tag-list.csv
│   ├── test-plan.md
│   └── screenshots/
├── plc/
│   ├── README.md
│   ├── water_treatment.st
│   └── io-map.md
├── scada/
│   ├── README.md
│   ├── fuxa-project/          # exported project, if applicable
│   └── screenshots/
└── simulation/
    └── README.md              # describe standalone browser simulation, if used
Only include files that exist. If the PLC or SCADA project has not yet
been built, label those folders as planned work rather than claiming
they are implemented.
Step 2 --- install and test OpenPLC
1. Download the OpenPLC Editor from its official site.
2. Install the Editor for your operating system.
3. Install or start the compatible OpenPLC Runtime if you intend to run
   a separate runtime process.
4. Create a small test project before implementing the entire plant.
5. Compile/run the test program and confirm that its variables and
   outputs behave as expected.
6. Record the exact Editor and Runtime versions in
   docs/architecture.md.
The Editor's built-in simulator can be useful for testing logic.
However, a built-in editor simulator does not automatically mean a
separate SCADA application is connected to a Modbus server. For
integration, identify the actual runtime endpoint and communication
configuration.
Step 3 --- implement the PLC logic in stages
Build and test one process area at a time:
1. Intake tank level and pump interlocks
2. Intake valve and flow permissive
3. Coagulation dosing and mixers
4. Clarifier and sludge pump
5. Filter and backwash interlock
6. Disinfection and clearwell
7. Plant start/stop, alarms, and fault handling
Use named variables, documented thresholds, and a consistent I/O map.
Keep simulation inputs separate from outputs so the logic can be tested
without physical devices.
Step 4 --- configure the SCADA/HMI
Using FUXA or your custom web HMI:
1. Create a device/connection for the PLC's actual Modbus TCP endpoint.
2. Add tags matching the PLC program and its Modbus register mapping.
3. Create the four process sections: Intake, Coagulation,
   Sedimentation, and Disinfection.
4. Add tanks, pipes, valves, pumps, mixers, dosing units, filters, and
   instruments.
5. Bind each graphic to a real tag: for example, tank fill to a level
   tag, pump animation to a pump-status tag, and valve position to a
   valve-state tag.
6. Add operator controls for permitted commands.
7. Add alarms, trends, event history, and a connection-status indicator
   if supported.
8. Export/backup the SCADA project and document how to restore it.
A graphic is not genuinely tag-connected merely because it animates.
Verify that its values and controls are bound to the PLC or to a clearly
identified simulation engine.
Step 5 --- connect and validate Modbus TCP
1. Confirm that the selected OpenPLC Runtime version exposes a Modbus
   TCP server and determine its configured IP address and port.
2. Confirm that the server is enabled and reachable from the SCADA
   process.
3. Create a tag map showing each variable, data type, direction, and
   Modbus address.
4. Configure the SCADA client to use the correct function code and
   address convention.
5. Read a known PLC value and verify it in the HMI.
6. Write a harmless test command and verify the corresponding PLC
   variable changes.
7. Confirm that the PLC output follows its interlocks rather than
   blindly following the HMI command.
8. Test communication loss and show a clear stale-data/connection
   warning.
Do not copy register numbers or port values blindly from an online
tutorial. OpenPLC versions, runtime configuration, memory areas, and
SCADA address conventions may differ. Confirm the actual mapping in your
installed version and test it with a known value before mapping the
complete plant.
OpenPLC program design
The following is a logic-design example, not a complete drop-in
project. The variable declarations, I/O addresses, task setup, and
syntax must be adapted to the selected OpenPLC Editor version and
project.

Illustrative Structured Text:
PROGRAM WaterTreatment
VAR
    PlantStart       : BOOL;
    PlantStop        : BOOL;
    IntakeValveOpen  : BOOL;
    WetWellLow       : BOOL;
    WetWellHigh      : BOOL;
    Pump1Command     : BOOL;
    Pump2Command     : BOOL;
    DutyPump2        : BOOL;
    PlantRunning     : BOOL;
END_VAR

(* Stop has priority over normal start/run requests. *)
IF PlantStop THEN
    PlantRunning := FALSE;
ELSIF PlantStart THEN
    PlantRunning := TRUE;
END_IF;

(* Example duty/standby selection with basic level permissives.
   A production implementation needs explicit trip handling,
   mutual exclusion, fault reset, and validated I/O mapping. *)
Pump1Command := FALSE;
Pump2Command := FALSE;

IF PlantRunning AND IntakeValveOpen AND NOT WetWellLow THEN
    IF DutyPump2 THEN
        Pump2Command := NOT WetWellHigh;
    ELSE
        Pump1Command := NOT WetWellHigh;
    END_IF;
END_IF;

END_PROGRAM
Logic review points
- Define whether WetWellLow means a low-level alarm is active or
  whether the tank is safe to pump; avoid ambiguous tag names.
- The sample assumes a particular meaning for the level signals.
  Confirm and document that meaning.
- Implement high/high and low/low protection, fault latching/reset,
  and pump feedback where appropriate.
- Ensure the PLC owns the final interlock decision. An HMI command
  should request an action, not bypass protection.
- Add the correct physical or simulated I/O declarations and Modbus
  mapping only after confirming the target runtime's supported
  configuration.
SCADA/HMI design
The target interface can follow the supplied screenshots and use the
following layout:
Global dashboard
- Header: project name, connection status, simulation speed,
  pause/resume, and reset
- Sidebar: Home, Intake, Coagulation, Sedimentation, Disinfection,
  Alarms, Trends, History, Scenarios, Tutorials, Settings
- Process summary cards for flow, turbidity, levels, dosing, filter
  status, chlorine, and pH
- Main process graphic with pipes and equipment states
- Side panel for the selected component's details and permitted
  controls
- Bottom status strip for key process values and active alarms
Visual state conventions
Document the colours used for normal operation, stopped equipment,
alarms, manual mode, and communication failure. Never rely on colour
alone: include text labels and visible status indicators. Show units
beside every process value.
Recommended HMI tags
  Tag                       Type                    Purpose
  Plant_Start_Cmd         Boolean                 Operator start request

  Plant_Stop_Cmd          Boolean                 Operator stop request

  Plant_Running           Boolean                 PLC-confirmed run state

  Intake_Valve_Cmd        Boolean                 Intake valve request

  Intake_Valve_Open       Boolean                 Valve status

  WetWell_Level           Numeric                 Simulated level

  WetWell_Low             Boolean                 Low-level condition

  WetWell_High            Boolean                 High-level condition

  Pump1_Cmd               Boolean                 Pump 1 command

  Pump1_RunFb             Boolean                 Pump 1 run
                                                    feedback/state

  Pump2_Cmd               Boolean                 Pump 2 command

  Pump2_RunFb             Boolean                 Pump 2 run
                                                    feedback/state

  Raw_Turbidity           Numeric                 Simulated raw-water
                                                    turbidity

  Flow_Rate               Numeric                 Simulated flow rate

  Alum_Dose               Numeric                 Simulated alum dose

  Rapid_Mixer_RPM         Numeric                 Rapid mixer speed

  Slow_Mixer_RPM          Numeric                 Slow mixer speed

  Clarifier_Turbidity     Numeric                 Simulated clarifier
                                                    turbidity

  Filter_HeadLoss         Numeric                 Simulated filter head
                                                    loss

  Effluent_Turbidity      Numeric                 Simulated effluent
                                                    turbidity

  Plant_Chlorine          Numeric                 Simulated plant
                                                    chlorine

  Distribution_Chlorine   Numeric                 Simulated distribution
                                                    chlorine

  Water_pH                Numeric                 Simulated pH

  Clearwell_Level         Numeric                 Simulated clearwell
                                                    level

  Alarm_Active            Boolean                 Summary alarm state

  PLC_Connected           Boolean/status          Communication health,
                                                    preferably derived from
                                                connection diagnostics
These are logical tag names, not confirmed Modbus addresses. Maintain a
separate docs/io-tag-list.csv with the actual addresses, types,
read/write permissions, scaling, and descriptions after configuration.
SCADA-to-PLC control flow
Use a clear separation between operator commands, PLC decisions, and equipment status:
1. The operator presses Start or requests a valve/pump action in FUXA.
2. FUXA writes to a mapped command tag over Modbus TCP.
3. OpenPLC reads the command during its scan cycle and evaluates process permissives, interlocks, and alarm conditions.
4. OpenPLC calculates the allowed equipment outputs and publishes status tags.
5. FUXA reads those status tags and updates pump lights, valve positions, tank graphics, alarms, and trends.
Example: Pump1_Start_Cmd is an operator request; WetWell_Low and Plant_Running are PLC inputs/state; Pump1_Run is the PLC-calculated output/status. The HMI must not show a pump as running just because the Start button was pressed. It should show the PLC-reported state (or clearly identify a simulated state if there is no live PLC connection).
Modbus integration and tag mapping
Create a table like this after checking your actual OpenPLC project:
  Logical tag         PLC variable   Modbus         Access            Scaling
                                     area/address                     
  Plant_Start_Cmd   To be mapped   To be verified Write             Boolean

  Plant_Running     To be mapped   To be verified Read              Boolean

  WetWell_Level     To be mapped   To be verified Read              Engineering
                                                                      units

  Pump1_Cmd         To be mapped   To be verified Read/diagnostic   Boolean
  Raw_Turbidity     To be mapped   To be verified Read              NTU
Use the SCADA tool's supported address format and verify whether its
displayed addresses are zero-based or one-based. Numeric values may need
scaling, and multi-register values may need a defined word order.
Document these decisions instead of guessing.

For safe control design, write operator requests to command tags and
expose PLC-calculated equipment states as separate read-only tags. Do
not let the HMI directly override the final pump interlock.
Testing and demonstration checklist
Use this checklist during development and the final viva:
- [ ] PLC program compiles without errors.
- [ ] Start enables the intended sequence.
- [ ] Stop turns off normal equipment commands according to the
  defined stop policy.
- [ ] Low-level protection prevents the relevant pump from running.
- [ ] High-level protection stops filling.
- [ ] Duty/standby selection behaves as documented.
- [ ] Valve commands and displayed valve states are distinguishable.
- [ ] Coagulation and mixer permissives work.
- [ ] Filter/backwash interlock prevents conflicting operation.
- [ ] Alarm conditions appear on the HMI and clear/reset according to
  the defined rules.
- [ ] HMI values match PLC values.
- [ ] HMI commands produce the expected PLC-side changes.
- [ ] Communication loss is detected and shown to the operator.
- [ ] Reset/pause/speed controls behave as documented.
- [ ] Trends/history use actual acquired tags or are clearly labelled
  as simulation data.
- [ ] Screenshots and a short demonstration recording are saved in
  docs/screenshots/.
- [ ] README claims match what has actually been implemented and
  tested.
Suggested live demonstration sequence
1. Show the full treatment dashboard and explain the four process
   areas.
2. Start the simulation and show wet-well level and flow changes.
3. Trigger a low-level condition and demonstrate the pump interlock.
4. Open/close the intake valve and show the resulting permitted flow
   behaviour.
5. Demonstrate dosing/mixer permissives and a filter/backwash
   interlock.
6. Trigger an alarm and show its details.
7. If OpenPLC integration is complete, show the same tag changing in
   the PLC and SCADA to prove the connection.
8. End by showing the architecture, I/O map, test results, and
   limitations.
Troubleshooting
  Symptom                             Checks
  HMI opens but values do not change  Determine whether it is a
                                      standalone simulation; verify tag
                                      bindings and the simulation engine

  SCADA cannot connect                Check runtime status, IP address,
                                      port, firewall, network
                                      reachability, and server
                                      configuration

  Values display incorrectly          Verify Modbus function code,
                                      register offset, data type,
                                      scaling, and word order

  HMI button changes colour but PLC   Check whether the button is only a
  output does not change              visual interaction or is bound to a
                                      writable command tag

  Pump stays on despite stop request  Review PLC stop priority, output
                                      logic, latching, and runtime state

  Runtime and Editor cannot           Verify version compatibility and
  communicate                         follow the version-specific
                                      official setup instructions

  Trends are flat or unrealistic      Confirm that the source tag changes
                                      and that the chart is bound to the
                                  correct tag and sampling interval
Safety and limitations
- This is an educational software simulation with no physical
  instrumentation or treatment equipment.
- All process measurements and treatment outcomes are simulated.
- It must not be used to control a real water-treatment plant.
- Do not expose a PLC runtime or Modbus TCP port directly to the
  public internet. Keep the demo on a trusted local network or
  isolated lab environment.
- Real-world control requires engineering review, validated
  instrumentation, fail-safe design, cybersecurity controls, and
  applicable regulatory compliance.
- A visual animation alone does not prove that PLC logic, Modbus
  communication, alarms, or process physics are implemented.
References
1. OpenPLC Editor downloads --- https://autonomylogic.com/download/
2. OpenPLC Editor source ---
   https://github.com/Autonomy-Logic/openplc-editor
3. OpenPLC Runtime v4 source and integration details ---
   https://github.com/Autonomy-Logic/openplc-runtime
4. FUXA SCADA/HMI source --- https://github.com/frangoteam/FUXA
5. FUXA documentation --- https://frangoteam.github.io/FUXA/
6. Modbus integration guide ---
   https://www.openindustryproject.org/guides/modbus/
Repository maintenance note
Before submitting or publishing this project:
- Replace this note with the actual project status and verified
  software versions.
- Add the real PLC program and exported HMI project, if created.
- Add screenshots from your running implementation.
- Fill in the actual Modbus address map.
- Mark each test as passed only after performing it.
- Keep a clear distinction between the browser trainer's own
  simulation and the OpenPLC-connected implementation.
