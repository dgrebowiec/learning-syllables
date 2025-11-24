from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000")

        # Wait for menu to load
        page.wait_for_selector(".menu-grid")

        # Screenshot the main menu to see the new buttons
        page.screenshot(path="verification/menu.png")
        print("Menu screenshot taken")

        # Click on "Quiz: Sylaby" to verify it works
        page.click("text=Quiz: Sylaby")
        page.wait_for_selector(".quiz-container")
        page.screenshot(path="verification/quiz-syl.png")
        print("Quiz Sylaby screenshot taken")

        # Go back to menu
        page.click("text=🏠")

        # Click on "Połącz: Sylaby" to verify matching game
        page.click("text=Połącz: Sylaby")
        page.wait_for_selector(".match-game-container")
        page.screenshot(path="verification/match-syl.png")
        print("Match Sylaby screenshot taken")

        browser.close()

if __name__ == "__main__":
    verify_app()
