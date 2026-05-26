import sheetColumns from '../data/sheetColumns.json'
import badgeColumns from '../data/badgeColumns.json'
import { clampAttribute } from './sanitize'
import type { Tier } from '../types'

interface ParseResult {
  playerName: string
  startingValues: Record<string, number>
  parsed: number
  skipped: number
}

export function parsePastedAttributes(raw: string): ParseResult {
  const map = (sheetColumns as { columns: (string | null)[] }).columns
  const lines = raw
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const dataLine = findDataLine(lines)
  if (!dataLine) {
    return { playerName: '', startingValues: {}, parsed: 0, skipped: 0 }
  }

  const cells = splitCells(dataLine)
  const startingValues: Record<string, number> = {}
  let playerName = ''
  let parsed = 0
  let skipped = 0

  for (let i = 0; i < cells.length && i < map.length; i++) {
    const attrName = map[i]
    const rawVal = cells[i].trim()
    if (attrName === null) {
      if (i === 0) playerName = rawVal.replace(/^["']|["']$/g, '')
      skipped++
      continue
    }
    const val = Number(rawVal.replace(/[^0-9.-]/g, ''))
    if (!isNaN(val) && val >= 0) {
      startingValues[attrName] = clampAttribute(Math.round(val))
      parsed++
    } else {
      skipped++
    }
  }

  return { playerName, startingValues, parsed, skipped }
}

function findDataLine(lines: string[]): string | null {
  for (const line of lines) {
    const cells = splitCells(line)
    if (cells.length < 3) continue
    let numericCount = 0
    for (let i = 1; i < cells.length; i++) {
      const val = Number(cells[i].replace(/[^0-9.-]/g, ''))
      if (!isNaN(val) && val >= 0) numericCount++
    }
    if (numericCount >= 5) return line
  }
  return null
}

function splitCells(line: string): string[] {
  const tabs = line.split('\t')
  if (tabs.length >= 3) return tabs
  const commas = line.split(',')
  if (commas.length >= 3) return commas
  const spaces = line.split(/\s+/)
  if (spaces.length >= 3) return spaces  // caveat: assumes single-word values (desyncs on multi-word names/attrs)
  return [line]
}


const TIER_MAP: Record<string, Tier> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  hof: 'HOF',
  legend: 'Legend',
}

export function parsePastedBadges(raw: string): Record<string, Tier> {
  const map = (badgeColumns as { columns: (string | null)[] }).columns
  const lines = raw
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  for (const line of lines) {
    const cells = splitCells(line)
    if (cells.length < 3) continue

    const result: Record<string, Tier> = {}
    let found = false

    for (let i = 1; i < cells.length && i < map.length; i++) {
      const badgeName = map[i]
      if (!badgeName) continue
      const rawTier = cells[i].trim()
      if (!rawTier) continue
      const tier = TIER_MAP[rawTier.toLowerCase()]
      if (tier) {
        result[badgeName] = tier
        found = true
      }
    }

    if (found) return result  // single-player paste: first matching line only
  }

  return {}
}
