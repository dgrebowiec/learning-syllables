
from playwright.sync_api import sync_playwright

def verify_speaking_mode():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to app
            page.goto("http://localhost:5173")

            # Wait for main content
            page.wait_for_selector(".header")

            # Click on 'Mów: Małe Litery'
            # Note: I'll use text selector as the button text is unique
            page.click("text=Mów: Małe Litery")

            # Verify we are in the Speaking component
            # It should show "Mówienie: Małe Litery" title
            page.wait_for_selector("text=Mówienie: Małe Litery")

            # Check for the card display (big letter)
            page.wait_for_selector(".card-display")

            # Check for controls
            page.wait_for_selector(".controls")

            # Take screenshot of the Speaking Mode
            page.screenshot(path="verification/speaking_mode.png")
            print("Screenshot taken: verification/speaking_mode.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_speaking_mode()
