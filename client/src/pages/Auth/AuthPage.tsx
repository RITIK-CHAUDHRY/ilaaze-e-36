import { Button } from '@/components/ui/button';
import { auth, db, googleAuthProvider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthPage : React.FC = () => {
  const navigate  = useNavigate();
  

  const handleSignInWithGoogle = async (role: string) => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user

      await setDoc(doc(db, role + 's', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: role,
      });

      console.log("Signed in user:", user);
      navigate(`/${role}-profile-setup`);
    } catch(error : any) {
      console.log("Error in signing with google:", error);
    }
  }

  return (
    <div>
      <h1>Authentication</h1>
      <Button onClick={() => handleSignInWithGoogle('doctor')}> Sign in as Doctor </Button>
      <Button onClick={() => handleSignInWithGoogle('patient')}> Sign in as Patient </Button>
    </div>
  )
}

export default AuthPage