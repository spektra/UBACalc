// rating.ts — generates a sassy auto-generated build rating based on the upgrade pattern.
// reads the upgrades and decides whether to roast or compliment you.
// if you spent 50k UC on Free Throw, you deserve to be roasted.

interface UpgradeInfo {
  name: string
  from: number
  to: number
  cost: number
}

const ROASTS = [
  "This build is a crime against basketball. I've seen better decision-making in a 2K random rec queue.",
  "You spent how much on that? Your GM is going to have questions. So is your therapist.",
  "Interesting strategy, Cotton. Let's see if it pays off for them.",
  "This is certainly... a build. Of all the builds I've seen, this is one of them.",
  "Grind hard or go home. You chose 'go home' but at least you did it with style.",
  "Who hurt you? Was it a Shooting guard with 25 Pass Accuracy? Because that's what this looks like.",
  "I'm not saying this build is bad, but I've seen better stat spreads in a random gen create-a-player.",
  "The league sheet admins are going to love this. Mostly because it's funny.",
  "This build is what happens when you let the AI make all your decisions. And the AI was having a stroke.",
  "Your UC wallet is crying. I hope you know that.",
]

const COMPLIMENTS = [
  "Now THIS is a build. Elite efficiency. Your GM is delighted.",
  "Clean. Efficient. Deadly. This build slaps and you know it.",
  "Spenders gonna spend. And you spent wisely. Respect.",
  "This is the kind of build that makes the league sheet look like poetry.",
  "Minimum waste, maximum impact. Alpha move.",
  "Your UC was well-invested. This build is a certified problem for the league.",
]

const MID = [
  "It's... fine. Not great, not terrible. Like a 6/10 build. Which in this economy is actually pretty good.",
  "Solid effort. Nothing flashy, but you'll get minutes. Probably.",
  "This build will definitely play basketball. Whether it plays WELL basketball remains to be seen.",
  "You made choices. Some of them were even good choices. We'll take it.",
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateBuildRating(upgrades: UpgradeInfo[], totalCost: number): string {
  if (upgrades.length === 0) return "No upgrades yet. The league is waiting, legend."

  
  const maxCost = Math.max(...upgrades.map((u) => u.cost))
  const maxUpgrade = upgrades.find((u) => u.cost === maxCost)

  const hasDumbUpgrade = upgrades.some((u) => u.cost > 20000 && (u.name === 'Free Throw' || u.name === 'Pass Vision'))

  if (hasDumbUpgrade || (maxUpgrade && maxUpgrade.cost > totalCost * 0.6)) {
    return pick(ROASTS)
  }

  if (totalCost > 100000) {
    return pick([...COMPLIMENTS, "Big spender energy. You didn't come to play, you came to DOMINATE. Or at least to try."])
  }

  if (totalCost > 50000) {
    return pick(COMPLIMENTS)
  }

  if (totalCost > 10000) {
    return pick(MID)
  }

  return "Light work. No heavy lifting today. But hey, every upgrade counts."
}
