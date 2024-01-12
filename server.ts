import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

const PORT = Deno.env.get("PORT");
const port = PORT;

const handler = (request: Request): Response => {
  const body = `Your temporary scalingo boot server is running`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:${port}`);
const server = Deno.serve({ port }, handler);

let setupMotis = await exec("./setup.sh", {
  output: OutputMode.Capture,
});

console.log("Motis setup", setupMotis);

const shut = await server.shutdown();

console.log("shut, will launch motis server");

let launchServer = await exec(`./motis/motis --server.port ${port}`, {
  output: OutputMode.Capture,
});

console.log("server launched", launchServer);
