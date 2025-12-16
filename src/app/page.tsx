import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import FeatureBlock from '@/components/FeatureBlock';
import TypographicSection from '@/components/TypographicSection';
import ProjectStrip from '@/components/ProjectStrip';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white text-primary-black font-silka selection:bg-blue-200">
      <Header />
      <Hero />
      <NewsSection />
      
      <FeatureBlock 
        title="Kitchens" 
        subtitle="Custom Design Kitchens" 
        image="https://api.espaciohomedesign.com/uploads/xlarge_HDR_sin_titulo_12_3_58b965851e.jpg" 
        linkText="Discover our projects" 
        linkUrl="/kitchens" 
      />
      
      <FeatureBlock 
        title="Projects" 
        subtitle="Discover our projects" 
        image="https://api.espaciohomedesign.com/uploads/xlarge_Espacio_Home_Pollensa_49_1x_1_1_0285f9b617.jpg" 
        linkText="Interior design and furniture" 
        linkUrl="/projects" 
        reversed
      />
      
      <FeatureBlock 
        title="Interior Design" 
        subtitle="Interior Design and Furniture" 
        image="https://api.espaciohomedesign.com/uploads/Jaede_19_1_1cd1ce9de1.jpg" 
        linkText="Read more about our commitment" 
        linkUrl="/interior-design" 
      />
      
      <TypographicSection />
      
      <FeatureBlock 
        title="Outlet" 
        subtitle="Design Opportunities" 
        image="https://api.espaciohomedesign.com/uploads/xlarge_Q4_A3444_29da9bbc71.jpg" 
        linkText="Discover our spaces" 
        linkUrl="/outlet" 
        reversed
      />
      
      <FeatureBlock 
        title="Showrooms" 
        subtitle="Discover our spaces" 
        image="https://api.espaciohomedesign.com/uploads/xlarge_Banner_Showrooms_4b9285951d.jpg" 
        linkText="During the process we go along with you" 
        linkUrl="/showrooms" 
      />
      
      <FeatureBlock 
        title="Services" 
        subtitle="During the process we go along with you" 
        image="https://api.espaciohomedesign.com/uploads/xlarge_Espacio_Home_Design_Customer_care_Anuska_8e6293f93e.jpg" 
        linkText="Get inspire with our projects" 
        linkUrl="/services" 
        reversed
      />
      
      <ProjectStrip />
      
      <Footer />
      <FloatingContact />
    </main>
  );
}
