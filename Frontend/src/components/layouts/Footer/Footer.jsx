import React from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  const shouldRenderNavbar = location.pathname.startsWith('/admin-dashboard');
  return (
    <div className={shouldRenderNavbar ? 'd-none' : 'footer'}>
    <p>This is some content in sticky footer</p>
  </div>
  )
}

export default Footer
