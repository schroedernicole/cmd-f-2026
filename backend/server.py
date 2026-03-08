from flask import Flask, jsonify, request
from backend.selenium import searchForClasses


app = Flask(__name__)
site_urls = [
    "https://libcal.library.ubc.ca/reserve/woodward_group_study",
]

@app.route("/study_rooms", methods=['GET']) # type: ignore
def handle_data():
    date, start_time, end_time = request.get_json()
    result = []
    for s in site_urls:
        searchForClasses(s, date, start_time, end_time)
    