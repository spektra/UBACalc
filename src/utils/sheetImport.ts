import sheetColumns from '../data/sheetColumns.json'
import { clampAttribute } from './sanitize'

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
  if (spaces.length >= 3) return spaces
  return [line]
}
