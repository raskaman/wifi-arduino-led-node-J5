'use strict';

var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
 
//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.0.102',
  type: 'udp4',
  port: 1025
});

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);
io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');
        //Full Johnny-Five support here:

        var led = new five.Led(5);
        led.blink(500);
    });
});