from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper_tool import searchForClasses

app = Flask(__name__)
CORS(app)

site_urls = [
    "https://libcal.library.ubc.ca/reserve/woodward_group_study",
]

@app.route("/study_rooms", methods=["POST"])
def handle_data():
    data = request.get_json()

    date = data["date"]
    start_time = data["start_time"]
    end_time = data["end_time"]

    result = []

    for s in site_urls:
        rooms = searchForClasses(s, date, start_time, end_time)
        result.extend(rooms)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)