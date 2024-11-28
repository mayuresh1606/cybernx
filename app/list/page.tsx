'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Search, Edit } from 'lucide-react'
import { useTheme } from '../context/theme'
import { useVendorContext, VendorData } from '../context/vendors'
import MyForm from '@/components/ui/vendorForm'
import withAuth from '../hoc/auth'


function VendorListView() {
  const {vendors} = useVendorContext()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [form, setForm] = useState<boolean>(false);
  const [edit, setEdit] = useState<number>(0);
  const {isDarkTheme, toggleTheme} = useTheme();

  const filteredVendors = vendors?.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
  }

  const [vendorToEdit, setVendorToEdit] = useState<VendorData>({
    id: 0,
    name: '',
    type: 'Supplier',
    criticality: 'High',
    status: 'Active',
    contact: '',
    serviceProvided: undefined,
    phoneNumber: '',
    address: '',
    companySize: 'Small',
  });

  useEffect(() => {
    if (edit) {
      const vendor = vendors.find(vendor => vendor.id === edit);
      if (vendor) setVendorToEdit(vendor);
    }
  }, [edit]);

  return (
    <div className={`min-h-screen p-8 w-full ${isDarkTheme ? 'dark' : ''}`}>
      {
        form && <>
          <div id="default-modal" tabIndex={-1} className="overflow-x-hidden border-none fixed top-0 right-0 left-[50%] z-50 justify-center m-auto items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-black/50">
            <div className="relative p-4 my-auto w-full max-w-2xl max-h-screen">
                <div className="relative bg-[#DCDFE4] text-gray-800 dark:text-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto">
                  <div className='flex justify-between p-2 py-4'>
                  <h2 className="text-xl font-semibold my-auto py-1 px-4">Add New Vendor</h2>
                  <button onClick={() => {
                    setForm(false)
                    setEdit(0);
                  }} type="button" className="bg-white rounded-md h-10 p-2 mr-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  </div>
                  {(edit && vendorToEdit?.name.length) ? <MyForm setForm={setForm} form={form} edit={edit} setEdit={setEdit} vendorToEdit={vendorToEdit} /> :
                  <MyForm setForm={setForm} form={form} edit={edit} setEdit={setEdit} vendorToEdit={{
                    id: 0,
                    name: '',
                    type: 'Supplier',
                    criticality: 'High',
                    status: 'Active',
                    contact: '',
                    serviceProvided: undefined,
                    phoneNumber: '',
                    address: '',
                    companySize: 'Small',
                  }} />
                  }
                </div>
              </div>
            </div>
        </>
      }
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch checked={isDarkTheme} onChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-full dark:bg-gray-700 dark:text-gray-100 text-gray-800"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button onClick={() => setForm(true)} className="bg-blue-700 hover:bg-blue-800 text-white">Add New Vendor</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Name</TableHead>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Type</TableHead>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Criticality</TableHead>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Status</TableHead>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Contact</TableHead>
                  <TableHead className="text-left dark:text-gray-300 text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors?.map((vendor) => (
                  <TableRow key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="font-medium dark:text-gray-300 text-gray-800">{vendor.name}</TableCell>
                    <TableCell className="dark:text-gray-300 text-gray-800">{vendor.type}</TableCell>
                    <TableCell>
                      <Badge className={`font-semibold ${getCriticalityColor(vendor.criticality)}`}>
                        {vendor.criticality}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-semibold ${getStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-gray-300 text-gray-800">{vendor.contact}</TableCell>
                    <TableCell className="dark:text-gray-300 text-gray-800">
                      <Edit onClick={() => {
                        setEdit(vendor.id);
                        setForm(true);
                      }} className='className="inline ml-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default withAuth(VendorListView);