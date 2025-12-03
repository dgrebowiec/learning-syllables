from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to app
    page.goto("http://localhost:5173/learning-syllables/")
    page.wait_for_load_state("networkidle")

    # --- TEST FILL IN BLANKS COMPLETION ---
    print("Navigating to Fill in Blanks...")
    # UPDATED: Button is now called "Szkoła"
    page.click("text=Szkoła")
    page.click("text=Uzupełnianki")
    page.wait_for_selector(".question-card")

    print("Attempting to solve all questions...")

    max_attempts = 15 # increased limit
    for i in range(max_attempts):
        if page.locator("text=Gratulacje!").is_visible():
            print("Completion screen reached!")
            page.screenshot(path="verification/completion_fill_blanks.png")
            # Verify badge message
            if page.locator("text=Zdobyto odznakę: Mistrz Ortografii!").is_visible():
                print("Badge message verified!")
            else:
                print("Badge message NOT found.")
            break

        # Find options
        options = page.locator(".option-btn")
        count = options.count()

        found_correct = False
        for j in range(count):
            # Click option
            options.nth(j).click()
            # Click Check
            check_btn = page.locator(".check-btn")
            if check_btn.is_enabled():
                check_btn.click()

            # Check for feedback
            page.wait_for_timeout(200) # wait for react update
            if page.locator(".feedback.correct").is_visible():
                print(f"Question {i+1} solved.")
                found_correct = True
                # Wait for transition (1500ms in code)
                page.wait_for_timeout(1600)
                break
            else:
                # Wrong answer, try next
                continue

        if not found_correct:
             if page.locator("text=Gratulacje!").is_visible():
                 print("Completion screen reached!")
                 page.screenshot(path="verification/completion_fill_blanks.png")
                 break
             else:
                 print("Failed to solve question or find completion screen.")
                 page.screenshot(path="verification/failed_solve.png")
                 break

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
