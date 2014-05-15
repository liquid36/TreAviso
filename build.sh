#!/bin/bash
cordova build
adb install -r platforms/android/bin/TreAviso-debug.apk
adb logcat Cordova:* DroidGap:* CordovaLog:* CordovaActivity:* CordovaWebView:* Web Console:* *:S
