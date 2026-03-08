
from selenium import webdriver
driver = webdriver.Chrome()
driver.get("https://libcal.library.ubc.ca/spaces")
title = driver.title
print(title)