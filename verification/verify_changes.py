from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:5173/learning-syllables/")

        # Take a screenshot of the new main menu
        page.screenshot(path="verification/main_menu.png")
        print("Main menu screenshot taken")

        # Click on "Nauka i Ćwiczenia"
        page.get_by_text("Nauka i Ćwiczenia").click()
        page.screenshot(path="verification/learn_menu.png")
        print("Learn menu screenshot taken")

        # Go back
        page.get_by_text("Wróć").click()

        # Click on "Quizy i Zadania"
        page.get_by_text("Quizy i Zadania").click()
        page.screenshot(path="verification/quiz_menu.png")
        print("Quiz menu screenshot taken")

        # Go to Stickers and check for Badges section
        page.get_by_text("Wróć").click()
        page.get_by_text("Naklejki i Nagrody").click()
        page.screenshot(path="verification/stickers_badges.png")
        print("Stickers and badges screenshot taken")

        # Go to Learn -> Syllables and check for toggle
        page.goto("http://localhost:5173/learning-syllables/")
        page.get_by_text("Nauka i Ćwiczenia").click()
        page.get_by_text("Sylaby").click()
        page.screenshot(path="verification/syllables_toggle.png")
        print("Syllables toggle screenshot taken")

        # Click toggle
        page.get_by_text("Zmień na duże").click()
        page.screenshot(path="verification/syllables_toggled.png")
        print("Syllables toggled screenshot taken")

        browser.close()

if __name__ == "__main__":
    verify_changes()
