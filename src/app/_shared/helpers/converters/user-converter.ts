import { User } from '../../models/user.model';
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from '@angular/fire/firestore';

export const userConverter = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      first: data['first'],
      middle: data['middle'],
      last: data['last'],
      born: data['born'],
    };
  },
  toFirestore(data: User): DocumentData {
    return {
      first: data.first,
      middle: data.middle,
      last: data.last,
      born: data.born,
    };
  },
};
