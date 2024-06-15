import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  //handle incoming requests and the rest
  socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  socket.on("data", (data) => {
    console.log(data.toString(), "data string");
    const extractTheRequestPath = data.toString().split(" ")[1];

    const response =
      extractTheRequestPath === "/"
        ? "HTTP/1.1 200 OK\n\r\n\r"
        : "HTTP/1.1 400 \n\r\n\r";
    socket.write(Buffer.from(response));
  });

  socket.on("close", () => {
    console.log("socket closed");
    socket.end();
  });
});
//

server.listen(4221, "localhost");
