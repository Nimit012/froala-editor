# Froala Editor - Nuxt.js Implementation

A Nuxt.js application integrating the Froala WYSIWYG editor with image upload capabilities, auto-save functionality, and AWS S3 storage integration.

**Note**: For custom plugin development and implementation details, please refer to the `main` branch. This branch focuses on the core Froala editor setup.

## Overview

This project provides a production-ready implementation of the Froala WYSIWYG editor in a Nuxt.js application. It includes:

- Full-featured rich text editing with Froala Editor
- Image upload with AWS S3 integration
- Auto-save functionality using localStorage
- WIRIS MathType integration for mathematical formulas
- Customizable toolbar and editor configuration
- Preview modal for viewing rendered content

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v10 or higher (Package manager)
- **AWS Account**: For S3 image storage (optional, but required for image uploads)

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd map-froala
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# AWS S3 Configuration (for image uploads)
MY_AWS_ACCESS_KEY_ID=your_aws_access_key_id
MY_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
MY_AWS_REGION=us-east-1
MY_S3_BUCKET_NAME=your-s3-bucket-name

# Froala License Key
FROALA_KEY=your_froala_license_key
```

> **Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
map-froala/
├── app/                          # Application source code
│   ├── assets/                   # Static assets
│   │   ├── css/
│   │   │   └── tailwind.css      # Tailwind CSS configuration
│   │   └── icons/
│   │       └── chevron-right.svg # SVG icons
│   ├── components/               # Vue components
│   │   ├── froalaEditor.vue      # Main Froala editor component
│   │   ├── ModalWrapper.vue      # Reusable modal wrapper
│   │   ├── previewModal.vue      # Content preview modal
│   │   └── plugin/               # Custom plugin components (see main branch)
│   ├── layouts/
│   │   └── default.vue           # Default layout
│   ├── pages/
│   │   ├── index.vue             # Main editor page
│   │   └── author/               # Additional pages
│   ├── plugins/
│   │   └── froala.client.ts      # Froala client-side initialization
│   ├── utils/                    # Utility functions
│   │   ├── froalaConfig.ts       # Editor configuration
│   │   ├── froalaPlugins.ts      # Plugin registration
│   │   ├── froalaStorage.ts      # localStorage utilities
│   │   └── modal.ts              # Modal system
│   ├── app.vue                   # Root component
│   └── tailwind.config.ts        # Tailwind configuration
├── server/                       # Server-side code
│   └── api/
│       └── upload-image.post.ts  # Image upload API endpoint
├── public/                       # Public static files
│   ├── favicon.ico
│   └── robots.txt
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## File Descriptions

### Core Application Files

#### `app/app.vue`

Root Vue component that serves as the entry point for the application. Contains the `<NuxtLayout>` and `<NuxtPage>` components.

### Editor Components

#### `app/components/froalaEditor.vue`

Main Froala editor wrapper component. Handles:

- Editor initialization and lifecycle
- Plugin registration (one-time global registration)
- Auto-save functionality
- Content synchronization with v-model
- Storage operations (save, load, clear)

### Utility Files

#### `app/utils/froalaConfig.ts`

Exports `getFroalaConfig()` function that returns the default Froala editor configuration:

**Configuration includes:**

- Toolbar buttons (formatting, alignment, lists, media, etc.)
- Image upload settings
- HTML allowed tags and attributes
- Font sizes and paragraph formats
- Event handlers (contentChanged, initialized)
- WIRIS MathType integration

**Key Settings:**

- `imageUploadURL`: `/api/upload-image` (server endpoint)
- `imageMaxSize`: 5MB
- `autoSave`: Configurable auto-save to localStorage
- `htmlUntouched`: Preserves HTML structure

#### `app/utils/froalaStorage.ts`

Provides localStorage utilities for editor content persistence:

### Server Files

#### `server/api/upload-image.post.ts`

API endpoint for handling image uploads to AWS S3.

**Process:**

1. Receives multipart form data from Froala editor
2. Validates file upload
3. Configures AWS S3 client with credentials from environment variables
4. Uploads file to S3 bucket with timestamped filename
5. Returns CloudFront CDN URL for the uploaded image

**Environment Variables Used:**

- `MY_AWS_ACCESS_KEY_ID`
- `MY_AWS_SECRET_ACCESS_KEY`
- `MY_AWS_REGION`
- `MY_S3_BUCKET_NAME`

**Response Format:**

```json
{
  "link": "https://reader2-content-dev.comprodls.com/uploads/1234567890_image.jpg"
}
```

### Page Files

#### `app/pages/index.vue`

Main editor page that includes:

- Froala editor instance
- Preview modal
- Save/Load/Clear buttons
- Content management functionality

## Image Storage

### Storage Architecture

Images uploaded through the Froala editor are stored using the following architecture:

```
User uploads image
       ↓
Froala Editor (client)
       ↓
POST /api/upload-image
       ↓
Server API Handler
       ↓
AWS S3 Bucket
       ↓
CloudFront CDN
       ↓
Image URL returned to editor
```

### S3 Bucket Structure

Images are stored in the S3 bucket with the following path structure:

```
s3://your-bucket-name/
└── uploads/
    ├── 1706789012345_image1.jpg
    ├── 1706789023456_image2.png
    └── 1706789034567_image3.gif
```

**Path Format:** `uploads/{timestamp}_{original_filename}`

**Example:**

- Original file: `photo.jpg`
- S3 key: `uploads/1706789012345_photo.jpg`
- CloudFront URL: `https://reader2-content-dev.comprodls.com/uploads/1706789012345_photo.jpg`

### Image Upload Flow

1. **User Action**: User clicks "Insert Image" in Froala toolbar and selects a file
2. **Client Upload**: Froala sends POST request to `/api/upload-image` with multipart form data
3. **Server Processing**:
   - Validates file exists
   - Checks AWS credentials
   - Generates unique filename with timestamp
   - Uploads to S3 with proper content type
4. **S3 Storage**: File is stored in the configured bucket under `uploads/` prefix
5. **URL Return**: CloudFront CDN URL is returned to Froala
6. **Editor Insert**: Froala inserts `<img>` tag with the CloudFront URL

### Supported Image Formats

- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)

**Maximum file size:** 5MB (configurable in `froalaConfig.ts`)

### CloudFront CDN

Images are served through CloudFront CDN for:

- **Fast delivery**: Global edge locations
- **Reduced latency**: Cached content closer to users
- **Bandwidth optimization**: Efficient content delivery

**CDN Domain:** `https://reader2-content-dev.comprodls.com/`

## Configuration

### Froala Editor Configuration

The editor configuration is centralized in `app/utils/froalaConfig.ts`. Key configuration options:

```typescript
{
  key: "YOUR_FROALA_LICENSE_KEY",
  height: "auto",
  width: "100%",
  toolbarButtons: [...],        // Customize toolbar
  imageUploadURL: "/api/upload-image",
  imageMaxSize: 5 * 1024 * 1024,  // 5MB
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
  autoSave: true,               // Enable auto-save
  // ... more options
}
```

### Customizing the Toolbar

Edit the `toolbarButtons` array in `froalaConfig.ts`:

```typescript
toolbarButtons: [
  "undo",
  "redo",
  "|",
  "bold",
  "italic",
  "underline",
  "|",
  "insertImage",
  "insertLink",
  // Add or remove buttons as needed
];
```

## Custom Plugins

> **Important**: This branch contains the core Froala editor implementation without custom plugin details.
>
> For information about custom plugins (Input Fields, Flashcards, etc.), please refer to the **`main` branch** of this repository.

**Last Updated**: February 2026
