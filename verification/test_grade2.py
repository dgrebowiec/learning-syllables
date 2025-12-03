from playwright.sync_api import sync_playwright
import os

def run(playwright):
    print("Launching browser...")
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating...")
    page.goto("http://localhost:5173/learning-syllables/")
    page.wait_for_load_state("networkidle")

    print("Taking menu screenshot...")
    page.screenshot(path="verification/menu.png")

    print("Clicking Klasa 2...")
    try:
        page.wait_for_selector("text=Klasa 2", timeout=2000)
        page.click("text=Klasa 2")
        page.screenshot(path="verification/menu_grade2.png")
    except Exception as e:
        print(f"Failed to find Klasa 2: {e}")
        page.screenshot(path="verification/error_menu.png")
        return

    print("Clicking Budowanie Zdań...")
    page.click("text=Budowanie Zdań")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/sentence_builder.png")

    print("Interacting...")
    page.click(".word-chip >> nth=0")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/sentence_builder_interaction.png")

    page.click(".icon-btn")
    page.wait_for_timeout(500)

    print("Clicking Uzupełnianki...")
    page.click("text=Uzupełnianki")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/fill_blanks.png")

    browser.close()
    print("Done.")

with sync_playwright() as playwright:
    run(playwright)
