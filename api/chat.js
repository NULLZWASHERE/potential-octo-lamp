export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET: Always return an empty list so nothing is ever saved
  if (req.method === 'GET') {
    return res.status(200).json({ messages: [] });
  }

  // Handle POST: Accept the message but don't store it anywhere
  if (req.method === 'POST') {
    const { sender, text } = req.body;

    const newMessage = {
      sender: sender || 'Anon',
      text: text || '',
      timestamp: new Date().toLocaleTimeString()
    };

    return res.status(201).json({ success: true, message: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
