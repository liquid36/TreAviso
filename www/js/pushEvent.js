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
	var _alarms = $("#tblAlarms");
	var _tpl = $("#tplAlarm").remove();
    var db = new DB('cordova_bg_locations');
    db.getAllAlarm(function (alarmList) {
        if(alarmList != null && alarmList.length > 0) {
			for(var i = 0; i < alarmList.length; i++) {
				var _alarmHTML = _tpl.clone();
                var alarm = alarmList[i];
                _alarmHTML.removeAttr("style").removeAttr("id");
                _alarmHTML.find(".alarm-name").text(alarm.name);
                _alarmHTML.attr("id","al-" + alarm.id);
                 //_alarma.find(".alarm-location").text("[ " + alarm.latitude + ", " + alarm.longitude + " ]");
                 //_alarma.find(".alarm-meter").text(alarm.metros + " metros antes");
                var tecla = _alarmHTML.find(".toggle");
                tecla.attr("data",alarm.id);
                if (alarm.active > 0)
					tecla.addClass("active");
				else	
					tecla.removeClass("active");
				_alarms.append(_alarmHTML);	
				tecla.bind("toggle", function (){ 
					db.changeActiveAlarm( parseInt($(this).attr("data")) , $(this).hasClass("active") ? 1 : 0  );
					console.log(  $(this).attr("data") + " ---> " + $(this).hasClass("active")   ); 
				});
				
            }
        }
    });
}

function addAlarmPageInit()
{
	$("#Guardar").click(function (){ console.log("algo hice además de lo otro"); });
}

window.addEventListener('push', function (e) {
	var _alarms = $("#tblAlarms");
    var _map = $("#map");
    var _add = $("#AlarmForm");
    if(_map.length > 0) {
		MapPageInit();
    } else {
		if(_alarms.length > 0) {
			AlarmsPageInit();
        } else if (_add.length > 0) {
			addAlarmPageInit();
		}
    }
});
     

