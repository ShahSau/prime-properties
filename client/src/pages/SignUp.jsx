import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  return (
    <motion.div
      className='p-3 max-w-lg mx-auto'
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 3,delay: 0.25 }}
    >
      <h1 className='text-3xl text-center font-semibold my-7'>{t('signinup.signup')}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
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
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>{t('profile.join')}</label>
          <select
            id='type'
            className='border rounded-lg p-3'
            onChange={handleChange}
            defaultValue={'both'}
          >
            <option value='buyer'>{t('profile.buyer')}</option>
            <option value='both'>{t('profile.b&s')}</option>
          </select>
        </div>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? t('listing.loading') : t('signinup.signup')}
        </button>
      </form>
      <OAuth />
      <div className="flex gap-2 mt-5">
        <p>{t('signinup.acc')}</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>{t('signinup.signin')}</span>
        </Link>
      </div>
      {error &&
      toast.error(`${error}`, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })}
      <ToastContainer />
    </motion.div>
  )
}

export default SignUp