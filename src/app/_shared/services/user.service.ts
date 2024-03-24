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
  deleteDoc,
} from '@angular/fire/firestore';
import { Collection } from '../enums/collection';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UpsertUser } from '../requests/upsert-user.request';
import { IUserService } from '../interfaces/user-service.interface';
import { userConverter } from '../helpers/converters/user-converter';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async create(user: UpsertUser): Promise<void> {
    try {
      await addDoc(collection(this.firestore, Collection.Users), user);
    } catch (e) {
      console.error('Error adding user: ', e);
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
      console.error('Error updating user: ', e);
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, Collection.Users, id));
    } catch (e) {
      console.error('Error deleting user: ', e);
      throw e;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const docRef = doc(this.firestore, Collection.Users, id).withConverter(
      userConverter
    );
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error('User does not exist');
      return undefined;
    }

    return docSnap.data();
  }

  async getUsers(): Promise<User[]> {
    let users: User[] = [];

    try {
      const docRef = collection(this.firestore, Collection.Users).withConverter(
        userConverter
      );

      const querySnapshot = await getDocs(docRef);

      querySnapshot.docs.map((doc) => users.push(doc.data()));

      return users;
    } catch (e) {
      console.error('Error getting users: ', e);
      throw e;
    }
  }

  getUsersObservable(): Observable<any[]> {
    try {
      return collectionData(collection(this.firestore, Collection.Users));
    } catch (e) {
      console.error('Error getting users observable: ', e);
      throw e;
    }
  }
}
