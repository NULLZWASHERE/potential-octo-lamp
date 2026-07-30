import cookie from 'cookie';
global.users = global.users || [];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  if (global.users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  global.users.push({ username, password });

  res.setHeader('Set-Cookie', cookie.serialize('auth_user', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  }));

  return res.status(201).json({ success: true, username });
}
