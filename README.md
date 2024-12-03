# CSV Analyzer SaaS Platform

A powerful web-based SaaS platform for analyzing CSV data and creating interactive dashboards.

## Features

- 📊 CSV file upload and parsing
- 📈 Interactive data visualization
- 🔍 Advanced data analysis tools
- 📱 Responsive design
- 🔐 User authentication
- 💾 Dashboard saving and sharing

## Getting Started

### Prerequisites

- Node.js 16.x or later
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase configuration from the Firebase Console
   - Update `src/lib/firebase.ts` with your configuration:
     ```typescript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "your-app.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-app.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
     };
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Usage

1. Sign up or log in to your account
2. Upload a CSV file (max 5MB)
3. Analyze your data with the provided tools
4. Create custom visualizations
5. Save and share your dashboards

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- Firebase for backend services
- Chart.js for data visualization
- Papa Parse for CSV parsing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@csvanalyzer.com or open an issue in the repository.