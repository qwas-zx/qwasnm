// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 单文件上传逻辑
function initSingleFileUpload() {
    const dropzone = document.getElementById('dropzone');
    const previewGrid = document.getElementById('preview-grid');
    const history = document.getElementById('history');

    // 处理拖拽
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // 点击上传
    dropzone.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => handleFiles(e.target.files);
        input.click();
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            // 预览图片
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    
                    const info = document.createElement('div');
                    info.className = 'image-info';
                    info.innerHTML = `
                        <div>${file.name}</div>
                        <div>${formatFileSize(file.size)}</div>
                    `;
                    
                    previewItem.appendChild(img);
                    previewItem.appendChild(info);
                    previewGrid.appendChild(previewItem);
                    
                    // 显示上传成功提示
                    const successMsg = document.createElement('div');
                    successMsg.className = 'upload-success';
                    successMsg.textContent = `${file.name} 上传成功！`;
                    dropzone.parentNode.insertBefore(successMsg, dropzone.nextSibling);
                    
                    // 3秒后移除提示
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);
                }
                reader.readAsDataURL(file);
            }
            
            // 记录日志
            logUpload(file.name);
        });
    }

    function logUpload(filename) {
        const now = new Date().toLocaleString();
        const logEntry = document.createElement('p');
        logEntry.innerHTML = `<i class="fas fa-check-circle"></i> ${now}: 上传文件 ${filename}`;
        history.insertBefore(logEntry, history.firstChild.nextSibling);

        // 写入日志文件
        fetch('/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time: now,
                filename: filename
            })
        });
    }
}

// 文件夹上传逻辑
function initFolderUpload() {
    const folderUploadBtn = document.getElementById('folderUploadBtn');
    const folderInput = document.getElementById('folderInput');

    folderUploadBtn.addEventListener('click', () => {
        folderInput.click();
    });

    folderInput.addEventListener('change', (e) => {
        const files = e.target.files;
        
        // 创建 FormData 对象
        const formData = new FormData();
        
        // 创建一个临时 zip 文件
        const zip = new JSZip();
        
        // 将所有文件添加到 zip
        Array.from(files).forEach(file => {
            zip.file(file.webkitRelativePath, file);
        });
        
        // 生成 zip 文件
        zip.generateAsync({type:"blob"}).then(function(content) {
            // 创建一个新的 File 对象
            const zipFile = new File([content], 'upload_folder.zip', {type: 'application/zip'});
            
            // 添加到 FormData
            formData.append('folder', zipFile);
            
            // 发送上传请求
            fetch('/upload-folder', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    alert('文件夹上传成功！');
                } else {
                    alert('文件夹上传失败：' + result.error);
                }
            })
            .catch(error => {
                console.error('上传错误:', error);
                alert('文件夹上传出现错误');
            });
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initSingleFileUpload();
    initFolderUpload();
});
