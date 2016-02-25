window.addEventListener("load", main);

function main() {
	
	alarms = new AlarmsContainer();
	date = new Date();
	
	document.getElementById("createNewAlarm").addEventListener("click", function() {
		
		document.getElementById("newAlarmForm").style.display = "none";
		alarms.addAlarm(new Alarm(document.getElementById("Heures").value,document.getElementById("Minutes").value));
		document.getElementById("Heures").value = "";
		document.getElementById("Minutes").value = "";		
	});
	
	document.getElementById("newAlarmForm").style.display = "none";
	document.getElementById("addAlarm").addEventListener("click",function() {
		document.getElementById("newAlarmForm").style.display = "block";
	});
	
	
	refreshTime();
	
}


function Alarm(heures,minutes)
{
	this.heures = heures;
	this.minutes = minutes;
	
	this.checkTrigger = function() {
		return(date.getHours()==this.heures && date.getMinutes()==this.minutes);
	}
	
	this.trigger = function() {
		document.getElementById("alarmSound").play();
		alert("Alarme de "+this.heures+" h "+this.minutes );
	}
	
	
	
	
}

function AlarmsContainer()
{
	this.alarmsContainerArray = new Array();
	
	this.addAlarm = function(alarm) {
		
		if(alarm instanceof Alarm)
		{
			this.alarmsContainerArray.push(alarm);
			this.refreshAlarmsDisplay();
			
		}
		
	}
	
	this.removeAlarm = function(alarm) {
		this.alarmsContainerArray.splice(this.alarmsContainerArray.indexOf(alarm),1);
		this.refreshAlarmsDisplay();
	}
	
	this.checkAlarmsTrigger = function() {
		
		for(var elem of this.alarmsContainerArray)
		{
			if(elem.checkTrigger())
			{
				alarms.removeAlarm(elem);
				elem.trigger();
			}
		}
	}
	
	this.refreshAlarmsDisplay = function() {
		document.getElementById("alarms").innerHTML = "";
		var nameButtonCounter = 0;
		for(elem of this.alarmsContainerArray)
		{
			document.getElementById("alarms").innerHTML += "<tr><td>"+elem.heures+"</td><td>"+elem.minutes+"</td><td><button type='button' id='alarm"+nameButtonCounter+"'>X</button></tr>";
			var tempAlarmsContainerReference = this;
			document.getElementById("alarm"+nameButtonCounter).addEventListener("click",function() {
				tempAlarmsContainerReference.removeAlarm(elem);
				});
			nameButtonCounter ++;
		}
	}
	
	
}




function refreshTime() {
	
	
	date.setTime(Date.now());
	document.getElementById("time").textContent = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	setTimeout(refreshTime, 1000);

	document.getElementById("alarmSound").pause();
	
	alarms.checkAlarmsTrigger();
	
	
}