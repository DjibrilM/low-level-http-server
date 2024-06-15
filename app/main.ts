import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  //handle incoming requests and the rest
//   socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  socket.on("data", (data) => {
    console.log(data.toString(), "data string");
    const requestPath = data.toString().split(" ")[1];

    const response =
      requestPath === "/" ? "HTTP/1.1 200 OK\r\n\r\n" : 'HTTP/1.1 404 Not Found\r\n\r\n';
    socket.write(Buffer.from(response));
  });

  socket.on("close", () => {
    console.log("socket closed");
    socket.end();
  });
});
//

server.listen(4221, "localhost");
