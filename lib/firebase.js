var firebase = require('firebase-admin');

firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": "awesammcoder-github-io-server",
    "private_key_id": "ddfb892d8eb30cd81cfc53ce359eb24fc1d8d29c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvTK/gap774wAS\n1NvqNsXIvgLPwLXcUtYi+C8s8D9crN939SMa8STUTcd56RrfpwMSyByDeLpP34zp\nYlSREs1eYUOLmZ69xFVW9hxUQcPq2AjFcQTvniIi1qutvjNSr5/kxdfhL9OZdMsK\nI5jPngXfPvu/F+zPbPjOA8wKnHOv+XVYqH1jNAfqi2BashkkeHuyFUvJrRP6lHD/\nulYmLal3WdlqHbv9CEjbvAZc+XN3YovSXzz++ZIQsFskPYgqzfK5YlZ2o+DmLM/Z\nvMkd4dSRE5Ov/BRmDGcY9GTPE3FiXANpN/QR2tYPDnwYqeRE2ONJsNnPH8gglO2u\n6MpDUZWfAgMBAAECggEAJleZLnZTsNd9WCEbutZhG1/IIKXPgVHTCZIMS4F+8mfT\ndxr0ozt0aUVb6KPeX2XZy71eUzlQUxEb8p4xzgt1RPv0OLAQowQzAFLTbnB2CENZ\nY8otILYPVFxs75MnCaJlUDYf2l7KIwoDMQQJM/wl36cYjDsQ7muw3erBsd53hVkn\nrbhQrQYDC29gyEGsVhoAum6IMRUgVRQocb/PxSoc2hgEYcOA07hVLLJdxysCWBas\nSOgBKPAMsGycAFdiDeiUa7FEgyWPEBhv/rHweBmPQYrqteiFK5nrGd+wUH9FAiOS\nEo6NAcR3Db0XD6NGtD0D0vJqaX3sGkH2HQMH9VyDxQKBgQDXAGyDTG1vCINXFRJ1\n1JYAOkSqillZz95Mn744tmlNz2b39IDNTyOR59jKA+VC+9ES7+qlBgN+hefpfnaB\n2UpQoVH+gMz/l/tQJ7vvKGI/VKQCQ2Uyg2JFoSvtBdcWAclX6zLk8zZ7WeCaVmIj\nhHPa6wF3ftqHPEtPpGWVBpt/1QKBgQDQuifFc9Fft5mJ4+HLhEboFCp8O4a+NU+c\n86N4sAjmj0v2PgdlsA94lF40VCK+iBG6nP8f87mMxQHIGFF6gQIBsDyzpB2CPTov\ng9IzYySsmk8BrhwnYa9p09B3I8wc6r8nJVIem1D3AZPXsPgIe2R4Ednxz/clOZTA\npLRkZ5vtowKBgQCMOtmL1bh2uA26KaNNuSdQ5LBOr0fR3VN3lKUkJk2Ok5zsUswD\nnP9tNdPfByVsSAQ4nsTjd4Wl6z60u2geDxR6fI2XOnj6qC0hPZlFRoi2F8WVOFHz\n3V+mXJXi1XFRCD9DmcMrMzqwv5FP+NGvqr9J5Qei4dk0ZW4VdvtOdO3NNQKBgGmW\nkkH3meYi2cAAkJvEmZ4TfX6FGl+kVlbehUarPoVr3hB+Rn2xd9IWtCUinsTlzpop\ni4IdaDMHAiS38JfZJSu3fK2fivH0iTe6Jp6qO8Y49VizPDjL2NHfPejXKg1Cz1o9\nLfKfvXCG0sRdGMwpp6R521fRTYP+QfrGFx9nrmCjAoGAOpRomwguaKrIMy1m5/Ym\nav3AQ5J1/eqwkiCFOwpjuNgN7ZIUz8wZAXeGLzZDoYhE8cdX0v2Qpkdik99rZRoR\nuNQGpaHlUViwRhTdlnhSMRoFXpkgLHV2VYgXtpKM+MnBTmoPXtRNZzrSbGiBMJkQ\nt2F9zXKK6hlFEfzlz6JJSh8=\n-----END PRIVATE KEY-----\n",
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