import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [fetcherror, setFetchError] = useState(null)
  const { loading, error } = useSelector((state) => state.user)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      setFetchError(error)
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <motion.div className='p-3 max-w-lg mx-auto'
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2,delay: 0.25 }}
    >
      <h1 className='text-3xl text-center font-semibold my-7'>{t('signinup.signin')}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? t('listing.loading') : t('signinup.signin')}
        </button>
      </form>
      {/* social media login*/}
      <OAuth />
      <p className="mt-10 text-center text-sm text-gray-500">
        {t('signinup.nmember')}{' '}
        <Link to={'/sign-up'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          {t('signinup.signup')}
        </Link>
      </p>
      {fetcherror && toast.error(`${fetcherror}`, {
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
      {error  && toast.error(`${error}`, {
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
      <ToastContainer />
    </motion.div>
  )
}

export default SignIn