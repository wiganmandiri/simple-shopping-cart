import _ from 'lodash'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modals from '../../component/modal';
import { mainSlice } from '../../store';

function toFixed(num: any, fixed: number) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

const {
  actions: { counting, addWishlist, deleted }
} = mainSlice;

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [updateQty, setUpdateQty] = useState({
    tempSubTotal: 0,
    tempDiscount: 0,
    tempTotal: 0,
    status: false
  })
  let [discount, setDiscount] = useState(0)
  // const data = useSelector((state) => state)
  const { product, wishlist, cart }: any = useSelector((state) => state)

  let [tempProductCart, setTempProductCart]: any[] = useState([])

  useEffect(() => {
    if (cart?.length) {
      setTempProductCart(_.filter(product, index => _.some(cart, (idx: any) => idx.id === index.id)))
      // setUpdateQty(prevState => ({ ...prevState, status: true }))
    } else {
      setTempProductCart([])
      // setUpdateQty(prevState => ({ ...prevState, status: true }))
    }
    setUpdateQty(prevState => ({ ...prevState, status: true }))
  }, [cart])

  useEffect(() => {
    if (updateQty.status) {
      // setTempProductCart(_.filter(product, index => _.some(cart, (idx: any) => idx.id === index.id)))
      setUpdateQty(prevState => (
        {
          ...prevState,
          tempSubTotal: toFixed(_.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) }), 2),
          tempDiscount: toFixed(discount * _.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) }), 2),
          tempTotal: toFixed((_.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) })) - (discount * _.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) })), 2),
          status: false
        }
      ))
    }
  }, [updateQty.status])

  // console.log("new qty", tempProductCart)

  const onCounting = (id: number, type: string, value: any) => {
    if ((!isNaN(value) && value !== '') || type !== 'input') {
      dispatch(counting({ id: id, type: type, value }))
    }
  }

  const onChangeDiscount = (e: any) => {
    setDiscount(Number(e.target.value))
    setUpdateQty(prevState => ({ ...prevState, status: true }))
  }

  const handleWishList = (id: number) => {
    dispatch(addWishlist({ id }))
  }

  const handleDelete = (id: number) => {
    dispatch(deleted({ id }))
  }

  return (
    <>
      <Modals isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-white flex space-y-8 flex-col p-10 h-full rounded items-center">
          <h1 className="text-gray-600">Payment</h1>
          <button onClick={() => setIsOpen(false)} className="px-10 bg-blue-500 rounded py-2 text-lg font-semibold text-white">CLOSE</button>
        </div>
      </Modals>
      <div className="flex flex-col md:flex-row gap-7 w-full">
        <div className="flex flex-col w-full">
          <div className="w-full rounded-md new-shadow p-4">
            <h1 className="mb-3">Cart</h1>
            <div className="flex flex-col">
              {tempProductCart?.length ?
                _.map(tempProductCart, (index: any, key: number) => (
                  <div key={key}>
                    <div className="flex gap-5 w-full">
                      <div className="w-40 h-40 bg-blue-200 p-8 rounded-md shadow-md">
                        <img src={index.img} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex">
                          <div className="w-full">
                            <h1>{index.name}</h1>
                            <p className="uppercase text-sm mb-3">{index.category} {index.color}</p>
                            <p className="uppercase text-sm">COLOR {index.color}</p>
                            <p className="uppercase text-sm">SIZE {index.size}</p>
                          </div>
                          <div className="flex items-center justify-center h-10">
                            <button onClick={() => onCounting(index.id, 'decrement', void (0))} className="px-4 text-xl border border-r-0 h-full">-</button>
                            <input onChange={(e) => onCounting(index.id, 'input', e.target.value ?? 0)} className="w-14 h-full text-center border" type="text" value={cart?.length === tempProductCart?.length ? _.find(cart, idx => idx.id === index.id).qty : 0} />
                            <button onClick={() => onCounting(index.id, 'increment', void (0))} className="px-4 text-xl border border-l-0 h-full">+</button>
                          </div>
                        </div>
                        <div className="flex mt-4">
                          <div className="flex flex-wrap gap-1 lg:gap-6 w-full space-x-0 lg:space-x-1 text-gray-500">
                            <div onClick={() => handleDelete(index.id)} className="flex flex-row items-center cursor-pointer hover:text-red-500">
                              <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <title>Trash</title>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                  <g id="Trash">
                                    <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">
                                    </rect>
                                    <path d="M6,6 L6.96683,19.5356 C6.98552,19.7973 7.20324,20 7.46556,20 L16.5344,20 C16.7968,20 17.0145,19.7973 17.0332,19.5356 L18,6" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round">
                                    </path>
                                    <line x1="4" y1="6" x2="20" y2="6" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round">
                                    </line>
                                    <line x1="10" y1="10" x2="10" y2="16" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round">
                                    </line>
                                    <line x1="14" y1="10" x2="14" y2="16" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round">
                                    </line>
                                    <path d="M15,6 C15,4.34315 13.6569,3 12,3 C10.3431,3 9,4.34315 9,6" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round">
                                    </path>
                                  </g>
                                </g>
                              </svg>
                              <span className="font-semibold">REMOVE ITEM</span>
                            </div>
                            <div onClick={() => handleWishList(index.id)} className="flex flex-row items-center space-x-1 cursor-pointer hover:text-black">
                              <svg fill={_.some(wishlist, idx => idx === index.id) ? "#FF0000" : "auto"} width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
                              </svg>
                              <span className="font-semibold">{_.some(wishlist, idx => idx === index.id) ? "REMOVE FROM WISH LIST" : "MOVE TO WISH LIST"}</span>
                            </div>
                          </div>
                          <div className="w-fit font-bold">${index.price ?? 0}</div>
                        </div>
                      </div>
                    </div>
                    {(key + 1) !== product?.length && <hr className='my-4' />}
                  </div>
                )) : <h2>No Items</h2>
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-7 w-full md:w-1/3">
          <div className="flex flex-col space-y-8 w-full rounded-md new-shadow p-4">
            <div className="flex flex-col space-y-4">
              <h1 className="mb-3">The total amount of</h1>
              <div className="flex space-x-4" >
                <p className="w-full">Temporary amount</p>
                <p className="w-fit">
                  ${updateQty?.tempSubTotal}
                  {/* ${toFixed(_.sumBy(product, function (index: any) { return (index.price * index.qty) }), 2)} */}
                  {/* ${cart?.length ? toFixed(_.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) }), 2) : 0} */}
                </p>
              </div>
              <div className="flex space-x-4" >
                <p className="w-full">Shipping</p>
                <p className="w-fit">Gratis</p>
              </div>
              {discount ?
                <div className="flex space-x-4" >
                  <p className="w-full">Discount</p>
                  {/* <p className="w-fit">-${cart?.length ? toFixed(discount * _.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) }), 2) : 0}</p> */}
                  <p className="w-fit">-${updateQty?.tempDiscount}</p>
                </div> : null
              }
              <hr />
              <div className="flex space-x-4 font-bold" >
                <h2 className="">The total amount of (including VAT)</h2>
                <h2 className="w-fit">
                  {/* ${cart?.length ? toFixed((_.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) })) - (discount * _.sumBy(tempProductCart, function (index: any) { return (index.price * _.find(cart, idx => idx.id === index.id)?.qty) })), 2) : 0} */}
                  ${updateQty?.tempTotal}
                </h2>
              </div>
            </div>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 p-3 rounded-md text-white mt-2">GO TO CHECKOUT</button>
          </div>
          <div className="flex flex-col space-y-4 w-full rounded-md new-shadow p-4">
            <select className="border-0 hover:border-0 bg-white" name="discount" defaultValue={0} onChange={(e) => onChangeDiscount(e)}>
              <option value={0} hidden>Add a discount code (optional)</option>
              <option value={0.1}>10%</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart