from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/upload-json', methods=['POST'])
def upload_json():
    print("Request files:", request.files)
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    print("Uploaded file:", file.filename)
    try:
        data = json.load(file)
        print("Received JSON content:", data)
        return jsonify({"message": "JSON file processed successfully!"}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to process file"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
