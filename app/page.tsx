'use client'

import EnhancedVendorDashboard from "@/app/home/homePage"
import withAuth from "./hoc/auth";

const Home = () => {
  return (
    <EnhancedVendorDashboard />
  );
}

export default withAuth(Home)