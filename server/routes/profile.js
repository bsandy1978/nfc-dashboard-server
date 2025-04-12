const express = require('express');
const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  claimProfile,
  getUserProfiles
} = require('../controllers/profile');

const router = express.Router({ mergeParams: true });

// Protect all routes
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getProfiles)
  .post(protect, createProfile);

router
  .route('/:id')
  .get(getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

router
  .route('/:id/claim')
  .post(protect, claimProfile);

router
  .route('/user/:userId')
  .get(protect, getUserProfiles);

module.exports = router; 