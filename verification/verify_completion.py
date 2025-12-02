from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to app
    page.goto("http://localhost:5173/learning-syllables/")
    page.wait_for_load_state("networkidle")

    # --- TEST FILL IN BLANKS COMPLETION ---
    print("Navigating to Fill in Blanks...")
    page.click("text=Klasa 2")
    page.click("text=Uzupełnianki")
    page.wait_for_selector(".question-card")

    # We need to answer all questions to reach completion
    # Currently data has 6 items.
    # To speed up, we can't easily skip, so we must answer correctly.
    # But wait, we don't know the order or the correct answer easily without logic.
    # However, the code logic: if (selectedOption === currentItem.answer)
    # The 'answer' is not in the DOM.
    # But we can try all options until "Correct" feedback appears?

    print("Attempting to solve all questions...")

    # Loop until we see "Gratulacje" or timeout
    max_attempts = 10 # 6 questions
    for i in range(max_attempts):
        if page.locator("text=Gratulacje!").is_visible():
            print("Completion screen reached!")
            page.screenshot(path="verification/completion_fill_blanks.png")
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
             # This might happen if we already finished or logic failed
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
