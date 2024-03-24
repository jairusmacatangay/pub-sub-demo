import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UpsertUser } from "../requests/upsert-user.request";

export interface IUserService {
  create(user: UpsertUser): Promise<void>;
  update(id: string, user: UpsertUser): Promise<void>;
  delete(id: string): Promise<void>;
  getUser(id: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  getUsersObservable(): Observable<any[]>;
}