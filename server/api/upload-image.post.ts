// server/api/upload-image.post.js

export default defineEventHandler(async (event) => {
    try {
      // For now, we're just returning a hardcoded URL
      // Later, this will handle the actual file upload
      
      // You can still read the file if you want to log it
      // const formData = await readMultipartFormData(event)
      // console.log('File received:', formData)
      
      
      // Hardcoded S3 URL for testing
      const imageUrl = 'https://asgard-thor-assets.comprodls.com/engage/1741695276052/ootb-config/1df98e77/ootb/assets/images/logo_mc.webp'
      
      // Froala expects this exact response format
      return {
        link: imageUrl
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      
      // Froala expects error in this format
      return {
        error: 'Upload failed: ' + error.message
      }
    }
  })