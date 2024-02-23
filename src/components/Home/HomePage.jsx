import React from 'react'

import cactusjack from "../../assets/cactusjack.webp"
import nike from "../../assets/nike.jpg"
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
  return (
    <div>
      <HeroSection title="Travis Scott Jordan 1" subtitle="Meet the all new black jordans made solely for your feet." link="/products/65ca1fb079ccc6ebaf6e8786" image={cactusjack} />

    <FeaturedProducts />

      {/* featured Products */}
      <HeroSection title="Build the ultimate game" subtitle="Experience greatness at your feet." link="/products/65ca1fb079ccc6ebaf6e878e" image={nike} />
    </div>
  )
}

export default HomePage
