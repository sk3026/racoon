
import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Product/FeaturedCollection'
import FeaturesSection from '../components/Product/FeaturesSection'
import GenderCollection from '../components/Product/GenderCollection'
import NewArrivals from '../components/Product/NewArrivals'
import Productdetail from '../components/Product/Productdetail'



const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
      <Productdetail/>
      <FeaturedCollection/>
      <FeaturesSection/>
     
    </div>
  )
}

export default Home
