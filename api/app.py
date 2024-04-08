from flask import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/login', methods=["POST"])
def flask_login():
    request_body_json = request.get_json()
    email = request_body_json.get('email')

    # Authentication logic here
    # For now we just check if a wscripted.co email was entered
    if (email.split('@')[1] != 'wscripted.co'):
        return jsonify({'success': False, 'error': 'Invalid username or password'})

    return jsonify({'success': True, 'email': email})

if __name__ == '__main__':
    app.run(debug=True)
