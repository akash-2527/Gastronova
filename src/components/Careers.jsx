import React, { useState, useEffect,useCallback  } from 'react';
import { motion } from 'framer-motion';
import banner from '../assets/banner.jpg';
import img2 from '../assets/imgs2.jpg';
import apiService from '../services/api';
import emailjs from '@emailjs/browser';
import { 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  Upload, 
  Mail, 
  MapPin, 
  Users, 
  Briefcase,
  Heart,
  TrendingUp,
  Award,
  Shield,
  Filter,
  Building,
  Stethoscope,
  FileText,
  Truck,
  BarChart3,
  Microscope,
  Globe,
  Target,
  Star,
  RotateCcw
} from 'lucide-react';

// Optimized animation variants with better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Careers = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  // const [error, setError] = useState(null);
  // const [successMessage, setSuccessMessage] = useState('');
  const [jobsError, setJobsError] = useState(null);
  const [applicationError, setApplicationError] = useState(null);
  const [newsletterError, setNewsletterError] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv: null
  });
  // Add these new pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
    per_page: 10,
    has_next_page: false,
    has_prev_page: false
  });


  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    departments: [],
    experiences: []
  });
  const [positions, setPositions] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);



  // Add EmailJS configuration here
  const EMAILJS_SERVICE_ID = 'service_a3s9ogl'; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_a980xk3'; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = 'igTuevCNeN7KGvGeP'; // Replace with your EmailJS public key
      
  // Fetch jobs from backend
  const fetchJobs = useCallback(async (filters = {}, page = 1, showLoading = true) => {
  try {
    if (showLoading) {
      setLoading(true);
    }
    setJobsError(null);
    
    const response = await apiService.getJobs(filters, page, 10);
    
    if (response && response.jobs) {
      setJobOpenings(response.jobs);
      setFilteredJobs(response.jobs);
      setPagination(response.pagination || {
        current_page: 1,
        total_pages: 1,
        total_records: response.jobs.length,
        per_page: 10,
        has_next_page: false,
        has_prev_page: false
      });
      setCurrentPage(page);
      setRetryAttempts(0);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    setJobsError('Failed to load job openings. Please try again.');
    
    // Fallback data only on first load or after 3 retry attempts
    if (page === 1 && retryAttempts < 3) {
      setRetryAttempts(prev => prev + 1);
      const fallbackJobs = [
        {
          position: "Business Executive",
          location: "Hyderabad",
          department: "Sales & Marketing",
          experience: "0-2 years"
        },
        {
          position: "Area Sales Manager",
          location: "Vijayawada",
          department: "Sales & Marketing",
          experience: "2-5 years"
        },
        {
          position: "Product Executive",
          location: "Hyderabad",
          department: "Marketing",
          experience: "1-3 years"
        }
      ];
      setJobOpenings(fallbackJobs);
      setFilteredJobs(fallbackJobs);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_records: fallbackJobs.length,
        per_page: 10,
        has_next_page: false,
        has_prev_page: false
      });
    }
  } finally {
    if (showLoading) {
      setLoading(false);
    }
  }
}, [retryAttempts]);

  // Fetch jobs on component mount
  useEffect(() => {
  const initializeData = async () => {
    try {
      await Promise.all([
        fetchJobs({}, 1, true),
        fetchFilterOptions(),
        fetchPositions()
      ]);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };
  
  initializeData();
}, []);

  // Filter jobs based on selections
  useEffect(() => {
  const filters = {};
  if (selectedLocation !== 'All') filters.location = selectedLocation;
  if (selectedDepartment !== 'All') filters.department = selectedDepartment;
  if (selectedExperience !== 'All') filters.experience = selectedExperience;
  
  // Reset to page 1 when filters change
  setCurrentPage(1);
  fetchJobs(filters, 1, true);
  }, [selectedLocation, selectedDepartment, selectedExperience, fetchJobs]);

  const handlePageChange = useCallback((newPage) => {
  if (newPage >= 1 && newPage <= pagination.total_pages) {
    const filters = {};
    if (selectedLocation !== 'All') filters.location = selectedLocation;
    if (selectedDepartment !== 'All') filters.department = selectedDepartment;
    if (selectedExperience !== 'All') filters.experience = selectedExperience;
    
    fetchJobs(filters, newPage, true);
  }
}, [selectedLocation, selectedDepartment, selectedExperience, pagination.total_pages, fetchJobs]);

const retryFetchJobs = useCallback(() => {
  const filters = {};
  if (selectedLocation !== 'All') filters.location = selectedLocation;
  if (selectedDepartment !== 'All') filters.department = selectedDepartment;
  if (selectedExperience !== 'All') filters.experience = selectedExperience;
  
  fetchJobs(filters, currentPage, true);
}, [selectedLocation, selectedDepartment, selectedExperience, currentPage, fetchJobs]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const departments = [
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Sales & Marketing",
      description: "Drive growth and build relationships with healthcare professionals",
      gradient: "from-blue-600 to-blue-800"
    },
    {
      icon: <Stethoscope className="w-10 h-10" />,
      title: "Medical & Product Management",
      description: "Lead product development and medical affairs initiatives",
      gradient: "from-teal-600 to-teal-800"
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Regulatory Affairs",
      description: "Ensure compliance and regulatory excellence",
      gradient: "from-purple-600 to-purple-800"
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Logistics & Distribution",
      description: "Ensure efficient supply chain and distribution",
      gradient: "from-indigo-600 to-indigo-800"
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Incentive-based Salary",
      description: "Performance-linked rewards for field staff"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Travel & Working Allowance",
      description: "Comprehensive travel and daily working allowances"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Training & Promotion",
      description: "Structured training programs and clear promotion policies"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health Insurance",
      description: "Complete health insurance benefits for full-time employees"
    }
  ];

  const faqs = [
    {
      question: "How do I apply?",
      answer: "Apply online through our website or email your CV directly to careers@gastronova.in"
    },
    {
      question: "How long does the recruitment process take?",
      answer: "Typically 1-2 weeks including interview and HR round."
    },
    {
      question: "Is prior pharma experience mandatory?",
      answer: "Preferred but freshers with strong communication skills are welcome."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cv: e.target.files[0]
    }));
  };

  // Handle form submission for job application
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      // setError(null);
      // setSuccessMessage('');
      setApplicationError(null);
      setApplicationSuccess('');

      // Validate required fields
      if (!formData.name || !formData.email || !formData.position) {
        throw new Error('Please fill in all required fields');
      }

      // Submit application
      await apiService.submitApplication(formData);
      
      // setSuccessMessage('Application submitted successfully! We will contact you soon.');
      setApplicationSuccess('Application submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        cv: null
      });

      
      // Reset file input
      const fileInput = document.getElementById('cv-upload');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error('Application submission error:', error);
      // setError(error.message || 'Failed to submit application. Please try again.');
      setApplicationError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

// Handle newsletter subscription
const handleNewsletterSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setSubscribing(true);
    // setError(null);
    // setSuccessMessage('');
    setNewsletterError(null);
    setNewsletterSuccess('');

    const email = e.target.email.value.trim();
    
    if (!email) {
      throw new Error('Please enter your email address');
    }

    // Step 1: Ask backend if this email is already subscribed
    const subscriptionResponse = await apiService.subscribeNewsletter(email);
    
    if (subscriptionResponse?.alreadySubscribed) {
      // setError('You are already subscribed to our newsletter.');
      setNewsletterError('You are already subscribed to our newsletter.');
      return; // Stop here, don't send email
    }

    // Step 2: Send confirmation email only if they are new
    const templateParams = {
      to_email: email,
      to_name: email.split('@')[0], // Part before @ as name
      company_name: 'Gastro Nova Pharma',
      message: 'Thank you for subscribing to our newsletter! You will receive updates about new job openings and company news.'
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    // setSuccessMessage('Successfully subscribed to newsletter! Check your email for confirmation.');
    setNewsletterSuccess('Successfully subscribed to newsletter! Check your email for confirmation.');
    e.target.reset();

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    // setError(error.message || 'Failed to subscribe. Please try again.');
    setNewsletterError(error.message || 'Failed to subscribe. Please try again.');
  } finally {
    setSubscribing(false);
  }
};


