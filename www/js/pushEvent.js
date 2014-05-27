function MapPageInit(){
	var map = L.map('map').setView([-32.951856, -60.665230], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OSM</a>' 
    }).addTo(map);
    var marker = L.marker([-32.951856, -60.665230]).addTo(map);
    var circle = L.circle([-32.951856, -60.665230], 500, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5
    }).addTo(map);
    //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    //circle.bindPopup("I am a circle.");
    var popup = L.popup();

    function onMapClick(e) {
        /*popup
             .setLatLng(e.latlng)
             .setContent("You clicked the map at " + e.latlng.toString())
             .openOn(map);*/
		marker.setLatLng(e.latlng).update();
     }

     map.on('click', onMapClick);
     $("#btnSaveAlarm").unbind("click").click(function (event) {
        event.preventDefault();
        var db = new DB('cordova_bg_locations');
        var ll = marker.getLatLng();
        //db.deleteAllAlarm();
        var a = new Alarm("Custom", 1, ll.lat, ll.lng, $("#txtMetros").val());
        console.log(a);
		db.addAlarm(a);
     });
}

function AlarmsPageInit()
{
	//Llegamos al listado de alarmas
	var _alarms = $("#tblAlarms");
	var _tpl = $("#tplAlarm").remove();
    var db = new DB('cordova_bg_locations');
    db.getAllAlarm(function (alarms) {
		//console.log(alarms);
		console.log("Aca estoy " + alarms.length);
        if(alarms != null && alarms.length > 0) {
			for(var i = 0; i < alarms.length; i++) {
				var _alarma = _tpl.clone();
                var alarm = alarms[i];
                console.log(alarm.name);
                _alarma.removeAttr("style").removeAttr("id");
                _alarma.find(".alarm-name").text(alarm.name);
                 //_alarma.find(".alarm-location").text("[ " + alarm.latitude + ", " + alarm.longitude + " ]");
                 //_alarma.find(".alarm-meter").text(alarm.metros + " metros antes");
                 if (alarm.active)
					_alarma.find(".toggle").addClass("active");
				else	
					_alarma.find(".toggle").removeClass("active");
				alarms.append(_alarma);
            }
        }
    });
}

window.addEventListener('push', function (e) {
	var _alarms = $("#tblAlarms");
    var _map = $("#map");
    if(_map.length > 0) {
		MapPageInit();
    } else {
		if(_alarms.length > 0) {
			AlarmsPageInit();
        }
    }
});
     

