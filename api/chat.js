let messages = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ messages });
  }

  if (req.method === 'POST') {
    const { sender, text } = req.body;

    // No validation or filtering—accepts everything raw
    const newMessage = {
      sender: sender || 'Anonymous',
      text: text || '',
      timestamp: new Date().toLocaleTimeString()
    };

    messages.push(newMessage);
    return res.status(201).json({ success: true, message: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
