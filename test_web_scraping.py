import requests

url = "https://libcal.library.ubc.ca/reserve/woodward_group_study"

response = requests.get(url)

print(response.status_code)   
print(response.text)         