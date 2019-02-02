#!/usr/bin/env python
# -*- coding: utf-8 -*-

from functools import wraps
from site import addsitedir
from os.path import abspath, dirname, join
import json
import sys
import os
import socket

from fabric.api import local, task, env
from fabric.colors import blue, green
from fabric.context_managers import prefix
from fabric.contrib import django

# Añadimos la raiz del proyecto al path
BASE_DIR = abspath(join(dirname(__file__), 'src'))
sys.path.append(BASE_DIR)

# Añadimos virtualenv al path
WORKON_HOME = os.environ['WORKON_HOME']
DJANGO_ENV = 'django_1_7'

addsitedir('{0}/{1}/lib/python2.7/site-packages'.format(WORKON_HOME, DJANGO_ENV))


django.settings_module('settings')

env.shell = '/bin/bash'

# from django.conf import settings

if os.name != "nt":
    import fcntl
    import struct
    def get_interface_ip(ifname):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        return socket.inet_ntoa(fcntl.ioctl(
                s.fileno(),
                0x8915,
                struct.pack('256s', ifname[:15])
            )[20:24])

def get_lan_ip():
    ip = socket.gethostbyname(socket.gethostname())
    if ip.startswith("127.") and os.name != "nt":
        interfaces = ["eth0","eth1","eth2","wlan0","wlan1","wifi0","ath0","ath1","ppp0"]
        for ifname in interfaces:
            try:
                ip = get_interface_ip(ifname)
                break;
            except IOError:
                pass
    return ip



ipdata = get_lan_ip()

# VIRTUALENV
def virtualenv():
    '''
        Context manager. Usado para ejecutar acciones con virtualenv activado::

        with virtualenv():
            # virtualenv está activo aquí
    '''

    return prefix('export ENV="{0}";. {1}/{0}/bin/activate'.format(DJANGO_ENV, WORKON_HOME))


def inside_virtualenv(func):
    '''
        Decorador, usado para ejecutar acciones con virtualenv activado::

        @task
        @inside_virtualenv
        def my_command():
            # virtualenv está activo aquí
    '''
    @wraps(func)
    def inner(*args, **kwargs):
        with virtualenv():
            return func(*args, **kwargs)
    return inner


# TAREAS

@task
@inside_virtualenv
def commit(descript='Fix Update',user='Yelson Chevarrias <chevarrias@gmail.com>'):
    '''
        Ejecuta las migraciones
    '''
    print(blue('::Agregando Archivos::'))
    local("hg addremove")
    print(blue('::Obteniendo cambios de la Red::'))
    local("hg pull -u")
    print(blue('::Realizando el commit::'))
    local("hg commit -u '"+user+"' -m '"+descript+"'")
    print(blue('::Subiendo cambios::'))
    local("hg push")
    print(green(':::: Cambios subidos con exito ::::'))

@task
def stylus():
    '''
        Compila código stylus.
    '''
    print(blue('::stylus()::'))

    local('stylus -u nib -w src/static/styl/ -o src/static/css/')

    print(green('::::stylus()::::'))