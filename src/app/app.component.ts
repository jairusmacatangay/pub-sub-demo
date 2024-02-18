import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  getDocs,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

interface User {
  first: string;
  middle?: string;
  last: string;
  born: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'firebase-app';

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  users: User[] = [];
  users$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);

    const userCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userCollection);
    console.log('typeof users$', typeof this.users$);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async addDocument(): Promise<void> {
    const user: User = {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    };

    await this.createUser(user);
  }

  async addDocument2(): Promise<void> {
    const user: User = {
      first: 'Alan',
      middle: 'Mathison',
      last: 'Turing',
      born: 1912
    };

    await this.createUser(user);
  }

  async createUser(user: User): Promise<void> {
    try {
      console.log('Writing document...');

      const docRef = await addDoc(collection(this.firestore, 'users'), user);

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));

    querySnapshot.docs.map(doc => {
      this.users.push({
        first: doc.get('first'),
        middle: doc.get('middle'),
        last: doc.get('last'),
        born: doc.get('born')
      });
    });
  }
}
