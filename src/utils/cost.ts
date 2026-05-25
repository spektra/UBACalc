// cost.ts — UC cost calculations. reads the cost scale from costScale.json and does math.
// yes, upgrading from 98 to 99 costs 1,600 UC. no, that is not a typo.

import costScaleData from '../data/costScale.json'

interface CostBracket {
  range: string
  costPerPoint: number
}

const brackets: CostBracket[] = costScaleData.brackets

function parseBracketRange(range: string): [number, number] {
  const [low, high] = range.split('-').map(Number)
  return [low, high]
}

export function getCostPerPoint(rating: number): number {
  for (const b of brackets) {
    const [low, high] = parseBracketRange(b.range)
    if (rating >= low && rating <= high) {
      return b.costPerPoint
    }
  }
  return 0
}

export function computeUpgradeCost(from: number, to: number): number {
  if (to <= from) return 0
  let total = 0
  for (let r = from + 1; r <= to; r++) {
    total += getCostPerPoint(r)
  }
  return total
}

export function computeAllUpgrades(
  startingValues: Record<string, number>,
  currentValues: Record<string, number>,
): { name: string; from: number; to: number; cost: number }[] {
  const upgrades: { name: string; from: number; to: number; cost: number }[] = []
  for (const [name, current] of Object.entries(currentValues)) {
    const start = startingValues[name] ?? current
    if (current > start) {
      upgrades.push({
        name,
        from: start,
        to: current,
        cost: computeUpgradeCost(start, current),
      })
    }
  }
  return upgrades.sort((a, b) => b.cost - a.cost)
}

export function formatUpgradeText(
  playerName: string,
  upgrades: { name: string; from: number; to: number; cost: number }[],
): string {
  const lines: string[] = []
  if (playerName) lines.push(`Player: ${playerName}`, '')
  upgrades.forEach((u) =>
    lines.push(`${u.name} ${u.from} -> ${u.to} (${u.cost.toLocaleString()} UC)`),
  )
  const total = upgrades.reduce((sum, u) => sum + u.cost, 0)
  if (upgrades.length) lines.push('')
  lines.push(`Total Spent: ${total.toLocaleString()} UC`)
  return lines.join('\n')
}
