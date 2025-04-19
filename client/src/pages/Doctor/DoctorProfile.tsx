import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Clock,
  Pencil,
  Plus,
  Trash2,
  Stethoscope,
  Building2,
  Award,
  Phone,
  MapPin,
  User2Icon,
} from "lucide-react";

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

interface AvailabilitySlot {
  date: string;
  start: string;
  end: string;
  id?: string;
}

interface Patient {
  id: string;
  name: string;
  problem: string;
  appointmentTime: string;
  status: "waiting" | "in-progress" | "completed";
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [newSlot, setNewSlot] = useState<AvailabilitySlot>({
    date: "",
    start: "",
    end: "",
  });
  const [editForm, setEditForm] = useState<DoctorData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  // Sample patient queue data
  const [patientQueue, setPatientQueue] = useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      problem: "Chest pain and shortness of breath",
      appointmentTime: "10:00 AM",
      status: "waiting",
    },
    {
      id: "2",
      name: "Amit Sharma",
      problem: "Irregular heartbeat and dizziness",
      appointmentTime: "10:30 AM",
      status: "waiting",
    },
    {
      id: "3",
      name: "Sarah Lee",
      problem: "High blood pressure and fatigue",
      appointmentTime: "11:00 AM",
      status: "in-progress",
    },
    {
      id: "4",
      name: "Priya Patel",
      problem: "Annual heart checkup",
      appointmentTime: "11:30 AM",
      status: "waiting",
    },
  ]);

  // Fetch doctor profile and availability slots when auth state is resolved
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setError("User not authenticated");
        navigate("/auth");
        setLoading(false);
        return;
      }

      try {
        const doctorRef = doc(db, "doctors", user.uid);
        const doctorSnap = await getDoc(doctorRef);
        if (doctorSnap.exists()) {
          const doctorData = doctorSnap.data() as DoctorData;
          setDoctor(doctorData);
          setEditForm(doctorData);
        } else {
          setError("Doctor profile not found");
          navigate("/doctor-profile-setup");
          setLoading(false);
          return;
        }

        const slotsRef = collection(db, "doctors", user.uid, "availability");
        const slotsSnap = await getDocs(slotsRef);
        const slots = slotsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AvailabilitySlot[];
        setAvailability(slots);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAddSlot = async () => {
    if (newSlot.date && newSlot.start && newSlot.end) {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not authenticated");
          return;
        }
        const slotsRef = collection(db, "doctors", user.uid, "availability");
        const docRef = await addDoc(slotsRef, newSlot);
        setAvailability([...availability, { ...newSlot, id: docRef.id }]);
        setNewSlot({ date: "", start: "", end: "" });
      } catch (err) {
        console.error("Error adding slot:", err);
        setError("Failed to add slot");
      }
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated");
        return;
      }
      await deleteDoc(doc(db, "doctors", user.uid, "availability", slotId));
      setAvailability(availability.filter((slot) => slot.id !== slotId));
    } catch (err) {
      console.error("Error deleting slot:", err);
      setError("Failed to delete slot");
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      const { name, value } = e.target;
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleEditSelectChange = (field: keyof DoctorData, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated");
        return;
      }
      await setDoc(doc(db, "doctors", user.uid), {
        ...editForm,
        uid: user.uid,
      });
      setDoctor(editForm);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePatientStatus = (id: string, status: Patient["status"]) => {
    setPatientQueue(
      patientQueue.map((patient) =>
        patient.id === id ? { ...patient, status } : patient
      )
    );
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

  if (!doctor) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Doctor Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Badge
              variant="outline"
              className="border-teal-500 text-teal-600 dark:text-teal-400"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              {doctor.specialty}
            </Badge>
            <Avatar>
              <AvatarImage src={doctor.photo} />
              <AvatarFallback>
                {doctor.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="settings">Profile Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Profile Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {doctor.displayName}
                      </CardTitle>
                      <CardDescription>{doctor.hospital}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User2Icon className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">
                        {doctor.gender}, {doctor.age} years
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">{doctor.area}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">
                        {doctor.experience} experience
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">{doctor.phoneNo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-teal-500" />
                      <span>Appointments</span>
                    </div>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span>In Progress</span>
                    </div>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-500" />
                      <span>Completed</span>
                    </div>
                    <Badge variant="secondary">0</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {availability.slice(0, 5).map((slot, idx) => (
                        <div
                          key={slot.id || idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900">
                              <CalendarIcon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                            </div>
                            <div>
                              <p className="font-medium">{slot.date}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {slot.start} - {slot.end}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSlot(slot.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
                <CardDescription>
                  Add time slots when you're available for appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newSlot.date}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={newSlot.start}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, start: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={newSlot.end}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, end: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddSlot}
                  className="mt-4"
                  disabled={!newSlot.date || !newSlot.start || !newSlot.end}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Availability Slots</CardTitle>
              </CardHeader>
              <CardContent>
                {availability.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No availability slots added yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availability.map((slot, idx) => (
                      <div
                        key={slot.id || idx}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{slot.date}</p>
                          <p className="text-sm text-gray-500">
                            {slot.start} - {slot.end}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSlot(slot.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Queue</CardTitle>
                <CardDescription>Today's appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientQueue.map((patient) => (
                    <Card key={patient.id} className="border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{patient.name}</CardTitle>
                            <CardDescription>{patient.problem}</CardDescription>
                          </div>
                          <Badge
                            variant={
                              patient.status === "in-progress"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {patient.status === "waiting"
                              ? "Waiting"
                              : patient.status === "in-progress"
                              ? "In Progress"
                              : "Completed"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          Scheduled for {patient.appointmentTime}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        {patient.status === "waiting" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              updatePatientStatus(patient.id, "in-progress")
                            }
                          >
                            Start Consultation
                          </Button>
                        )}
                        {patient.status === "in-progress" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              updatePatientStatus(patient.id, "completed")
                            }
                          >
                            Complete Consultation
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          name="displayName"
                          value={editForm?.displayName || ""}
                          onChange={handleEditChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Years of Experience</Label>
                        <Select
                          onValueChange={(val) =>
                            handleEditSelectChange("experience", val)
                          }
                          value={editForm?.experience}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "1-3 years",
                              "3-5 years",
                              "5-10 years",
                              "10+ years",
                            ].map((val) => (
                              <SelectItem key={val} value={val}>
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Specialty</Label>
                        <Select
                          onValueChange={(val) =>
                            handleEditSelectChange("specialty", val)
                          }
                          value={editForm?.specialty}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64 overflow-y-auto">
                            {[
                              "Cardiologist",
                              "Dermatologist",
                              "Neurologist",
                              "Orthopedic",
                              "Pediatrician",
                              "Psychiatrist",
                              "ENT Specialist",
                              "Ophthalmologist",
                              "Dentist",
                              "Gynecologist",
                              "Oncologist",
                              "General Physician",
                              "Pulmonologist",
                              "Urologist",
                              "Nephrologist",
                              "Endocrinologist",
                              "Rheumatologist",
                            ].map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Hospital/Clinic</Label>
                        <Input
                          name="hospital"
                          value={editForm?.hospital || ""}
                          onChange={handleEditChange}
                          placeholder="Enter hospital/clinic name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Certificate URL</Label>
                        <Input
                          name="certificate"
                          value={editForm?.certificate || ""}
                          onChange={handleEditChange}
                          placeholder="https://example.com/certificate.pdf"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          onValueChange={(val) =>
                            handleEditSelectChange("gender", val)
                          }
                          value={editForm?.gender}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Photo URL</Label>
                        <Input
                          name="photo"
                          value={editForm?.photo || ""}
                          onChange={handleEditChange}
                          placeholder="https://..."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          name="age"
                          type="number"
                          value={editForm?.age || ""}
                          onChange={handleEditChange}
                          placeholder="Enter your age"
                          required
                          min="25"
                          max="80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Practice City</Label>
                        <Select
                          onValueChange={(val) =>
                            handleEditSelectChange("area", val)
                          }
                          value={editForm?.area}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64 overflow-y-auto">
                            {[
                              "Mumbai",
                              "Delhi",
                              "Bengaluru",
                              "Hyderabad",
                              "Ahmedabad",
                              "Chennai",
                              "Kolkata",
                              "Pune",
                              "Jaipur",
                              "Lucknow",
                              "Kanpur",
                              "Nagpur",
                              "Indore",
                              "Thane",
                              "Bhopal",
                              "Visakhapatnam",
                              "Patna",
                              "Vadodara",
                              "Ghaziabad",
                              "Ludhiana",
                              "Agra",
                              "Nashik",
                              "Faridabad",
                              "Meerut",
                              "Rajkot",
                            ].map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          name="phoneNo"
                          value={editForm?.phoneNo || ""}
                          onChange={handleEditChange}
                          placeholder="+91-XXXXXXXXXX"
                          required
                          pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={doctor.photo} />
                        <AvatarFallback>
                          {doctor.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">
                          {doctor.displayName}
                        </h3>
                        <p className="text-lg text-teal-600 dark:text-teal-400">
                          {doctor.specialty}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {doctor.hospital}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">
                          Personal Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <User2Icon className="h-5 w-5 text-gray-500" />
                            <span>
                              {doctor.gender}, {doctor.age} years
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-gray-500" />
                            <span>{doctor.phoneNo}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <span>{doctor.area}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">
                          Professional Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Award className="h-5 w-5 text-gray-500" />
                            <span>{doctor.experience} experience</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Building2 className="h-5 w-5 text-gray-500" />
                            <span>{doctor.hospital}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Stethoscope className="h-5 w-5 text-gray-500" />
                            <span>Specialized in {doctor.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setIsEditing(true)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfile;