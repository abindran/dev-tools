import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    if (!body || typeof body.base64 !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid "base64" field in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const decoded = Buffer.from(body.base64, 'base64').toString('utf-8');

    return new Response(JSON.stringify({ text: decoded }), {
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
