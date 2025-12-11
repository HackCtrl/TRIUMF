// On Vercel: requests to /api/* are handled by serverless functions (api/ folder)
// Locally: requests to /api/* fall back to localStorage if no local server
const API_BASE = '';
const LOCAL_KEY = 'boxing_club_applications_v1';

function readLocal() {
  try {
    const txt = localStorage.getItem(LOCAL_KEY) || '[]';
    return JSON.parse(txt);
  } catch (e) {
    return [];
  }
}

function writeLocal(arr) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error('localStorage write failed', e);
  }
}

// apiFetch: try network first; if network unavailable, fallback to localStorage
export default async function apiFetch(path, opts = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const method = (opts.method || 'GET').toUpperCase();
  const TIMEOUT = 2000; // ms

  // helper to perform fetch with timeout
  const doFetchWithTimeout = async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);
    try {
      const res = await fetch(url, { signal: controller.signal, ...opts });
      clearTimeout(id);
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        const err = new Error(`API ${res.status} ${res.statusText}`);
        err.status = res.status;
        err.body = text;
        throw err;
      }
      return res.json().catch(() => null);
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  try {
    const result = await doFetchWithTimeout();
    return result;
  } catch (networkErr) {
    // Network failure or server not running — fallback to local mode
    console.warn('Network API failed, switching to localStorage fallback:', networkErr);

    // POST /api/applications -> save locally and return created item
    if (path.endsWith('/api/applications') && method === 'POST') {
      const body = opts.body ? JSON.parse(opts.body) : {};
      const db = readLocal();
      const entry = {
        id: Date.now().toString(),
        name: body.name || '',
        username: body.username || '',
        phone: body.phone || '',
        direction: body.direction || '',
        status: 'new',
        createdAt: new Date().toISOString(),
        _local: true,
      };
      db.unshift(entry);
      writeLocal(db);
      return entry;
    }

    // GET /api/applications -> return local entries (only if admin header provided)
    if (path.endsWith('/api/applications') && method === 'GET') {
      // allow AdminPanel which already validates password on client side
      return readLocal();
    }

    // PATCH /api/applications/:id -> update local entry
    if (path.match(/\/api\/applications\/[^\/]+$/) && method === 'PATCH') {
      const id = path.split('/').pop();
      const body = opts.body ? JSON.parse(opts.body) : {};
      const db = readLocal();
      const idx = db.findIndex((x) => x.id === id);
      if (idx === -1) throw networkErr;
      db[idx] = { ...db[idx], ...body };
      writeLocal(db);
      return db[idx];
    }

    // DELETE /api/applications -> clear all local entries
    if (path.endsWith('/api/applications') && method === 'DELETE') {
      const db = [];
      writeLocal(db);
      return { deleted: true };
    }

    // DELETE /api/applications/:id -> delete single local entry
    if (path.match(/\/api\/applications\/[^\/]+$/) && method === 'DELETE') {
      const id = path.split('/').pop();
      let db = readLocal();
      const before = db.length;
      db = db.filter((x) => x.id !== id);
      writeLocal(db);
      return { deleted: db.length < before };
    }

    // otherwise rethrow the original error
    throw networkErr;
  }
}
