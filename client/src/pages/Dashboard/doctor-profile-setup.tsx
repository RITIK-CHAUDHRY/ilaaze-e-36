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

interface DoctorFormData {
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

const DoctorProfileSetup: React.FC = () => {
  const [formData, setFormData] = useState<DoctorFormData>({
    displayName: "",
    experience: "",
    specialty: "",
    hospital: "",
    certificate: "",
    gender: "",
    photo: "",
    age: "",
    area: "",
    phoneNo: "",
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

  const handleSelectChange = (field: keyof DoctorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "doctors", user.uid), {
          ...formData,
          uid: user.uid,
          createdAt: new Date().toISOString(),
        });
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-10 transition-all duration-300">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 transform transition-all hover:shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600 dark:text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Complete Your Doctor Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Help patients find you by providing accurate information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="displayName"
              className="text-gray-700 dark:text-gray-300"
            >
              Full Name
            </Label>
            <Input
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">
              Years of Experience
            </Label>
            <Select
              onValueChange={(val) => handleSelectChange("experience", val)}
            >
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                {["1-3 years", "3-5 years", "5-10 years", "10+ years"].map(
                  (val) => (
                    <SelectItem
                      key={val}
                      value={val}
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                    >
                      {val}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">
              Specialty
            </Label>
            <Select
              onValueChange={(val) => handleSelectChange("specialty", val)}
            >
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select your specialty" />
              </SelectTrigger>
              <SelectContent className="max-h-64 overflow-y-auto bg-white dark:bg-gray-700">
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
                  <SelectItem
                    key={specialty}
                    value={specialty}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                  >
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          
          <div className="space-y-2">
            <Label
              htmlFor="hospital"
              className="text-gray-700 dark:text-gray-300"
            >
              Hospital/Clinic
            </Label>
            <Input
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter hospital/clinic name"
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

         
          <div className="space-y-2">
            <Label
              htmlFor="certificate"
              className="text-gray-700 dark:text-gray-300"
            >
              Certificate URL
            </Label>
            <Input
              id="certificate"
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              placeholder="https://example.com/certificate.pdf"
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload your certificate to a cloud service and paste the link here
            </p>
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
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                >
                  Male
                </SelectItem>
                <SelectItem
                  value="female"
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                >
                  Female
                </SelectItem>
                <SelectItem
                  value="others"
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                >
                  Others
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-gray-700 dark:text-gray-300">
              Profile Photo URL
            </Label>
            <div className="flex gap-4">
              <Input
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://..."
                required
                className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.photo && (
                <div className="relative group">
                  <img
                    src={formData.photo}
                    alt="Profile preview"
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

        
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              min="25"
              max="80"
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

        
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">
              Practice City
            </Label>
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
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/50"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

       
          <div className="space-y-2">
            <Label
              htmlFor="phoneNo"
              className="text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <Input
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="+91-XXXXXXXXXX"
              required
              pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll use this for important notifications
            </p>
          </div>

          <div className="md:col-span-2 pt-4">
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl"
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

export default DoctorProfileSetup;
