import os

from cs50 import SQL
from flask import  Flask, flash, jsonify, redirect, render_template, request, session
import smtplib
import base64

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True


UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/save-image", methods=["POST"])
def save_image():
    data = request.get_json()
    comment = data.get("comment", "")
    image_data = data.get("image", "")

    try:
        # Get the next available number for the image/comment pair
        existing_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith(".png")]
        next_number = len(existing_files) + 1

        # Save the image to the folder
        if image_data:
            image_base64 = image_data.split(",")[1]
            image_bytes = base64.b64decode(image_base64)

            image_filename = os.path.join(UPLOAD_FOLDER, f"drawing_{next_number}.png")
            with open(image_filename, "wb") as f:
                f.write(image_bytes)

        # Save the comment to a text file
        comment_filename = os.path.join(UPLOAD_FOLDER, f"comment_{next_number}.txt")
        with open(comment_filename, "w") as f:
            f.write(comment)

        return jsonify({"success": True, "message": f"Saved drawing and comment as pair #{next_number}!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")
