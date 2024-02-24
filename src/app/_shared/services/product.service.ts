import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { Collection } from '../enums/collection';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async create(user: User): Promise<void> {
    try {
      console.log('Writing document...');

      const docRef = await addDoc(
        collection(this.firestore, Collection.Users),
        user
      );

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  }

  async getProducts(): Promise<User[]> {
    let users: User[] = [];

    try {
      const querySnapshot = await getDocs(
        collection(this.firestore, Collection.Users)
      );

      querySnapshot.docs.map((doc) => {
        users.push({
          first: doc.get('first'),
          middle: doc.get('middle'),
          last: doc.get('last'),
          born: doc.get('born'),
        });
      });

      return users;
    } catch (e) {
      console.error('Error getting products: ', e);
      throw e;
    }
  }

  getProductsObservable(): Observable<any[]> {
    try {
      return collectionData(collection(this.firestore, Collection.Users));
    } catch (e) {
      console.error('Error getting products observable: ', e);
      throw e;
    }
  }
}
