import { Button } from '@/components/ui/button';
import { auth, db, googleAuthProvider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/Icons';


const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<'doctor' | 'patient' | null>(null);

  const handleSignInWithGoogle = async (role: 'doctor' | 'patient') => {
    try {
      setIsLoading(role);
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      await setDoc(doc(db, `${role}s`, user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: role,
        createdAt: new Date().toISOString(),
      });

      navigate(`/${role}-profile-setup`);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center space-y-2">
            <Icons.logo className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              Welcome to Ilaaz-e-36
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Continue with Google to access your account
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-center space-x-2 h-12"
              onClick={() => handleSignInWithGoogle('doctor')}
              disabled={isLoading !== null}
            >
              {isLoading === 'doctor' ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Icons.google className="h-5 w-5" />
                  <span>Continue as Doctor</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-center space-x-2 h-12"
              onClick={() => handleSignInWithGoogle('patient')}
              disabled={isLoading !== null}
            >
              {isLoading === 'patient' ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Icons.google className="h-5 w-5" />
                  <span>Continue as Patient</span>
                </>
              )}
            </Button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;