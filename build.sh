#!/bin/bash
#DefaultBuild-Reinstall-Debug
rebuild=0
deploy=0
debug=1
path="platforms/android/ant-build"
if [ "$2" == "p" ]; then
	path="platforms/android/bin"
	echo "Pablo path: $path"
fi
echo $path
#Build
if [ "$1" == "b" ]; then
	rebuild=0
	deploy=0
	debug=0
	echo "Build only"
fi
#Build
if [ "$1" == "r" ]; then
	rebuild=1
	deploy=0
	debug=0
	echo "Re-Build only"
fi
#Build-Install-NoDebug
if [ "$1" == "bd" ]; then
	rebuild=1
	deploy=1
	debug=0
	echo "Build-Install-NoDebug"
fi
#Build-Reinstall-NoDebug
if [ "$1" == "br" ]; then
	rebuild=1
	deploy=0
	debug=0
	echo "Build-Reinstall-NoDebug"
fi
#Build-Install-Debug
if [ "$1" == "bdd" ]; then
	rebuild=0
	deploy=1
	debug=1
	echo "Build-Install-Debug"
fi
#Build-Reinstall-Debug
if [ "$1" == "brd" ]; then
	rebuild=0
	deploy=0
	debug=1
	echo "Build-Reinstall-Debug"
fi
#Rebuild-Install-Debug
if [ "$1" == "rdd" ]; then
	rebuild=1
	deploy=1
	debug=1
	echo "Rebuild-Install-Debug"
fi
#Rebuild-Reinstall-Debug
if [ "$1" == "rrd" ]; then
	rebuild=1
	deploy=0
	debug=1
	echo "Rebuild-Reinstall-Debug"
fi
echo "Cordova/Phonegap Builder"
if [ $rebuild == 1 ]
then
	echo "Instalamos los plugins necesarios"
	echo "====================================================="
	#cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
	#cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
	#cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git
	#cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git
	#cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git
	#cordova plugin add https://github.com/phonegap-build/PushPlugin.git
	#cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
	
	#cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin
	cordova plugin rm org.transistorsoft.cordova.background-geolocation
	cordova plugin add MyPlugin/cordova-plugin-background-geolocation/
	echo "====================================================="
	echo ""
fi
echo "BUILD de la App"
echo "====================================================="
cordova build
echo "====================================================="
echo ""
if [ $deploy == 1 ] 
then
	echo "Instalacion en el telefono"
	echo "====================================================="
    adb install $path/TreAviso-debug.apk
else
	echo "Reinstalacion en el telefono"
	echo "====================================================="
    adb install -r $path/TreAviso-debug.apk
fi
echo ""
if [ $debug == 1 ] 
then
	echo "Iniciamos el log"
	echo "====================================================="
	adb logcat Cordova:* DroidGap:* CordovaLog:* CordovaActivity:* CordovaWebView:* Web Console:* *:S LocationUpdateService:*
fi 
