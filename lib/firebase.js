var firebase = require('firebase-admin');

firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_URL,
    "client_x509_cert_url": process.env.CERT_URL
  }),
  databaseURL: process.env.DATABASE_URL
});

class Firebase {
  constructor(){
    this.db = firebase.database;
    this.initData();
  }

  initData(){
    this.storage = {};
    this.db().ref('storage').once('value').then(snapshot => {
      this.storage = snapshot.val();
    });

    this.db().ref('storage').on('value', snapshot => {
      this.storage = snapshot.val();
    });
  }

  get(key){
    return this.storage.hasOwnProperty(key) ? this.storage[key] : null;
  }

  set(key, value){
    this.db().ref('storage/' + key).set(value);
    return this.get('storage/' + key);
  }
}

module.exports = new Firebase();