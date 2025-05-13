import { Helmet } from "react-helmet";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | WiseCars</title>
        <meta name="description" content="Get in touch with our sales and support team. We're here to answer your questions about our luxury vehicles and services." />
        <meta property="og:title" content="Contact Us | WiseCars" />
        <meta property="og:description" content="Contact our dedicated team for inquiries about our luxury vehicles, financing options, or to schedule a test drive." />
      </Helmet>
      
      <ContactSection />
    </>
  );
};

export default Contact;
