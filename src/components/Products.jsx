import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, X, AlertCircle, RefreshCw } from 'lucide-react';
import ApiService from '../services/api';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  try {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.replace(/^[./]+/, '');
    return `https://admin.gastronova.in/${cleanPath}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return '';
  }
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [apiError, setApiError] = useState(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);
  const [criticalError, setCriticalError] = useState(null);

  // Enhanced mock products data (fallback)
  const mockProducts = [
    {
      id: 1,
      name: "GASTRO CARE",
      slug: "gastro-care",
      description: "Advanced proton pump inhibitor for effective acid suppression and GERD management",
      short_description: "Advanced proton pump inhibitor for GERD management",
      images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"],
      price: "0.00"
    },
    {
      id: 2,
      name: "HEPA FORTE",
      slug: "hepa-forte", 
      description: "Comprehensive hepatoprotective formulation for liver wellness and regeneration",
      short_description: "Hepatoprotective formulation for liver wellness",
      images: ["https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400"],
      price: "0.00"
    },
    {
      id: 3,
      name: "DEOXICARE-450",
      slug: "deoxicare-450",
      description: "Ursodeoxycholic Acid tablets for cholesterol gallstone dissolution and liver function support",
      short_description: "Ursodeoxycholic Acid for gallstone dissolution",
      images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"],
      price: "69.00"
    }
  ];

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setApiError(null);
        setUsingFallbackData(false);
        setCriticalError(null);
        
        console.log('Starting to load products from API...');
        
        // Check if ApiService exists
        if (!ApiService || typeof ApiService.getMedications !== 'function') {
          throw new Error('API Service not available');
        }
        
        const response = await ApiService.getMedications({ status: 'active' }, 1, 20);
        console.log('API Response received successfully'); 
        
        if (!response || !response.medications) {
          throw new Error('Invalid response format from API');
        }
        
        console.log(`Processing ${response.medications.length} products from API`);
        
        // Process products with better error handling
        const processedProducts = response.medications.map(product => {
          try {
            // Extract description from various possible fields with fallbacks
            const description = 
              product.description || 
              product.short_description || 
              product.long_description || 
              product.product_description ||
              'Comprehensive pharmaceutical formulation for therapeutic use.';

            // Handle images with better error handling
            let images = [];
            if (product.images && Array.isArray(product.images)) {
              images = product.images
                .filter(img => img && typeof img === 'string')
                .map(img => getImageUrl(img))
                .filter(url => url); // Remove empty URLs
            }
            
            // If no images from API, use a placeholder
            if (images.length === 0) {
              const placeholders = [
                'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
                'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
                'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'
              ];
              images = [placeholders[Math.floor(Math.random() * placeholders.length)]];
            }

            // Ensure we have a valid slug
            const slug = product.slug || 
                        (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : null) || 
                        `product-${product.id}`;
            
            return {
              id: product.id || Math.random(),
              name: product.name || 'Pharmaceutical Product',
              slug: slug,
              description: description,
              short_description: product.short_description || description.substring(0, 100) + '...',
              images: images,
              price: product.price || "0.00"
            };
          } catch (productError) {
            console.error('Error processing individual product:', productError, product);
            return null;
          }
        }).filter(p => p !== null).sort((a, b) => a.name.localeCompare(b.name));
        
        console.log('Successfully processed products:', processedProducts.length);
        
        if (processedProducts.length === 0) {
          throw new Error('No valid products found in API response');
        }
        
        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
        
        // Initialize image indices
        const indices = {};
        processedProducts.forEach(product => {
          indices[product.id] = 0;
        });
        setCurrentImageIndex(indices);
        
      } catch (error) {
        console.error('Error loading products from API:', error);
        setApiError(error.message);
        setUsingFallbackData(true);
        
        try {
          // Enhanced fallback to mock data if API fails
          const sortedMockProducts = mockProducts.sort((a, b) => a.name.localeCompare(b.name));
          console.log('Using fallback mock data:', sortedMockProducts.length, 'products');
          
          setProducts(sortedMockProducts);
          setFilteredProducts(sortedMockProducts);
          
          const mockIndices = {};
          sortedMockProducts.forEach(product => {
            mockIndices[product.id] = 0;
          });
          setCurrentImageIndex(mockIndices);
        } catch (fallbackError) {
          console.error('Critical error: Even fallback data failed:', fallbackError);
          setCriticalError('Unable to load products. Please refresh the page.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    try {
      if (!searchTerm.trim()) {
        setFilteredProducts(products);
        return;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = products.filter(product => {
        try {
          const nameMatch = product.name && product.name.toLowerCase().includes(searchLower);
          const slugMatch = product.slug && product.slug.toLowerCase().includes(searchLower);
          const descMatch = product.description && product.description.toLowerCase().includes(searchLower);
          const shortDescMatch = product.short_description && product.short_description.toLowerCase().includes(searchLower);
          
          return nameMatch || slugMatch || descMatch || shortDescMatch;
        } catch (error) {
          console.error('Error filtering product:', error, product);
          return false;
        }
      }).sort((a, b) => {
        try {
          const aNameLower = (a.name || '').toLowerCase();
          const bNameLower = (b.name || '').toLowerCase();
          
          const aStartsWith = aNameLower.startsWith(searchLower);
          const bStartsWith = bNameLower.startsWith(searchLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          return aNameLower.localeCompare(bNameLower);
        } catch (error) {
          console.error('Error sorting products:', error);
          return 0;
        }
      });

      setFilteredProducts(filtered);
    } catch (error) {
      console.error('Critical error in filter effect:', error);
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleImageNavigation = (e, productId, direction, images) => {
    try {
      e.stopPropagation();
      setCurrentImageIndex(prev => {
        const currentIndex = prev[productId] || 0;
        let newIndex;
        
        if (direction === 'next') {
          newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        } else {
          newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        }
        
        return { ...prev, [productId]: newIndex };
      });
    } catch (error) {
      console.error('Error navigating images:', error);
    }
  };

  const handleProductClick = (slug) => {
    try {
      if (slug && navigate) {
        navigate(`/products/${slug}`);
      }
    } catch (error) {
      console.error('Error navigating to product:', error);
    }
  };

  const clearSearch = () => {
    try {
      setSearchTerm('');
    } catch (error) {
      console.error('Error clearing search:', error);
    }
  };

  const scrollToContact = () => {
    try {
      if (navigate) {
        navigate('/contact');
      }
    } catch (error) {
      console.error('Error navigating to contact:', error);
    }
  };

  const retryLoadProducts = () => {
    try {
      setSearchTerm('');
      setApiError(null);
      setCriticalError(null);
      window.location.reload();
    } catch (error) {
      console.error('Error reloading page:', error);
    }
  };

  // Critical error screen
  if (criticalError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">{criticalError}</p>
          <button
            onClick={retryLoadProducts}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 px-4 overflow-hidden relative">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-400 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight mt-8"
              variants={fadeInUp}
            >
              Our <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Products</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Advanced GI & Liver Wellness Solutions — Science-Driven Care for Better Health
            </motion.p>
          </motion.div>

          {/* API Error Banner */}
          {apiError && (
            <motion.div 
              className="max-w-3xl mx-auto mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-4 backdrop-blur-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-yellow-100 font-medium">Using offline data</p>
                      <p className="text-yellow-200 text-sm">Some features may be limited</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={retryLoadProducts}
                    className="flex items-center gap-2 bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-100 px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Search Bar */}
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <Search className="w-6 h-6 text-white/60 ml-6" />
                <input
                  type="text"
                  placeholder="Search products by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-5 bg-transparent text-white text-lg placeholder-white/50 focus:outline-none"
                  disabled={loading}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="mr-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                      disabled={loading}
                    >
                      <X className="w-5 h-5 text-white/80" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading products...</p>
              {apiError && (
                <p className="text-yellow-600 text-sm mt-2">Falling back to offline data</p>
              )}
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const images = product.images || [];
                const currentIndex = currentImageIndex[product.id] || 0;
                const hasMultipleImages = images.length > 1;
                
                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => handleProductClick(product.slug)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100 hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-64 bg-white from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
                      {images.length > 0 ? (
                        <>
                          <img 
                            src={images[currentIndex]} 
                            alt={product.name}
                            className="w-80 h-full object-cover group-hover:scale-105 transition-transform duration-500 "
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400';
                            }}
                          />
                          
                          {/* Image Navigation */}
                          {hasMultipleImages && hoveredProduct === product.id && (
                            <>
                              <button
                                onClick={(e) => handleImageNavigation(e, product.id, 'prev', images)}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all z-10 hover:scale-110"
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                onClick={(e) => handleImageNavigation(e, product.id, 'next', images)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all z-10 hover:scale-110"
                              >
                                <ChevronRight size={20} />
                              </button>

                              {/* Image Indicators */}
                              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-6xl mb-2">📦</div>
                            <p className="text-sm">No Image Available</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                        {product.short_description || product.description}
                      </p>
                      
                      {/* Medical Supervision Notice */}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <p className="text-gray-500 text-xs italic leading-relaxed flex items-start gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0">⚕</span>
                          <span>
                            <strong>Medical Supervision Required:</strong> This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm ? `We couldn't find any products matching "${searchTerm}". Try adjusting your search.` : 'No products available at the moment.'}
              </p>
              {usingFallbackData && (
                <p className="text-blue-600 mb-4">
                  Currently showing limited offline catalog
                </p>
              )}
              <div className="flex gap-4 justify-center">
                {searchTerm && (
                  <motion.button
                    onClick={clearSearch}
                    className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Search
                  </motion.button>
                )}
                <motion.button
                  onClick={retryLoadProducts}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload Products
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact-section" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Medical Consultation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team of healthcare professionals is here to guide you. Contact us for medical advice or any questions about our products.
            </p>
            <motion.button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;