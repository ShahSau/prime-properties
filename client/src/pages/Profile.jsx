import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from '../redux/user/userSlice'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ItemListing from '../components/ItemListing'
import { motion } from 'framer-motion'

const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const [userFavourities, setUserFavourities] = useState([])
  const [ fetcherror, setFetchError] = useState(null)
  const [favload, setFavLoad] = useState(false)
  const [listload, setListLoad] = useState(false)

  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )

      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        setFetchError(data.message)
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      setFetchError(error.message)

      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      setFetchError(error.message)

      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    setListLoad(true)
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)

        return
      }

      setUserListings(data)
      setListLoad(false)
    } catch (error) {

      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      )
    } catch (error) {
      setFetchError(error.message)
    }

  }

  const handleUserFav = async () => {
    setFavLoad(true)
    try {
      const res = await fetch('/api/listing/favourities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favourities: currentUser.favorites,
        }),
      })
      const data = await res.json()
      if (data.success === false) {
        setFetchError(data.message)
        return
      }
      setUserFavourities(data)
      setFavLoad(false)
      setUpdateSuccess(true)
    } catch (error) {
      setFetchError(error.message)

    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
      className='overflow-x-hidden'
    >
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2,delay: 0.25 }}
        viewport={{ once: true }}
      >
        <h1 className='text-3xl font-semibold text-center my-7'>{t('profile.title')}</h1>
        <div className='text-3xl font-semibold text-center my-7'>
          {currentUser.type === 'both' && <div className='col-span-2 max-h-12 w-full object-contain lg:col-span-1 mt-6 text-center'>
            <Link to={'/create-listing'} className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
              <AiOutlinePlus/>{t('profile.createListing')}
            </Link>
          </div>}
        </div>
      </motion.div>



      <form onSubmit={handleSubmit} className='flex flex-col md:gap-4 border-b pb-4 border-gray-900/10 items-center'>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10  pb-12 md:grid-cols-3">
            <motion.div
              className='p-6 flex-cols items-center text-center justify-center flex-1 md:ml-20 '
              initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <p className='text-2xl'>{t('profile.profile_pic')}</p>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt='profile'
                className='rounded-full h-40 w-40 object-cover cursor-pointer text-center mt-2'
              />
              <p className='text-sm self-center'>
                {fileUploadError ? (
                  toast.error(`${t('profile.error1')}`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  })
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  toast.success(`${t('profile.success1')}`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  })
                ) : (
                  ''
                )}
              </p>
            </motion.div>


            <motion.div
              className="grid max-w-2xl items-center texap-x-6 gap"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              {/*username*/}
              <div className="sm:col-span-4">
                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                  {t('profile.username')}
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type='text'
                      placeholder='username'
                      defaultValue={currentUser.username}
                      id='username'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/*email*/}
              <div className="sm:col-span-4">
                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                  {t('profile.email')}
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type='email'
                      placeholder='email'
                      id='email'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/*password*/}
              <div className="sm:col-span-4">
                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                  {t('profile.password')}
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type='password'
                      placeholder='password'
                      id='password'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label className='font-semibold'>{t('profile.join')}</label>
                <select
                  id='type'
                  className='border rounded-lg p-3'
                  onChange={handleChange}
                  defaultValue={currentUser.type}
                >
                  <option value='buyer'>{t('profile.buyer')}</option>
                  <option value='both'>{t('profile.b&s')}</option>
                </select>
              </div>

            </motion.div>
          </div>


          {/** */}
          <motion.div
            className="mt-3 flex items-center text-center justify-center gap-x-6 mr-4"
            initial={{ x: '-100%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 2,delay: 0.25 }}
            viewport={{ once: true }}
          >
            <button
              disabled={loading}
              className="rounded-md bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? t('profile.loading') : t('profile.update')}
            </button>
          </motion.div>
        </div>
      </form>

      {/* Delete user */}
      <motion.div
        className="mx-auto mt-6 max-w-7xl mb-12 sm:mt-10 sm:px-6 lg:px-8"
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 2,delay: 0.25 }}
        viewport={{ once: true }}
      >
        <div className="relative isolate overflow-hidden  px-6 py-10 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-2xl">
            {t('profile.del_text')}
          </h2>
          <div className='col-span-2 max-h-12 w-full object-contain lg:col-span-1 mt-6'>
            <button onClick={handleDeleteUser} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
              {t('profile.del_acc')}
            </button>
          </div>

        </div>
      </motion.div>
      {/* Listings */}
      {currentUser.type === 'both' && <div className='col-span-2 mb-6 max-h-12 w-full object-contain lg:col-span-1 mt-6 text-center'>
        <button onClick={handleShowListings} className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
          {t('profile.showListings')}
        </button>
      </div>}
      {listload &&
        <div className='flex justify-center items-center h-6'>
          {t('profile.loading')}
        </div>
      }
      {userListings &&
         userListings.length > 0 &&
         <>
           <div className='flex flex-wrap gap-4 p-6'>
             {userListings.map((listing) => (
               <ItemListing
                 listing={listing} key={listing._id}
                 onDelete={() => handleListingDelete(listing._id)}
               />
             ))}
           </div>
         </>
      }

      {currentUser.type === 'buyer' && <div className='col-span-2 mb-6 max-h-12 w-full object-contain lg:col-span-1 mt-6 text-center'>
        <button onClick={handleUserFav} className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
          {t('profile.showFavourites')}
        </button>
      </div>}
      {favload &&
        <div className='flex justify-center items-center h-6'>
          {t('profile.loading')}
        </div>
      }
      {userFavourities &&
         userFavourities.length > 0 &&
         <>
           <div className='flex flex-wrap gap-4 p-6'>
             {userFavourities.map((listing) => (
               <ItemListing
                 listing={listing} key={listing._id}
                 onDelete={() => handleListingDelete(listing._id)}
               />
             ))}
           </div>
         </>
      }
      <ToastContainer />

    </motion.div>
  )
}


export default Profile