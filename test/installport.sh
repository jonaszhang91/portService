#!/bin/bash

# 定义下载文件的URL和本地保存路径
file_url="https://github.com/jonaszhang91/portService/raw/main/test/portTest"
local_path="/home/menu/portTest"
file2_url="https://github.com/jonaszhang91/portService/raw/main/test/portTest.service"
service_path="/etc/systemd/system/portTest.service"
#删除文件
rm -f "$local_path"
rm -f "$service_path"
# 使用wget命令下载文件
wget "$file_url" -O "$local_path"
wget "$file2_url" -0 "$service_path"
# 检查wget命令的退出状态，‌确保文件已成功下载
if [ $? -eq 0 ]; then
    # 修改下载文件的权限为700
    chmod 700 "$local_path"
    echo "文件下载并修改权限成功！‌"
    systemctl daemon-reload
    systemctl enable portTest
    systemctl start portTest
else
    echo "文件下载失败！‌"
fi