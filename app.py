from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
from crossword_logic import Crossword
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate('firebase_credentials.json')  # Path to your Firebase JSON file
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

app = Flask(__name__)
CORS(app)

# Global variable to store crossword data (for testing purposes)
crossword_data = []

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
        global crossword_data
        crossword_data = json.load(file)  # Store the data in the global variable
        # print("Received JSON content:", crossword_data)
        return jsonify({"message": "JSON file processed successfully!"}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to process file"}), 500

@app.route('/get_crossword_data', methods=['GET'])
def get_crossword_data():
    global crossword_data

    # Check if crossword data is available
    if not crossword_data:
        return jsonify({"error": "No crossword data available"}), 400

    word_list = crossword_data

    # Perform crossword generation here using the uploaded data
    cw_length = len(word_list)
    qn_no = random.randrange(cw_length)
    size = 12
    a = Crossword(size, size, '-', 5000, word_list[qn_no])
    a.compute_crossword(2)
    word_list = a.word_bank()
    solution = a.solution()
    grid = a.display()
    clue = a.legend()

    # Debugging: Print out grid and solution before attempting to store them
    # print("Grid before flattening:", grid)
    # print("Solution before flattening:", solution)

    # Function to completely flatten nested lists/arrays
    def completely_flatten(arr):
        flattened = []
        for item in arr:
            if isinstance(item, list):
                flattened.extend(completely_flatten(item))  # Recursively flatten nested lists
            else:
                flattened.append(item)
        return flattened

    # Completely flatten the grid and solution
    grid_flat = completely_flatten(grid)
    solution_flat = completely_flatten(solution)

    # Debugging: Print flattened grid and solution
    # print("Completely Flattened Grid:", grid_flat)
    # print("Completely Flattened Solution:", solution_flat)

    # Prepare data to store
    crossword_data = {
        'grid': grid_flat,        # Completely flattened grid
        'solution': solution_flat,  # Completely flattened solution
        'clues': clue              # Clues can be stored directly
    }

    # print("Generated Crossword Data (grid, solution, clues only):", crossword_data)

    try:
        # Store completely flattened data in Firestore under the collection 'cross'
        db.collection('cross').add({
            'grid': crossword_data['grid'],        # Flattened grid
            'solution': crossword_data['solution'],  # Flattened solution
            'clues': crossword_data['clues']       # Clues stored directly
        })
        print("Crossword data successfully stored in Firestore.")
    except Exception as e:
        print(f"Error storing data in Firestore: {e}")
        return jsonify({"error": "Failed to store data in Firestore"}), 500

    # Return the crossword data as JSON response
    return jsonify(crossword_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
