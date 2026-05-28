# UBA Player Attribute Caps & System Guidelines

## 1. Color-Coded Shading Attribute Cap Legend
The color of a particular attribute cell dictates the absolute development ceiling (cap) for that rating:

| Shading Color | Attribute Ceiling (Cap) |
| :--- | :--- |
| **Blue** | **99 Cap** |
| **Purple** | **95 Cap** |
| **Magenta** | **94 Cap** |
| **Cyan** | **90 Cap** |
| **Green** | **85 Cap** |
| **Orange** | **80 Cap** |
| **Red** | **75 Cap** |
| **Grey** | **70 Cap** |
| **Yellow** | **60 Cap** |
| **Dark Green** | **50 Cap** |

---

## 2. Dynamic Archetype Skill Categories
The layout breaks attributes into explicit groupings. These groups are evaluated alongside the color designations to define profile strengths and developmental limits:

### 🎯 Shooting
* **Attributes Affected:** Mid Range, 3PT, Free Throw (FT) only.
* *Note:* Shot IQ is imported and upgraded as a Mental attribute, not capped by Shooting archetype.

### 🪓 Slashing
* **Attributes Affected:** Driving Layup, Driving Dunk, Draw Foul, Speed With Ball (SWB).

### 🕹️ Playmaking
* **Attributes Affected:** Pass Accuracy, Pass Vision, Ball Handle, Speed With Ball (SWB).

### 🛡️ Defense
* **Attributes Affected:** Steal, Block, Perimeter Defense, Interior Defense, Pass Perception, Defensive Consistency.
* *Note:* Pass Perception and Defensive Consistency are shared with Mental and use fixed caps from `caps.json`. Help Defense IQ is Mental-only.

### 🧱 Rebounding & Inside Finish
* **Attributes Affected:** Offensive Rebound, Defensive Rebound, Standing Dunk, Close Shot, Hands, Vertical.
* *Note:* Hands is shared with Physical and uses a fixed cap. Vertical is shared with Physical and remains height/weight-capped.

### 💼 Post Scoring
* **Attributes Affected:** Close Shot, Standing Dunk, Post Hook, Post Control, Post Fade.

### 🧠 Mental
* **Attributes Affected:** Shot IQ, Pass IQ, Help Defense IQ, Pass Perception, Defensive Consistency, Offensive Consistency, Hustle.
* *Note:* These are fixed-cap attributes configured in `caps.json`, not archetype-capped.

---

## 3. Base Shading Priorities & Value Baselines
Player archetypes apply overriding attribute profiles based on their designation (Strength vs. Weakness):

* **Primary Strength:** Hard cap sets to 99 (Shaded Blue). Attributes start at a baseline of 80.
* **Secondary Strength:** Hard cap sets to 95 (Shaded Purple). Attributes start at a baseline of 70.
* **Neutral Attributes:** Hard cap sets to 90 (Shaded Cyan). Attributes start at a baseline of 50.
* **Weaknesses:** Hard cap drops to 75 (Shaded Red). Attributes start at a baseline of 40.
* *Physical Attributes:* Calculated modularly based strictly on selected Height and Weight parameters.

---

## 4. League Demographics & Physical Matrices

### Height Ranges by Position
```text
PG: 5'8" - 6'7"
SG: 6'1" - 6'9"
SF: 6'3" - 6'10"
PF: 6'4" - 7'0"
C:  6'6" - 7'4"
```

### Weight Class Distributions
```text
Very Light:     160 - 174 lbs   | Strength 50/40, Vertical 99/60
Light:          175 - 188 lbs   | Strength 50/40, Vertical 99/60
Below Average:  189 - 213 lbs   | Strength 50/40, Vertical 95/55
Average:        214 - 233 lbs   | Strength 80/60, Vertical 90/50
Above Average:  234 - 253 lbs   | Strength 90/65, Vertical 85/45
Heavy:          254 - 274 lbs   | Strength 95/70, Vertical 80/40
Very Heavy:     275 - 300 lbs   | Strength 99/75, Vertical 75/40
```

### Speed & Agility Caps by Height Range
```text
≤ 6'3"  (≤ 75"):   Speed 99/70, Agility 99/70
6'4" - 6'7" (76-79"):  Speed 95/60, Agility 95/60
6'8" - 6'10" (80-82"): Speed 90/50, Agility 90/50
≥ 6'11" (≥ 83"):  Speed 85/40, Agility 85/40
```

### Physical Attribute Rules
- **Speed & Agility**: cap/base from height range, then weight penalty subtracts from cap only:
  - Above Average: −5 cap
  - Heavy: −10 cap
  - Very Heavy: −15 cap
  - Others: no penalty
  Starting value (base) is never penalized.
- **Strength**: cap/base determined by weight class.
- **Vertical**: cap/base determined by weight class (heavier = lower vertical ceiling).
- **Stamina, Hustle & Hands**: fixed-cap physical attributes configured in `caps.json`. Hustle is shared with Mental; Hands is shared with Rebounding.
- **Vertical**: shared with Rebounding and Physical, but always uses the height/weight physical matrix.
