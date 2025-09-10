export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    try {
      // Use the Neynar API to fetch users
      const neynarApiKey = 'DIA557C9-F55E-42F3-8987-0F2CA80DD4E';
      const neynarClientId = '30719794-4961-4a3a-9aeb-c0e33086a64e';
      const response = await fetch('https://snapchain-api.neynar.com/v1/users', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': neynarApiKey,
          'x-client-id': neynarClientId,
        },
      });
      const data = await response.json();

      return res.json({ success: true, users: data.users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  res.status(405).end();
};
