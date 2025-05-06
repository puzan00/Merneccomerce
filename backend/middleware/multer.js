import multer from "multer";

// Define storage configuration for uploaded files
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    // Save the file using its original name
    callback(null, file.originalname);
  }
});

// Create a multer instance with the defined storage config
const upload = multer({ storage });

// Export the configured multer instance for use in routes/controllers
export default upload;
