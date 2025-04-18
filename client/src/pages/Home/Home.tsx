
import DoctorCard from "@/components/shared/Card"
import Hero from "@/components/shared/Hero"
import Navbar from "@/components/shared/Navbar"
import Para from "@/components/shared/para"

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Para />
        <DoctorCard />
    </div>
  )
}

export default Home