const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getAllUsers = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  // 1. Kimlik doğrulama: Authorization: Bearer <ID_TOKEN>
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // 2. Sadece adminler erişebilsin (örnek: e-posta veya custom claim ile)
    if (
      decoded.email !== 'mthnrsy@gmail.com' &&
      (!decoded.role || !['owner', 'admin-orta', 'admin-alt'].includes(decoded.role))
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // 3. Tüm kullanıcıları çek
    let users = [];
    let nextPageToken;
    do {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      users = users.concat(result.users.map(u => ({ uid: u.uid, email: u.email })));
      nextPageToken = result.pageToken;
    } while (nextPageToken);
    res.json({ users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}); 