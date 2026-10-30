const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // GET /
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "assets", "week1.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("Internal Server Error");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(data);
    });
  }

  // GET /api/info
  else if (req.method === "GET" && req.url === "/api/info") {
    const info = {
      type: os.type(),
      hostname: os.hostname(),
      cpu_count: os.cpus().length,
      total_memory_mb: Math.round(os.totalmem() / 1024 / 1024),
      uptime_hours: Number((os.uptime() / 60 / 60).toFixed(2)),
    };

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify(info));
  }

  // GET /health
  else if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        status: "ok",
      })
    );
  }

  // 404
  else {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.end("404 Not Found");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
