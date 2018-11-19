from django.shortcuts import render
from django.views.generic.base import View

import paramiko
import os,sys,time

class cnmdbView(View):
    def SSHhostnameView(self):
        blip = '10.202.27.5'     #堡垒机信息
        bluser = 'sflog'
        blpasswd = 'sf123456'

        hostname = '10.202.60.189'    #服务器信息
        username = '80002932'
        password = 'zxc123456.'

        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname=blip, username=bluser, password=blpasswd)

        channel = ssh.invoke_shell()
        channel.settimeout(10)

        channel.send(username+'\n')
        time.sleep(1)
        channel.send(password + '\n')
        time.sleep(1)
        channel.send(hostname + '\n')
        time.sleep(1)
        channel.send('0' + '\n')
        time.sleep(1)
        channel.send('tail -f /app/deploy/logs/my-logs.log \n')
        time.sleep(1)
        resp = channel.recv(9999)
        return render(resp,'log.html')
