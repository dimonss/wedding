# 📊 Excel Import/Export Functionality

## Overview
This wedding application now includes comprehensive Excel import/export functionality for managing guest lists. Users can easily export existing guest data to Excel files and import new guests from properly formatted Excel files.

## ✨ Features

### 📤 Export Functionality
- **Export All Guests**: Download complete guest list as Excel file
- **Automatic Formatting**: Excel files include all guest information with proper headers
- **Timestamped Filenames**: Files are automatically named with current date
- **Professional Styling**: Excel files include formatted headers and auto-sized columns

### 📥 Import Functionality
- **Excel Template**: Download pre-formatted template for easy data entry
- **File Validation**: Automatic validation of file format and size
- **Data Validation**: Ensures required fields and valid values
- **Bulk Import**: Import multiple guests at once
- **Error Handling**: Clear feedback on import success/failure

### 🔒 Security Features
- **Authentication Required**: All operations require valid admin credentials
- **File Type Validation**: Only Excel files (.xlsx, .xls) are accepted
- **File Size Limits**: Maximum file size of 5MB
- **Input Sanitization**: All imported data is validated and sanitized

## 🚀 How to Use

### 1. Access Excel Operations
1. Navigate to the admin panel
2. Look for the **"📊 Excel Operations"** button (single button with dropdown arrow)
3. Click the button to open the context menu

### 2. Export Guests to Excel
1. In the context menu, go to **"📤 Export Operations"** section
2. Click **"Export to Excel"** button
3. The file will automatically download with a timestamped filename
4. File contains: ID, UUID, Full Name, Gender, Status, Created At, Updated At

### 3. Download Import Template
1. In the context menu, go to **"📥 Import Operations"** section
2. Click **"Download Template"** button
3. A pre-formatted Excel template will download
4. Template includes:
   - Column headers: UUID, Full Name, Gender, Status
   - Data validation for Gender and Status columns
   - Example row with sample data
   - Proper formatting and styling

### 4. Import Guests from Excel
1. Fill in the downloaded template with your guest data
2. Ensure all required fields are completed
3. In the context menu, go to **"📥 Import Operations"** section
4. Click **"Import from Excel"** button
5. Select your completed Excel file
6. Wait for import confirmation
7. Refresh the guest list to see new guests

### 5. Get Help
1. In the context menu footer, click **"❓ Help & Instructions"** button
2. View detailed instructions and requirements
3. Access template download and file import directly from help modal

## 📋 Data Requirements

### Required Columns
- **UUID**: Unique identifier for each guest (can be generated or provided)
- **Full Name**: Guest's complete name
- **Gender**: Must be one of: `male`, `female`, `other`
- **Status**: Must be one of: `pending`, `accepted`, `rejected`

### Data Validation Rules
- **Gender**: Automatically converted to lowercase, invalid values default to `other`
- **Status**: Automatically converted to lowercase, invalid values default to `pending`
- **UUID**: Must be unique, can be any valid string
- **Full Name**: Required field, cannot be empty

### File Requirements
- **Format**: .xlsx or .xls only
- **Size**: Maximum 5MB
- **Structure**: Must include header row and at least one data row
- **Encoding**: UTF-8 recommended

## 🛠️ Technical Details

### Backend API Endpoints
- `GET /export/guests` - Export all guests to Excel
- `GET /export/template` - Download import template
- `POST /import/guests` - Import guests from Excel file

### Frontend Components
- `ExcelActions` - Main component with context menu for import/export functionality
- Single "Excel Operations" button with dropdown context menu
- Organized sections: Export Operations, Import Operations, Help
- Integrated into `AdminHeader` for easy access
- Responsive design for mobile and desktop
- Hover effects, animations, and visual feedback

### File Processing
- Uses `exceljs` library for robust Excel handling
- Automatic file cleanup after processing
- Progress indicators during operations
- Comprehensive error handling and user feedback

## 🔧 Troubleshooting

### Common Issues

#### Import Fails
- **File Format**: Ensure file is .xlsx or .xls
- **File Size**: Check file is under 5MB
- **Data Format**: Verify all required columns are present
- **Data Values**: Check gender and status values are valid

#### Export Fails
- **Authentication**: Ensure you're logged in as admin
- **Network**: Check internet connection
- **Permissions**: Verify you have access to guest data

#### Template Issues
- **Download Fails**: Check authentication and network
- **Format Problems**: Template should open in Excel or similar software
- **Validation Errors**: Ensure Excel supports data validation features

### Error Messages
- **"File too large"**: Reduce file size below 5MB
- **"Invalid file format"**: Use only .xlsx or .xls files
- **"Missing required fields"**: Check all columns are filled
- **"Authentication required"**: Log in with admin credentials

## 📱 Mobile Support
- Responsive design for all screen sizes
- Touch-friendly buttons and controls
- Optimized layout for mobile devices
- File picker integration for mobile browsers

## 🎯 Context Menu Features

### **Single Button Interface**
- **📊 Excel Operations** - Main button with dropdown arrow
- **Clean Design** - Replaces multiple buttons with organized menu
- **Visual Feedback** - Hover effects and smooth animations

### **Organized Sections**
- **📤 Export Operations** - All export-related functions
- **📥 Import Operations** - All import-related functions  
- **Help & Instructions** - Quick access to guidance

### **User Experience**
- **Descriptive Labels** - Each option includes helpful descriptions
- **Visual Icons** - Clear emoji indicators for each operation
- **Hover Effects** - Color-coded hover states for different operations
- **Loading States** - Progress indicators during operations

## 🔮 Future Enhancements
- **Batch Operations**: Process multiple files at once
- **Advanced Validation**: Custom validation rules
- **Data Mapping**: Flexible column mapping
- **Export Filters**: Export filtered guest lists
- **Scheduled Exports**: Automated export scheduling
- **Cloud Integration**: Direct cloud storage uploads

## 📞 Support
For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Note**: This functionality requires proper authentication and admin privileges. Ensure you have the correct credentials before attempting to use these features. 