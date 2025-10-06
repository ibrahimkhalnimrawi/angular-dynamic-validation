# Dynamic Form Validation POC

A comprehensive Angular application demonstrating advanced reactive form validation with custom validators and dynamic error message handling.

**Personal Project by Ibrahim Alnimrawi**  
📧 Contact: [ibrahim.alnimrawi@hotmail.com](mailto:ibrahim.alnimrawi@hotmail.com)

## 🚀 Features

### ✅ **Comprehensive Validation System**
- **Basic Validators**: Required fields, email validation, min/max length
- **File Upload Validators**: File extension and size validation
- **Phone/Mobile Validators**: Saudi Arabia phone number formats
- **Financial Validators**: IBAN validation for Saudi Arabia
- **Password Validators**: Complex password requirements and confirmation matching
- **Text Validators**: Alphabetic, Arabic, and numeric-only validation
- **ID Validators**: National ID validation for Saudi Arabia
- **URL Validators**: HTTP/HTTPS URL validation

### ✅ **Dynamic Error Handling**
- **Real-time Validation**: Instant feedback as users type
- **Custom Error Messages**: Localized error messages with dynamic parameters
- **Visual Feedback**: Error borders and styling for invalid fields
- **State Management**: Smart error display based on field state (dirty, touched, submitted)

### ✅ **Modern UI/UX**
- **Bootstrap Integration**: Responsive design with Bootstrap 5
- **Clean Interface**: Organized sections with clear labels and placeholders
- **Form Status**: Real-time form validation status display
- **Interactive Elements**: Submit/Reset functionality with proper state handling

## 🏗️ Architecture

### **Project Structure**
```
src/app/
├── components/
│   └── input-error.component.ts          # Error message display component
├── directives/
│   ├── dynamic-validator-message.directive.ts  # Dynamic validation directive
│   └── validator-container.directive.ts         # Message container directive
├── pipes/
│   └── message.pipe.ts                  # Error message transformation pipe
├── services/
│   └── state-matcher.service.ts        # Validation state management
├── validators/
│   ├── _index.ts                       # Validator exports
│   ├── alphabetic-with-special.validator.ts
│   ├── arabic-alphabetic.validator.ts
│   ├── arabic-alphabetic-with-spaces.validator.ts
│   ├── complex-password.validator.ts
│   ├── email-address.validator.ts
│   ├── file.validator.ts
│   ├── iban.validator.ts
│   ├── mobile-number.validator.ts
│   ├── mobile-or-phone-number.validator.ts
│   ├── national-id.validator.ts
│   ├── numbers-only.validator.ts
│   ├── password-match.validator.ts
│   ├── phone-number.validator.ts
│   └── url.validator.ts
└── value-objects/
    └── validation-error-messages.token.ts  # Error message definitions
```

## 🛠️ Technology Stack

- **Angular 20**: Latest Angular framework with standalone components
- **Reactive Forms**: Advanced form handling with FormBuilder
- **TypeScript**: Type-safe development
- **Bootstrap 5**: Modern CSS framework for responsive design
- **RxJS**: Reactive programming for form state management

## 📋 Validators Overview

### **Basic Validators**
| Validator | Description | Example |
|-----------|-------------|---------|
| `required` | Field is mandatory | Any non-empty value |
| `email` | Valid email format | `user@example.com` |
| `minlength` | Minimum character count | 5+ characters |
| `maxlength` | Maximum character count | ≤10 characters |

### **File Validators**
| Validator | Description | Parameters |
|-----------|-------------|------------|
| `fileValidator` | File extension & size validation | `allowedExtensions: string[]`, `maxFileSizeMB: number` |

### **Phone/Mobile Validators**
| Validator | Description | Format |
|-----------|-------------|--------|
| `phoneNumberValidator` | Saudi landline numbers | `01xxxxxxxx` |
| `mobileNumberValidator` | Saudi mobile numbers | `05xxxxxxxx` |
| `mobileOrPhoneNumberValidator` | Either mobile or landline | `01xxxxxxxx` or `05xxxxxxxx` |

### **Financial Validators**
| Validator | Description | Format |
|-----------|-------------|--------|
| `ibanValidator` | Saudi Arabia IBAN validation | `SA` + 22 digits |

