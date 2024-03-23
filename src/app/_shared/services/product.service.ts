import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Collection } from '../enums/collection';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UpsertUser } from '../requests/upsert-user.request';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // TODO: Create an interface for this
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async create(user: UpsertUser): Promise<void> {
    try {
      await addDoc(collection(this.firestore, Collection.Users), user);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  }

  async update(id: string, user: UpsertUser): Promise<void> {
    try {
      const docRef = doc(this.firestore, Collection.Users, id);

      await updateDoc(docRef, {
        first: user.first,
        middle: user.middle,
        last: user.last,
        born: user.born,
      });
    } catch (e) {
      console.error('Error updating document: ', e);
      throw e;
    }
  }

  async getProduct(id: string): Promise<User | undefined> {
    let user: User | undefined;

    const docRef = doc(this.firestore, Collection.Users, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error('Document does not exist');
      return undefined;
    }

    // TODO: create a class and have a converter method
    user = {
      id: docSnap.id,
      first: docSnap.get('first'),
      middle: docSnap.get('middle'),
      last: docSnap.get('last'),
      born: docSnap.get('born'),
    };

    return user;
  }

  async getProducts(): Promise<User[]> {
    let users: User[] = [];

    try {
      const querySnapshot = await getDocs(
        collection(this.firestore, Collection.Users)
      );

      querySnapshot.docs.map((doc) => {
        users.push({
          id: doc.id,
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
