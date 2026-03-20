import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    if (!body || typeof body.text !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid "text" field in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const encoded = Buffer.from(body.text, 'utf-8').toString('base64');

    return new Response(JSON.stringify({ base64: encoded }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
