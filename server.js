var express = require('express');
var app = express();
var zalo = require('./zalo_official')
var db = require('./mysql_demo')
// to use this module download it first at: https://github.com/quibusus/node-xiaomi-smart-home
var xiaomiSmartHome = require("node-xiaomi-smart-home");


var Hub = xiaomiSmartHome.Hub;
let hub = new Hub();
hub.listen();

hub.on('data.th', function (sid, temperature, humidity) {
   var msg = {};
   msg.title = 'th';
   msg.payload = {
      "event": "th",
      "sid": sid,
      "temperature": temperature,
      "humidity": humidity
   };
   console.log(msg);
   db.connect(db.MODE_PRODUCTION, function() {
      db.addTemSensor(msg.payload,function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }

      if(result.affectedRows > 0){
         console.log("ADDED thSensors " + msg.payload.event);
      }

   })
   })
});

hub.on('data.button', function (sid, type) {
   var msg = {};
   msg.title = 'button';
   msg.payload = {
      "event": "button",
      "sid": sid,
      "type": type
   };
   console.log(msg);
   db.connect(db.MODE_PRODUCTION, function() {
      db.addEventSensor(msg.payload,function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }

      if(result.affectedRows > 0){
         console.log("ADDED addEventSensor " + msg.payload.event);
      }

   })
   })
});

hub.on('data.motion', function (sid, motion) {
   var msg = {};
   msg.title = 'motion';
   msg.payload = {
      "event": "motion",
      "sid": sid,
      "type": motion
   };
   console.log(msg);

   db.connect(db.MODE_PRODUCTION, function() {
      db.addEventSensor(msg.payload,function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }

      if(result.affectedRows > 0){
         console.log("ADDED addEventSensor " + msg.payload.event);
      }

   })
   })

});

hub.on('data.magnet', function (sid, closed) {
   var msg = {};
   msg.title = 'magnet';
   msg.payload = {
      "event": "magnet",
      "sid": sid,
      "closed": closed
   };
   console.log(msg);

   db.connect(db.MODE_PRODUCTION, function() {
      db.addEventSensor(msg.payload,function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }

      if(result.affectedRows > 0){
         console.log("ADDED addEventSensor " + msg.payload.event);
         
      }

   })
   })

});

hub.on('data.plug', function (sid, on) {
   var msg = {};
   msg.title = 'plug';
   msg.payload = {
      "event": "plug",
      "sid": sid,
      "on": on
   };
   console.log(msg);

   db.connect(db.MODE_PRODUCTION, function() {
      db.addEventSensor(msg.payload,function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }

      if(result.affectedRows > 0){
         console.log("ADDED addEventSensor " + msg.payload.event);
      }

   })
   })

});

// function(timestamp1, timestamp2) {
//     var difference = timestamp1 - timestamp2;
//     var daysDifference = Math.floor(difference/1000/60/60/24);

//     return daysDifference;
// }

function getMotionStatus() {
   // body...

   db.connect(db.MODE_PRODUCTION, function() {
      db.getLatestMotion(function(err,result){
         if(err){
           response = {
            code:err.code,
            message:err.sqlMessage
         };
         console.log(response);
         return;

      }  
      var currentTime = new Date();
      var motionTime = result[0].timestamp
      var timeDiff = currentTime - motionTime;

      var minuteDiff = timeDiff / 60000;
      minuteDiff = Math.round(minuteDiff);

      //debug
      console.log(result)
      console.log(currentTime +"--"+ motionTime)
      console.log(minuteDiff)

      if(minuteDiff >= 1){
         var userId2='1308185292842528559'
         var message = "It've been "+minuteDiff+" minute since we last detected motion which was from " + result[0].name +" at: " + motionTime;
         zalo.ZOAClient.api('sendmessage/text', 'POST', { uid: userId2, message: message}, function(response) {
           console.log(response);
        })
      }

   })
   })

}

setInterval(getMotionStatus, 5*60*1000);



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});