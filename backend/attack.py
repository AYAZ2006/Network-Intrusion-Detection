import requests

url = "http://127.0.0.1:8000/admin/login/?next=/admin/"

for i in range(2000):
    r = requests.post(url, data={
        "username": "admin",
        "password": "wrong"
    })
    print(r.status_code)