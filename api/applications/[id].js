const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASS = process.env.ADMIN_PASS || '301062Ki';

export default async function handler(req, res) {
  const { id } = req.query || {};
  if (!id) return res.status(400).json({ error: 'id required' });

  if (req.method === 'PATCH') {
    const pass = req.headers['x-admin-pass'];
    if (!pass || pass !== ADMIN_PASS) return res.status(401).json({ error: 'unauthorized' });

    const updates = req.body || {};
    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/applications?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify(updates)
      });
      const data = await resp.json();
      if (!resp.ok) return res.status(resp.status).json({ error: data });
      return res.status(200).json(data[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'server error' });
    }
  }

  if (req.method === 'DELETE') {
    const pass = req.headers['x-admin-pass'];
    if (!pass || pass !== ADMIN_PASS) return res.status(401).json({ error: 'unauthorized' });

    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/applications?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=representation'
        }
      });
      const data = await resp.json().catch(() => null);
      if (!resp.ok) return res.status(resp.status).json({ error: data });
      return res.status(200).json({ deleted: true, data: data[0] || null });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'server error' });
    }
  }

  res.setHeader('Allow', 'PATCH');
  res.status(405).end('Method Not Allowed');
}
