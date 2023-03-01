import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { mainSlice } from '../../store';

const {
  actions: { addToCart }
} = mainSlice;

const Product = () => {
  const dispatch = useDispatch()
  const { product, cart }: any = useSelector((state) => state)

  const onAddToCart = (id: number) => {
    dispatch(addToCart({ id }))
  }

  // console.log(cart)

  return (
    <div className='flex flex-wrap w-full gap-8 mb-8'>
      {_.map(product, (index: any, key: number) => (
        <div key={key} className='w-52 new-shadow rounded-md bg-white'>
          <div className="w-full h-40 bg-blue-200 p-8">
            <img src={index.img} alt="" className="w-full h-full object-contain" />
          </div>
          <div className='flex flex-col p-4'>
            <h2>{index.name ?? 'Title'}</h2>
            <p>${index.price ?? 0}</p>
            <div className='flex justify-center mt-5'>
              <button onClick={() => onAddToCart(index?.id)} className='text-white bg-blue-500 w-full rounded pb-1'>add to chart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Product