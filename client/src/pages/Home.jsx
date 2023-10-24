import { useTranslation } from 'react-i18next'
const Home = () => {
  const { t, i18n } = useTranslation()
  return (
    <div>
      Home
      <h1>{t('home.header')}</h1>
    </div>
  )
}

export default Home