import React, { useState, useEffect } from 'react'
import CategorieProduct from '../../components/CategorieProduct'
import Filter from '../../components/Filter'
import Search from '../../components/Search'
import connectMongo from '../../lib/connectMongo'
import Product from '../../models/Products'

const Mobile = ({products}) => {
  const [data, setData] = useState(products)
  const [dataInit, setDataInit] = useState(products)
  const [phrase, setPhrase] = useState('')

  
  return (
    <div id='mobiles' className='flex flex-col justify-center gap-4 mb-4 w-full '>
   <div className='max-md:hidden  h-[40px] w-full'>
        <Search setData={setData} setSearch={setPhrase} products={products}  />
   </div>
      <div className='flex gap-4 justify-between items-start w-full max-md:flex-col '>
          <Filter data={dataInit} setData={setData} category={"mobiles"} products={products} />
        
        <div className='w-full grid grid-cols-1 ss:grid-cols-2 xm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xg:grid-cols-4 xl:grid-cols-5  gap-4 justify-center  '>
          {
            data?.filter(p => p.category === 'mobiles').map((product,index)=>(
              <CategorieProduct key={index} product={product}/>
            ))
          }
        
        </div>
      </div>
    </div>
  )
}

export default Mobile

export const getServerSideProps = async () => {
  await connectMongo();
  const products = await Product.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
