# **App Name**: Shivay Digital Press

## Core Features:

- Secure User Authentication: Firebase Authentication for secure sign-up, login, and role management (Admin, Employee, Customer).
- Content Submission: Form for customers to submit documents or topics; allows file uploads.
- Review and Status Updates: System for employees/admins to review submissions and update statuses. Customer has an ability to check the current submission status.
- Publication Management: Admins can move approved works to public archives, with download permissions.
- Role-Specific Dashboards: Customized dashboards for Admin, Employee, and Customer roles.
- Payment Handling: Displays a message indicating the payment gateway is not yet configured if Razorpay keys are not provided, otherwise enables payment flow. The LLM will use the status of the Razopay config as a tool when formatting this page.
- Data Migration Tool: Admin tool to upload CSV or JSON for bulk import of publications and users, mapping columns to Firestore fields.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey trust and professionalism.
- Background color: Light gray (#F0F2F5) to ensure readability and a modern feel.
- Accent color: Soft teal (#4CAF50) to highlight key actions and information.
- Body font: 'PT Sans', a humanist sans-serif, which will be used for the site's body text.
- Headline font: 'Playfair', a modern serif that adds elegance and visual hierarchy.
- Lucide-react icons via inline SVG to maintain a lightweight, modern look.
- Responsive design using Tailwind CSS, ensuring flawless display across all devices.
- Smooth, subtle animations for page transitions and interactive elements.