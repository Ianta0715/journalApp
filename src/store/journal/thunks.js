import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { addNewEmpyNote, deleteNoteById, isSavingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSavingNotes, updateNote } from "./";
import { fileUploud, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        
        dispatch(isSavingNote());
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        await setDoc(newDoc, newNote);
         
        newNote.id = newDoc.id;

        //dispatch//
        dispatch(addNewEmpyNote(newNote));
        dispatch(setActiveNote(newNote));
       

    }
}

export const startLoadingNotes = () => {
    return async( dispatch,getState ) => {
        
        const { uid } = getState().auth;
        if (!uid) throw new Error('the UID of the user does not exist');
        
        const notes = await loadNotes(uid);

        //dispatch//
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        
        dispatch(setSavingNotes());


        const { uid } = getState().auth;
        const { activeNote: note } = getState().journal;
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
      

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));

        
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {

        dispatch(setSavingNotes());

       // await fileUploud(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUploud(file));
            
        }
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
        
    }
}

export const startDeletingNote = () => {
    return async (dispatch,getState) => {
        const { uid } = getState().auth;
        const { activeNote: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);
        
        dispatch(deleteNoteById(note.id))
        
    }
}