export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // List Documents
      if (path === "/api/docs" && request.method === "GET") {
        // return Response.json({ results: [] }, { status: 200 })
        const results = await listDocs(env);
        return Response.json({ results }, { status: 200 });
      }

      // Create Document
      if (path === "/api/docs" && request.method === "POST") {
        const body = (await request.json()) as { title: string; createdBy: string };
        if (!body.title || !body.createdBy) {
          return Response.json({ error: "Title and createdBy are required" }, { status: 400 });
        }
        const doc = await createDoc(env, body.title, body.createdBy);
        return Response.json(doc, { status: 201 });
      }

      // Get Document by ID
      const docIdMatch = path.match(/^\/api\/docs\/([^\/]+)$/);
      if (docIdMatch && request.method === "GET") {
        const id = docIdMatch[1];
        const doc = await getDoc(env, id);
        if (!doc) {
          return Response.json({ error: "Document not found" }, { status: 404 });
        }
        return Response.json(doc, { status: 200 });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err) {
      console.error("Worker API Error:", err);
      return Response.json({ error: (err as Error).message }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;

interface DocType {
  id: string;
  title: string;
  created: number;
  created_by: string;
}

// TODO: we probably want to add pagination or cursor-based pagination
// TODO: perhaps also allow for search?
async function listDocs(env: Env): Promise<DocType[]> {
  const { results } = await env.DATABASE.prepare("SELECT * FROM documents ORDER BY created DESC").all<DocType>();
  return results;
}

async function getDoc(env: Env, id: string): Promise<DocType | null> {
  return await env.DATABASE.prepare("SELECT * FROM documents WHERE id = ?").bind(id).first<DocType>();
}

async function createDoc(env: Env, title: string, createdBy: string): Promise<DocType> {
  const id = crypto.randomUUID();
  const created = Date.now();

  await env.DATABASE
    .prepare("INSERT INTO documents (id, title, created_by, created) VALUES (?, ?, ?, ?)")
    .bind(id, title, createdBy, created)
    .run();

  return { id, title, created, created_by: createdBy };
}

