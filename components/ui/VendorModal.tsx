import React from 'react';
import { VendorData } from '@/app/context/vendors';
import { Badge } from './badge';

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
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    case 'pending':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

export const VendorDetailsModal = ({ vendorData, isOpen, closeModal }: { vendorData: VendorData, isOpen: boolean; closeModal: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vendor Details</h2>
          <button onClick={closeModal} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{vendorData.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span>{vendorData.type}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Criticality:</span>
            <span><Badge className={`${getCriticalityColor(vendorData.criticality)}`}>{vendorData.criticality}</Badge></span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span><Badge className={`${getStatusColor(vendorData.status)}`}>
              {vendorData.status}
            </Badge></span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Contact Email:</span>
            <span>{vendorData.contact}</span>
          </div>

          {vendorData.serviceProvided && (
            <div className="flex justify-between">
              <span className="font-medium">Service Provided:</span>
              <span>{vendorData.serviceProvided}</span>
            </div>
          )}

          {vendorData.phoneNumber && (
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{vendorData.phoneNumber}</span>
            </div>
          )}

          {vendorData.address && (
            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
            <span>{vendorData.address}</span>
            </div>
          )}

          {vendorData.companySize && (
            <div className="flex justify-between">
              <span className="font-medium">Company Size:</span>
              <span>{vendorData.companySize}</span>
            </div>
          )}

          {vendorData.serviceProvided && (
            <div className="flex justify-between">
              <span className="font-medium">Service Provided:</span>
              <span>{vendorData.serviceProvided}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
