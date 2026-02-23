# File Upload API

A REST API for uploading and managing files using **Node.js**, **Express.js**, and **MongoDB**.
This project allows users to upload files (images, videos, documents), store metadata in MongoDB, and retrieve/download them. It supports local storage and cloud storage via Cloudinary.

## 🚀 Features

- Upload single or multiple files
- Store file metadata in MongoDB
- Support for image, video, and document uploads
- Cloud storage integration with Cloudinary
- Image size reduction functionality
- Email notifications (via Nodemailer)
- File validation for size and type
- Download and delete files

## 🧰 Tech Stack

- **Language:** JavaScript (ES6+)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **File Upload:** express-fileupload
- **Cloud Storage:** Cloudinary
- **Email:** Nodemailer
- **Environment:** dotenv for configuration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- A Cloudinary account for cloud storage
- An email service for notifications (e.g., Gmail, SendGrid)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankurtyagi-dev/File-Upload.git
   cd File-Upload
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following environment variables:**
   ```env
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/fileupload
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env`).

## 📡 API Endpoints

**Base URL:** `http://localhost:3000/api/v1/upload`

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | /localFileUpload      | Upload a file to local storage       |
| POST   | /imageUpload          | Upload an image to Cloudinary        |
| POST   | /videoUpload          | Upload a video to Cloudinary         |
| POST   | /imageUploadReduced   | Upload and reduce image size         |

## 📁 Example Requests

### Upload Local File

**Request:**
```
POST /api/v1/upload/localFileUpload
Content-Type: multipart/form-data

file: <choose file>
```

**Response:**
```json
{
  "success": true,
  "message": "Local File Uploaded Successfully"
}
```

### Upload Image to Cloudinary

**Request:**
```
POST /api/v1/upload/imageUpload
Content-Type: multipart/form-data

name: "Sample Image"
tags: "sample, image"
email: "user@example.com"
imageFile: <choose image file>
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://cloudinary.com/...",
    "public_id": "...",
    "secure_url": "..."
  }
}
```

## 🗃️ Database Model

The file metadata is stored using the following Mongoose schema:

```javascript
const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
```

## 🛡️ File Validation

The API includes validation for file types and sizes. Supported formats include:

- Images: JPG, JPEG, PNG
- Videos: MP4, MOV, AVI
- Documents: PDF, DOC, DOCX

File size limits can be configured in the upload handlers.

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

1. **Upload a file:** Send a POST request with form-data to the appropriate endpoint.
2. **Check metadata:** Retrieve file information from the database.
3. **Download files:** Use the download endpoint if implemented.

Example curl command for local file upload:
```bash
curl -X POST -F "file=@/path/to/your/file.jpg" http://localhost:3000/api/v1/upload/localFileUpload
```

## 📜 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Note:** Make sure to configure your Cloudinary and email settings properly in the `.env` file for full functionality.
