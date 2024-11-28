'use client'
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from './button';
import { useVendorContext } from '@/app/context/vendors';
import { VendorData } from '@/app/context/vendors';


const schema = yup.object().shape({
  id: yup.number().required('ID is required').positive('ID must be a positive number'),
  name: yup.string().required('Name is required'),
  type: yup.string().oneOf(['Supplier', 'Service Provider', 'Technology', 'Logistics'], 'Type must be Supplier, Service Provider, Technology or Logistics').required('Type is required'),
  criticality: yup.string().oneOf(['Critical', 'High', 'Medium', 'Low'], 'Criticality must be High, Medium, or Low').required('Criticality is required'),
  status: yup.string().oneOf(['Active', 'Inactive', 'Under Review'], 'Status must be Active, Inactive or Under Review').required('Status is required'),
  contact: yup.string().email('Invalid email format').required('Contact is required'),
  serviceProvided: yup.string().required('Service Provided is required'),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: yup.string().max(250, 'Address cannot exceed 250 characters'),
  companySize: yup.string().oneOf(['Small', 'Medium', 'Large'], 'Company size must be Small, Medium, or Large').required('Company size is required')
});

// interface FormData {
//   id: number;
//   name: string;
//   type: string;
//   criticality: string;
//   status: string;
//   contact: string;
//   serviceProvided: string;
//   phoneNumber?: string;
//   address?: string;
//   companySize?: string;
// }

// let initialValues: VendorData = {
//   id: 0,
//   name: '',
//   type: 'Supplier',
//   criticality: 'High',
//   status: 'Active',
//   contact: '',
//   serviceProvided: undefined,
//   phoneNumber: '',
//   address: '',
//   companySize: 'Small',
// }

const MyForm = ({ setForm, form, edit, setEdit, vendorToEdit }: { setForm: (value: boolean) => void; form: boolean; edit: number;  setEdit: (value: number) => void; vendorToEdit: VendorData}) => {
    
    useEffect(() => {
        let vendors = localStorage.getItem("vendors")
        if (vendors) vendors = JSON.parse(vendors)

        if (vendors && Array.isArray(vendors)) setVendors(vendors);
    }, [form])

    const handleSubmit = (values: VendorData) => {
      console.log("handling submit")
      if (edit){
        console.log("EDITING")
        editVendor(edit, values)
        setEdit(0)
      }else {
        addVendor(values);
      }
      setForm(false)
    }

    // const formik = useFormik({initialValues, onSubmit: handleSubmit});
    const { addVendor, setVendors, vendors } = useVendorContext();

    // useEffect(() => {
    //   if (edit) {
    //     const vendor = vendors.find(vendor => vendor.id === edit);
    //     if (vendor) setVendorToEdit(vendor);
    //   }
    // }, [edit]);
  
    const editVendor = (id: number, values: VendorData) => {
      if (typeof window !== undefined){
        const newVendors = vendors.map((vendor: VendorData) => {
          if (vendor.id === id) {
            return { ...vendor, ...values };
          }
          return vendor;
        });
        setVendors(newVendors);
        localStorage.setItem("vendors", JSON.stringify(newVendors));
      }
    };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={vendorToEdit}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="max-w-2xl mx-auto p-6 border dark:border-black/25 rounded overflow-y-auto grid grid-cols-2 gap-2">

          <div className="mb-4 col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold ml-1 mb-1">Name</label>
            <Field
              type="text"
              name="name"
              value={values?.name ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold ml-1 mb-1">Type</label>
            <Field
              as="select"
              name="type"
              value={values?.type ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            >
              <option value="Supplier">Supplier</option>
              <option value="Technology">Technology</option>
              <option value="Logistics">Logistics</option>
              <option value="Service Provider">Service Provider</option>
            </Field>
            <ErrorMessage name="type" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="criticality" className="block text-sm font-semibold ml-1 mb-1">Criticality</label>
            <Field
              as="select"
              name="criticality"
              value={values?.criticality ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Field>
            <ErrorMessage name="criticality" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold ml-1 mb-1">Status</label>
            <Field
              as="select"
              name="status"
              value={values?.status ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Review">Under Review</option>
            </Field>
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-semibold ml-1 mb-1">Contact Email</label>
            <Field
              type="email"
              name="contact"
              value={values?.contact ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            />
            <ErrorMessage name="contact" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="serviceProvided" className="block text-sm font-semibold ml-1 mb-1">Service Provided</label>
            <Field
              type="text"
              name="serviceProvided"
              value={values?.serviceProvided ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            />
            <ErrorMessage name="serviceProvided" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Additional Fields */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold ml-1 mb-1">Phone Number</label>
            <Field
              type="text"
              name="phoneNumber"
              value={values?.phoneNumber ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            />
            <ErrorMessage name="phoneNumber" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold ml-1 mb-1">Address</label>
            <Field
              as="textarea"
              name="address"
              value={values?.address ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
              rows={3}
            />
            <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="companySize" className="block text-sm font-semibold ml-1 mb-1">Company Size</label>
            <Field
              as="select"
              name="companySize"
              value={values?.companySize ?? ""}
              className="border p-2 w-full border-gray-800 py-2 rounded-md dark:border-black/25 text-gray-800"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </Field>
            <ErrorMessage name="companySize" component="p" className="text-red-500 text-sm" />
          </div>
        
          <Button type='submit' onClick={() => handleSubmit(values)} disabled={isSubmitting} className='bg-blue-700 hover:bg-blue-800 text-white col-span-2'>{edit ? `Edit ${edit}` : `Submit`}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
