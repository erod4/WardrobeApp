from flask import Flask, request, Response
from Config.RemoveBG import removeBackground
from flask_cors import CORS



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/remove-bg', methods=['POST'])
def handle_remove_bg():
    file=request.files['image']
    if file:
        output_path=removeBackground(file.read())
        return Response(output_path,mimetype='image/png')
    return 'No File Received', 400



if __name__=='__main__':
    app.run(debug=True, port=5000)