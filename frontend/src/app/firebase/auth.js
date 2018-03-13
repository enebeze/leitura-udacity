import { auth } from "./firebase";

export const doSignOut = () => {
    auth.signOut();
}

export const user = auth.currentUser;