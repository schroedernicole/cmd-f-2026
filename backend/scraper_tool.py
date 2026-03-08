
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException


def searchForClasses(url, date_input, start_time, end_time, library_name):
    driver = webdriver.Chrome() # type: ignore
    driver.get(url)

    driver.find_element(By.CSS_SELECTOR, "input[type='date']").send_keys(date_input)

    time_entry = driver.find_elements(By.CSS_SELECTOR, "input[type='time']")
    
    for t in time_entry:
        if "start" in t.get_attribute("id"):
            t.send_keys(start_time)
            break
    
    # for t in time_entry:
    #     if "end" in t.get_attribute("id"):
    #         t.send_keys(end_time)
    #         break

    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "s-lc-go"))
    )

    banner_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "s-ui-cc-close-btn"))
    )

    banner_button.click()

    ActionChains(driver).move_to_element(submit_button).perform()
    submit_button.click()

    time.sleep(2)

    room_objs = []

    try:
        driver.find_element(By.CLASS_NAME, "s-lc-eq-no-results")
        print("No rooms available")

    except NoSuchElementException:

        avail_rooms = driver.find_elements(By.CLASS_NAME, "s-lc-suggestion-heading")

        for room in avail_rooms:
            text = room.find_element(By.TAG_NAME, "a")

            room_obj = {
                "room_num": library_name + " " + text.text,
                "booking_link": text.get_attribute("href")
            }

            room_objs.append(room_obj)

    driver.quit()

    return room_objs
        
        

# searchForClasses("https://libcal.library.ubc.ca/reserve/woodward_group_study", "03-20-2026", "12:00", "13:00")