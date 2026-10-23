
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


BASE_URL = "http://localhost:5173"


def test_logout():
    driver = webdriver.Chrome()
    wait = WebDriverWait(driver, 10)

    try:
      
        # STEP 1: Open login page
   
        driver.get(f"{BASE_URL}/login")
        time.sleep(5)

       
        # STEP 2: Login
      
        email = "seleniumtest999@gmail.com"
        password = "Test@123"

        wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, 'input[type="email"]')
            )
        ).send_keys(email)

        driver.find_element(
            By.CSS_SELECTOR, 'input[type="password"]'
        ).send_keys(password)

        driver.find_element(
            By.CSS_SELECTOR, 'button[type="submit"]'
        ).click()

       
        # STEP 3: Wait until login completes
     
        wait.until(
            lambda d: d.execute_script(
                "return localStorage.getItem('token')"
            ) is not None
        )

      
        # STEP 4: Open a page containing Navbar
       
        driver.get(f"{BASE_URL}/products")

       
        # STEP 5: Verify Sign Out is visible
        
        sign_out_button = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//button[.//span[normalize-space()='Sign Out']]"
                )
            )
        )

        assert sign_out_button.is_displayed()
        time.sleep(5)
       
        # STEP 6: Click Sign Out
       
        sign_out_button.click()

     
        # STEP 7: Verify redirect to home page
       
        wait.until(
            lambda d: d.current_url.rstrip("/") == BASE_URL
        )

        assert driver.current_url.rstrip("/") == BASE_URL

      
        # STEP 8: Verify token is removed
      
        token = driver.execute_script(
            "return localStorage.getItem('token')"
        )

        assert token is None

        
        # STEP 9: Verify Sign In is visible
        
        sign_in_button = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//button[.//span[normalize-space()='Sign In']]"
                )
            )
        )

        assert sign_in_button.is_displayed()
        time.sleep(5)

          
       
        # STEP 10: Verify Create Account is visible
      
        create_account_button = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//button[.//span[normalize-space()='Create Account']]"
                )
            )
        )

        assert create_account_button.is_displayed()

        print("Logout test passed successfully!")

    finally:
        driver.quit()

