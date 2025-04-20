import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/shared/Navbar";

interface MedicalRequest {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  problemDescription: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  patientPhotoURL?: string;
  summary?: string;
  patientPhone?: string;
  patientArea?: string;
}

const PatientRequests: React.FC = () => {
  const [requests, setRequests] = useState<MedicalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

 
  const [debugInfo, setDebugInfo] = useState({
    doctorUid: "",
    queryPath: "",
    foundDocs: 0,
  });

  const fetchRequests = async (doctorUid: string) => {
    try {
      const q = query(
        collection(db, "medicalRequests"),
        where("doctorId", "==", doctorUid),
        where("status", "in", ["pending", "accepted", "rejected"])
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MedicalRequest[];
    } catch (err) {
      console.error("Firestore error:", err);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("Doctor not authenticated");
        setLoading(false);
        return;
      }

      try {
        const requestsData = await fetchRequests(user.uid);
        setRequests(requestsData);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests. Check console for details.");
        console.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (
    requestId: string,
    newStatus: "accepted" | "rejected"
  ) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("You must be logged in");
        return;
      }

      const batch = writeBatch(db);

      
      const medicalRequestRef = doc(db, "medicalRequests", requestId);
      batch.update(medicalRequestRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        ...(responseMessage && { doctorResponse: responseMessage }),
      });

    
      const request = requests.find((r) => r.id === requestId);
      if (request) {
      
        const patientRequestRef = doc(
          db,
          "patients",
          request.patientId,
          "medicalRequests",
          requestId
        );
        batch.update(patientRequestRef, {
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...(responseMessage && { doctorResponse: responseMessage }),
        });

       
        const doctorRequestRef = doc(
          db,
          "doctors",
          user.uid,
          "patientRequests",
          requestId
        );
        batch.update(doctorRequestRef, {
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...(responseMessage && { doctorResponse: responseMessage }),
        });
      }

      await batch.commit();

      
      setRequests(
        requests.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );

      setActiveRequestId(null);
      setResponseMessage("");
    } catch (err) {
      console.error("Error updating request:", err);
      setError("Failed to update request");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Error Loading Requests
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-medium mb-2">Debug Information:</h3>
              <pre className="text-xs text-gray-700">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Patient Requests</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Doctor ID: {debugInfo.doctorUid.substring(0, 6)}...
            </Badge>
            <Badge variant="outline">Found: {requests.length} requests</Badge>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              No Patient Requests Found
            </h2>
            <p className="text-gray-500 mb-4">
              When patients send you requests, they'll appear here.
            </p>
            <div className="bg-white p-4 rounded border max-w-md mx-auto text-left">
              <h3 className="font-medium mb-2">Troubleshooting:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Verify patients have submitted requests to you</li>
                <li>
                  Check Firestore database at:{" "}
                  <code className="bg-gray-100 px-1">
                    doctors/{debugInfo.doctorUid}/patientRequests
                  </code>
                </li>
                <li>Ensure your Firebase security rules allow read access</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card
                key={request.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={request.patientPhotoURL} />
                      <AvatarFallback>
                        {request.patientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{request.patientName}</CardTitle>
                      <CardDescription>
                        {request.patientArea && `${request.patientArea} • `}
                        {request.patientPhone && `${request.patientPhone} • `}
                        {format(
                          new Date(request.createdAt),
                          "MMM d, yyyy h:mm a"
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      request.status === "accepted"
                        ? "default"
                        : request.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status.toUpperCase()}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Problem Description:</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {request.problemDescription}
                      </p>
                    </div>

                    {request.summary && (
                      <div>
                        <h3 className="font-medium mb-2">AI Summary:</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {request.summary}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>

                {request.status === "pending" && (
                  <CardFooter className="flex flex-col gap-4">
                    <Separator />
                    <Textarea
                      placeholder="Add your response or notes..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className={
                        activeRequestId === request.id ? "block" : "hidden"
                      }
                    />
                    <div className="flex justify-end gap-2">
                      {activeRequestId === request.id ? (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => setActiveRequestId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            onClick={() =>
                              handleStatusChange(request.id, "accepted")
                            }
                          >
                            Accept Request
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleStatusChange(request.id, "rejected")
                            }
                          >
                            Reject Request
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => setActiveRequestId(request.id)}
                        >
                          Respond to Request
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRequests;