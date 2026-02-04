import { useState } from 'react';
import { Check, AlertCircle, Upload, X, Image as ImageIcon } from 'lucide-react';
import './style.css';

// ===== MAIN APP COMPONENT =====
const ComplaintSystem = () => {
  const [currentScreen, setCurrentScreen] = useState('language');
  const [formData, setFormData] = useState({
    language: '',
    name: '',
    address: '',
    phone: '',
    details: '',
    images: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const resetForm = () => {
    setFormData({
      language: '',
      name: '',
      address: '',
      phone: '',
      details: '',
      images: []
    });
    setCurrentScreen('language');
  };

  return (
    <div className="app-container">
      <div className="screen-wrapper">
        {currentScreen === 'language' && (
          <LanguageScreen 
            onNext={navigateToScreen} 
            formData={formData} 
            updateFormData={updateFormData}
          />
        )}
        {currentScreen === 'contact' && (
          <ContactScreen 
            onNext={navigateToScreen} 
            formData={formData} 
            updateFormData={updateFormData}
          />
        )}
        {currentScreen === 'details' && (
          <DetailsScreen 
            onNext={navigateToScreen} 
            formData={formData} 
            updateFormData={updateFormData}
          />
        )}
        {currentScreen === 'review' && (
          <ReviewScreen 
            onNext={navigateToScreen} 
            formData={formData}
          />
        )}
        {currentScreen === 'success' && (
          <SuccessScreen onReset={resetForm} />
        )}
      </div>
    </div>
  );
};

// ===== SCREEN 1: LANGUAGE SELECTION =====
const LanguageScreen = ({ onNext, formData, updateFormData }) => {
  const [selectedLang, setSelectedLang] = useState(formData.language);

  const handleContinue = () => {
    if (selectedLang) {
      updateFormData('language', selectedLang);
      onNext('contact');
    }
  };

  return (
    <div className="screen fade-in">
      <div className="phone-frame">
        <div className="header">
          <div className="logo-circle">
            <span className="logo-text">BMC</span>
          </div>
          <div className="header-info">
            <h2>Butwal Multiple Campus</h2>
            <p>Golpark, Butwal</p>
          </div>
        </div>

        <div className="content">
          <h1 className="screen-title">
            Share Your<br/>
            Voice With Us
          </h1>
          
          <div className="form-group">
            <label className="form-label">Select Language</label>
            <div className="select-wrapper">
              <select 
                className="select-input"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
              >
                <option value="">Choose your preferred language</option>
                <option value="english">English</option>
                <option value="nepali">नेपाली (Nepali)</option>
                <option value="hindi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>

          <p className="description-text">
            We value your feedback. Your suggestions and complaints help us improve our services and create a better environment for everyone.
          </p>
        </div>

        <button 
          className="primary-button"
          onClick={handleContinue}
          disabled={!selectedLang}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// ===== SCREEN 2: CONTACT INFORMATION =====
const ContactScreen = ({ onNext, formData, updateFormData }) => {
  const [name, setName] = useState(formData.name);
  const [address, setAddress] = useState(formData.address);
  const [phone, setPhone] = useState(formData.phone);
  const [errors, setErrors] = useState({});

  const validatePhone = (phoneNum) => {
    const phoneRegex = /^[+]?[\d\s\-()]{7,}$/;
    return phoneRegex.test(phoneNum);
  };

  const handleContinue = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData('name', name.trim());
    updateFormData('address', address.trim());
    updateFormData('phone', phone.trim());
    onNext('details');
  };

  return (
    <div className="screen fade-in">
      <div className="phone-frame">
        <div className="header">
          <div className="logo-circle">
            <span className="logo-text">BMC</span>
          </div>
          <div className="header-info">
            <h2>Butwal Multiple Campus</h2>
            <p>Golpark, Butwal</p>
          </div>
        </div>

        <div className="content">
          <h1 className="screen-title">
            Your<br/>
            Information
          </h1>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text"
              className={`text-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your complete name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({...errors, name: null});
              }}
            />
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input 
              type="text"
              className={`text-input ${errors.address ? 'error' : ''}`}
              placeholder="City, Ward No."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({...errors, address: null});
              }}
            />
            {errors.address && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.address}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel"
              className={`text-input ${errors.phone ? 'error' : ''}`}
              placeholder="+977 9800000000"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({...errors, phone: null});
              }}
            />
            {errors.phone && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.phone}
              </span>
            )}
          </div>
        </div>

        <button 
          className="primary-button"
          onClick={handleContinue}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

// ===== SCREEN 3: DETAILS & IMAGES =====
const DetailsScreen = ({ onNext, formData, updateFormData }) => {
  const [details, setDetails] = useState(formData.details);
  const [images, setImages] = useState(formData.images || []);
  const [charCount, setCharCount] = useState(formData.details.length);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/') && images.length + fileArray.length <= 5
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => {
          if (prev.length < 5) {
            return [...prev, {
              id: Date.now() + Math.random(),
              url: e.target.result,
              name: file.name
            }];
          }
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleDetailsChange = (e) => {
    const text = e.target.value;
    if (text.length <= 1000) {
      setDetails(text);
      setCharCount(text.length);
    }
  };

  const handleContinue = () => {
    updateFormData('details', details.trim());
    updateFormData('images', images);
    onNext('review');
  };

  return (
    <div className="screen fade-in">
      <div className="phone-frame">
        <div className="header">
          <div className="logo-circle">
            <span className="logo-text">BMC</span>
          </div>
          <div className="header-info">
            <h2>Butwal Multiple Campus</h2>
            <p>Golpark, Butwal</p>
          </div>
        </div>

        <div className="content">
          <h1 className="screen-title-small">
            Tell Us More
          </h1>
          
          <div className="form-group">
            <div className="label-row">
              <label className="form-label">Your Message</label>
              <span className={`char-count ${charCount > 900 ? 'warning' : ''}`}>
                {charCount}/1000
              </span>
            </div>
            <textarea 
              className="textarea-input"
              placeholder="Share your detailed complaint or suggestion here..."
              value={details}
              onChange={handleDetailsChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label className="form-label">
                Attach Evidence (Optional)
              </label>
              {images.length > 0 && (
                <span className="image-count">
                  {images.length}/5
                </span>
              )}
            </div>

            {images.length === 0 ? (
              <div
                className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="upload-label">
                  <Upload size={32} strokeWidth={1.5} />
                  <span className="upload-text">Tap to upload photos</span>
                  <span className="upload-subtext">or drag and drop here</span>
                  <span className="upload-limit">Up to 5 images</span>
                </label>
              </div>
            ) : (
              <>
                <div className="image-preview-grid">
                  {images.map((image) => (
                    <div key={image.id} className="image-preview-item">
                      <img src={image.url} alt={image.name} />
                      <button
                        className="remove-image"
                        onClick={() => removeImage(image.id)}
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <div className="add-more-wrapper">
                      <input
                        type="file"
                        id="file-upload-more"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="file-input"
                      />
                      <label htmlFor="file-upload-more" className="add-more-button">
                        <Upload size={20} strokeWidth={2} />
                        <span>Add More</span>
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <button 
          className="primary-button"
          onClick={handleContinue}
        >
          Review Submission
        </button>
      </div>
    </div>
  );
};

// ===== SCREEN 4: REVIEW =====
const ReviewScreen = ({ onNext, formData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // TODO: Replace with your actual API endpoint
      console.log('Submitting form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success screen
      onNext('success');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen fade-in">
      <div className="phone-frame">
        <div className="header">
          <div className="logo-circle">
            <span className="logo-text">BMC</span>
          </div>
          <div className="header-info">
            <h2>Butwal Multiple Campus</h2>
            <p>Golpark, Butwal</p>
          </div>
        </div>

        <div className="content">
          <h1 className="screen-title-small">Review Details</h1>
          
          <div className="review-field">
            <label className="review-label">Full Name</label>
            <div className="review-value">{formData.name}</div>
          </div>

          <div className="review-field">
            <label className="review-label">Address</label>
            <div className="review-value">{formData.address}</div>
          </div>

          <div className="review-field">
            <label className="review-label">Phone Number</label>
            <div className="review-value">{formData.phone}</div>
          </div>

          {formData.details && (
            <div className="review-field">
              <label className="review-label">Your Message</label>
              <div className="review-value review-details">{formData.details}</div>
            </div>
          )}

          {formData.images && formData.images.length > 0 && (
            <div className="review-field">
              <label className="review-label">Attachments</label>
              <div className="review-images">
                {formData.images.map((image) => (
                  <div key={image.id} className="review-image-thumb">
                    <img src={image.url} alt={image.name} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="error-box">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
        </div>

        <button 
          className={`primary-button ${isSubmitting ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
};

// ===== SCREEN 5: SUCCESS =====
const SuccessScreen = ({ onReset }) => {
  const [referenceId] = useState(() =>
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );
  
  return (
    <div className="screen fade-in">
      <div className="phone-frame">
        <div className="header">
          <div className="logo-circle">
            <span className="logo-text">BMC</span>
          </div>
          <div className="header-info">
            <h2>Butwal Multiple Campus</h2>
            <p>Golpark, Butwal</p>
          </div>
        </div>

        <div className="content success-content">
          <div className="success-wrapper">
            <div className="success-icon">
              <div className="success-circle">
                <Check size={48} strokeWidth={3} />
              </div>
            </div>
            
            <h1 className="success-title">
              Successfully<br/>
              Submitted!
            </h1>
            
            <p className="success-message">
              Thank you for taking the time to share your feedback.
              Campus Chief (Dr. Arun Chhetri) will carefully review
              your submission and take appropriate action.
            </p>

            <div className="reference-box">
              <p className="reference-label">REFERENCE ID</p>
              <p className="reference-id">{referenceId}</p>
            </div>
          </div>
        </div>

        <button 
          className="primary-button"
          onClick={onReset}
        >
          Submit Another Feedback
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return <ComplaintSystem />;
}