import { Injectable } from '@angular/core';
import * as SecureStorage from 'secure-web-storage';
// import SecureStorage from 'secure-web-storage';
import CryptoJs from 'crypto-js';
const SECRET_KEY = 'secret_key';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key): any {
      key = CryptoJs.SHA256(key, SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJs.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJs.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJs.enc.Utf8);
      return data;
    },
  });
}
