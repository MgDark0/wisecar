import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import BrandSection from "@/components/BrandSection";
import ShopSection from "@/components/ShopSection";
import ShowroomSection from "@/components/ShowroomSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WiseCars - Luxury Automotive Experience</title>
        <meta name="description" content="Discover our premium collection of high-performance vehicles designed for those who demand excellence. Browse our exclusive showroom of luxury cars." />
        <meta property="og:title" content="WiseCars - Luxury Automotive Experience" />
        <meta property="og:description" content="Experience luxury on wheels with our premium collection of high-performance vehicles." />
      </Helmet>
      
      <HeroSection />
      <BrandSection />
      <ShopSection />
      <ShowroomSection />
      <ContactSection />
    </>
  );
};

export default Home;
