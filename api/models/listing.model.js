import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description_en: {
      type: String,
      required: true,
    },
    description_fi: {
      type: String,
      required: true,
    },
    description_de: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    area:{
      type: Number,
      required: true,
    },
    agency:{
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Listing = mongoose.model('Listing', listingSchema)

export default Listing