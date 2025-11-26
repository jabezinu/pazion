import React, { useState, useEffect, useMemo } from 'react';
import { Award, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedGemstonesSection from '../components/home/FeaturedGemstonesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import VideosSection from '../components/home/VideosSection';
import diamondImg from '../assets/kal_asset/gemstones/Diamond.jpg';
import rubyImg from '../assets/kal_asset/gemstones/ruby.jpg';
import sapphireImg from '../assets/kal_asset/gemstones/Sapphire.jpg';
import emeraldImg from '../assets/kal_asset/gemstones/Emerald.jpg';

export default function GemstonHomepage() {
   const [currentHeroImage, setCurrentHeroImage] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const { language } = useLanguage();
   const { comments, videos, loading } = useData();
 
   // Function to convert video URLs to embed format
   const getEmbedUrl = (url) => {
     if (!url) return '';
 
     // TikTok embed
     if (url.includes('tiktok.com')) {
       const match = url.match(/\/video\/(\d+)/);
       if (match) {
         return `https://www.tiktok.com/embed/v2/${match[1]}?hide_related=1`;
       }
     }
 
     // YouTube embed
     if (url.includes('youtube.com') || url.includes('youtu.be')) {
       let videoId = '';
       if (url.includes('youtube.com/watch?v=')) {
         videoId = url.split('v=')[1]?.split('&')[0];
       } else if (url.includes('youtu.be/')) {
         videoId = url.split('youtu.be/')[1]?.split('?')[0];
       }
       if (videoId) {
         return `https://www.youtube.com/embed/${videoId}`;
       }
     }
 
     // If it's already an embed URL, return as is
     if (url.includes('/embed/') || url.includes('embed/v2/')) {
       return url;
     }
 
     // Fallback: return original URL
     return url;
   };

  const translations = {
    am: {
      // Hero Section
      heroTitle: "ቃልጄምስቶን - ለመአድን ንግዶ የታመነ አጋር",
      heroSubtitle: "ከማዕድን ቁፋሮ እስከ አለም አቀፍ ገበያ",
      heroDescription: "መግዛት፣ መሸጥ፣ መመርመር እና ስልጠና - ከ2008 ጀምሮ የሀገር ውስጥና አለም አቀፍ ገበያዎችን እናገለግላለን",
      browseGemstones: "መኣድናትን ለማየት",
      
      // Services Section
      ourServices: "የምንሰጣቸው አገልግሎቶች",
      // servicesSubtitle: "ለሁሉም የእንቁ ፍላጎቶችዎ ሙሉ መፍትሄዎች",
      buyGemstones: "እንቁዎችን ይግዙ",
      buyDesc: "የላቀ ጥራት ያላቸው መኣድናት",
      sellGemstones: "እንቁዎችዎን ይሽጡ",
      sellDesc: "መኣድናትን እንገዛለን",
      gemstoneTesting: "መአድን ምርመራ",
      testingDesc: "ፕሮፌሽናል ማረጋገጫ",
      equipmentTools: "መሳሪያዎች እና መገልገያዎች",
      equipmentDesc: "ለንግድዎ ፕሮፌሽናል ማሽነሪዎች",
      trainingCourses: "የስልጠና ኮርሶች",
      trainingDesc: "ከኢንዱስትሪ ባለሙያዎች ይማሩ",
      consultation: "ምክክር",
      consultationDesc: "ለንግድዎ የባለሙያ መመሪያ",
      learnMore: "ለተጨማሪ መረጃ",
      
      // Featured Gemstones
      featuredGemstones: "የተመረጡ እንቁዎች",
      featuredSubtitle: "ከእኛ ፕሪሚየም ስብስብ በእጅ የተመረጡ ምርጫዎች",
      diamond: "ዲያማንድ",
      ruby: "ሩቢ",
      sapphire: "ሰፋየር",
      emerald: "ኤመራልድ",
      ceylon: "ሲላን",
      burma: "በርማ",
      colombia: "ኮሎምቢያ",
      brazil: "ብራዚል",
      pakistan: "ፓኪስታን",
      uruguay: "ኡራጓይ",
      newLabel: "አዲስ",
      viewDetails: "ዝርዝሮችን ይመልከቱ",
      viewAllGemstones: "ሁሉንም እንቁዎች ይመልከቱ",
      
      // Stats
      gemstonesSold: "የተሸጡ እንቁዎች",
      businessesServed: "ግብይቶች",
      countriesReached: "የምንገበያይባቸው አገሮች",
      studentsTrained: "የሰለጠኑ ተማሪዎች",
      
      // Testimonials
      testimonialTitle: "የደንበኞቻችን አስተያየት",
      testimonialSubtitle: "በአለም ዙሪያ በሺዎች የሚተማመኑበት",
      testimonial1Name: "ሳራ ጆንሰን",
      testimonial1Location: "ኒው ዮርክ፣ አሜሪካ",
      testimonial1Text: "እጅግ በጣም ጥሩ ጥራት እና አገልግሎት። ለእኔ የጌጣጌጥ ንግድ በርካታ እንቁዎችን ገዛሁ እና እያንዳንዱ ድንጋይ እውነተኛ እና ቆንጆ ነበር።",
      testimonial2Name: "አህመድ አል-ራህማን",
      testimonial2Location: "ዱባይ፣ ኢማራት",
      testimonial2Text: "የእነርሱ የምርመራ አገልግሎት ጥሩ ነው። ፈጣን፣ ትክክለኛ እና ፕሮፌሽናል።",
      testimonial3Name: "ማሪያ ሳንቶስ",
      testimonial3Location: "ሳኦ ፓውሎ፣ ብራዚል",
      testimonial3Text: "የስልጠና ኮርሱ በጣም ጥሩ ነበር! ስለ መአድናት መለየት እና ደረጃ አሰጣጥ ብዙ ተማርኩ። እያንዳንዱ ሳንቲም ይገባዋል።",
      
      // Process
      ourProcess: "የእኛ ሂደት",
      processSubtitle: "ቀላል፣ ግልጽ እና ደህንነቱ የተጠበቀ",
      step1Title: "ያስሱ/ያግኙን",
      step1Desc: "ስብስባችንን ያስሱ እና የፈለጉትን ይምረጡ",
      step2Title: "እናማክራለን",
      step2Desc: "በምርጫ እና ዝርዝሮች ላይ የባለሙያ መመሪያ",
      step3Title: "ምርመራ",
      step3Desc: "ፕሮፌሽናል ማረጋገጫ እና የምስክር ወረቀት",
      step4Title: "ማድረስ",
      step4Desc: "በዓለም ዙሪያ ደህንነቱ የተጠበቀ መላኪያ"
    },
    en: {
      // Hero Section
      heroTitle: "KalGemstone - Shine Like A Gemstone",
      heroSubtitle: "From Mine to International Market",
      heroDescription: "Buying, Selling, Testing & Training - Serving Local & International Markets Since 2015 GC",
      browseGemstones: "Browse Gemstones",
      
      // Services Section
      ourServices: "Our Services",
      servicesSubtitle: "Complete solutions for all your gemstone needs",
      buyGemstones: "Buy Gemstones",
      buyDesc: "Premium quality stones for retail & wholesale",
      sellGemstones: "Sell Your Gemstones",
      sellDesc: "Fair prices, quick evaluation",
      gemstoneTesting: "Gemstone Testing",
      testingDesc: "Professional authentication & grading",
      equipmentTools: "Equipment & Tools",
      equipmentDesc: "Professional machinery for your business",
      trainingCourses: "Training Courses",
      trainingDesc: "Learn from industry experts",
      consultation: "Consultation",
      consultationDesc: "Expert guidance for your business",
      learnMore: "Learn More",
      
      // Featured Gemstones
      featuredGemstones: "Featured Gemstones",
      featuredSubtitle: "Handpicked selections from our premium collection",
      diamond: "Diamond",
      ruby: "Ruby",
      sapphire: "Sapphire",
      emerald: "Emerald",
      ceylon: "Ceylon",
      burma: "Burma",
      colombia: "Colombia",
      brazil: "Brazil",
      pakistan: "Pakistan",
      uruguay: "Uruguay",
      newLabel: "New",
      viewDetails: "View Details",
      viewAllGemstones: "View All Gemstones",
      
      // Stats
      gemstonesSold: "Gemstones Sold",
      businessesServed: "Businesses Served",
      countriesReached: "Countries Reached",
      studentsTrained: "Students Trained",
      
      // Testimonials
      testimonialTitle: "What Our Clients Say",
      testimonialSubtitle: "Trusted by thousands worldwide",
      testimonial1Name: "Sarah Johnson",
      testimonial1Location: "New York, USA",
      testimonial1Text: "Outstanding quality and service. I've purchased multiple gemstones for my jewelry business and every stone has been authentic and beautiful.",
      testimonial2Name: "Ahmed Al-Rahman",
      testimonial2Location: "Dubai, UAE",
      testimonial2Text: "Their testing service is impeccable. Fast, accurate, and professional. Highly recommended for wholesale buyers.",
      testimonial3Name: "Maria Santos",
      testimonial3Location: "São Paulo, Brazil",
      testimonial3Text: "The training course was excellent! I learned so much about gemstone identification and grading. Worth every penny.",
      
      // Process
      // ourProcess: "Our Process",
      // processSubtitle: "Simple, transparent, and secure",
      // step1Title: "Browse/Contact",
      // step1Desc: "Explore our collection or reach out with your needs",
      // step2Title: "Consultation",
      // step2Desc: "Expert guidance on selection and specifications",
      // step3Title: "Testing",
      // step3Desc: "Professional authentication and certification",
      // step4Title: "Delivery",
      // step4Desc: "Safe and secure shipping worldwide"
    }
  };

  const t = translations[language];

  const heroImages = [
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80',
    'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1920&q=80'
  ];

  // Map comments to testimonials format
  const testimonials = useMemo(() => {
    return comments.map(comment => ({
      _id: comment._id,
      text: comment.message,
      author: comment.name,
      location: comment.location || 'Unknown Location',
      rating: comment.rating || 5
    }));
  }, [comments]);

  const testimonialsLoading = loading.comments;
  const videosLoading = loading.videos;

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const testimonialTimer = setInterval(() => {
      if (testimonials.length > 0) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(testimonialTimer);
    };
  }, [testimonials.length, heroImages.length]);

  const services = [
    { id: "buying-selling", path: "/services#buying-selling", icon: ShoppingBag, title: t.buyGemstones, desc: t.buyDesc },
    { id: "buying-selling", path: "/services#buying-selling", icon: Award, title: t.sellGemstones, desc: t.sellDesc },
    { id: "gemstone-testing", path: "/services#gemstone-testing", icon: TestTube, title: t.gemstoneTesting, desc: t.testingDesc },
    { id: "equipment", path: "/equipment", icon: Wrench, title: t.equipmentTools, desc: t.equipmentDesc },
    { id: "courses", path: "/services#courses", icon: GraduationCap, title: t.trainingCourses, desc: t.trainingDesc },
    { id: "buying-selling", path: "/services#buying-selling", icon: MessageCircle, title: t.consultation, desc: t.consultationDesc }
  ];

  const featuredGems = [
    { name: t.diamond, carat: "3.0ct", origin: "Botswana", price: "$3,500", image: diamondImg },
    { name: t.ruby, carat: "2.8ct", origin: t.burma, price: "$3,200", image: rubyImg },
    { name: t.sapphire, carat: "3.5ct", origin: t.ceylon, price: "$2,500", image: sapphireImg },
    { name: t.emerald, carat: "4.2ct", origin: t.colombia, price: "$2,800", image: emeraldImg }
  ];



  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        t={t}
        currentHeroImage={currentHeroImage}
        setCurrentHeroImage={setCurrentHeroImage}
        heroImages={heroImages}
      />

      <ServicesSection t={t} services={services} />

      <FeaturedGemstonesSection t={t} featuredGems={featuredGems} />


      <TestimonialsSection
        t={t}
        testimonials={testimonials}
        testimonialsLoading={testimonialsLoading}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      <VideosSection videos={videos} videosLoading={videosLoading} getEmbedUrl={getEmbedUrl} />

    </div>
  );
}