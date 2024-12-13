# GitHub 图床管理工具

## 项目简介
这是一个基于 Flask 的 GitHub 图床管理工具，支持单文件和整个文件夹的图片上传。

## 功能特点
- 单文件上传
- 整个文件夹上传
- 实时预览
- 上传历史记录

## 安装步骤
1. 克隆仓库
```bash
git clone https://github.com/your-username/github-picbed.git
cd github-picbed
```

2. 创建虚拟环境
```bash
python -m venv venv
source venv/bin/activate  # Windows 使用 venv\Scripts\activate
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

4. 运行应用
```bash
python server.py
```

## 使用说明
- 访问 `http://localhost:5000`
- 拖拽或点击上传单个图片
- 点击"上传文件夹"上传整个文件夹

## 注意事项
- 需要提前配置 GitHub Personal Access Token
- 仅用于开发和学习目的

## 技术栈
- Python Flask
- JavaScript
- HTML/CSS
