#!/bin/bash

# 定义下载文件的URL和本地保存路径
file_url="https://github.com/jonaszhang91/portService/raw/main/test/protTest"
local_path="/home/menu/protTest"

#删除文件
rm -f "$local_path"
# 使用wget命令下载文件
wget "$file_url" -O "$local_path"

# 检查wget命令的退出状态，‌确保文件已成功下载
if [ $? -eq 0 ]; then
    # 修改下载文件的权限为700
    chmod 700 "$local_path"
    echo "文件下载并修改权限成功！‌"
    /home/menu/protTest
else
    echo "文件下载失败！‌"
fi