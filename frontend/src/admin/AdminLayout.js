import React from 'react';
import Sidebar from './Sidebar';

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
  background: '#f8faff'
};

const mainStyle = {
  flex: 1,
  padding: '36px 20px',
  maxWidth: '1000px',
  margin: '0 auto'
};

function AdminLayout({ children }) {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
