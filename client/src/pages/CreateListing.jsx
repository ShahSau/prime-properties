import { useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
export default function CreateListing() {
  const { t, i18n } = useTranslation()
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
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
          setImageUploadError(err || 'Image upload failed (2 mb max per image)')
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
      const res = await fetch('/api/listing/create', {
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
  // <main className='p-3 max-w-4xl mx-auto'>
  //   <h1 className='text-3xl font-semibold text-center my-7'>
  //     {t('createListing.header')}
  //   </h1>
  //   <form  onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
  //     <div className='flex flex-col gap-4 flex-1'>
  //       <input
  //         type='text'
  //         placeholder='Name'
  //         className='border p-3 rounded-lg'
  //         id='name'
  //         maxLength='62'
  //         minLength='10'
  //         required
  //         onChange={handleChange}
  //         value={formData.name}
  //       />
  //       <textarea
  //         type='text'
  //         placeholder='Description'
  //         className='border p-3 rounded-lg'
  //         id='description'
  //         required
  //         onChange={handleChange}
  //         value={formData.description}
  //       />
  //       <input
  //         type='text'
  //         placeholder='Address'
  //         className='border p-3 rounded-lg'
  //         id='address'
  //         required
  //         onChange={handleChange}
  //         value={formData.address}
  //       />
  //       <input
  //         type='text'
  //         placeholder='Agency'
  //         className='border p-3 rounded-lg'
  //         id='agency'
  //         required
  //         onChange={handleChange}
  //         value={formData.agency}
  //       />
  //       <div className='flex gap-6 flex-wrap'>
  //         <div className='flex gap-2'>
  //           <input
  //             type='checkbox'
  //             id='sale'
  //             className='w-5'
  //             onChange={handleChange}
  //             checked={formData.type === 'sale'}
  //           />
  //           <span>{t('createListing.sell')} </span>
  //         </div>
  //         <div className='flex gap-2'>
  //           <input
  //             type='checkbox'
  //             id='rent'
  //             className='w-5'
  //             onChange={handleChange}
  //             checked={formData.type === 'rent'}
  //           />
  //           <span>{t('createListing.rent')}</span>
  //         </div>
  //         <div className='flex gap-2'>
  //           <input
  //             type='checkbox'
  //             id='parking'
  //             className='w-5'
  //             onChange={handleChange}
  //             checked={formData.parking}
  //           />
  //           <span>{t('createListing.parking')}</span>
  //         </div>
  //         <div className='flex gap-2'>
  //           <input
  //             type='checkbox'
  //             id='furnished'
  //             className='w-5'
  //             onChange={handleChange}
  //             checked={formData.furnished}
  //           />
  //           <span>{t('createListing.furnished')}</span>
  //         </div>
  //         <div className='flex gap-2'>
  //           <input
  //             type='checkbox'
  //             id='offer'
  //             className='w-5'
  //             onChange={handleChange}
  //             checked={formData.offer}
  //           />
  //           <span>{t('createListing.offer')}</span>
  //         </div>
  //       </div>
  //       <div className='flex flex-wrap gap-6'>
  //         <div className='flex items-center gap-2'>
  //           <input
  //             type='number'
  //             id='bedrooms'
  //             min='1'
  //             max='10'
  //             required
  //             className='p-3 border border-gray-300 rounded-lg'
  //             onChange={handleChange}
  //             value={formData.bedrooms}
  //           />
  //           <p>{t('createListing.beds')}</p>
  //         </div>
  //         <div className='flex items-center gap-2'>
  //           <input
  //             type='number'
  //             id='bathrooms'
  //             min='1'
  //             max='10'
  //             required
  //             className='p-3 border border-gray-300 rounded-lg'
  //             onChange={handleChange}
  //             value={formData.bathrooms}
  //           />
  //           <p>{t('createListing.baths')}</p>
  //         </div>
  //         {/* */}
  //         <div className='flex items-center gap-2'>
  //           <input
  //             type='number'
  //             id='area'
  //             min='20'
  //             max='100'
  //             required
  //             className='p-3 border border-gray-300 rounded-lg'
  //             onChange={handleChange}
  //             value={formData.area}
  //           />
  //           <p>{t('createListing.area')}</p>
  //         </div>
  //         <div className='flex items-center gap-2'>
  //           <input
  //             type='number'
  //             id='regularPrice'
  //             min='500'
  //             max='2000000'
  //             required
  //             className='p-3 border border-gray-300 rounded-lg'
  //             onChange={handleChange}
  //             value={formData.regularPrice}
  //           />
  //           <div className='flex flex-col items-center'>
  //             <p>{t('createListing.regular')}</p>
  //             {formData.type === 'rent' && (
  //               <span className='text-xs'>($ / {t('createListing.month')})</span>
  //             )}
  //           </div>
  //         </div>
  //         {formData.offer && (
  //           <div className='flex items-center gap-2'>
  //             <input
  //               type='number'
  //               id='discountPrice'
  //               min='0'
  //               max='10000000'
  //               required
  //               className='p-3 border border-gray-300 rounded-lg'
  //               onChange={handleChange}
  //               value={formData.discountPrice}
  //             />
  //             <div className='flex flex-col items-center'>
  //               <p>{t('createListing.discount')}</p>
  //               {formData.type === 'rent' && (
  //                 <span className='text-xs'>($ / {t('createListing.month')})</span>
  //               )}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <div className="flex flex-col flex-1 gap-4">
  //       <p className='font-semibold'>{t('createListing.images')}
  //         <span className='font-normal text-gray-600 ml-2'>{t('createListing.img_desc')}</span>
  //       </p>
  //       <div className='flex gap-4'>
  //         <input
  //           onChange={(e) => setFiles(e.target.files)}
  //           className='p-3 border border-gray-300 rounded w-full'
  //           type='file'
  //           id='images'
  //           accept='image/*'
  //           multiple
  //         />
  //         <button
  //           type='button'
  //           disabled={uploading}
  //           onClick={handleImageSubmit}
  //           className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
  //         >
  //           {uploading ? 'Uploading...' : 'Upload'}
  //         </button>
  //       </div>
  //       {imageUploadError   && toast.error(`${imageUploadError }`, {
  //         position: 'bottom-center',
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       })
  //       }
  //       {formData.imageUrls.length > 0 &&
  //         formData.imageUrls.map((url, index) => (
  //           <div
  //             key={url}
  //             className='flex justify-between p-3 border items-center'
  //           >
  //             <img
  //               src={url}
  //               alt='listing image'
  //               className='w-20 h-20 object-contain rounded-lg'
  //             />
  //             <button
  //               type='button'
  //               onClick={() => handleRemoveImage(index)}
  //               className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
  //             >
  //               {t('createListing.delete')}
  //             </button>
  //           </div>
  //         ))}

  //       <button
  //         disabled={loading || uploading}
  //         className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
  //       >
  //         {loading ? 'Creating...' : 'Create listing'}
  //       </button>

    //       {error  && toast.error(`${error}`, {
    //         position: 'bottom-center',
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'light',
    //       })
    //       }
    //       <ToastContainer />
    //     </div>
    //   </form>
    // </main>
    <main>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="flex items-center text-2xl">{t('createListing.details')}</h2>

          <form  onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              {/* name */}
              <div>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    {t('createListing.name')}
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
                    {t('createListing.desc')}
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
                    {t('createListing.address')}
                  </label>
                  <div className="mt-1">
                    <input
                      type='text'
                      placeholder='address'
                      className='block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='address'
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
                    {t('createListing.agency')}
                  </label>
                  <div className="mt-1">
                    <input
                      type='text'
                      placeholder='agency'
                      className='block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      id='agency'
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
                    {t('createListing.rent')}
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
                    {t('createListing.sale')}
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
                    {t('createListing.offer')}
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
                <h2 className="text-lg font-medium text-gray-900">{t('createListing.aminites')}</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      {t('createListing.bedrooms')}
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
                      {t('createListing.bathrooms')}
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
                      {t('createListing.furnished')}
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
                      {t('createListing.parking')}
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
                      {t('createListing.area')}
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
                <h2 className="text-lg font-medium text-gray-900">{t('createListing.pricing')}</h2>
                <div className="mt-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                      {t('createListing.regular')}
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
                        {t('createListing.discount')}
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
                          <span className='text-xs'>($ / {t('createListing.month')})</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">{t('createListing.images')}</h2>
              <span className='font-normal text-gray-600 ml-2'>
                {t('createListing.img_desc')}
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
                  {uploading ? t('createListing.creating') : t('createListing.upload')}
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
              {/* {loading ? 'Updating...' : 'Update listing'} */}
              {loading ? t('createListing.creating') : t('createListing.createListing')}
            </button>
            {/* End Images */}
          </form>
        </div>
      </div>
    </main>
  )
}