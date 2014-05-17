#!/bin/bash

# Esta es la forma por el momento de refresh el plug-in
mkdir platforms
mkdir plugins
cordova platforms rm android
cordova platforms add android
cp /home/sam/Programacion/andriod/sdk/extras/android/support/v4/android-support-v4.jar /home/sam/Programacion/Treaviso/platforms/android/libs/
