import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
export default function Search() {
  const navigate = useNavigate()
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  })
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [error, setError] = useState(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      })
    }

    const fetchListings = async () => {
      try {
        setLoading(true)
        setShowMore(false)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        data.length > 10 ? setShowMore(true) : setShowMore(false)
        setListings(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchListings()
  }, [location.search])

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id })
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value })
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      })
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at'

      const order = e.target.value.split('_')[1] || 'desc'

      setSidebardata({ ...sidebardata, sort, order })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', sidebardata.searchTerm)
    urlParams.set('type', sidebardata.type)
    urlParams.set('parking', sidebardata.parking)
    urlParams.set('furnished', sidebardata.furnished)
    urlParams.set('offer', sidebardata.offer)
    urlParams.set('sort', sidebardata.sort)
    urlParams.set('order', sidebardata.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json()
    if (data.length < 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <motion.div className='flex flex-col md:flex-row'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex-1'>
        <motion.form
          onSubmit={handleSubmit}
          className='flex flex-col gap-8 items-center mt-2'
          initial={{ y: '-100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3,delay: 0.25 }}
        >
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>{t('search.heading')}</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>{t('search.type')}:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                checked={sidebardata.type === 'all'}
                onChange={handleChange}
              />
              <span>{t('search.r&s')}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                checked={sidebardata.type === 'rent'}
                onChange={handleChange}
              />
              <span>{t('search.rent')}</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>{t('search.sale')}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <span>{t('search.offer')}</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>{t('search.aminites')}:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                checked={sidebardata.parking}
                onChange={handleChange}
              />
              <span>{t('search.parking')}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                checked={sidebardata.furnished}
                onChange={handleChange}
              />
              <span>{t('search.furnished')}</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>{t('search.sort')}:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3'
              onChange={handleChange}
              defaultValue={'created_at_desc'}
            >
              <option value='regularPrice_desc'>{t('search.htol')}</option>
              <option value='regularPrice_asc'>{t('search.ltoh')}</option>
              <option value='createdAt_desc'>{t('search.new')}</option>
              <option value='createdAt_asc'>{t('search.old')}</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            {t('search.search')}
          </button>
        </motion.form>
        <h1 className='text-3xl font-semibold border-b p-8 text-slate-700 mt-5'>{t('search.listingResult')}:</h1>
        <motion.div
          className='p-8 flex flex-wrap gap-8'
          initial={{ x: '100%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3,delay: 0.25 }}
        >
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>{t('search.noResult')}</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              {t('search.loading')}
            </p>
          )}

          {!loading &&
          listings &&
          listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              {t('search.showMore')}
            </button>
          )}
        </motion.div>
      </div>
      {error &&
        toast.error(`${error}`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
      <ToastContainer />
    </motion.div>
  )
}