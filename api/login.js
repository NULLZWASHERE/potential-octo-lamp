import cookie from 'cookie';
global.users = global.users || [];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const userRecord = global.users.find(u => u.username === username && u.password === password);

  if (!userRecord) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.setHeader('Set-Cookie', cookie.serialize('auth_user', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  }));

  return res.status(200).json({ success: true, username });
}
