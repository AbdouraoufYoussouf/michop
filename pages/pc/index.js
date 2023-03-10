import React, { useState } from 'react'
import CategorieProduct from '../../components/CategorieProduct'
import Filter from '../../components/Filter'
import connectMongo from '../../lib/connectMongo'
import Product from '../../models/Products'
import BanerPc from './components/BanerPc'

const Pc = ({products}) => {
  const [data, setData] = useState(products)
  const [dataInit, setDataInit] = useState(products)
 
  //console.log('first', data)
  return (
    <div id='pc' className='flex flex-col justify-center gap-4 mb-4 w-full '>
       <BanerPc />
      <div className='flex gap-4 justify-between items-start w-full max-md:flex-col '>
          <Filter data={dataInit} setData={setData} category={"pc"} products={products} />
        
        <div className='w-full grid grid-cols-1 ss:grid-cols-2 xm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xg:grid-cols-4 xl:grid-cols-5  gap-4 justify-center  '>
          {
            data?.filter(p => p.category === 'pc').map((product,index)=>(
              <CategorieProduct key={index} product={product}/>
            ))
          }
        
        </div>
      </div>
    </div>
  )
}

export default Pc
export const getServerSideProps = async () => {
  await connectMongo();
  const products = await Product.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

