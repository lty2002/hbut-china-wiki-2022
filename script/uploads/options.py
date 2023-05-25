import json
import os

import requests
from uploads import auth
from uploads import mime

team_id = '4249'

if not auth.test_auth():
    print('未登录')
    session = auth.login()
    auth.set_auth(session)

print('已登录')
print()

headers = {
    'cookie': 'session=' + auth.get_auth()
}


def req(method, url):
    res = requests.request(method, url, headers=headers)
    return res


def query(directory=''):
    """
    在指定目录下查找
    :param directory: 要查找的目录，默认为根目录
    :return: 文件的list/空list
    """
    res = req('get', 'https://shim-s3.igem.org/v1/teams/' + team_id + '/wiki?directory=' + directory)
    body = json.loads(res.text)
    if body['KeyCount'] > 0:
        print(directory, '查询成功', body['KeyCount'])
        for i in body['Contents']:
            print(i['Name'], i['Location'])
        print()
        return body['Contents']
    else:
        print(directory, '查询为空')
        print()
        return []


def upload(abs_file_path, directory='', list=True):
    """
    上传文件到指定目录
    :param abs_file_path: 文件的绝对路径
    :param directory: 文件的目录，默认为根目录
    :param list: 是否查询
    :return: 文件的URL/False
    """
    filename = abs_file_path.split('\\')[-1]
    mime_type = mime.getMIME(filename.split('.')[-1])
    data = {
        'directory': directory
    }
    files = {
        'file': (filename, open(abs_file_path, 'rb'), mime_type)
    }
    res = requests.post('https://shim-s3.igem.org/v1/teams/' + team_id + '/wiki', files=files,
                        data=data, headers=headers, verify=False)
    if res.status_code == 201:
        print(filename, '上传成功', res.json()['location'])
        print()
        if list:
            query(directory)
        return res.json()['location']
    else:
        print(filename, '上传失败')
        print()
        return False


def upload_dir(abs_path):
    """
    上传目录
    :param abs_path: 目录的绝对路径
    :return: 目录下文件的list/空list
    """
    file_list = os.listdir(abs_path)
    for filename in file_list:
        upload(abs_path + '\\' + filename, abs_path.split('\\')[-1], False)
    return query(abs_path.split('\\')[-1])


def delete(filename, directory='', list=True):
    """
    删除某目录下的文件
    :param filename: 文件名
    :param directory: 文件的目录，默认为根目录
    :param list: 是否查询
    :return: True/False
    """
    res = req('delete', 'https://shim-s3.igem.org/v1/teams/' + team_id + '/wiki/' + filename + '?directory=' + directory)
    if res.status_code == 200:
        print(directory + '/' + filename, '删除成功')
        print()
        if list:
            query(directory)
        return True
    else:
        print(directory + '/' + filename, '删除失败')
        print()
        return False


def clear_dir(directory):
    """
    清空目录
    :param directory: 目录
    :return: 清空后目录下的文件
    """
    files = query(directory)
    print(files)
    for file in files:
        delete(file['Name'], directory, False)
    return query(directory)
