
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


BASE_URL = "http://localhost:5173"


def test_navbar_links():

    driver = webdriver.Chrome()
    wait = WebDriverWait(driver, 10)

    try:

    
        # OPEN WEBSITE
     

        driver.get(BASE_URL)

        time.sleep(2)

      
        # PRODUCTS LINK
      

        products_link = wait.until(
            EC.element_to_be_clickable(
                (By.LINK_TEXT, "Products")
            )
        )

        time.sleep(2)

        products_link.click()

        wait.until(
            lambda driver: driver.current_url.rstrip("/")
            == f"{BASE_URL}/products"
        )

        assert driver.current_url.rstrip("/") == f"{BASE_URL}/products"

        print("Products link test passed")

        time.sleep(2)

        # ACCESSORIES LINK
     

        accessories_link = wait.until(
            EC.element_to_be_clickable(
                (By.LINK_TEXT, "Accessories")
            )
        )

        time.sleep(2)

        accessories_link.click()

        wait.until(
            lambda driver: driver.current_url.rstrip("/")
            == f"{BASE_URL}/accessories"
        )

        assert driver.current_url.rstrip("/") == f"{BASE_URL}/accessories"

        print("Accessories link test passed")

        time.sleep(2)

      
        # OFFERS LINK
        

        offers_link = wait.until(
            EC.element_to_be_clickable(
                (By.LINK_TEXT, "Offers")
            )
        )

        time.sleep(2)

        offers_link.click()

        wait.until(
            lambda driver: driver.current_url.rstrip("/")
            == f"{BASE_URL}/offers"
        )

        assert driver.current_url.rstrip("/") == f"{BASE_URL}/offers"

        print("Offers link test passed")

        time.sleep(3)

        print("All Navbar link tests passed successfully!")

    finally:
        driver.quit()

