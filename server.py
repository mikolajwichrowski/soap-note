#!/usr/bin/env python3

from flask import Flask, render_template, send_from_directory, redirect, request
from random import randint
app = Flask(__name__)

@app.route('/<path:path>')
def static_endpoint(path):
    return send_from_directory('', path)

if __name__=='__main__':
    app.run(debug=True)