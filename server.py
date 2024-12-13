from flask import Flask, request, send_file
import json
from datetime import datetime
# 在 server.py 中添加
import requests
import base64
import os

# 获取当前文件所在的目录路径
current_dir = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=current_dir, static_url_path='')

GITHUB_TOKEN = 'ghp_yahIHFdkF16i6SUfQQJ4hte2Z0z81f3K10pt'
GITHUB_REPO = 'https://github.com/qwas-zx/tu-chuang'
GITHUB_API = 'https://api.github.com'

def upload_to_github(file_data, filename):
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # 编码文件内容
    content = base64.b64encode(file_data).decode()
    
    # 上传到 GitHub
    url = f'{GITHUB_API}/repos/{GITHUB_REPO}/contents/images/{filename}'
    data = {
        'message': f'Upload {filename}',
        'content': content
    }
    
    response = requests.put(url, json=data, headers=headers)
    return response.json()

def upload_folder_to_github(folder_path):
    """
    上传整个文件夹到 GitHub 仓库
    
    :param folder_path: 要上传的本地文件夹路径
    """
    # 遍历文件夹中的所有文件
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            # 获取文件的完整路径
            file_path = os.path.join(root, file)
            
            # 计算相对路径，用于 GitHub 仓库的文件路径
            relative_path = os.path.relpath(file_path, folder_path)
            
            # 读取文件内容
            with open(file_path, 'rb') as f:
                file_data = f.read()
            
            # 上传单个文件
            try:
                result = upload_to_github(file_data, f'images/{relative_path}')
                print(f"上传 {relative_path}: {result}")
            except Exception as e:
                print(f"上传 {relative_path} 失败: {e}")

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    result = upload_to_github(file.read(), file.filename)
    return result

@app.route('/upload-folder', methods=['POST'])
def upload_folder():
    if 'folder' not in request.files:
        return {'error': '没有选择文件夹'}, 400
    
    folder = request.files['folder']
    
    # 创建临时文件夹
    temp_folder = os.path.join(current_dir, 'temp_upload')
    os.makedirs(temp_folder, exist_ok=True)
    
    # 解压文件夹
    folder.save(os.path.join(temp_folder, folder.filename))
    
    # 解压
    import zipfile
    with zipfile.ZipFile(os.path.join(temp_folder, folder.filename), 'r') as zip_ref:
        zip_ref.extractall(temp_folder)
    
    # 上传解压后的文件夹
    upload_folder_to_github(temp_folder)
    
    # 清理临时文件
    import shutil
    shutil.rmtree(temp_folder)
    
    return {'status': 'success', 'message': '文件夹上传完成'}

# 日志文件路径
LOG_FILE = 'upload_history.log'

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/log', methods=['POST'])
def log():
    data = request.json
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(f"{data['time']}: 上传文件 {data['filename']}\n")
    return {'status': 'success'}

if __name__ == '__main__':
    app.run(debug=True)
