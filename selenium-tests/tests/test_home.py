from selenium import webdriver


def test_home_page():
    driver = webdriver.Chrome()

    driver.get("http://localhost:5173")

    assert "Nexora" in driver.title

    driver.quit()