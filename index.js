var net = require("net");
const LogService = require("./db/models/Log");

var IFM_Camera = new net.Socket();
var FESTO_Camera = new net.Socket();

LogService.create({
  type: "debug",
  code: 100,
  message: "Application was started"
});

function makeReq(ticket, message) {
  let length = "" + (message.length + 6);

  while (length.length < 9) {
    length = "0" + length;
  }

  IFM_Camera.write(ticket + "L" + length + "\r\n" + ticket + message + "\r\n");
}

// IFM_Camera.connect(50010, "192.168.0.69", function() {
//   console.log("IFM Connected");
//   LogService.create({
//     type: "info",
//     code: 200,
//     message: "Camera was connected",
//     device: {
//       camera: "IFM"
//     }
//   });
// });

FESTO_Camera.connect(2004, "192.168.100.100", function() {
  console.log("FESTO Connected");
  LogService.create({
    type: "info",
    code: 200,
    message: "Camera was connected",
    device: {
      camera: "FESTO"
    }
  });
});

IFM_Camera.on("data", function(data) {
  console.log("Received: " + data);
  LogService.create({
    type: "info",
    code: 201,
    message: "Recived data",
    details: {
      model: "IFM",
      response: data.toString()
    }
  });
  // IFM_Camera.destroy(); // kill client after server's response
});
FESTO_Camera.on("data", function(data) {
  console.log("Received: " + data);
  // console.log(data.toJSON());
  LogService.create({
    type: "info",
    code: 200,
    message: "FESTO",
    details: {
      img: data.toJSON()
    }
  });
});

IFM_Camera.on("error", function(err) {
  console.log(err);
  LogService.create({
    type: "fatal",
    code: 500,
    message: "FATAL ERROR",
    details: {
      error: err
    }
  });
});

FESTO_Camera.on("error", function(data) {
  console.log(err);
});

IFM_Camera.on("close", function() {
  console.log("Connection closed");
});

FESTO_Camera.on("close", function() {
  console.log("Connection closed");
});
