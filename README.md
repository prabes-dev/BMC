# Complaint/Suggestion System - Frontend

A modern, sleek React application for collecting complaints and suggestions via QR code scanning.

## 🚀 Features

- **5-Screen Flow**: Language selection → Contact info → Details & images → Review → Success
- **Clean UI**: Dark theme with monospace typography and smooth animations
- **Mobile-First**: Optimized for mobile devices (phone-frame design)
- **Form Validation**: Required field validation before proceeding
- **Backend Ready**: Easy integration points for your API

## 📱 User Flow

1. **Language Selection** - Choose preferred language
2. **Contact Information** - Name, address, phone number
3. **Details & Images** - Text details and optional image selection
4. **Review** - Confirm submitted information
5. **Success** - Confirmation with option to submit another

## 🛠️ Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Create a new React app
npx create-react-app complaint-system
cd complaint-system

# Install required dependencies
npm install lucide-react

# Replace src/App.js with the complaint-system.jsx file
```

### File Structure
```
complaint-system/
├── src/
│   ├── App.js (replace with complaint-system.jsx)
│   ├── index.js
│   └── index.css (optional, styles are inline)
├── public/
└── package.json
```

## 🔌 Backend Integration

### 1. Configure API Endpoint

In the `ReviewScreen` component, replace the TODO with your backend endpoint:

```javascript
const handleSubmit = async () => {
  try {
    const response = await fetch('YOUR_BACKEND_URL/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    const result = await response.json();
    console.log('Success:', result);
    onNext('success');
  } catch (error) {
    console.error('Error:', error);
    // Add error handling UI here
    alert('Failed to submit. Please try again.');
  }
};
```

### 2. Expected Data Format

The form sends this structure to your backend:

```json
{
  "language": "english",
  "name": "John Doe",
  "address": "123 Main St, City",
  "phone": "+977-1234567890",
  "details": "Detailed complaint or suggestion text...",
  "images": [1, 3, 5]
}
```

### 3. Backend Endpoints Needed

#### POST /api/complaints
Create a new complaint/suggestion

**Request Body:**
```json
{
  "language": "string",
  "name": "string",
  "address": "string",
  "phone": "string",
  "details": "string",
  "images": ["number[]"]
}
```

**Response:**
```json
{
  "success": true,
  "id": "complaint_id",
  "message": "Complaint submitted successfully"
}
```

### 4. Security Recommendations

```javascript
// Add CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

const response = await fetch('YOUR_BACKEND_URL/api/complaints', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
  },
  credentials: 'include', // For cookies
  body: JSON.stringify(formData),
});
```

### 5. Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_API_KEY=your_api_key_here
```

Access in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

## 🎨 Customization

### Change Colors

Modify the CSS variables in the styles:

```css
/* Primary color */
background: linear-gradient(135deg, #4a90e2, #357abd);

/* Background */
background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%);

/* Borders */
border: 3px solid #2a2a2a;
```

### Change Fonts

Replace the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

body {
  font-family: 'YOUR_FONT', sans-serif;
}
```

### Add More Languages

In `LanguageScreen` component:

```javascript
<option value="french">Français</option>
<option value="spanish">Español</option>
```

### Modify Image Upload

Currently uses numbered buttons (1-5). To add real file upload:

```javascript
const [uploadedFiles, setUploadedFiles] = useState([]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setUploadedFiles(files);
  // Convert to base64 or upload to cloud storage
};

<input 
  type="file" 
  multiple 
  accept="image/*"
  onChange={handleFileChange}
/>
```

## 📊 Backend Example (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/complaints', async (req, res) => {
  try {
    const { language, name, address, phone, details, images } = req.body;
    
    // Validate data
    if (!name || !address || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Save to database
    const complaint = await saveToDatabase({
      language,
      name,
      address,
      phone,
      details,
      images,
      timestamp: new Date(),
      status: 'pending'
    });
    
    // Send notification email (optional)
    await sendNotificationEmail(complaint);
    
    res.json({ 
      success: true, 
      id: complaint.id,
      message: 'Complaint submitted successfully' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## 🔒 Security Checklist

- [ ] Input validation on backend
- [ ] Rate limiting to prevent spam
- [ ] CSRF protection
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS protection (sanitize inputs)
- [ ] HTTPS only in production
- [ ] API key authentication
- [ ] Captcha for public endpoints (optional)

## 📱 QR Code Setup

Generate a QR code pointing to your deployed URL:

```
https://your-domain.com/complaint
```

Use tools like:
- QR Code Generator: https://www.qr-code-generator.com/
- QR Code Monkey: https://www.qrcode-monkey.com/

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload the build folder to your server
```

## 📝 License

MIT License - feel free to use this for your project!

## 🤝 Support

For issues or questions, please check:
1. Console errors in browser DevTools
2. Network tab for API call failures
3. Backend logs for server errors

---

**Built with React + Lucide Icons**
