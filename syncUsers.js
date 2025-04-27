const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rentcars-1077b.firebaseio.com'
});

async function syncUsers() {
  let nextPageToken;
  do {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    for (const user of result.users) {
      await admin.firestore().collection('users').doc(user.uid).set({
        email: user.email
      }, { merge: true });
      console.log('Eklendi:', user.email);
    }
    nextPageToken = result.pageToken;
  } while (nextPageToken);
  console.log('Tüm kullanıcılar Firestore\'a eklendi!');
}

syncUsers(); 