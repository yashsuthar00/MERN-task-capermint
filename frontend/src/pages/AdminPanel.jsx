import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <aside
        className={`w-64 h-screen bg-gray-800 text-white p-4 space-y-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative fixed z-10`}
      >
        <h2 className="text-2xl mt-10 font-bold">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">
              <a href="/admin" id="product-lists">Product Lists</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">
              <a href="/admin/profile" id="profile">Profile</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded transition-colors duration-200">
              <a href="/logout" id="logout">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
