var firebase = require('firebase-admin');

firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": "awesammcoder-github-io-server",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": "firebase-adminsdk-31nmb@awesammcoder-github-io-server.iam.gserviceaccount.com",
    "client_id": "108547492370632521029",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-31nmb%40awesammcoder-github-io-server.iam.gserviceaccount.com"
  }),
  databaseURL: 'https://awesammcoder-github-io-server.firebaseio.com'
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