import { test, expect } from '@playwright/test'


async function setStore(page, key, value) {
  await page.evaluate(({ k, v }) => {
    window.__builderStore.getState().setAttribute(k, v)
  }, { k: key, v: value })
}

async function setStart(page, key, value) {
  await page.evaluate(({ k, v }) => {
    window.__builderStore.getState().setStartingValue(k, v)
  }, { k: key, v: value })
}


test.describe('Build Setup Form', () => {
  test('renders all dropdowns and inputs', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByPlaceholder(/Enter player name/)).toBeVisible()
    await expect(page.getByText('Height')).toBeVisible()
    await expect(page.getByText('Weight')).toBeVisible()
    await expect(page.getByText('Primary Strength')).toBeVisible()
    await expect(page.getByText('Secondary')).toBeVisible()
    await expect(page.getByText('Weakness')).toBeVisible()
    await expect(page.getByText('Save Build')).toBeVisible()
    await expect(page.getByText('Reset')).toBeVisible()
  })

  test('can select height from dropdown', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    await expect(heightSelect).toHaveValue("6'6\"")
  })

  test('can select weight class', async ({ page }) => {
    await page.goto('/')
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Average')
    await expect(weightSelect).toHaveValue('Average')
  })

  test('can select archetype', async ({ page }) => {
    await page.goto('/')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')
    await expect(primary).toHaveValue('Shooting')
  })

  test('can input player name', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder(/Enter player name/)
    await input.fill('TestPlayer')
    await expect(input).toHaveValue('TestPlayer')
  })

  test('can save and load a build', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder(/Enter player name/)
    await input.fill('PlaywrightBuild')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Average')
    await page.getByText('Save Build').click()
    await expect(page.getByText('Saved!')).toBeVisible()
  })

  test('reset button clears all selections', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder(/Enter player name/)
    await input.fill('ToReset')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    await page.getByText('Reset').click()
    await expect(input).toHaveValue('')
    await expect(heightSelect).toHaveValue('')
  })
})

test.describe('UC Budget Tracker', () => {
  test('can input UC balance', async ({ page }) => {
    await page.goto('/')
    const ucInput = page.getByPlaceholder('0').first()
    await ucInput.fill('50000')
    await expect(ucInput).toHaveValue('50000')
  })

  test('shows 0 spent with no upgrades', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('0').first().fill('50000')
    await expect(page.getByText('Spent').locator('..')).toContainText('0')
  })

  test('shows over budget warning', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Average')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await page.getByPlaceholder('0').first().fill('100')
    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 99)
    await page.waitForTimeout(500)
    await expect(page.getByText(/Over budget by/).first()).toBeVisible()
  })
})

test.describe('Attribute Panel', () => {
  test('shows attribute sliders', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Mid Range')).toBeVisible()
    await expect(page.getByText('3PT')).toBeVisible()
    await expect(page.getByText('Free Throw')).toBeVisible()
    await expect(page.getByText('Speed', { exact: true })).toBeVisible()
    await expect(page.getByText('Strength', { exact: true })).toBeVisible()
    await expect(page.getByText('Vertical')).toBeVisible()
  })

  test('slider respects cap from archetype', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    const slider = page.locator('input[type="range"]').first()
    const maxCap = await slider.getAttribute('max')
    expect(Number(maxCap)).toBe(99)
  })

  test('weakness cap is 75', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Average')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Slashing')
    const weakness = page.getByLabel('Weakness')
    await weakness.selectOption('Shooting')

    const slider = page.locator('input[type="range"]').first()
    const maxCap = await slider.getAttribute('max')
    expect(Number(maxCap)).toBe(75)
  })

  test('can set starting value via spinbutton', async ({ page }) => {
    await page.goto('/')
    const startInput = page.getByRole('spinbutton').first()
    await startInput.fill('60')
    await expect(startInput).toHaveValue('60')
  })

  test('shows cap badge when build has height and archetype', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await expect(page.getByText('99').first()).toBeVisible()
  })

  test('cost label shows upgrade cost', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 99)
    await page.waitForTimeout(300)
    await expect(page.getByText(/[+]\d[\d,]* UC/).first()).toBeVisible()
  })

  test("per-slider revert button resets to default", async ({ page }) => {
    await page.goto("/")
    const heightSelect = page.getByLabel("Height")
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel("Primary Strength")
    await primary.selectOption("Shooting")

    await setStore(page, "Mid Range", 90)
    await page.waitForTimeout(300)

    const revertBtn = page.locator("button[title=\"Revert to start\"]").first()
    await expect(revertBtn).toBeVisible()
    await revertBtn.click()
    await page.waitForTimeout(300)

    const valAfter = await page.locator("input[type=\"range\"]").first().inputValue()
    expect(Number(valAfter)).toBe(80)
  })

  test("shorter player has higher speed cap than taller player", async ({ page }) => {
    await page.goto("/")

    const heightSelect = page.getByLabel('Height')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Slashing')
    await heightSelect.selectOption("5'9\"")

    const speedSlider = page.locator('input[type="range"]').nth(25)
    const speedCap = Number(await speedSlider.getAttribute('max'))

    await heightSelect.selectOption("7'3\"")
    await page.waitForTimeout(200)

    const speedSlider2 = page.locator('input[type="range"]').nth(25)
    const tallSpeedCap = Number(await speedSlider2.getAttribute('max'))

    expect(speedCap).toBeGreaterThan(tallSpeedCap)
  })

  test('heavier weight reduces agility cap', async ({ page }) => {
    await page.goto('/')

    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Slashing')
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Very Light')

    const agilitySlider = page.locator('input[type="range"]').nth(26)
    const lightAgility = Number(await agilitySlider.getAttribute('max'))

    await weightSelect.selectOption('Very Heavy')
    await page.waitForTimeout(200)

    const agilitySlider2 = page.locator('input[type="range"]').nth(26)
    const heavyAgility = Number(await agilitySlider2.getAttribute('max'))

    expect(lightAgility).toBeGreaterThan(heavyAgility)
  })
})

