import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Contact({ listing }) {
  const { t, i18n } = useTranslation()

  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
      } catch (error) {
        setError(error)
      }
    }
    fetchLandlord()
  }, [listing.userRef])
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2 mt-6 border '>
          <p>
            Email <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {t('contact.send')}
          </Link>
          { error  &&
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
      )}
    </>
  )
}