import React from 'react'
import AdminSidebar from '../../Components/Admin/Common/AdminSidebar'
import AdminNavbar from '../../Components/Admin/Common/AdminNavbar'
import UserTable from '../../Components/Admin/UsersTable'

const AdminCustomers = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex">
        {/* Sidebar - Adjusted to be fixed */}
        <AdminSidebar className="fixed h-screen" /> 

        {/* Main Content Area */}
        <div className="flex-1 ml-64 overflow-y-auto">
            <AdminNavbar />
            {/* <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-white mb-4">Customer Management</h1>
                <div className="bg-gray-800 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white mb-2">Customer List</h2>
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-800">
                                <td className="px-6 py-3">John Doe</td>
                                <td className="px-6 py-3">john@example.com</td>
                                <td className="px-6 py-3">123-456-7890</td>
                                <td className="px-6 py-3">
                                    <button className="text-blue-500 hover:text-blue-700">View</button>
                                    <button className="text-green-500 hover:text-green-700 ml-2">Edit</button>
                                    <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}

            <UserTable />
        </div>
    </div>
  )
}

export default AdminCustomers