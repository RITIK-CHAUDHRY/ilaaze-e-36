import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc, WithFieldValue } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



interface DoctorData {
  displayName: string;
  experience: string;
  specialty: string;
  hospital: string;
  certificate: string;
  gender: string;
  photo: string;
  age: string;
  area: string;
  phoneNo: string;
}

const DoctorProfile: React.FC = () => {
  const [doctor,setDoctor] = useState<DoctorData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async()=> {
      const user = auth.currentUser;

      if(!user) return navigate("/");

      const docRef = doc(db, "doctors", user.uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        setDoctor(docSnap.data() as DoctorData);
      }
      setLoading(false);
    };

    fetchDoctorData();

  }, [navigate]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setDoctor((prev) => prev ? { ...prev, [name]: value} : prev);
  }

  const handleUpdate = async () => {
    const user = auth.currentUser;

    if(!user || !doctor) return;

    try{
      const docRef = doc(db,"doctors", user.uid);
      await updateDoc(docRef, doctor as any);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch(err) {
      console.log("Update error:", err);
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">Doctor Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctor &&
            Object.entries(doctor).map(([key, value]) => (
              <div key={key}>
                <Label className="capitalize">{key}</Label>
                <Input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            ))}
        </CardContent>

        <div className="flex justify-end gap-4 p-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

export default DoctorProfile