### **Password Validators**
| Validator | Description | Requirements |
|-----------|-------------|--------------|
| `complexPasswordValidator` | Strong password validation | 8+ chars, uppercase, lowercase, number, special char |
| `passwordMatchValidator` | Password confirmation | Must match password field |

### **Text Validators**
| Validator | Description | Allowed Characters |
|-----------|-------------|-------------------|
| `alphabeticWithSpecialValidator` | Letters, numbers, symbols | `a-zA-Z0-9\s\-_.,!@#$%^&*()` |
| `arabicAlphabeticValidator` | Arabic letters only | `\u0600-\u06FF` |
| `arabicAlphabeticWithSpacesValidator` | Arabic letters + spaces | `\u0600-\u06FF\s` |
| `numbersOnlyValidator` | Numeric input only | `0-9` |

### **ID Validators**
| Validator | Description | Format |
|-----------|-------------|--------|
| `nationalIdValidator` | Saudi National ID | `1` + 9 digits |

### **URL Validators**
| Validator | Description | Format |
|-----------|-------------|--------|
| `urlValidator` | HTTP/HTTPS URLs | `https://` or `http://` |

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd dynamic-form-validation

# Install dependencies
npm install

# Start development server
npm start
```

### **Build for Production**
```bash
npm run build
```

## 🎯 Usage Examples

### **Basic Form Setup**
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator, emailAddressValidator } from './validators/_index';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailAddressValidator]],
      phone: ['', phoneNumberValidator],
      password: ['', complexPasswordValidator],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }
}
```

### **Template Integration**
```html
<form [formGroup]="form" MessageContainer>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input 
      type="email" 
      id="email"
      class="form-control" 
      formControlName="email"
      placeholder="Enter your email">
  </div>
  
  <button type="submit" [disabled]="form.invalid">
    Submit
  </button>
</form>
```

## 🔧 Customization

### **Adding New Validators**
1. Create validator file in `src/app/validators/`
2. Export validator from `_index.ts`
3. Add error message to `validation-error-messages.token.ts`
4. Use in form definition

### **Custom Error Messages**
```typescript
// In validation-error-messages.token.ts
export const ERROR_MESSAGES = {
  customValidator: ({ minValue }) => `Value must be at least ${minValue}`,
  // ... other messages
};
```

### **Styling Customization**
```css
/* Custom error styling */
.text-danger {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-control.text-danger {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
```

## 🧪 Testing

### **Manual Testing Scenarios**
1. **Required Fields**: Leave empty and verify error messages
2. **Email Validation**: Test invalid email formats
3. **Phone Numbers**: Test various phone number formats
4. **File Upload**: Test file size and extension restrictions
5. **Password Strength**: Test password complexity requirements
6. **Password Matching**: Test password confirmation validation

### **Test Data Examples**
```typescript
// Valid test data
const validData = {
  requiredField: 'Test Value',
  emailField: 'test@example.com',
  phoneNumber: '0123456789',
  mobileNumber: '0512345678',
  ibanField: 'SA0380000000608010167519',
  password: 'MySecure123!',
  confirmPassword: 'MySecure123!',
  nationalId: '1234567890',
  websiteUrl: 'https://example.com'
};
```

## 📚 API Reference

### **DynamicValidatorMessage Directive**
- **Selector**: `[formControl]:not([withoutValidation])`
- **Purpose**: Automatically handles validation display for form controls
- **Features**: Error borders, dynamic error messages, state management

### **MessageContainer Directive**
- **Selector**: `[MessageContainer]`
- **Purpose**: Provides container for error message components
- **Usage**: Applied to form element

### **StateMatcher Service**
- **Purpose**: Determines when to show validation errors
- **Methods**: `isErrorVisible(control, form)`
- **Behavior**: Shows errors when field is dirty/touched and form is submitted

## 📄 License

This is a personal project created for demonstration and learning purposes.

## 🙏 Acknowledgments

- Angular Team for the excellent framework
- Bootstrap Team for the CSS framework
- Open source community for inspiration and resources

## 📞 Contact & Support

**Project Author:** Ibrahim Alnimrawi  
📧 **Email:** [ibrahim.alnimrawi@hotmail.com](mailto:ibrahim.alnimrawi@hotmail.com)

For questions, feedback, or collaboration opportunities, feel free to reach out!

---

**Built with ❤️ by Ibrahim Alnimrawi using Angular 20**
