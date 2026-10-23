from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


BASE_URL = "http://localhost:5173"


def test_signup_new_user():
    driver = webdriver.Chrome()

    try:
        driver.get(f"{BASE_URL}/signup")

        # Generate a unique email for every test run
        email = f"selenium{int(time.time())}@gmail.com"

        # Fill Name
        driver.find_element(
            By.NAME, "name"
        ).send_keys("Selenium Test")

        # Fill Email
        driver.find_element(
            By.NAME, "email"
        ).send_keys(email)

        # Fill Password
        driver.find_element(
            By.NAME, "password"
        ).send_keys("Test@123")

        # Fill Confirm Password
        driver.find_element(
            By.NAME, "confirmPassword"
        ).send_keys("Test@123")

        # Accept Terms
        driver.find_element(
            By.CSS_SELECTOR,
            ".terms-check input[type='checkbox']"
        ).click()

        # Click Create Account
        driver.find_element(
            By.CSS_SELECTOR,
            "button[type='submit']"
        ).click()

        # Wait until React navigates to login
        WebDriverWait(driver, 10).until(
            EC.url_contains("/login")
        )

        # Verify successful navigation
        assert "/login" in driver.current_url

    finally:
        driver.quit()


def test_signup_existing_user():
    driver = webdriver.Chrome()

    try:
        driver.get(f"{BASE_URL}/signup")

        # This email must already exist in your database
        existing_email = "seleniumtest999@gmail.com"

        # Fill Name
        driver.find_element(
            By.NAME, "name"
        ).send_keys("Existing User")

        # Fill existing Email
        driver.find_element(
            By.NAME, "email"
        ).send_keys(existing_email)

        # Fill Password
        driver.find_element(
            By.NAME, "password"
        ).send_keys("Test@123")

        # Fill Confirm Password
        driver.find_element(
            By.NAME, "confirmPassword"
        ).send_keys("Test@123")

        # Accept Terms
        driver.find_element(
            By.CSS_SELECTOR,
            ".terms-check input[type='checkbox']"
        ).click()

        # Click Create Account
        driver.find_element(
            By.CSS_SELECTOR,
            "button[type='submit']"
        ).click()

        # Wait for error toast
        toast = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    ".Toastify__toast--error"
                )
            )
        )

        # Get toast message
        toast_text = toast.text

        print("Error Toast:", toast_text)

        # Verify error message
        assert toast_text != ""

        # Verify user did NOT navigate to login
        assert "/signup" in driver.current_url

    finally:
        driver.quit()