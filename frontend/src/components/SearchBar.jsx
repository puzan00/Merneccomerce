"use client"

import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import { useLocation } from "react-router-dom"

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  // Only show on /collection route
  if (location.pathname !== "/collection" || !showSearch) return null

  return (
    <div className="w-full py-4 bg-gray-50 border-t border-b border-gray-200 flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto flex items-center">
        <div className="relative w-full flex items-center bg-white rounded-full shadow-sm border border-gray-300 hover:border-gray-400 transition-all duration-200 overflow-hidden">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none"
            placeholder="Search for products..."
          />
          <div className="flex items-center pr-3">
            {search && (
              <button
                onClick={() => setSearch("")}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <img
              className="w-5 h-5 opacity-70"
              src={assets.search_icon || "/placeholder.svg"}
              alt="Search"
            />
          </div>
        </div>
        <button
          onClick={() => setShowSearch(false)}
          className="ml-3 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
