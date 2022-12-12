import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  query,
  collection,
  QuerySnapshot,
  getDocs
} from 'firebase/firestore';
import { Tag } from '../../types/Tag';

enum Collections {
  TAGS = '/tags'
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export interface FirebaseClass {
  app: FirebaseApp | null;
  db: Firestore | null;
  getTags: () => Promise<Tag[]>;
  setTag: (data: Tag) => Promise<Tag>;
  deleteTag: (id: string) => Promise<void>;
}

class Firebase implements FirebaseClass {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  getTags = async (): Promise<Tag[]> => {
    const ref = collection(this.db, Collections.TAGS);
    const q = query(ref);
    const querySnapshot: QuerySnapshot = await getDocs(q);

    const data: Tag[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, name: doc.data().name });
    });

    return data;
  };

  setTag = async (data: Tag): Promise<Tag> => {
    await setDoc(doc(this.db, Collections.TAGS, data.id), { ...data });
    return data;
  };

  deleteTag = async (id: string): Promise<void> => {
    await deleteDoc(doc(this.db, Collections.TAGS, id));
  };
}

export default Firebase;
