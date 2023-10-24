import { useTranslation } from 'react-i18next'

const About = () => {
  const { t, i18n } = useTranslation()
  return (
    <div>
      About
      <h1>{t('about.header')}</h1>
    </div>
  )
}

export default About