import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    sparse: true, // Allows the field to be optional and non-conflicting
    trim: true,
    minlength: 16, // Ensure slug length
    maxlength: 16
  },

  username: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,  // Allows it to be optional and non-conflicting
    match: [/^[a-zA-Z0-9_-]+$/, "Username can only contain alphanumeric characters, dashes, and underscores."]
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true
  },

  isOwner: {
    type: Boolean,
    default: false
  },

  name: { type: String, default: "" },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  avatar: { type: String, default: "" },

  email: {
    type: String,
    default: "",
    match: [/.+@.+\..+/, "Please enter a valid email address."]
  },

  instagram: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
  website: { type: String, default: "" },
  location: { type: String, default: "" },
  upi: { type: String, default: "" },

  ownerDeviceId: {
    type: String,
    default: null,  // This will be set on first tap
    unique: true,
    sparse: true // Allows the field to be optional and non-conflicting
  }
}, {
  timestamps: true
});

export default mongoose.model('UserProfile', UserProfileSchema);