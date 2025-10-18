import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText, AlertCircle, Shield, Info } from 'lucide-react';
import ApiService from '../services/api';

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.replace(/^[./]+/, '');
  return `https://admin.gastronova.in/${cleanPath}`;
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock products database - Fallback data
  const productsDatabase = {
    'gastro-care': {
      id: 1,
      name: "GASTRO CARE",
      slug: "gastro-care",
      short_description: "Advanced proton pump inhibitor for effective acid suppression and GERD management",
      long_description: "GASTRO CARE is a scientifically formulated proton pump inhibitor designed to provide comprehensive relief from gastroesophageal reflux disease (GERD) and related acid disorders.\n\nThis medication works by reducing the production of stomach acid, allowing damaged esophageal tissue to heal and preventing future acid-related damage.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
        "https://images.unsplash.com/photo-1550572017-4fade35b5c3d?w=800"
      ]
    },
    'hepa-forte': {
      id: 2,
      name: "HEPA FORTE",
      slug: "hepa-forte",
      short_description: "Comprehensive hepatoprotective formulation for liver wellness and regeneration",
      long_description: "HEPA FORTE is a comprehensive hepatoprotective formulation designed to support liver wellness and regeneration.\n\nThis advanced formula combines essential nutrients and protective compounds to support optimal liver function and promote cellular regeneration.",
      images: [
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
        "https://images.unsplash.com/photo-1550572017-4fade35b5c3d?w=800"
      ]
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await ApiService.getMedication(slug);
        const processedProduct = {
          ...productData,
          shortDescription: productData.short_description || productData.description || '',
          fullDescription: productData.long_description || productData.short_description || productData.description || '',
          images: (productData.images || []).map(img => getImageUrl(img))
        };
        setProduct(processedProduct);
      } catch (error) {
        console.error('Error loading product:', error);
        const foundProduct = productsDatabase[slug];
        if (foundProduct) {
          const processed = {
            ...foundProduct,
            shortDescription: foundProduct.short_description,
            fullDescription: foundProduct.long_description
          };
          setProduct(processed);
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">The product you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:shadow-lg transition-all font-semibold text-sm sm:text-base"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap pb-2 mt-8"
        >
          <span 
            className="hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span 
            className="hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => navigate('/products')}
          >
            Products
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-blue-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Section - Images (Sticky on desktop, normal on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:sticky lg:top-24 lg:self-start w-full lg:w-auto"
          >
            {/* Thumbnail Images - Horizontal on mobile, Vertical on desktop */}
            <div className="flex sm:flex-row lg:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
              {product.images && product.images.length > 0 && product.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(idx)}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-blue-500 shadow-lg' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200';
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Main Image */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 w-full sm:w-auto order-1 sm:order-2">
              <motion.div 
                className="rounded-xl overflow-hidden bg-gray-50 aspect-square flex items-center justify-center max-w-md mx-auto lg:max-w-none lg:w-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {product.images && product.images.length > 0 ? (
                  <motion.img
                    key={selectedImageIndex}
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800';
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-4xl sm:text-6xl mb-2">📦</div>
                    <p className="text-xs sm:text-sm">No Image</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Product Info (Scrollable) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 space-y-6 sm:space-y-8"
          >
            {/* Product Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                {product.name}
              </h1>
              <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>

            {/* Product Description */}
            {product.fullDescription && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Description</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {product.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-2xl p-4 sm:p-6 shadow-md">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 bg-yellow-500 text-white p-2 sm:p-3 rounded-xl">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-2 sm:mb-3">Disclaimer</h3>
                  <p className="text-sm sm:text-base text-yellow-800 leading-relaxed">
                    This product should only be used under proper medical supervision. Please consult with a healthcare professional before use. 
                  </p>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: FileText,
                  title: "Prescription Required",
                  description: "This medication requires a valid prescription from a licensed healthcare provider.",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  icon: Shield,
                  title: "Professional Guidance",
                  description: "Always follow your doctor's instructions regarding dosage and duration of treatment.",
                  gradient: "from-green-500 to-green-600"
                },
                {
                  icon: Info,
                  title: "Safety First",
                  description: "Report any adverse effects to your healthcare provider immediately.",
                  gradient: "from-purple-500 to-purple-600"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-3 sm:mb-4 shadow-md`}>
                    <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{card.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;