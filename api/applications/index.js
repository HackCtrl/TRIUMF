const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASS = process.env.ADMIN_PASS || '301062Ki';

export default async function handler(req, res) {
  // Allow only POST (create) and GET (admin list)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    // public endpoint to create application
    const { name, phone, direction } = req.body || {};
    if (!name || !phone) return res.status(400).json({ error: 'name and phone required' });

    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify([{ name, phone, direction, status: 'new' }])
      });

      const data = await resp.json();
      if (!resp.ok) return res.status(resp.status).json({ error: data });
      return res.status(201).json(data[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'server error' });
    }
  }

  if (req.method === 'GET') {
    // admin only: check header
    const pass = req.headers['x-admin-pass'];
    if (!pass || pass !== ADMIN_PASS) return res.status(401).json({ error: 'unauthorized' });

    try {
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/applications?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });
      const data = await resp.json();
      if (!resp.ok) return res.status(resp.status).json({ error: data });
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'server error' });
    }
  }

  res.setHeader('Allow', 'GET,POST,OPTIONS');
  res.status(405).end('Method Not Allowed');
}
