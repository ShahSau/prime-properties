import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SwiperCore from 'swiper'
import { useSelector } from 'react-redux'
import { FcHome } from 'react-icons/fc'
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
  FaShare,
} from 'react-icons/fa'
import { MdSell } from 'react-icons/md'
import { BiArea,BiEuro } from 'react-icons/bi'
import Contact from '../components/Contact'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { motion } from 'framer-motion'

export default function Listing() {
  const { t, i18n } = useTranslation()

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  return (
    <motion.main className="pt-10 sm:pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
    >
      { loading &&
        <p className='text-center my-7 text-2xl'>{t('listing.loading')}</p>
      }
      {listing && !loading && !error && (
        <div>
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <motion.div
              className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
              initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <LazyLoadImage
                alt='listing image'
                effect="blur"
                src={listing.imageUrls[0]}
                width="100%"
                height="100%"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
            <motion.div
              className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8"
              initial={{ y: '-100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <LazyLoadImage
                  alt='listing image'
                  effect="blur"
                  src={listing.imageUrls[1]}
                  width="100%"
                  height="100%"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <LazyLoadImage
                  alt='listing image'
                  effect="blur"
                  src={listing.imageUrls[2]}
                  width="100%"
                  height="100%"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </motion.div>
            <motion.div
              className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
              initial={{ x: '100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <LazyLoadImage
                alt='listing image'
                effect="blur"
                src={listing.imageUrls[3]}
                width="100%"
                height="100%"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </div>

          {/* info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
            <motion.div
              className="flex-col lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
              initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="flex">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{listing.name}</h1>
                <div />

                <div className="ml-4 flow-root flex-shrink-0">
                  <FaShare
                    className='text-slate-500 h-7 w-7'
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      setCopied(true)
                      toast.success('Linked copied', {
                        position: 'bottom-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                      })
                      setTimeout(() => {
                        setCopied(false)
                      }, 2000)
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Options */}
            <motion.div
              className="mt-4 lg:row-span-3 lg:mt-0"
              initial={{ x: '100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl tracking-tight text-gray-900">{t('createListing.aminites')}</p>

              {/* Amenities */}
              <div className="ml-6 mt-10 flex flex-1 flex-col">
                {/*area*/}
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg">
                      {listing.area} m²
                    </h4>
                  </div>
                  <div />

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center p-2.5 text-gray-700"
                    >
                      <BiArea className="h-10 w-10" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
                {/*bedrooms*/}
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg">
                      {listing.bedrooms}
                    </h4>
                  </div>
                  <div />

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center p-2.5 text-gray-700"
                    >
                      <FaBed className="h-10 w-10" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
                {/*bathrooms*/}
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg">
                      {listing.bathrooms}
                    </h4>
                  </div>
                  <div />

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center p-2.5 text-gray-700"
                    >
                      <FaBath className="h-10 w-10" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
                {/*furnished*/}
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg">
                      {listing.furnished ? t('createListing.furnished') : t('createListing.no_furnished')}
                    </h4>
                  </div>
                  <div />

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center p-2.5 text-gray-700"
                    >
                      <FaChair className="h-10 w-10" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
                {/*parking*/}
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg">
                      {listing.parking ? t('createListing.parking') : t('createListing.no_parking')}
                    </h4>
                  </div>
                  <div />

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center p-2.5 text-gray-700"
                    >
                      <FaParking className="h-10 w-10" aria-hidden="true"/>
                    </button>
                  </div>
                </div>
              </div>
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button onClick={() => setContact(true)} className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  {t('listing.contact')}
                </button>
              )}
              {contact && <Contact listing={listing}/>}
            </motion.div>
            <motion.div
              className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
              initial={{ x: '-100%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2,delay: 0.25 }}
              viewport={{ once: true }}
            >
              {/* Description and details */}
              <div>
                <div className="mt-6">
                  <div className='mt-4'>
                    <div className='list-disc space-y-2 pl-4'>
                      <div className='text-gray-600'>
                        <FcHome />
                        {listing.address}
                      </div>
                      <div className='text-gray-600'>
                        <BiEuro />
                        {listing.regularPrice} {listing.type === 'rent' ? 'per month' : ''}
                      </div>
                      {listing.offer && <div className='text-green-600'>
                        <BiEuro />
                        {listing.discountPrice} {listing.type === 'rent' ? 'per month' : ''}
                      </div>}
                      <div className='text-gray-600'>
                        <MdSell />
                        {listing.agency}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="space-y-6 mt-10">
                  <p className="text-base text-gray-900">{listing.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      <ToastContainer />
    </motion.main>
  )
}