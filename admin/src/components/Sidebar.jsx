import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="w-[18%] min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h2>
        <div className="md:hidden flex justify-center">
          <span className="text-xl font-bold">D</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-3 flex-grow">
        <NavLink
          to="/add"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
            ${isActive ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"}
          `}
        >
          <img className="w-5 h-5" src={assets.add_icon || "/placeholder.svg"} alt="" />
          <span className="hidden md:block text-sm">Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
            ${isActive ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"}
          `}
        >
          <img className="w-5 h-5" src={assets.order_icon || "/placeholder.svg"} alt="" />
          <span className="hidden md:block text-sm">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
            ${isActive ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"}
          `}
        >
          <img className="w-5 h-5" src={assets.order_icon || "/placeholder.svg"} alt="" />
          <span className="hidden md:block text-sm">Orders</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 hidden md:flex">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Online</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
