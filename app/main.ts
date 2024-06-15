import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  //handle incoming requests and the rest
  //   socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  socket.on("data", (data) => {
    const requestPath = data.toString().split(" ")[1];
    if (requestPath === "/") {
      const response = "HTTP/1.1 200 OK\r\n r\n";

      socket.write(Buffer.from(response));
    } else if (requestPath === "/echo/grape") {
      const response =
        "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\n\r\nabc";
      socket.write(response);
    }
  });

  socket.on("close", () => {
    console.log("socket closed.");
    socket.end();
  });
});
//

server.listen(4221, "localhost");
