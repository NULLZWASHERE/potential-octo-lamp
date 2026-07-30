import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  
  const cookies = cookie.parse(req.headers.cookie || '');
  const user = cookies.auth_user;

  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(401).json({ error: 'Not authenticated' });
}
