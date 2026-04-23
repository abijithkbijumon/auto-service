import requests
import re
from bs4 import BeautifulSoup

try:
    res = requests.post('http://127.0.0.1:8000/users/auth/register/', json={
        "full_name": "Test User", "email": "test@test.com", "mob_no": "1234567890", 
        "password": "password123", "user_id": "testusr", "model_name": "TestModel", 
        "cc": 1000, "bike_type": "adv", "registration_year": 2022
    })
    print("STATUS CODE:", res.status_code)
    if res.status_code == 400:
        print("400 Error JSON:", res.json())
except Exception as e:
    print(e)
