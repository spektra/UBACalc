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
  "I always say 'Morning' instead of 'Good morning' - if it were a good morning, I'd be sleeping and not talking to people. - Unknown",
  "I'm not lazy, I'm just in energy-saving mode. - Dancing Snail",
  "My wallet is like an onion. Every time I open it, it makes me cry. - Unknown",
  "I finally found a machine at the gym that I like: the vending machine. - Unknown",
  "My fake plants died because I did not pretend to water them. - Mitch Hedberg",
  "Our offense is like the Pythagorean Theorem. There is no answer. - Shaquille O'Neal",
  "The only difference between a good shot and a bad shot is if it goes in or not. - Charles Barkley",
  "I've had to overcome a lot of diversity. - Drew Gooden",
  "All series long we've been able to penetrate their bigs, get deep, and suck the D in. - Jason Terry",
  "We're going to turn this team around 360 degrees. - Jason Kidd",
  "If I was a Caesar salad, the croutons would be my friends, the lettuce would be my family and the dressing would be my mom. - Kevin Garnett",
  "If you look at the box score, we won this game. - Paul George",
  "I never thought I'd lead the NBA in rebounding, but I got a lot of help from my teammates - they did a lot of missing. - Shaquille O'Neal",
  "I knew I was dog meat. Luckily, I'm the high-priced dog meat that everybody wants. I'm the Alpo of the NBA. - Moses Malone",
  "I am going to make a shot right here in your face... I didn't mean to leave any time on the clock. - Larry Bird",
  "We're losing games but our basketball has not been bad basketball, it's been not good enough to win basketball. - George Karl",
]

const COMPLIMENTS = [
  "Now THIS is a build. Elite efficiency. Your GM is delighted.",
  "Clean. Efficient. Deadly. This build slaps and you know it.",
  "Spenders gonna spend. And you spent wisely. Respect.",
  "This is the kind of build that makes the league sheet look like poetry.",
  "Minimum waste, maximum impact. Alpha move.",
  "Your UC was well-invested. This build is a certified problem for the league.",
  "The ball is in your court. - Common idiom",
  "Marius de Romanus might be the greatest basketball player ever. - Marius de Romanus",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "Be the ball. - Caddyshack",
  "When you do things right, people won't be sure you've done anything at all. - Philip J. Fry",
]

const MID = [
  "It's... fine. Not great, not terrible. Like a 6/10 build. Which in this economy is actually pretty good.",
  "Solid effort. Nothing flashy, but you'll get minutes. Probably.",
  "This build will definitely play basketball. Whether it plays WELL basketball remains to be seen.",
  "You made choices. Some of them were even good choices. We'll take it.",
  "If you can't be kind, at least be vague. - Judith Martin",
  "Always forgive your enemies; nothing annoys them so much. - Oscar Wilde",
  "I generally avoid temptation unless I can't resist it. - Mae West",
  "Don't be so humble - you're not that great. - Golda Meir",
  "Do not take life too seriously. You will never get out of it alive. - Elbert Hubbard",
  "If plan A doesn't work, the alphabet has 25 more letters. - Claire Cook",
  "The chief function of the body is to carry the brain around. - Thomas A. Edison",
  "Life is like a box of chocolates... you never know what you're gonna get. - Forrest Gump",
  "Wait, I'm having one of those things. You know... a headache with pictures? - Philip J. Fry",
  "Stupid Flanders! Stupid sexy Flanders! - Homer J. Simpson",
  "Wait a minute. I'm in no condition to drive. Wait a minute. I don't have to listen to myself. I'm drunk. - Homer J. Simpson",
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
