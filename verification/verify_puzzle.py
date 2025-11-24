from playwright.sync_api import sync_playwright

def verify_puzzle_game():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto('http://localhost:5173')

        # Wait for "Quizy i zadania" to be visible
        page.wait_for_selector('text="Quizy i Zadania"', state="visible")

        # Click on "Quizy i zadania"
        page.get_by_text("Quizy i Zadania").click()

        # Wait for "Puzzle" to be visible
        page.wait_for_selector('text="Puzzle"', state="visible")

        # Click on "Puzzle"
        page.get_by_text("Puzzle").click()

        # Wait for puzzle to load (check for grid)
        page.wait_for_selector(".game-container")

        # Take screenshot of the puzzle board
        page.screenshot(path="verification/puzzle_start.png")

        print("Screenshot taken: verification/puzzle_start.png")
        browser.close()

if __name__ == "__main__":
    verify_puzzle_game()
