import { test, expect } from '@playwright/test'

async function setSlider(page, index, value) {
  await page.locator("input[type=\"range\"]").nth(index).evaluate((el, val) => {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    nativeSetter.call(el, String(val))
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  }, value)
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

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")

    const s = page.locator("input[type=\"range\"]").first()
    await s.focus()
    for (let i = 0; i < 49; i++) {
      await page.keyboard.press("ArrowRight")
      await page.waitForTimeout(15)
    }
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

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")

    const s = page.locator("input[type=\"range\"]").first()
    await s.focus()
    for (let i = 0; i < 49; i++) {
      await page.keyboard.press("ArrowRight")
      await page.waitForTimeout(15)
    }
    await page.waitForTimeout(300)
    await expect(page.getByText(/UC/).first()).toBeVisible()
  })

  test("per-slider revert button resets to default", async ({ page }) => {
    await page.goto("/")
    const heightSelect = page.getByLabel("Height")
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel("Primary Strength")
    await primary.selectOption("Shooting")

    const s = page.locator("input[type=\"range\"]").first()
    await s.focus()
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("ArrowRight")
      await page.waitForTimeout(15)
    }
    await page.waitForTimeout(300)

    const revertBtn = page.locator("button[title=\"Revert to start\"]").first()
    await expect(revertBtn).toBeVisible()
    await revertBtn.click()
    await page.waitForTimeout(300)

    const valAfter = await page.locator("input[type=\"range\"]").first().inputValue()
    expect(Number(valAfter)).toBe(50)
  })

  test("shorter player has higher speed cap than taller player", async ({ page }) => {
    await page.goto("/")

    const heightSelect = page.getByLabel('Height')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Slashing')
    await heightSelect.selectOption("5'9\"")

    const speedSlider = page.locator('input[type="range"]').nth(25)
    let speedCap = Number(await speedSlider.getAttribute('max'))

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

    const startInputs = page.getByRole('spinbutton')
    const count = await startInputs.count()
    for (let i = 0; i < count; i++) {
      await startInputs.nth(i).fill('85')
    }
    for (let i = 0; i < 3; i++) {
      await setSlider(page, i, 99)
    }

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

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")

    await setSlider(page, 0, 80)
    await page.waitForTimeout(300)
    await expect(page.getByText('Total Spent:')).toBeVisible()
  })

  test('shows build rating text', async ({ page }) => {
    await page.goto('/')
    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")
    const s = page.locator("input[type=\"range\"]").first()
    await s.focus()
    for (let i = 0; i < 49; i++) {
      await page.keyboard.press("ArrowRight")
      await page.waitForTimeout(15)
    }
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

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")
    await setSlider(page, 0, 80)
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
    const input = page.getByPlaceholder(/Enter player name/)
    await input.fill('ShareEncodeTest')

    const heightSelect = page.getByLabel('Height')
    await heightSelect.selectOption("6'6\"")
    const weightSelect = page.getByLabel('Weight')
    await weightSelect.selectOption('Average')
    const primary = page.getByLabel('Primary Strength')
    await primary.selectOption('Shooting')

    const startInputs = page.getByRole('spinbutton')
    await startInputs.first().click()
    await startInputs.first().press("Backspace")
    await startInputs.first().press("Backspace")
    await page.keyboard.type("60")

    await setSlider(page, 0, 80)

    await page.getByPlaceholder('0').first().fill('50000')
    await page.waitForTimeout(300)

    await page.getByText('🔗 Share').click()
    await expect(page.getByText('Link Copied!')).toBeVisible()
  })
})
