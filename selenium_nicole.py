
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

def searchWoodward():
    driver = webdriver.Chrome()
    driver.get("https://libcal.library.ubc.ca/reserve/woodward_group_study")

    driver.find_element(By.ID, "s-lc-date").send_keys("03-20-2026")
    driver.find_element(By.ID, "s-lc-time-start").send_keys("12:00")


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

    try:
        driver.find_element(By.CLASS_NAME, "s-lc-eq-no-results")
        print ("No classrooms avaliable :(")
    except:
        print("classrooms availiable!")
        avail_rooms = driver.find_elements(By.CLASS_NAME, "s-lc-booking-suggestion")
        room_objects = []
        for room in avail_rooms:
            print(room)
        # print(room_objects)
        
    time.sleep(30)
        

searchWoodward()