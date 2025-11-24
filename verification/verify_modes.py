from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_new_modes(page: Page):
    # Navigate to app
    page.goto("http://localhost:5173")

    # Wait for content to load
    page.wait_for_timeout(1000)

    # Check for new buttons in the menu
    expect(page.get_by_text("Mówię!")).to_be_visible()
    expect(page.get_by_text("Logopedia")).to_be_visible()
    expect(page.get_by_text("Puzzle")).to_be_visible()

    # Take screenshot of menu
    page.screenshot(path="verification/menu_with_new_modes.png")

    # Test "Logopedia" navigation
    page.get_by_text("Logopedia").click()
    expect(page.get_by_text("Ćwiczenia Logopedyczne")).to_be_visible()
    page.screenshot(path="verification/logotherapy_mode.png")

    # Go back
    page.get_by_role("button", name="🏠").click()

    # Test "Puzzle" navigation
    page.get_by_text("Puzzle").click()
    expect(page.get_by_text("Magiczne Puzzle")).to_be_visible()
    page.screenshot(path="verification/puzzle_mode.png")

    # Go back
    page.get_by_role("button", name="🏠").click()

    # Test "Mówię!" navigation
    page.get_by_text("Mówię!").click()
    expect(page.get_by_text("Powtarzanie Słów")).to_be_visible()
    page.screenshot(path="verification/voice_mode.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_new_modes(page)
        finally:
            browser.close()
