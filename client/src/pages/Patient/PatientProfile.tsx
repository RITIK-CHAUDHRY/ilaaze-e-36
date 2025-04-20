import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

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

interface Doctor {
  id: string;
  displayName: string;
  specialty: string;
  area: string;
  photoURL?: string;
  hospital: string;
  experience: string;
}

interface MedicalRequest {
  id?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  problemDescription: string;
  summary?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt?: string;
  patientPhone?: string;
}

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [requests, setRequests] = useState<MedicalRequest[]>([]);
  const [problemDescription, setProblemDescription] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
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
        // Fetch patient profile
        const patientRef = doc(db, "patients", user.uid);
        const patientSnap = await getDoc(patientRef);

        if (!patientSnap.exists()) {
          setError("Patient profile not found");
          navigate("/patient-profile-setup");
          setLoading(false);
          return;
        }

        const patientData = patientSnap.data() as PatientData;
        setPatient(patientData);

        // Fetch all doctors
        const doctorsQuery = query(collection(db, "doctors"));
        const doctorsSnap = await getDocs(doctorsQuery);
        const doctorsList = doctorsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Doctor[];
        setDoctors(doctorsList);

        // Fetch patient's medical requests
        const requestsQuery = query(
          collection(db, "patients", user.uid, "medicalRequests"),
          where("patientId", "==", user.uid)
        );
        const requestsSnap = await getDocs(requestsQuery);
        const requestsList = requestsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MedicalRequest[];
        setRequests(requestsList);
      } catch (err: any) {
        console.error("Error loading data:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!problemDescription.trim() || !selectedDoctorId) {
      setError("Please provide a valid problem description and select a doctor");
      return;
    }

    const user = auth.currentUser;
    if (!user || !patient) {
      setError("Authentication failed or patient data missing");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
      if (!selectedDoctor) {
        throw new Error("Selected doctor not found");
      }

      // Create the request object
      const newRequest: MedicalRequest = {
        patientId: user.uid,
        patientName: patient.name,
        doctorId: selectedDoctorId,
        doctorName: selectedDoctor.displayName,
        problemDescription: problemDescription.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patientPhone: patient.phoneNumber,
        ...(patient.photoURL && { patientPhotoURL: patient.photoURL }),
      };

      // Create a batched write
      const batch = writeBatch(db);

      // 1. Add to central medicalRequests collection
      const medicalRequestsRef = collection(db, "medicalRequests");
      const requestRef = doc(medicalRequestsRef);
      batch.set(requestRef, newRequest);

      // 2. Add to patient's subcollection
      const patientRequestRef = doc(
        collection(db, "patients", user.uid, "medicalRequests"),
        requestRef.id
      );
      batch.set(patientRequestRef, newRequest);

      // 3. Add to doctor's subcollection
      const doctorRequestRef = doc(
        collection(db, "doctors", selectedDoctorId, "patientRequests"),
        requestRef.id
      );
      batch.set(doctorRequestRef, newRequest);

      await batch.commit();

      // Call backend summarization API
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: problemDescription.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      const summary = data.summary;

      // Update Firestore document with summary
      const updatedRequest = { ...newRequest, summary };

      // Update all three locations with summary
      await Promise.all([
        // Update central medicalRequests collection
        updateDoc(requestRef, { summary }),
        // Update patient's subcollection
        updateDoc(patientRequestRef, { summary }),
        // Update doctor's subcollection
        updateDoc(doctorRequestRef, { summary }),
      ]);

      // Update local state with summary
      setRequests([...requests, { ...updatedRequest, id: requestRef.id }]);
      setProblemDescription("");
      setSelectedDoctorId("");
    } catch (err: any) {
      console.error("Error submitting request:", err);
      setError(`Failed to submit request: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading your profile...
          </p>
        </div>
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
            <Button
              onClick={() => window.location.reload()}
              className="ml-auto"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patient.photoURL} />
                <AvatarFallback>
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription>
                  {patient.area} • {patient.gender} • {patient.height}cm •{" "}
                  {patient.weight}kg
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/patient-dashboard/edit")}
            >
              Edit Profile
            </Button>
          </CardHeader>
        </Card>

        {/* Medical Request Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Medical Request</CardTitle>
            <CardDescription>
              Describe your symptoms and select a doctor. Our AI will summarize
              your request for the doctor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="space-y-2">
                <Label>Describe Your Symptoms</Label>
                <Textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Be as detailed as possible about your symptoms, duration, and any related concerns..."
                  rows={6}
                  className="min-h-[150px]"
                  required
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This will be processed by our AI to create a concise summary
                  for the doctor.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Select a Doctor</Label>
                <Select
                  value={selectedDoctorId}
                  onValueChange={setSelectedDoctorId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-60">
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={doctor.photoURL} />
                              <AvatarFallback>
                                {doctor.displayName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {doctor.displayName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {doctor.specialty} • {doctor.area}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Medical Requests History */}
        <Card>
          <CardHeader>
            <CardTitle>Your Medical Requests</CardTitle>
            <CardDescription>
              Status of your submitted requests to doctors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                You haven't submitted any medical requests yet.
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => {
                  const statusVariant =
                    request.status === "accepted"
                      ? "default"
                      : request.status === "rejected"
                      ? "destructive"
                      : "secondary";

                  return (
                    <Card key={request.id} className="border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Dr. {request.doctorName}
                            </CardTitle>
                            <CardDescription>
                              Submitted on{" "}
                              {format(
                                new Date(request.createdAt),
                                "MMM d, yyyy h:mm a"
                              )}
                            </CardDescription>
                          </div>
                          <Badge variant={statusVariant}>
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm">
                              Your Description:
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {request.problemDescription}
                            </p>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-medium text-sm">AI Summary:</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {request.summary || "Generating summary..."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      {request.status === "accepted" && (
                        <CardFooter>
                          <Button variant="outline" size="sm">
                            Schedule Appointment
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Available Doctors</CardTitle>
            <CardDescription>Specialists you can consult with</CardDescription>
          </CardHeader>
          <CardContent>
            {doctors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No doctors available at the moment.
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                  {doctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctor.photoURL} />
                          <AvatarFallback>
                            {doctor.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {doctor.displayName}
                          </CardTitle>
                          <CardDescription>
                            {doctor.specialty} • {doctor.experience} experience
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center">
                            <span className="w-24 text-gray-500">
                              Hospital:
                            </span>
                            <span>{doctor.hospital}</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-24 text-gray-500">
                              Location:
                            </span>
                            <span>{doctor.area}</span>
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDoctorId(doctor.id);
                            document
                              .getElementById("problem-description")
                              ?.focus();
                          }}
                        >
                          Request Consultation
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;