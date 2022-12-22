import { geckos, ServerChannel } from "@geckos.io/server";

const server = geckos({
  label: "THNK-Relay",
  async authorization(auth, request, response) {
    
  },
});
const rooms = new Map<
  string,
  { server: ServerChannel; clients: ServerChannel[] }
>();

server.onConnection((c) => {
  c.on("claim", (roomID: string) => {
    if (rooms.has(roomID)) return;
  });

  c.on("join", (roomID: string) => {});
});

server.listen(6969);
