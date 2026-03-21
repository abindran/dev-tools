import type { APIRoute } from 'astro';
import iconv from 'iconv-lite';

const SUPPORTED_CHARSETS = new Set([
  'utf-8', 'ascii', 'utf-16le', 'utf-16be',
  'iso-8859-1', 'iso-8859-2', 'iso-8859-3', 'iso-8859-4',
  'iso-8859-5', 'iso-8859-6', 'iso-8859-7', 'iso-8859-8',
  'iso-8859-9', 'iso-8859-10', 'iso-8859-13', 'iso-8859-14', 'iso-8859-15',
  'windows-1250', 'windows-1251', 'windows-1252', 'windows-1253',
  'windows-1254', 'windows-1255', 'windows-1256', 'windows-1257', 'windows-1258',
  'koi8-r', 'koi8-u',
  'gbk', 'big5', 'euc-jp', 'shift_jis', 'euc-kr',
]);

function normalizeCharset(charset: string): string {
  if (charset === 'iso-8859-1') return 'windows-1252';
  return charset;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    if (!body || typeof body.text !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid "text" field in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const charset = (typeof body.charset === 'string' ? body.charset : 'utf-8').toLowerCase();

    if (!SUPPORTED_CHARSETS.has(charset)) {
      return new Response(JSON.stringify({ error: `Unsupported charset: "${charset}"` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const effectiveCharset = normalizeCharset(charset);

    if (effectiveCharset === 'ascii') {
      for (const ch of body.text) {
        if (ch.charCodeAt(0) > 0x7f) {
          return new Response(JSON.stringify({ error: 'Input contains non-ASCII characters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    const buf = iconv.encode(body.text, effectiveCharset);
    const encoded = buf.toString('base64');

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
