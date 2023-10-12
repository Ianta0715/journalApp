import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";

export const loadNotes = async(uid = '') => {
    if (!uid) throw new Error('the UID of the user does not exist');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
 
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
}
