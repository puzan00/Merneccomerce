
import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      // Filter by category
      productsCopy = productsCopy.filter((item) => category === item.category)

      // Filter by subCategory
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

      // Limit to 4 products
      console.log(productsCopy.slice(0, 4))
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products])

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-medium mb-6">Related Products</h2>

      {related.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="group">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                  <img
                    src={product.image[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-medium">${product.price}</p>
                    {product.oldPrice && <p className="text-sm text-gray-500 line-through">${product.oldPrice}</p>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No related products found</p>
      )}
    </div>
  )
}

export default RelatedProducts
