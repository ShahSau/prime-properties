import { useEffect, useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RadioGroup } from '@headlessui/react'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: 'Front of men\'s Basic Tee in black.',
  },
  {
    id: 12,
    title: 'Basi22c Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: 'Front of men\'s Basic Tee in black.',
  },
  // More products...
]
const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const navigate = useNavigate()
  const params = useParams()
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    area: 20,
    agency: '',
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId
      const res = await fetch(`/api/listing/get/${listingId}`)
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        return
      }
      setFormData(data)
    }

    fetchListing()
  }, [])

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
        })
    } else {
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image')
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price')
      setLoading(true)
      setError(false)
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }

  }
  return (
    <main>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="flex items-center text-2xl">Listing details</h2>

          <form  onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              {/* name */}
              <div>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Name
                  </label>
                  <div className="mt-1">
                    <input
                      type='text'
                      placeholder='Name'
                      className='block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='name'
                      maxLength='62'
                      minLength='10'
                      required
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
              </div>

              {/* description*/}

              <div className='border-t border-gray-300'>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  description
                  </label>
                  <div className="mt-1">
                    <textarea
                      type='text'
                      placeholder='Description'
                      className='block w-full p-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='description'
                      required
                      onChange={handleChange}
                      value={formData.description}
                    />
                  </div>
                </div>
              </div>
              {/* address*/}
              <div>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Address
                  </label>
                  <div className="mt-1">
                    <input
                      type='text'
                      placeholder='Name'
                      className='block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='name'
                      maxLength='62'
                      minLength='10'
                      required
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
                </div>
              </div>
              {/* agency*/}
              <div>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Agency
                  </label>
                  <div className="mt-1">
                    <input
                      type='text'
                      placeholder='Name'
                      className='block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='name'
                      maxLength='62'
                      minLength='10'
                      required
                      onChange={handleChange}
                      value={formData.agency}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div >
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Rent
                  </label>
                  <div className="mt-1">
                    <input
                      type='checkbox'
                      id='rent'
                      className='w-5'
                      onChange={handleChange}
                      checked={formData.type === 'rent'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Sale
                  </label>
                  <div className="mt-1">
                    <input
                      type='checkbox'
                      id='sale'
                      className='w-5'
                      onChange={handleChange}
                      checked={formData.type === 'sale'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Offer
                  </label>
                  <div className="mt-1">
                    <input
                      type='checkbox'
                      id='offer'
                      className='w-5'
                      onChange={handleChange}
                      checked={formData.offer}
                    />
                  </div>
                </div>
              </div>


              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Amenities</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Beadrooms
                    </label>
                    <div className="mt-1">
                      <input
                        type='number'
                        id='bedrooms'
                        min='1'
                        max='10'
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleChange}
                        value={formData.bedrooms}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Bathrooms
                    </label>
                    <div className="mt-1">
                      <input
                        type='number'
                        id='bathrooms'
                        min='1'
                        max='10'
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleChange}
                        value={formData.bathrooms}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    furnished
                    </label>
                    <div className="mt-1">
                      <input
                        type='checkbox'
                        id='furnished'
                        className='w-5'
                        onChange={handleChange}
                        checked={formData.furnished}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    parking
                    </label>
                    <div className="mt-1">
                      <input
                        type='checkbox'
                        id='parking'
                        className="block w-5 rounded-md border-gray-300"
                        onChange={handleChange}
                        checked={formData.parking}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                    Areas
                    </label>
                    <div className="mt-1">
                      <input
                        type='number'
                        id='area'
                        min='20'
                        max='100'
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleChange}
                        value={formData.area}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Amenities</h2>
                <div className="mt-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                    Regular Price
                    </label>
                    <div className="mt-1">
                      <input
                        type='number'
                        id='regularPrice'
                        min='50'
                        max='10000000'
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                      {formData.type === 'rent' && (
                        <span className='text-xs'>($ / month)</span>
                      )}

                    </div>
                  </div>
                  {formData.offer && (
                    <div className="sm:col-span-2">
                      <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                    Discounted price
                      </label>
                      <div className="mt-1">
                        <input
                          type='number'
                          id='discountPrice'
                          min='0'
                          max='10000000'
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleChange}
                          value={formData.discountPrice}
                        />
                        {formData.type === 'rent' && (
                          <span className='text-xs'>($ / month)</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Images</h2>
              <span className='font-normal text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
              {/* upload images*/}
              <div className='flex gap-4'>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className='p-3 border border-gray-300 rounded w-full'
                  type='file'
                  id='images'
                  accept='image/*'
                  multiple
                />
                <button
                  type='button'
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className='w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >

                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              {
                imageUploadError && toast.error(`${imageUploadError}`, {
                  position: 'bottom-center',
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                })
              }

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul role="list" className="divide-y divide-gray-200">
                  {formData.imageUrls.length > 0 &&
                  formData.imageUrls.map((url, index) => (
                    <li key={url} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={url} alt='listing image' className="w-20 h-20 rounded-md" />
                      </div>

                      <div className="ml-6 mt-10 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg">
                              image-{index}
                            </h4>
                          </div>
                          <div />

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <AiFillDelete className="h-10 w-10" aria-hidden="true" onClick={() => handleRemoveImage(index)}/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            <button
              disabled={loading || uploading}
              className= 'mt-6 rounded-md bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {loading ? 'Updating...' : 'Update listing'}
            </button>
            {/* End Images */}
          </form>
        </div>
      </div>
    </main>

  )
}