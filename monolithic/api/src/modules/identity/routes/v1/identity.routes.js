import express from 'express';
import { initRegisterValidator, verifyRegisterViewerValidator, initRegisterCreatorValidation } from '../../validators/register.validator.js';
import { initRegisterViewerController, verifyRegisterController, initRegisterCreatorController } from '../../controllers/register.controller.js';
import { uploadImage, handleUploadError } from '../../../../middleware/multer.middleware.js';


const router = express.Router();


// register for viewer
router.post('/register/viewer-init', initRegisterValidator, initRegisterViewerController);

// register for creator
router.post('/register/creator-init', uploadImage.array("verificationPhotos", 2), handleUploadError, initRegisterCreatorValidation, initRegisterCreatorController);

// verify register
router.post('/register/verify', verifyRegisterViewerValidator, verifyRegisterController);
export default router;