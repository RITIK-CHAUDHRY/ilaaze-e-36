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
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PatientFormData {
  name: string;
  phoneNumber: string;
  area: string;
  gender: string;
  height: string;
  weight: string;
}

const PatientProfileSetup: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    phoneNumber: "",
    area: "",
    gender: "",
    height: "",
    weight: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("animate-fade-in");
    return () => {
      document.body.classList.remove("animate-fade-in");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "patients", user.uid), {
          ...formData,
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
        });
        navigate("/patient-dashboard");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-10 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 transform transition-all hover:shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600 dark:text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Complete Your Patient Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Help us provide you with better healthcare services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
       
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

         
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+91-XXXXXXXXXX"
              required
              pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll use this for appointment reminders
            </p>
          </div>

          
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">City</Label>
            <Select onValueChange={(val) => handleSelectChange("area", val)}>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="max-h-64 overflow-y-auto bg-white dark:bg-gray-700">
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
                  <SelectItem
                    key={city}
                    value={city}
                    className="hover:bg-green-50 dark:hover:bg-green-900/50"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Gender</Label>
            <Select onValueChange={(val) => handleSelectChange("gender", val)}>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700">
                <SelectItem
                  value="male"
                  className="hover:bg-green-50 dark:hover:bg-green-900/50"
                >
                  Male
                </SelectItem>
                <SelectItem
                  value="female"
                  className="hover:bg-green-50 dark:hover:bg-green-900/50"
                >
                  Female
                </SelectItem>
                <SelectItem
                  value="others"
                  className="hover:bg-green-50 dark:hover:bg-green-900/50"
                >
                  Others
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="height"
                className="text-gray-700 dark:text-gray-300"
              >
                Height (cm)
              </Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 170"
                min="100"
                max="250"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="weight"
                className="text-gray-700 dark:text-gray-300"
              >
                Weight (kg)
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 65"
                min="30"
                max="200"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Profile...
                </>
              ) : (
                "Complete Profile Setup"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileSetup;