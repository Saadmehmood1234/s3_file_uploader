# FileKeeper

FileKeeper is a secure full-stack file storage and management application that allows users to upload, organize, preview, download, and share files from a simple dashboard.

The application uses AWS S3 presigned URLs for direct and secure file uploads, while file metadata and user information are managed through an Express.js API and PostgreSQL.

### [live site](https://s3-file-uploader-fl7k-one.vercel.app)

## Features

- User signup and login
- JWT authentication using HTTP-only cookies
- Secure file upload using AWS S3 presigned URLs
- Upload multiple files
- Real-time upload progress
- Support for files up to 400 MB
- File preview for supported formats
- Download files securely
- Rename files
- Delete files
- Mark files as important
- Public and private file visibility
- Share public files using a link
- Search and filter files
- Recent files section
- Shared/public files section
- Storage usage dashboard
- Responsive UI
- Protected routes and file ownership validation

## Supported File Types

FileKeeper supports common document, image, archive, audio, and video formats.

### Documents

- PDF
- TXT
- CSV
- DOC / DOCX
- XLS / XLSX
- PPT / PPTX
- JSON
- XML
- Markdown

### Images

- JPG / JPEG
- PNG
- WEBP
- AVIF
- GIF
- SVG
- BMP
- TIFF
- ICO

### Archives

- ZIP
- RAR
- 7Z
- TAR
- GZ

### Audio

- MP3
- WAV
- OGG
- M4A
- AAC
- FLAC

### Video

- MP4
- WEBM
- MOV
- AVI
- MKV

> Some formats can be stored and downloaded but cannot be previewed directly in the browser.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React for icons
- Sonner for toast

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- Zod
- bcrypt
- node-pg-migrate

### Storage & Infrastructure

- AWS S3
- S3 Presigned URLs
- Vercel
- VPS
- PM2


## Authentication Flow

- FileKeeper uses JWT-based authentication with HTTP-only cookies.

- After successful login, the backend generates a JWT and stores it inside a secure HTTP-only cookie.

- Protected endpoints verify the token before allowing access to user data or private files.

## File Privacy

- Files are private by default.

### Private

- Private files can only be accessed by their owner.

### Public

- Users can change a file's visibility to public and generate a shareable link.

- Anyone with the public link can access the shared file.

## Run project locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd s3_file_uploader
```

### 2. Backend

```bash
cd backend
npm install
```

Create a .env file:

```bash backend
PORT=5001
NODE_ENV=development

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
```

Run database migrations:

```bash
npm run migrate:up
```

Start the backend:

```bash
npm run dev
```

### 3.Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```bash
frontend/.env.local
```

Add:

```bash
NEXT_PUBLIC_API_URL=/api/backend
BACKEND_URL=http://localhost:5001
```

Start the frontend:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Production Deployment

```text
User
 │
 ▼
Vercel
Next.js Frontend
 │
 │ /api/backend/*
 ▼
Next.js Rewrite
 │
 ▼
Express API
VPS
 │
 ├── PostgreSQL
 │
 └── AWS S3
```

PM2 can be used to keep the backend running:

```bash
npm run build

pm2 start dist/server.js --name file-storage-backend

pm2 save
```

## Future Improvements
Some features that can be added in the future:

- Folder and subfolder support
- Drag-and-drop file organization
- Bulk delete/download
- File version history
- Storage plans
- Trash and restore
- Expiring public links
- Password-protected sharing
= File activity history
- Team workspaces
- Role-based permissions

## Author

Saad Mehmood

Full Stack Developer

- [Portfolio](https://my-portfolio-758k.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/saad-mehmood-4a6036255)
- [GitHub](https://github.com/Saadmehmood1234)
