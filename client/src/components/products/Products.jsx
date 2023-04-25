import React from 'react'

const Products = () => {
  return (
    <div className='products-wrapper grid grid-cols-card gap-4'>
      <div className='product-item border hover:shadow-lg cursor-pointer transition-all select-none'>
        <div className="product-image">
            <img src='https://picsum.photos/200' alt='' className='h-28 object-cover w-full border-b' />
        </div>
        <div className="product-info flex flex-col p-3">
            <span className='font-bold'>Ürün adı</span>
            <span>Fiyat ₺</span>
        </div>
      </div>
      <div className='product-item border hover:shadow-lg cursor-pointer transition-all select-none'>
        <div className="product-image">
            <img src='https://picsum.photos/200' alt='' className='h-28 object-cover w-full border-b' />
        </div>
        <div className="product-info flex flex-col p-3">
            <span className='font-bold'>Ürün adı</span>
            <span>Fiyat ₺</span>
        </div>
      </div>
    </div>
  )
}

export default Products
