from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


BASE_URL = "http://localhost:5173"

EMAIL = "deepesh@exampl.com"
PASSWORD = "deepesh"



#  LOGIN HELPER


def login(driver):

    driver.get(f"{BASE_URL}/login")

    wait = WebDriverWait(driver, 10)

    # Email
    email_input = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[type='email']")
        )
    )

    # Password
    password_input = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[type='password']")
        )
    )

    email_input.clear()
    email_input.send_keys(EMAIL)

    password_input.clear()
    password_input.send_keys(PASSWORD)

    # Login
    login_button = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "button[type='submit']")
        )
    )

    login_button.click()

    # Wait for token
    wait.until(
        lambda d: d.execute_script(
            "return localStorage.getItem('token')"
        ) is not None
    )

    print("Login successful")


# ADD PRODUCT TO CART HELPER

def add_product_to_cart(driver):

    wait = WebDriverWait(driver, 10)

    # Open Products
    driver.get(f"{BASE_URL}/products")

    # Wait for product card
    product_card = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".product-card")
        )
    )

    # Open first product
    product_card.click()

    # Wait for product details page
    wait.until(
        EC.url_contains("/products/")
    )

    # Add to cart
    add_to_cart_button = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".add-cart-btn")
        )
    )

    add_to_cart_button.click()

    print("Product added to cart")

    # Open Cart
    driver.get(f"{BASE_URL}/cart")

    wait.until(
        EC.url_contains("/cart")
    )

    # Verify cart item
    wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, ".cart-item")
        )
    )

    print("Cart item verified")


# TEST - RAZORPAY CHECKOUT


def test_razorpay_checkout():

    driver = webdriver.Chrome()

    try:

      
        # STEP 1: Login
       

        login(driver)

        # STEP 2: Add product to cart
     

        add_product_to_cart(driver)

        wait = WebDriverWait(driver, 15)

        
        # STEP 3: Click Checkout
       

        checkout_button = wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, ".checkout-btn")
            )
        )

        checkout_button.click()

        print("Checkout button clicked")

       
        # STEP 4: Verify Checkout page
        

        wait.until(
            EC.url_contains("/checkout")
        )

        assert "/checkout" in driver.current_url

        print("Checkout page opened")

      
        # STEP 5: Find Payment button
   

        pay_button = wait.until(
            EC.element_to_be_clickable(
                (
                    By.XPATH,
                    "//button[contains(normalize-space(), 'Pay ₹')]"
                )
            )
        )

        assert pay_button.is_displayed()
        assert pay_button.is_enabled()

        print("Payment button found")

   
        # STEP 6: Click Pay
      
        pay_button.click()

        print("Razorpay payment button clicked")

        # Give Razorpay time to open
        time.sleep(5)

    finally:

        driver.quit()