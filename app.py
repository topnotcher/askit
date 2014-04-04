#!/usr/bin/env python
from flask import Flask, render_template, request
import json

app = Flask(__name__)

questions = []

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/q')
def get_questions():
    n = int(request.args.get('n',0))
    r = []
    if len(questions)-1 > n and n >= -1:
        for i in range(n+1, len(questions)):
            r.append({'id': i, 'question': questions[i]})
    
    return json.dumps(r)
    
@app.route('/p',methods=['POST'])
def ask():
    questions.append(request.form['question'])
    return ''

if __name__ == '__main__':
    app.run(debug=True)
