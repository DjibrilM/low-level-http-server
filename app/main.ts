import * as net from "net";
import fs from "fs";
import path from "path";

// You can use print statements as follows for debugging, they'll be visible when running tests.

const server = net.createServer((socket) => {
  //handle incoming requests and the rest
  //   socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  socket.on("data", (data) => {
    const requestPath = data.toString().split(" ")[1];
    const query = requestPath.split("/")[2];

    if (requestPath === "/") {
      socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
    } else if (requestPath === `/echo/${query}`) {
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${query.length}\r\n\r\n${query}`;
      socket.write(Buffer.from(response));
    } else if (requestPath === "/user-agent") {
      const userAgent = data
        .toString()
        .split("User-Agent: ")[1]
        .split("\r\n")[0];
      socket.write(
        Buffer.from(
          `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`
        )
      );
    } else if (requestPath.startsWith("/files/")) {
      const [_, __, fileName] = requestPath.split("/");
      const args = process.argv.slice(2);
 
      const [___, absPath] = args;
      console.log(absPath);
      const filePath = absPath + "/" + fileName;
      try {
        const content = fs.readFileSync(filePath);
        socket.write(
          `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${content.length}\r\n\r\n${content}`
        );
      } catch (error) {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      }
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.end();
    }
  });

  socket.on("close", () => {
    console.log("socket closed.");
    socket.end();
  });
});
//

server.listen(4221, "localhost");
