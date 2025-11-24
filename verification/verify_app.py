
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 375, 'height': 667}) # Simulate mobile

        # Navigate to app
        page.goto("http://localhost:5173")

        # Check header
        expect(page.get_by_text("Mądra Sowa")).to_be_visible()

        # Click on "Małe Litery" (Exact match)
        page.get_by_role("button", name="Małe Litery", exact=True).click()

        # Check if flashcard appears
        expect(page.locator(".flashcard")).to_be_visible()

        # Take screenshot of Learn Mode
        page.screenshot(path="verification/learn_mode.png")

        # Go back home
        page.get_by_role("button", name="🏠").click()

        # Click on Sticker Book
        page.get_by_role("button", name="⭐").click()
        expect(page.get_by_text("Twoje Naklejki")).to_be_visible()

        # Take screenshot of Stickers
        page.screenshot(path="verification/stickers.png")

        browser.close()

if __name__ == "__main__":
    run()
