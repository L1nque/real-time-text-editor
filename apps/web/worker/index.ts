import { env } from "cloudflare:workers";

export default {
  async fetch(request) {
    const url = new URL(request.url);


    if (url.pathname.startsWith("/api/create")) {
      const creationResponse = await env.DATABASE.prepare("INSERT INTO documents (id, title, created, created_by) VALUES (:id, :title, :created, :created_by)")
        .bind({ id: "123", title: "hello-world", created: new Date().toISOString(), created_by: "John Doe" })
        .run();
      return Response.json({
        name: "Cloudflare",
      });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
