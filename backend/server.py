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

    if not data:
        return jsonify({"message": "No JSON body received"}), 400

    date = data.get("date")
    first_four = date[:4]
    date = date + "-" + first_four
    date = date[5:]

    start_time = data.get("start_time")

    if not date or not start_time:
        return jsonify({"message": "Missing date or start_time"}), 400

    result = []

    print("Date:", date)
    print("Start Time:", start_time)

    for s in site_urls:
        rooms = searchForClasses(s, date, start_time, "00:00")
        # rooms = searchForClasses("https://libcal.library.ubc.ca/reserve/woodward_group_study", "03-20-2026", "12:00", "13:00")
        result.extend(rooms)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)