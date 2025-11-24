from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        print("Navigating to app...")
        page.goto("http://localhost:3000")
        page.wait_for_selector(".menu-grid")

        # Helper to scroll main content
        def scroll_down():
            page.evaluate("document.querySelector('.main-content').scrollTop = document.querySelector('.main-content').scrollHeight")

        # 1. Verify Quiz: Sylaby
        try:
            scroll_down()
            print("Clicking Quiz: Sylaby...")
            # Use a more specific selector if needed, or ensure text match is robust
            # Using partial text match or exact text match
            quiz_btn = page.get_by_text("Quiz: Sylaby")
            if quiz_btn.is_visible():
                quiz_btn.click()
            else:
                print("Button Quiz: Sylaby not visible initially, trying to scroll...")
                scroll_down()
                quiz_btn.click()

            page.wait_for_selector(".quiz-container", timeout=5000)
            print("Quiz container found.")
            page.screenshot(path="verification/quiz-syl.png")

            # Go back
            page.click("text=🏠")
            page.wait_for_selector(".menu-grid")
        except Exception as e:
            print(f"Failed to verify Quiz Sylaby: {e}")
            page.screenshot(path="verification/error-quiz.png")

        # 2. Verify Połącz: Sylaby (New Feature)
        try:
            print("Verifying Połącz: Sylaby...")
            scroll_down()

            # The button might be further down
            match_btn = page.get_by_text("Połącz: Sylaby")

            # Ensure it's in view
            match_btn.scroll_into_view_if_needed()
            match_btn.click()

            page.wait_for_selector(".match-game-container", timeout=5000)
            print("Match game container found.")
            page.screenshot(path="verification/match-syl.png")

            # Interact with the game
            # Find a sound button
            sound_btns = page.locator(".sound-btn")
            if sound_btns.count() > 0:
                print("Clicking first sound button...")
                sound_btns.first.click()
                page.wait_for_timeout(500) # Wait for state update
                page.screenshot(path="verification/match-syl-selected.png")

                # Check if it has 'selected' class
                classes = sound_btns.first.get_attribute("class")
                print(f"Button classes: {classes}")
                if "selected" in classes:
                    print("Selection verified.")
                else:
                    print("Selection FAILED.")
            else:
                print("No sound buttons found!")

        except Exception as e:
            print(f"Failed to verify Match Game: {e}")
            page.screenshot(path="verification/error-match.png")

        browser.close()

if __name__ == "__main__":
    verify_app()
