import requests

username = 'username'
password = 'password'


def login():
    print('开始登录')
    data = {
        "username": username,
        "password": password,
        "Login": "Login",
        "return_to": "https://igem.org"
    }
    res = requests.post('https://old.igem.org/Login2', data=data)
    cookie_str = res.request.headers.get('Cookie')
    cookie_dic = {i.split("=")[0]: i.split("=")[1] for i in cookie_str.split("; ")}
    session = cookie_dic['session']
    print('登录成功')
    return session


def test_auth():
    headers = {
        'cookie': 'session=' + get_auth()
    }
    res = requests.get('https://old.igem.org/aj/session_info?use_my_cookie=1', headers=headers)
    try:
        return res.json()['session_found'] == 'true'
    except:
        return False


def set_auth(session):
    print('保存登录态')
    with open('auth.txt', 'w') as f:
        f.write(session)


def get_auth():
    try:
        with open('auth.txt', 'r+') as f:
            session = f.read()
            return session
    except:
        return '404'
