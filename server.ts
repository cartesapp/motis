const PORT = Deno.env.get("PORT");
const port = PORT;

const handler = (request: Request): Response => {
  const body = `Your temporary scalingo boot server is running`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:${port}`);
Deno.serve({ port }, handler);
