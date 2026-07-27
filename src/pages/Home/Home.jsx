import { useTranslation } from 'react-i18next'
import Hero from '../../components/Hero/Hero'
import FirmsBand from '../../components/FirmsBand/FirmsBand'
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects'
import ZoneIsometric from '../../components/ZoneIsometric/ZoneIsometric'
import AreaCards from '../../components/AreaCards/AreaCards'
import BuyingJourney from '../../components/BuyingJourney/BuyingJourney'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'
import { useSEO } from '../../lib/seo'

export default function Home() {
  const { t } = useTranslation()
  useSEO({ description: t('seo.home.description') })

  return (
    <>
      <Hero />
      <FirmsBand />
      <FeaturedProjects />
      <BuyingJourney />
      <ZoneIsometric />
      <AreaCards />
      <About />
      <Footer />
    </>
  )
}
