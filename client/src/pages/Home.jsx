import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSearch } from 'react-icons/fa'

const Home = () => {
  const { t, i18n } = useTranslation()
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  SwiperCore.use([Navigation])
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=8')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        setError(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=8')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        setError(error)

      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=8')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        setError(error)
      }
    }
    fetchOfferListings()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])


  return (
    <div>
      {/* top */}

      <div className='flex flex-col gap-6 p-28 px-3 max-w-full items-center mx-auto bg-[url("pic.jpg")] bg-cover bg-center bg-no-repeat'>
        <h1 className='text-blue-500 font-bold text-3xl lg:text-6xl'>
          {t('home.head1')}
          <br />
          {t('home.head2')}
        </h1>
        <div className='text-white text-xs sm:text-sm'>
          {t('home.para1')}
          <br />
          {t('home.para2')}
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-slate-600 text-slate-300 p-3 rounded-lg flex items-center border-2 border-indigo-500/100'
        >
          <input
            type='text'
            placeholder={t('search.search')}
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-300' />
          </button>
        </form>
      </div>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3 md:flex md:flex-row'>
              <h2 className='text-2xl font-semibold text-slate-600'>{t('home.offers')}</h2>
              <Link className='text-sm text-blue-800 hover:underline p-2' to={'/search?offer=true'}>{t('home.offers1')}</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3 md:flex md:flex-row'>
              <h2 className='text-2xl font-semibold text-slate-600'>{t('home.rent')}</h2>
              <Link className='text-sm text-blue-800 hover:underline text-center p-2' to={'/search?type=rent'}>{t('home.rent1')}</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3 md:flex md:flex-row'>
              <h2 className='text-2xl font-semibold text-slate-600'>{t('home.sale')}</h2>
              <Link className='text-sm text-blue-800 hover:underline p-2' to={'/search?type=sale'}>{t('home.sale1')}</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
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
    </div>
  )
}

export default Home