// Test data for Excel import testing
// This file contains sample guest data that can be used to test the import functionality

export const sampleGuestData = [
    {
        uuid: '550e8400-e29b-41d4-a716-446655440001',
        fullName: 'John Smith',
        gender: 'male',
        status: 'pending'
    },
    {
        uuid: '550e8400-e29b-41d4-a716-446655440002',
        fullName: 'Jane Doe',
        gender: 'female',
        status: 'accepted'
    },
    {
        uuid: '550e8400-e29b-41d4-a716-446655440003',
        fullName: 'Bob Johnson',
        gender: 'male',
        status: 'rejected'
    },
    {
        uuid: '550e8400-e29b-41d4-a716-446655440004',
        fullName: 'Alice Brown',
        gender: 'female',
        status: 'pending'
    },
    {
        uuid: '550e8400-e29b-41d4-a716-446655440005',
        fullName: 'Charlie Wilson',
        gender: 'other',
        status: 'accepted'
    }
];

// Instructions for testing:
// 1. Use the backend API endpoint /export/template to download the Excel template
// 2. Fill in the template with the sample data above
// 3. Save the file as .xlsx
// 4. Use the frontend import functionality to upload the file
// 5. Verify that the guests are imported correctly

console.log('Sample guest data for testing:');
console.log(JSON.stringify(sampleGuestData, null, 2)); 