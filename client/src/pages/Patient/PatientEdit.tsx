import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface PatientData {
  name: string;
  phoneNumber: string;
  area: string;
  gender: string;
  height: string;
  weight: string;
  email?: string;
  photoURL?: string;
  createdAt?: string;
}

const PatientEditPage: React.FC = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [formData, setFormData] = useState<PatientData>({
    name: "",
    phoneNumber: "",
    area: "",
    gender: "",
    height: "",
    weight: "",
    email: "",
    photoURL: ""
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setError("User not authenticated");
        navigate("/auth");
        setLoading(false);
        return;
      }

      try {
        const patientRef = doc(db, "patients", user.uid);
        const patientSnap = await getDoc(patientRef);

        if (!patientSnap.exists()) {
          setError("Patient profile not found");
          navigate("/patient-profile-setup");
          return;
        }

        const patientData = patientSnap.data() as PatientData;
        setPatient(patientData);
        setFormData({
          name: patientData.name,
          phoneNumber: patientData.phoneNumber,
          area: patientData.area,
          gender: patientData.gender,
          height: patientData.height,
          weight: patientData.weight,
          email: patientData.email || user.email || "",
          photoURL: patientData.photoURL || ""
        });
      } catch (err: any) {
        console.error("Error loading patient data:", err);
        setError(`Failed to load profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      await setDoc(doc(db, "patients", user.uid), {
        ...formData,
        email: user.email,
        updatedAt: new Date().toISOString(),
        createdAt: patient?.createdAt || new Date().toISOString()
      });

      navigate("/patient-profile");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(`Failed to update profile: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/")}>Return Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Patient Profile</CardTitle>
          <CardDescription>
            Update your personal information and medical details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.photoURL} />
                <AvatarFallback>
                  {formData.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="w-full max-w-xs">
                <Label htmlFor="photoURL">Profile Photo URL</Label>
                <Input
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="100"
                  max="250"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="30"
                  max="300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>City/Area</Label>
                <Input
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-4">{error}</div>
            )}

            <CardFooter className="flex justify-end gap-4 px-0 pb-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/patient-profile")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientEditPage;