
from playwright.sync_api import sync_playwright

def verify_start_screen():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Note: The server seems to redirect to /zauberspielv2/
            page.goto("http://localhost:5173/zauberspielv2/")

            # Check for new buttons - text might be slightly different or need partial match
            # "Start NACHTZUG 19 (New)"
            page.wait_for_selector("text=Start NACHTZUG 19")

            # Take screenshot of start screen
            page.screenshot(path="verification/start_screen.png")

            # Click Nachtzug 19
            page.click("text=Start NACHTZUG 19")

            # Wait for content load
            page.wait_for_selector("text=Leerer Bahnsteig")

            # Toggle debug overlay
            page.keyboard.press("Control+d")
            page.wait_for_timeout(500)

            # Take screenshot of game with debug overlay
            page.screenshot(path="verification/game_debug.png")

            print("Verification successful")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_start_screen()
