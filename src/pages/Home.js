import React from 'react'
import './home.css'
import Product from '../components/Product'
import { useGlobal } from '../context'
import Loading from '../components/loading'
import Pagination from '../components/Pagination'

const Home = () => {
  const { products, loading } = useGlobal()

  return (
    <div className='home'>
      <div className='home__container'>
        {loading && <Loading />}
        <img
          className='home__img'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt='hero knives out'
        />
        <Pagination />
        <div className='home__row'>
          {products.map((product) => {
            return <Product key={product.id} {...product} />
          })}
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default Home
