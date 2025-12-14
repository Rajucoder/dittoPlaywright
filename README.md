# 🚀 Ditto Insurance – Automation Framework

## Premium Calculation & Add-ons Validation Test

**Author:** Rajeshwari Nadar

![Playwright](https://img.shields.io/badge/Playwright-2.0.0-45b7d1?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square) ![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

---

## 🎯 Project Overview

This project automates the **Activ One Health Insurance Plan** premium calculation flow on the Ditto insurance platform (https://stag-app.joinditto.in/fq) as part of the Ditto QA Automation Assignment.

### 💡 Original Requirement

**Automate the following scenarios:**

- ✅ Selecting the product **Activ One**
- ✅ Selecting **You** (Individual)
- ✅ Filling the **"Tell us about you"** form
- ✅ **Validating:** Total Premium = Base Premium + Add-ons (Claim Protect + Super Credit) + GST

### ⚠️ IMPORTANT NOTE

> This framework validates the **Activ One Health Product** with 100% alignment to assignment requirements. All premium calculations, validations, and add-on selections are tested end-to-end.

---

## 🏗️ Tech Stack

| Component | Version |
|-----------|---------|
| **Playwright** | 1.57.0 |
| **TypeScript** | 5.0+ |
| **Node.js** | 18+ |
| **Test Framework** | Playwright Test |
| **Design Pattern** | Page Object Model (POM) |
| **Reporting** | HTML Report |

---

## 📁 Project Structure

```
ditto/
├── tests/
│   ├── pages/
│   │   └── DittoPremiumPage.ts           # Page Object Model - Premium Page Interactions
│   ├── premiumCalculation.spec.ts        # Premium Calculation Test Suite
│   └── example.spec.ts                   # Example Test
├── playwright-report/                    # HTML Test Reports
├── test-results/                         # Detailed Test Results
├── playwright.config.ts                  # Playwright Configuration
├── package.json                          # Project Dependencies
├── .gitignore                            # Git Ignore Rules
├── README.md                             # This File
└── node_modules/                         # Dependencies
```

---

## 🔄 Automated Scenario Steps

### 📍 **Landing Page**
```
✓ Navigate to https://stag-app.joinditto.in/fq
✓ Wait for page to load (networkidle)
✓ Select "Activ One" product
```

### 📋 **Quick Flow Pages**
```
✓ Click Next button (Page 1)
✓ Click Next button (Page 2)
✓ Click Next button (Page 3)
✓ Click Continue button
```

### 👤 **Member Selection Page**
```
✓ Select "Self" member
✓ Select "Male" gender
✓ Click "Next step" button
```

### 📝 **Plan Details Page**
Validate and navigate through:
- Main Benefits
- Waiting Periods
- What's Not Covered
- Extra Benefits
- Click "Continue"

### 👨‍👩‍👧 **Member Information Page**
Fill required fields:
- **Age:** 30
- **Pin Code:** 400001
- Click "Calculate Premium"

### 💰 **Premium Summary Page**

#### Extract Premium Values:
```typescript
✓ Base Premium (without add-ons)
✓ Claim Protect Add-on Premium
✓ Super Credit Add-on Premium
✓ GST Calculation
```

#### Validate Calculations:
```
✓ Total Premium = Base Premium + Riders + GST
✓ Premium values are extracted as numeric (float/int)
✓ Currency (₹) and formatting removed via regex: [^0-9.]
✓ Support for multiple decimal values
```

#### Toggle Add-ons:
```
✓ Check "Claim Protect" add-on
✓ Check "Super Credit" add-on
✓ Verify premium updates dynamically
```

### 📊 **Reporting**
```
✓ Generate HTML Test Reports
✓ Log all premium values to console
✓ Capture test execution details
```