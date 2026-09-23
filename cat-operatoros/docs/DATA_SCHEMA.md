# Data Schema

## The canonical record

The judges supplied a nine-column table. Treat it as the contract. Every
synthetic record carries all nine fields, and the first four rows of the seed
set are their sample verbatim.

| Field | Type | From the brief |
|---|---|---|
| timestamp | ISO string | yes |
| machineId | string | yes |
| operatorId | string | yes |
| engineHours | number | yes |
| fuelUsedL | number | yes |
| loadCycles | integer | yes |
| idlingTimeMin | integer | yes |
| seatbelt | 'Fastened' \| 'Unfastened' | yes |
| safetyAlert | boolean | yes |

## Derived and enriched fields

Everything below is an extension. Keep it separate in the object so you can
say, truthfully, that the base schema is theirs and the rest is what the
product adds.

| Field | Type | Used by |
|---|---|---|
| taskType | string | ETA model |
| taskDurationMin | number | ETA model (label) |
| slopeDeg | number | risk engine, ETA |
| loadClass | 'light' \| 'medium' \| 'high' | risk engine, ETA |
| proximityM | number | risk engine |
| vehicleCount | integer | risk engine |
| pedestrianNear | boolean | risk engine |
| machineSpeed | number | risk engine |
| cycleTimeSec | number | coach, anomalies |
| weather | string | ETA |
| temperatureC | number | ETA |
| zone | 'A' \| 'B' \| 'C' | hazard memory |
| incidentType | string \| null | hazard memory |
| travelMeters | number | ETA |

## Seed requirements

About 200 synthetic records after the four sample rows, covering:

- normal operation at the operator's baseline
- an inefficient stretch with idle climbing and cycle time drifting
- at least three vehicle-proximity events clustered in Zone C, dated this week
- two seatbelt violations
- a spread of task durations wide enough for the ETA model to learn from

Flat data is the failure mode. If every row looks the same, the regression has
no signal, confidence is meaningless and the contributor breakdown will read
as invented.

## Identity chain

Primary machine `EXC001`, primary operator `OP1001`. Engine hours run
1523.5 → 1524.8 → 1526.5 → 1530.2, which is why the Machine screen shows
1530.2. Mention this chain in the pitch.

## Incident record

```
{ id, zone, type, severity, timestamp, machineId, operatorId,
  task, telemetrySnapshot, photos: [dataUrl] }
```

`telemetrySnapshot` is the full nine-field record at the moment of report.
That snapshot is what makes the incident useful later, and it is what the
"Why am I seeing this" panel replays when the zone warns a future operator.
