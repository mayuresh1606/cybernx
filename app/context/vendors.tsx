'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface VendorContext {
    vendors: VendorData[];
    addVendor: (values: VendorData) => void;
    setVendors: (data: VendorData[]) => void;
}

export interface VendorData {
    id: number;
    name: string;
    type: string;
    criticality: string;
    status: string;
    contact: string;
    serviceProvided?: string;
    phoneNumber?: string;
    address?: string;
    companySize?: string;
}

const VendorContext = createContext<VendorContext | undefined>(undefined)

const vendorsData = [
    { id: 1, name: "Acme Corp", type: "Supplier", criticality: "High", status: "Active", contact: "john@acme.com" },
    { id: 2, name: "TechPro Solutions", type: "Service Provider", criticality: "Medium", status: "Active", contact: "sarah@techpro.com" },
    { id: 3, name: "Global Logistics", type: "Logistics", criticality: "Critical", status: "Under Review", contact: "mike@globallogistics.com" },
    { id: 4, name: "Eco Friendly Materials", type: "Supplier", criticality: "Low", status: "Inactive", contact: "lisa@ecofriendly.com" },
    { id: 5, name: "Innovative Software Inc", type: "Technology", criticality: "High", status: "Active", contact: "david@innovative.com" },
]

export const useVendorContext = () => {
    const context = useContext(VendorContext);
    if (!context){
        throw new Error('useVendorContext must be used within a VendorProvider');
    }
    return context;
}

export const VendorProvider = ({ children }: { children: React.ReactNode; }) => {
    const [vendors, setVendors] = useState<VendorData[]>(vendorsData);
    useEffect(() => {
        let vendorsLocal = localStorage.getItem('vendors');
        if (vendorsLocal) vendorsLocal = JSON.parse(vendorsLocal);
        const initialVendors = Array.isArray(vendorsLocal) && vendorsLocal 
        ? vendorsLocal 
        : (Array.isArray(vendorsData) && vendorsData 
            ? vendorsData 
            : []);
        setVendors(initialVendors)
        localStorage.setItem('vendors', JSON.stringify(initialVendors));
    }, [])

    const addVendor = (values: VendorData) => {
        const stringifiedVendors = localStorage.getItem("vendors");
        let vendors;
        if (stringifiedVendors) vendors = JSON.parse(stringifiedVendors);
        vendors.push({ ...values, id: vendors.length + 1 });
        if (typeof window !== undefined){
            localStorage.setItem("vendors", JSON.stringify(vendors));
            setVendors(vendors);
        }
    }

    return <VendorContext.Provider value={{ vendors, addVendor, setVendors }}>{children}</VendorContext.Provider>
}
