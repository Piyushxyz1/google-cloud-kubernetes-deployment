from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


BASE_URL = "http://localhost:5173"

EMAIL = "seleniumtest999@gmail.com"
PASSWORD = "Test@123"



# LOGIN HELPER


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

    # Login form submit button
    login_button = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "button[type='submit']")
        )
    )

    time.sleep(2)

    login_button.click()

    # Wait until login page is left
    wait.until(
        lambda d: "/login" not in d.current_url
    )

    time.sleep(2)


# ADD PRODUCT TO CART HELPER


def add_product_to_cart(driver):

    wait = WebDriverWait(driver, 10)

    # Open products
    driver.get(f"{BASE_URL}/products")

    # Wait for product cards
    product_card = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".product-card")
        )
    )

    time.sleep(1)

    # Open first product
    product_card.click()

    # Wait for product details URL
    wait.until(
        EC.url_contains("/products/")
    )

    time.sleep(1)

    # Add to cart
    add_to_cart_button = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".add-cart-btn")
        )
    )

    add_to_cart_button.click()

    time.sleep(2)

    # Open cart
    driver.get(f"{BASE_URL}/cart")

    wait.until(
        EC.url_contains("/cart")
    )

    # Verify cart item exists
    wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, ".cart-item")
        )
    )



# TEST 1 - ADD TO CART

def test_add_to_cart():
    driver = webdriver.Chrome()
    try:

        # Login
        login(driver)

        # Add product
        add_product_to_cart(driver)

        # Verify cart item
        cart_item = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, ".cart-item")
            )
        )

        assert cart_item.is_displayed()

        print("Add to Cart Test Passed")

        time.sleep(3)

    finally:
        driver.quit()



# TEST 2 - CART QUANTITY


def test_cart_quantity():

    driver = webdriver.Chrome()

    try:

        # Login
        login(driver)

        # Add product to cart
        add_product_to_cart(driver)

        wait = WebDriverWait(driver, 10)

        # Find cart item
        cart_item = wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, ".cart-item")
            )
        )

        # Get quantity
        quantity_element = cart_item.find_element(
            By.CSS_SELECTOR,
            ".quantity-control span"
        )

        initial_quantity = int(quantity_element.text)

        print("Initial Quantity:", initial_quantity)

        # INCREASE
    
        increase_button = cart_item.find_element(
            By.CSS_SELECTOR,
            "button[aria-label^='Increase quantity']"
        )

        increase_button.click()

        wait.until(
            lambda d: int(
                cart_item.find_element(
                    By.CSS_SELECTOR,
                    ".quantity-control span"
                ).text
            ) == initial_quantity + 1
        )

        increased_quantity = int(
            cart_item.find_element(
                By.CSS_SELECTOR,
                ".quantity-control span"
            ).text
        )

        assert increased_quantity == initial_quantity + 1

        print("Increase Quantity Passed")

        time.sleep(2)

        # DECREASE
   
        decrease_button = cart_item.find_element(
            By.CSS_SELECTOR,
            "button[aria-label^='Decrease quantity']"
        )

        decrease_button.click()

        wait.until(
            lambda d: int(
                cart_item.find_element(
                    By.CSS_SELECTOR,
                    ".quantity-control span"
                ).text
            ) == initial_quantity
        )

        final_quantity = int(
            cart_item.find_element(
                By.CSS_SELECTOR,
                ".quantity-control span"
            ).text
        )

        assert final_quantity == initial_quantity

        print("Decrease Quantity Passed")

        time.sleep(3)

    finally:
        driver.quit()



# TEST 3 - REMOVE CART ITEM


def test_remove_cart_item():

    driver = webdriver.Chrome()

    try:

        # Login
        login(driver)

        # Add product
        add_product_to_cart(driver)

        wait = WebDriverWait(driver, 10)

        # Find cart item
        cart_item = wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, ".cart-item")
            )
        )

        # Remove button
        remove_button = cart_item.find_element(
            By.CSS_SELECTOR,
            ".remove-item-btn"
        )

        time.sleep(2)

        remove_button.click()

        # Wait for empty cart
        wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, ".empty-cart")
            )
        )

        # Verify cart item no longer exists
        cart_items = driver.find_elements(
            By.CSS_SELECTOR,
            ".cart-item"
        )

        assert len(cart_items) == 0

        print("Remove Cart Item Test Passed")

        time.sleep(3)

    finally:
        driver.quit()



# TEST 4 - CHECKOUT NAVIGATION


def test_checkout_navigation():

    driver = webdriver.Chrome()

    try:

        # Login
        login(driver)

        # Add product
        add_product_to_cart(driver)

        wait = WebDriverWait(driver, 10)

        # Checkout button
        checkout_button = wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, ".checkout-btn")
            )
        )

        time.sleep(2)

        checkout_button.click()

        # Wait for checkout URL
        wait.until(
            EC.url_contains("/checkout")
        )

        # Verify URL
        assert "/checkout" in driver.current_url

        print("Checkout Navigation Test Passed")

        time.sleep(3)

    finally:
        driver.quit()