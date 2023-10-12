import { FirebaseAuth } from "./config";
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        //  const credential = GoogleAuthProvider.credentialFromResult(result);
        
        const { displayName, uid, photoURL, email } = result.user;
        
        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {
        const errorCode = error.error;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
            errorCode

            
        }
    }
}

export const registerUserWithEmailPassword = async ({email,password,displayName}) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const { photoURL, uid } = resp.user;
        
        //TODO: actualizar el displayName en Firebase//
        
        await updateProfile(FirebaseAuth.currentUser, { displayName });   

        return {
            ok: true,
            uid,
            photoURL,
            displayName,
            email,
        }

        
        
    } catch (error) {
        return {
            ok: false,
            error:error.message,
        }
    }
}
export const loginWithEmailPassword = async ({email,password}) => {
    
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, displayName, photoURL } = resp.user;
        
        return {
            ok: true,
            uid,
            displayName,
            photoURL,
        }

    } catch (error) {
        return {
            ok: false,
            error: error.message,
        }
    }
    
}
export const logoutFireBase = async() => {
    return await FirebaseAuth.signOut();
}
