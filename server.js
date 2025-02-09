const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");


const middlewares = jsonServer.defaults({ noStatic: true });

server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ JSON Server is running on http://localhost:${PORT}`);
});
