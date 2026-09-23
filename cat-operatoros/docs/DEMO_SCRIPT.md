# Demo Script

Three to four minutes. Rehearse it five times before you present it. Record a
clean run as insurance before you touch any further code.

## Setup

High-contrast mode on if the room is bright. Demo drawer opened by
long-pressing the header, so a judge never finds it by accident. Ideally run
**Play demo** hands-free and talk over it.

## The run

**0:00 — Open.** "This is built for one person: the operator in the seat. Not
a fleet dashboard." Home screen. Task, progress, ETA, safety green.

**0:30 — The data is yours.** Point at engine hours 1530.2. "Your sample table
is the first four rows of our seed set. Everything else is synthetic on the
same schema."

**0:50 — Trigger proximity.** Vehicle closes 30 m → 18 m → 12 m. State moves
to high attention.

**1:10 — The fusion point.** "This is not a proximity alert. It fired because
three things are true at once." Open the why panel: heavy load, 7° slope,
vehicle at 12 m. One action. Hold to acknowledge.

**1:40 — Hazard Memory.** "The site already knew. Three events here this
week, all vehicles entering the swing radius." This is the differentiator;
give it a beat.

**2:00 — Report it.** Three taps, then a photo. Confirmation. Then show the
Zone C count going from 3 to 4 **live**. "The site just got smarter."

**2:30 — Task completes.** Four minutes under prediction. Open the breakdown:
"predicted from 14 similar cycles", real contributors.

**2:50 — Coach.** Idle 11% against your own normal of 8%. One thing to
improve. "We never rank operators against each other."

**3:05 — Training.** Tap through. Thirty-second scenario, assigned *because*
of the proximity alerts earlier. "Behaviour became coaching became training."

**3:25 — Handover.** The hazard from minute two is here. The fault logged on
the Machine screen is here. "This is the only thing a supervisor sees, and it
wrote itself."

**3:45 — Close.** "Two loops. The operator gets better, and the site
remembers. Simulated telemetry, decision support only, not a Caterpillar
product."

## Questions you will get

**"Is the ETA a real model?"** Yes — ridge regression fitted on the seed rows
at boot, interval from residual spread. Name the features.

**"Does it recognise the warning light?"** No. It narrows and confirms. The
interface is built for a classifier to drop in. Say this plainly; do not
oversell.

**"Where is the supervisor view?"** The handover, deliberately. Fleet
dashboards already exist. Nothing exists for the operator.

**"How does this connect to real machines?"** The telemetry contract is their
nine-column schema. Swap the simulator for a CAN bus or Product Link feed and
nothing above the data layer changes.

**"Offline?"** State persists locally, reports queue with a visible count.
No real sync backend in the prototype.
