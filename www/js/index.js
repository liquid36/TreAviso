/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
    count: 0 ,
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('BackgroundGeoLocation ');
        document.addEventListener('deviceready', this.onDeviceReady, true);
		document.addEventListener('pause', this.onPause, true);
		document.addEventListener('resume', this.onResume, true);
    },
    
    onResume: function() {
      var parentElement = document.getElementById('deviceready');
      var receivedElement = parentElement.querySelector('.received');
      receivedElement.innerHTML = app.count;
    },
    
    onPause: function() {
		var parentElement = document.getElementById("titulo");
		parentElement.innerHTML = "PAUSEEEE";
	
		var parentElement = document.getElementById('deviceready');
        var receivedElement = parentElement.querySelector('.received');
		this.count = 0;
		receivedElement.innerHTML = this.count;
            
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		console.log('--------   device ready');
		console.log(window.plugins.backgroundGeoLocation);
	    if (window.plugins.backgroundGeoLocation) {
            app.configureBackgroundGeoLocation();
        }

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    
    
    configureBackgroundGeoLocation: function() {
        // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
        //  in order to prompt the user for Location permission.
        window.navigator.geolocation.getCurrentPosition(function(location) {
            console.log('Location from Phonegap' + location.coords.latitude + ',' + location.coords.longitude);
        }, function(location) {console.log("Error de localizacion");});

        var bgGeo = window.plugins.backgroundGeoLocation;

        /**
        * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
        */
        var yourAjaxCallback = function(response) {
            ////
            // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
            //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            //
            //
            bgGeo.finish();
        };

        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location) {
            console.log('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);
            // Do your HTTP request here to POST location to your server.
            //
            //
			var parentElement = document.getElementById('deviceready');
			var receivedElement = parentElement.querySelector('.received');
			this.count += 1;
			receivedElement.innerHTML = this.count;
            yourAjaxCallback.call(this);
        };

        var failureFn = function(error) {
            console.log('BackgroundGeoLocation error');
        }
        
        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure(callbackFn, failureFn, {
			desiredAccuracy:  50,
            stationaryRadius: 50,
            distanceFilter: 20,
            debug: false // <-- enable this hear sounds for background-geolocation life-cycle.
        });

        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        bgGeo.start();
        // If you wish to turn OFF background-tracking, call the #stop method.
        // bgGeo.stop()
    }

};
