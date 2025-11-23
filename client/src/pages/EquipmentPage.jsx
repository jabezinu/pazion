import React from 'react';
import { Wrench, Check, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import toast from 'react-hot-toast';

export default function EquipmentPage() {
  const { language } = useLanguage();
  const { equipments, loading, errors } = useData();

  const equipmentsLoading = loading.equipments;
  const equipmentsError = errors.equipments;

  // Show error toast if there's an error
  React.useEffect(() => {
    if (equipmentsError) {
      toast.error('Failed to load equipment. Please try again later.');
    }
  }, [equipmentsError]);

  const translations = {
    am: {
      pageTitle: "የእኛ መሳሪያዎች ስብስብ",
      pageSubtitle: "ለመአድን ምርመራ፣ መቁረጫ እና ማቀናበሪያ ሙያዊ መሳሪያዎችን ያስሱ",
      availableEquipments: "ያሉ መሳሪያዎች",
      trustedBrands: "የምንሸጣቸው የታመኑ ብራንዶች",
      completeSupportPackage: "ሙሉ የድጋፍ ፓኬጅ",
      brands: "የሚከተሉትን ከፍተኛ ብራንዶች እንሸጣለን፡ Zeiss • Presidium • GemOro • Ultra Tec • Grobet • Kassoy • Foredom • Crystalite",
      support: "ነጻ የመጫኛ እርዳታ • የመሳሪያ ስልጠና የተካተተ • የቴክኒካል ድጋፍ የስልክ መስመር • የጥገና አገልግሎቶች • የመለዋወጫ ክፍሎች ክምችት"
    },
    en: {
      pageTitle: "Our Equipment Collection",
      pageSubtitle: "Explore professional tools and machinery for gemstone testing, cutting, and processing",
      availableEquipments: "Available Equipments",
      trustedBrands: "Trusted Brands We Carry",
      completeSupportPackage: "Complete Support Package",
      brands: "We carry top brands including Zeiss • Presidium • GemOro • Ultra Tec • Grobet • Kassoy • Foredom • Crystalite",
      support: "Free installation assistance • Equipment training included • Technical support hotline • Maintenance services • Replacement parts inventory"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {t.pageTitle}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {t.pageSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Available Equipments */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Wrench className="w-8 h-8 text-blue-600 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.availableEquipments}</h2>
          </div>

          {equipmentsLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : equipmentsError ? (
            <div className="text-center py-16">
              <div className="text-red-400 mb-4">
                <Wrench className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-red-600 mb-4">Failed to load equipment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipments.map((equipment, idx) => (
                <div key={equipment._id || idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{equipment.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{equipment.price} ETB</p>
                    <p className="text-gray-700">{equipment.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {equipments.length === 0 && !equipmentsLoading && !equipmentsError && (
            <div className="text-center py-16">
              <p className="text-gray-600">No equipments available at the moment.</p>
            </div>
          )}
        </section>

        {/* Trusted Brands */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Award className="w-8 h-8 text-green-600 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.trustedBrands}</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-700 text-lg">{t.brands}</p>
          </div>
        </section>

        {/* Complete Support Package */}
        <section>
          <div className="flex items-center mb-8">
            <Check className="w-8 h-8 text-purple-600 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.completeSupportPackage}</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-700 text-lg">{t.support}</p>
          </div>
        </section>
      </div>
    </div>
  );
}