// Add these functions after the fetchJobs function
const fetchFilterOptions = async () => {
  try {
    setLoadingFilters(true);
    const options = await apiService.getFilterOptions();
    setFilterOptions(options);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    // Fallback options if API fails
    setFilterOptions({
      locations: ['Hyderabad', 'Vizag', 'Kurnool', 'Vijayawada'],
      departments: ['Sales & Marketing', 'Marketing'],
      experiences: ['0-2 years', '1-3 years', '2-5 years']
    });
  } finally {
    setLoadingFilters(false);
  }
};

const fetchPositions = async () => {
  try {
    const positionsData = await apiService.getPositions();
    setPositions(positionsData);
  } catch (error) {
    console.error('Error fetching positions:', error);
    // Fallback to hardcoded positions if API fails
    setPositions([
      'Business Executive',
      'Area Sales Manager', 
      'Product Executive'
    ]);
  }
};


  return (
    <div className="bg-gray-50 min-h-screen mt-8">
      {/* Professional Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Pharmaceutical Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.8) 50%, rgba(15, 23, 42, 0.9) 100%), url(${banner})`
          }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-60 hidden sm:block"
          animate={floatAnimation}
        />
        <motion.div
          className="absolute top-40 right-40 w-4 h-4 bg-teal-400 rounded-full opacity-50 hidden sm:block"
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 1 }
          }}
        />
        <motion.div
          className="absolute bottom-40 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-70 hidden sm:block"
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 2 }
          }}
        />

        {/* Content - Left Aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-white"
            >
              {/* Main Heading */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center mb-6">
                  <Microscope className="w-12 h-12 text-blue-400 mr-4" />
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Careers at
                  </span>
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Gastro Nova
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 max-w-3xl">
                  <p className="text-xl md:text-2xl  text-blue-200 font-medium">
                    "Building a Healthier Future — One Career at a Time"
                  </p>
                </div>
              </motion.div>

              {/* Mission Statement */}
              <motion.div variants={itemVariants} className="">
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                  "Your Growth is Our Mission" - Explore career opportunities with one of India's emerging leaders in Gastroenterology and become part of our mission to transform healthcare.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Current Openings Section */}
      <section id="current-openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-teal-600"></div>
                <Briefcase className="w-8 h-8 text-blue-600 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-blue-600 to-teal-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Current Openings
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our team of healthcare professionals and make a difference in patient care
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <Filter className="w-6 h-6 text-slate-600" />
                <h3 className="text-xl font-semibold text-slate-800">Filter Positions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loadingFilters}
                  >
                    <option value="All">All Locations</option>
                    {filterOptions.locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Department</label>
                  <select 
                    value={selectedDepartment} 
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loadingFilters}
                  >
                    <option value="All">All Departments</option>
                    {filterOptions.departments.map((department, index) => (
                      <option key={index} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Experience</label>
                  <select 
                    value={selectedExperience} 
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loadingFilters}
                  >
                    <option value="All">All Experience</option>
                    {filterOptions.experiences.map((experience, index) => (
                      <option key={index} value={experience}>{experience}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div variants={itemVariants} className="text-center py-12">
                <div className="inline-flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg text-gray-600">Loading job openings...</span>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {jobsError && (
              <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="text-red-600 font-medium mb-4">{jobsError}</div>
                <motion.button
                  onClick={retryFetchJobs}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </motion.button>
              </motion.div>
            )}

            {/* No Jobs Found */}
            {!loading && !jobsError && filteredJobs.length === 0 && (
              <motion.div variants={itemVariants} className="text-center py-12">
                <div className="text-gray-500 text-lg">No job openings found matching your criteria.</div>
                <button 
                  onClick={() => {
                    setSelectedLocation('All');
                    setSelectedDepartment('All');
                    setSelectedExperience('All');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {/* Job Listings */}
            {!loading && filteredJobs.length > 0 && (
              <motion.div variants={containerVariants} className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                          {job.position}
                        </h3>
                        <div className="flex flex-wrap gap-6 text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-teal-500" />
                            <span className="font-medium">{job.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-500" />
                            <span className="font-medium">{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => scrollToSection('submit-resume')}
                        className="mt-6 lg:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
          {/* Pagination */}
          {!loading && !jobsError && pagination.total_pages > 1 && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
              {/* Pagination Info */}
              <div className="text-sm text-gray-600">
                Showing {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total_records)} of {pagination.total_records} jobs
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={!pagination.has_prev_page}
                  className={`p-2 rounded-lg border transition-colors ${
                    pagination.has_prev_page 
                      ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={pagination.has_prev_page ? { scale: 1.05 } : {}}
                  whileTap={pagination.has_prev_page ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const maxVisiblePages = 5;
                    let startPage = Math.max(1, pagination.current_page - Math.floor(maxVisiblePages / 2));
                    let endPage = Math.min(pagination.total_pages, startPage + maxVisiblePages - 1);
                    
                    if (endPage - startPage + 1 < maxVisiblePages) {
                      startPage = Math.max(1, endPage - maxVisiblePages + 1);
                    }
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <motion.button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                            i === pagination.current_page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {i}
                        </motion.button>
                      );
                    }
                    return pages;
                  })()}
                </div>
                
                <motion.button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={!pagination.has_next_page}
                  className={`p-2 rounded-lg border transition-colors ${
                    pagination.has_next_page 
                      ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={pagination.has_next_page ? { scale: 1.05 } : {}}
                  whileTap={pagination.has_next_page ? { scale: 0.95 } : {}}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Life at Gastro Nova */}
<section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-1 bg-gradient-to-r from-teal-600 to-blue-600"></div>
          <Heart className="w-8 h-8 text-teal-600 mx-4" />
          <div className="w-12 h-1 bg-gradient-to-l from-teal-600 to-blue-600"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Life at Gastro Nova
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience a culture of excellence, innovation, and continuous growth
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Card */}
        <motion.div variants={slideInVariants}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 min-h-[420px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-slate-800">Culture of Excellence</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-700 text-xl">Culture of collaboration, respect & innovation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-700 text-xl">Fast-track growth opportunities for performers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-700 text-xl">Regular field force meetings, training sessions, and celebrations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div 
          variants={slideInVariants}
          className="relative"
        >
          {/* Main Image Container - Medium Size */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl h-105"
            whileHover={{ scale: 1.02, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20 z-10"></div>
            
            {/* Main Image */}
            <motion.img
              src={img2}
              alt="Life at Gastro Nova - Team Culture"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Decorative Elements - Smaller and contained */}
          <motion.div
            className="absolute top-1 right-1 w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20 -z-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-15 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Grid - Keep existing */}
      <motion.div variants={slideInVariants} className="grid grid-cols-2 gap-6 mt-16">
        {[
          { icon: Users, title: "Team Meetings", color: "from-blue-500 to-blue-600" },
          { icon: Award, title: "Training Sessions", color: "from-teal-500 to-teal-600" },
          { icon: Heart, title: "Celebrations", color: "from-purple-500 to-purple-600" },
          { icon: TrendingUp, title: "Growth", color: "from-indigo-500 to-indigo-600" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            className={`bg-gradient-to-br ${item.color} p-8 rounded-2xl text-white text-center shadow-lg`}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.3 }}
          >
            <item.icon className="w-12 h-12 mx-auto mb-4" />
            <h4 className="font-bold text-lg">{item.title}</h4>
          </motion.div>
        ))}
      </motion.div>
    </motion.div> 
  </div>
</section>

      {/* Submit Resume Section */}
      <section id="submit-resume" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
                <Upload className="w-8 h-8 text-blue-400 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-blue-400 to-teal-400"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Submit Your Resume
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Take the first step towards joining our team of healthcare professionals
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20">
              {/* Success/Error Messages */}
              {applicationSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">{applicationSuccess}</span>
                  </div>
                </motion.div>
              )}

              {applicationError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-red-700 font-medium">{applicationError}</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">Position of Interest</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      required
                    >
                      <option value="" className="text-gray-800">Select Position</option>
                      {positions.map((position, index) => (
                        <option key={index} value={position} className="text-gray-800">
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">Upload CV (PDF/Word)</label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-white/5">
                    <Upload className="w-16 h-16 text-white/60 mx-auto mb-4" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <span className="text-blue-400 font-medium text-lg">Click to upload</span>
                      <span className="text-white/80"> or drag and drop your resume</span>
                    </label>
                    {formData.cv && (
                      <p className="mt-4 text-green-400 font-medium">✓ File selected: {formData.cv.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!submitting ? { scale: 1.05 } : {}}
                    whileTap={!submitting ? { scale: 0.95 } : {}}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Send Application
                      </>
                    )}
                  </motion.button>
                  <div className="text-center text-white/80">
                    <p className="text-sm mb-2">Or email directly to:</p>
                    <a 
                      href="mailto:careers@gastronova.in" 
                      className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                    >
                      careers@gastronova.in
                    </a>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <Building className="w-8 h-8 text-indigo-600 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-indigo-600 to-purple-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Departments We Hire For
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore opportunities across our specialized departments
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${dept.gradient} rounded-2xl p-8 text-white shadow-xl group hover:shadow-2xl transition-all duration-300`}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div 
                    className="mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {dept.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4">{dept.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{dept.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-teal-600"></div>
                <Shield className="w-8 h-8 text-green-600 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-green-600 to-teal-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Our Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive benefits package designed for your success
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center group hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Working Culture Section - FIXED FOR MOBILE */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mx-3 sm:mx-4" />
                <div className="w-8 sm:w-12 h-1 bg-gradient-to-l from-purple-600 to-pink-600"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Working Culture at Gastro Nova
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                At Gastro Nova Pharma Pvt Ltd, we cultivate a performance-driven yet employee-centric culture rooted in respect, innovation, and passion for healthcare.
              </p>
            </motion.div>

            {/* Culture Features - Mobile Optimized */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
              <motion.div variants={slideInVariants} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">Work Environment</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    "Clean, ethical, and safe work settings",
                    "Seamless integration between departments",
                    "Hybrid engagement models",
                    "Respect for work-life balance"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 sm:gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-xs sm:text-sm font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-base sm:text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={slideInVariants} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">Career Growth Path</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2 sm:mb-3 text-base sm:text-lg">Clear KPIs & Reviews</h4>
                    <p className="text-gray-700 text-sm sm:text-base">Transparent performance review systems</p>
                  </div>
                  <div className="bg-teal-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-100">
                    <h4 className="font-bold text-teal-900 mb-2 sm:mb-3 text-base sm:text-lg">Fast-track Promotions</h4>
                    <p className="text-gray-700 text-sm sm:text-base">Accelerated career advancement programs</p>
                  </div>
                  <div className="bg-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-2 sm:mb-3 text-base sm:text-lg">Continuous Learning</h4>
                    <p className="text-gray-700 text-sm sm:text-base">Regular training and skill enhancement</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Culture Principles - Mobile Optimized */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8 sm:mb-12">Culture Principles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { icon: Heart, title: "Encouraging Environment", desc: "Open-door leadership", color: "from-red-500 to-pink-500" },
                  { icon: Users, title: "Teamwork", desc: "Cross-functional collaboration", color: "from-blue-500 to-indigo-500" },
                  { icon: Award, title: "Learning Culture", desc: "Continuous training & upskilling", color: "from-yellow-500 to-orange-500" },
                  { icon: TrendingUp, title: "Empowerment", desc: "Autonomy for field staff", color: "from-green-500 to-teal-500" }
                ].map((principle, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.02, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${principle.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                      <principle.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 text-base sm:text-lg">{principle.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{principle.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values - Mobile Optimized */}
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-slate-800">Core Values We Live By</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
                {[
                  { icon: "🔑", title: "Integrity", desc: "in every interaction" },
                  { icon: "🧪", title: "Scientific Excellence", desc: "in products" },
                  { icon: "❤️", title: "Compassion", desc: "toward patients" },
                  { icon: "🌱", title: "Growth", desc: "through empowerment" },
                  { icon: "🤝", title: "Responsibility", desc: "to society" }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 text-center"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{value.icon}</div>
                    <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 text-base sm:text-lg">{value.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ethics & Management - Mobile Optimized */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-100 to-blue-100 rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8 sm:mb-12">Ethics & Management Principles</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <h4 className="font-bold text-teal-700 mb-4 sm:mb-6 flex items-center gap-3 text-lg sm:text-xl">
                    <Shield className="w-5 sm:w-6 h-5 sm:h-6" />
                    Patient-First Philosophy
                  </h4>
                  <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">Every product is designed with therapeutic precision and patient safety in mind.</p>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Compliance with DPCO norms and regulations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Ethical sales practices and pharmacovigilance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Scientific promotion - no false claims</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-blue-700 mb-4 sm:mb-6 flex items-center gap-3 text-lg sm:text-xl">
                    <Award className="w-5 sm:w-6 h-5 sm:h-6" />
                    Transparency & Sustainability
                  </h4>
                  <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">Clear policies and commitment to community health awareness.</p>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Transparent HR policies and assessments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Commitment to sustainability practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">Community health campaigns (Hepatitis awareness)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Call to Action - Mobile Optimized */}
            <motion.div variants={itemVariants} className="text-center mt-12 sm:mt-16">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
                <p className="text-xl sm:text-2xl text-slate-800 mb-4 sm:mb-6 font-semibold">
                  🔍 Looking for your next career breakthrough?
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                  Join Gastro Nova and make a difference in GI & Liver care.
                </p>
                <p className="text-xl sm:text-2xl font-bold text-teal-600 mb-6 sm:mb-8">
                  🌱 Your journey starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <motion.button
                    onClick={() => scrollToSection('current-openings')}
                    className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Openings <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('submit-resume')}
                    className="border-2 border-blue-600 text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Resume
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-red-600"></div>
                <FileText className="w-8 h-8 text-orange-600 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-orange-600 to-red-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                FAQs for Applicants
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to commonly asked questions about our recruitment process
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <motion.button
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
                  >
                    <h3 className="text-xl font-semibold text-slate-800">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-slate-600" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFAQ === index ? "auto" : 0,
                      opacity: expandedFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="border-t border-slate-200 pt-6">
                        <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
                <Mail className="w-8 h-8 text-blue-400 mx-4" />
                <div className="w-12 h-1 bg-gradient-to-l from-blue-400 to-teal-400"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Subscribe to our newsletter to get important updates about new openings and company news
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20">
              {/* Success/Error Messages for Newsletter */}
              {newsletterSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">{newsletterSuccess}</span>
                  </div>
                </motion.div>
                )}

                { newsletterError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span className="text-red-700 font-medium">{newsletterError}</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={subscribing}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!subscribing ? { scale: 1.05 } : {}}
                    whileTap={!subscribing ? { scale: 0.95 } : {}}
                  >
                    {subscribing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Subscribe
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;