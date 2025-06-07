from flask import Flask, request, jsonify, send_from_directory, render_template ,redirect,url_for
from flask_cors import CORS  # Import CORS
from skincomplexity import classify_skin_tone, suggest_foundation  # Import the necessary functions

app = Flask(__name__, static_folder='frontend', template_folder='frontend')
app.secret_key = 'your_secret_key' # Required for session management
# Enable CORS for all routes
CORS(app)

@app.route('/')
def index():
    return render_template('Frontpage.html')

@app.route('/UserInteraction')
def user_interaction():
    return render_template('UserInteraction.html')



@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Function to calculate the average RGB values
def calculate_average_rgb(rgb_list, total_count):
    # Initialize sum variables for each color channel
    total_r = total_g = total_b = 0
    
    # Iterate through the RGB list to accumulate the values
    for rgb in rgb_list:
        total_r += rgb[0]  # Red value
        total_g += rgb[1]  # Green value
        total_b += rgb[2]  # Blue value
    
    # Calculate the average for each channel and round the result
    avg_r = round(total_r / total_count) if total_count > 0 else 0
    avg_g = round(total_g / total_count) if total_count > 0 else 0
    avg_b = round(total_b / total_count) if total_count > 0 else 0
    
    # Return the average RGB values as a tuple
    return avg_r, avg_g, avg_b

# Endpoint to handle RGB data upload
@app.route('/upload-rgb', methods=['POST'])
def upload_rgb():
    data = request.get_json()  # Get RGB data and total count from the request body
    rgb_data = data.get('rgbList', [])  # Get the list of RGB pixels
    total_count = data.get('totalCount', len(rgb_data))  # Get the total number of pixels

    # Debugging output
    print("Received RGB data:", rgb_data)
    print("Total pixel count:", total_count)
    
    # Calculate average RGB values
    avg_r, avg_g, avg_b = calculate_average_rgb(rgb_data, total_count)
    
    # Print the rounded average RGB to the terminal
    print(f"Calculated Rounded Average RGB: R={avg_r}, G={avg_g}, B={avg_b}")
    
    # Classify the skin tone based on the average RGB values
    skin_tone = classify_skin_tone((avg_r, avg_g, avg_b))
    
    # Suggest foundation shades based on the classified skin tone
    foundation_suggestions = suggest_foundation(skin_tone)
    
    print(f"Skintone of the selected part", skin_tone)
    print("Suggested Foundation", foundation_suggestions)
    # Return the skin tone and foundation suggestions in a JSON response"

 
    return jsonify({
        "status": "success",
        "message": "RGB data received and processed.",
        "average_rgb": {
            "average_red": avg_r,
            "average_green": avg_g,
            "average_blue": avg_b
        },
        "skin_tone": skin_tone,
        "foundation_suggestions": foundation_suggestions
    })


if __name__ == '__main__':
    
    app.run(debug=True)