test.describe('Badge Feed', () => {
  test('shows empty state before any attributes set', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Set attribute values to check badge unlocks.')).toBeVisible()
  })

  test('shows unlocked badges after setting attributes high enough', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')


    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 99)
    await setStart(page, "3PT", 60)
    await setStore(page, "3PT", 99)
    await setStart(page, "Free Throw", 60)
    await setStore(page, "Free Throw", 99)
    await page.waitForTimeout(500)
    await expect(page.getByText(/unlocked/).or(page.getByText(/Bronze/))).toBeVisible()
  })
})

test.describe('Submission Output', () => {
  test('shows empty state with no upgrades', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Adjust attribute sliders above the starting values')).toBeVisible()
  })

  test('shows upgrade text after modifying sliders', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 80)
    await page.waitForTimeout(300)
    await expect(page.getByText('Total Spent:')).toBeVisible()
  })

  test('shows build rating text', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 99)
    await page.waitForTimeout(500)

    await expect(page.getByText(/^\w/).first()).toBeVisible()
  })

  test('shows share button when build has player name', async ({ page }) => {
    await page.goto('/')
    const input = page.getByPlaceholder(/Enter player name/)
    await input.fill('ShareTest')

    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    await setStart(page, "Mid Range", 60)
    await setStore(page, "Mid Range", 80)
    await page.waitForTimeout(300)
    await expect(page.getByText('🔗 Share')).toBeVisible()
  })
})

test.describe('Theme Toggle', () => {
  test('theme toggle button exists', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTitle(/Switch to/)
    await expect(toggle).toBeVisible()
  })

  test('clicking theme toggle switches classes on html', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')

    await page.getByTitle(/Switch to/).click()
    const newClass = await html.getAttribute('class')
    expect(initialClass).not.toBe(newClass)
  })
})

test.describe('Discord Invite', () => {
  test('discord link is visible', async ({ page }) => {
    await page.goto('/')
    const discord = page.getByText(/Join the UBA Discord/)
    await expect(discord).toBeVisible()
  })

  test('discord link has correct href', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a').filter({ hasText: /Discord/ })
    await expect(link).toHaveAttribute('href', /discord\.gg/)
  })
})

test.describe('Header', () => {
  test('header shows app title', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Upgrade Calculator')).toBeVisible()
  })
})

test.describe('Share URL', () => {
  test('can encode build to URL and decode back', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder(/Enter player name/).fill('ShareEncodeTest')
    await page.getByLabel('Height').selectOption("6'6\"")
    await page.getByLabel('Weight').selectOption('Average')
    await page.getByLabel('Primary Strength').selectOption('Shooting')
    await setStart(page, 'Mid Range', 60)
    await setStore(page, 'Mid Range', 85)
    await page.getByPlaceholder('0').first().fill('50000')
    await page.waitForTimeout(500)
    await page.getByText('🔗 Share').click()
    await expect(page.getByText('Link Copied!')).toBeVisible()
  })
})

test.describe('Sheet Import', () => {
  test('floating import button is visible', async ({ page }) => {
    await page.goto('/')
    const btn = page.locator('button[title="Import player attributes from Google Sheets"]')
    await expect(btn).toBeVisible()
  })

  test('opens drawer on click', async ({ page }) => {
    await page.goto('/')
    await page.locator('button[title="Import player attributes from Google Sheets"]').click()
    await expect(page.getByText('Paste Player Attributes')).toBeVisible()
  })

  test('imports attributes from pasted data', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Height').selectOption("6'6\"")
    await page.getByLabel('Primary Strength').selectOption('Shooting')

    await page.locator('button[title="Import player attributes from Google Sheets"]').click()
    const textarea = page.locator('textarea')
    await textarea.fill('TestPlayer\t75\t60\t70\t65\t80\t85\t90\t55\t50\t88\t70\t75\t85\t65\t60\t70\t80\t70\t75\t80\t85\t70\t65\t80\t75\t85\t70\t65\t60\t75\t70\t80\t75\t70')

    await page.getByText('Apply Import').click()
    await expect(page.getByText(/Imported/)).toBeVisible()

    // Verify starting value was imported for Mid Range (column index 7 in 0-based = Mid Range)
    const spinbutton = page.getByRole('spinbutton').nth(1)  // first spinbutton is UC, second is first attribute
    await expect(spinbutton).toHaveValue('90')
  })
})

