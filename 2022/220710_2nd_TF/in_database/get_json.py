import json
import requests
"""
API.txtは1行目にAPI_KEY、2行目にAPI_URLを記述して同じディレクトリに置くこと
"""
f_API=open('API.txt','r')
API_list = f_API.readlines()
API_KEY = API_list[0].strip()
API_URL = API_list[1].strip()
f_API.close()

def fetch_tf_names():
    response = requests.get(API_URL + '/tf', headers={'x-api-key': API_KEY})
    return response.json()
def fetch_flight_log_list(tf_name: str):
    response = requests.get(
        API_URL + f'/data?tf_name={tf_name}&limit=100000', headers={'x-api-key': API_KEY})
    return response.json()
def save_tf_name_list():
    file_path: str = 'tf.json'
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(fetch_tf_names(), f, ensure_ascii=False)
def save_flight_log_list():
    for tf in fetch_tf_names():
        tf_name: str = tf.get('tf_name')
        file_path: str = f'{tf_name}.json'
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(fetch_flight_log_list(tf_name), f, ensure_ascii=False)
if __name__ == '__main__':
    save_tf_name_list()
    save_flight_log_list()
