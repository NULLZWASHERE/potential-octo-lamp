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

  // Handle GET: Send the current list of messages
  if (req.method === 'GET') {
    return res.status(200).json({ messages });
  }

  // Handle POST: Add a new message with a unique client ID tag
  if (req.method === 'POST') {
    const { sender, text, clientId } = req.body;

    const newMessage = {
      sender: sender || 'Anon',
      text: text || '',
      clientId: clientId || 'unknown',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    messages.push(newMessage);
    return res.status(201).json({ success: true, message: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
