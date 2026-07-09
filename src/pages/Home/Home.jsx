import Hero from '../../components/Hero/Hero'
import FirmsBand from '../../components/FirmsBand/FirmsBand'
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects'
import ZoneIsometric from '../../components/ZoneIsometric/ZoneIsometric'
import AreaCards from '../../components/AreaCards/AreaCards'
import BuyingJourney from '../../components/BuyingJourney/BuyingJourney'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <FirmsBand />
      <FeaturedProjects />
      <ZoneIsometric />
      <AreaCards />
      <BuyingJourney />
      <Footer />
    </>
  )
}
