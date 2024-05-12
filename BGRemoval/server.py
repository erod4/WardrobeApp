from flask import Flask, request, Response,jsonify
from Config.RemoveBG import removeBackground
from flask_cors import CORS
import traceback


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/remove-bg', methods=['POST'])
def handle_remove_bg():
    try:
        file=request.files['image']
        if not file:
            return jsonify({"error": "Image not provided"}), 400 
        output_path=removeBackground(file.read())
        return Response(output_path,mimetype='image/png')
    except Exception as e:
        error_message=str(e)
        error_trace=traceback.format_exc()
        return jsonify({"error":"An Error Has Occured"})

   



if __name__=='__main__':
    app.run(debug=True, port=5000)