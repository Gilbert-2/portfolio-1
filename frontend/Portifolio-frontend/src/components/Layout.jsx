import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Menu, Button, Drawer, ConfigProvider, Avatar } from 'antd';
import { 
  MenuOutlined, 
  CloseOutlined, 
  LoginOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link as ScrollLink } from 'react-scroll';
import { themeConfig } from '../styles/theme';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }) {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'certificates', label: 'Certificate' },
    { key: 'blog', label: 'Blog' },
    { key: 'hire', label: 'Hire' },
    { key: 'contact', label: 'Contact' },
  ];

 


  const handleScrollTest = (targetId) => {
    console.log('Attempting to scroll to:', targetId);
    const element = document.getElementById(targetId);
    if (element) {
      console.log('Element found:', element);
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    } else {
      console.log('Element not found:', targetId);
    }
  };
  
 
  const menuItems = navItems.map((item) => ({
    key: item.key,
    label: (
      <ScrollLink
        to={item.key}
        spy={true}
        smooth={true}
        offset={-80} 
        duration={500}
        onClick={() => {
          console.log('ScrollLink clicked for:', item.key);
          setVisible(false);
         
          setTimeout(() => {
            handleScrollTest(item.key);
          }, 100);
        }}
        className="text-base hover:text-teal-300 transition-colors duration-300 cursor-pointer"
        style={{ cursor: 'pointer' }}
        activeClass="active-nav-item"
      >
        {item.label}
      </ScrollLink>
    ),
  }));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
 
  const mobileMenuItems = [
    ...menuItems,
    {
    
  
    }
  ];

  return (
    <ConfigProvider theme={themeConfig}>
      <AntLayout className="layout min-h-screen">
        <Header
          className={`fixed w-full transition-all duration-300 ${
            scrolled ? 'shadow-md bg-opacity-95 backdrop-blur-sm' : ''
          }`}
          style={{
            background: scrolled ? 'rgba(10, 25, 47, 0.95)' : 'rgba(10, 25, 47, 0.7)',
            padding: '0 24px',
            height: 70,
            borderBottom: scrolled ? '1px solid rgba(100, 255, 218, 0.2)' : 'none',
            zIndex: 1000, // Ensure header is on top
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div className="logo flex items-center">
            <ScrollLink 
              to="home" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={700} 
              className="cursor-pointer flex items-center"
              onClick={() => console.log('Logo clicked - scrolling to home')}
            >
              <div className="logo text-xl font-bold text-white" style={{marginLeft:'80px'}}>
                <span style={{ color: '#64FFDA' }}>Gilbert</span> <span style={{ color: '#CCD6F6' }}>Mugabe</span>             
              </div>
            </ScrollLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center">
            <Menu
              theme="dark"
              mode="horizontal"
              className="border-none"
              style={{ 
                background: 'transparent',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#8892B0',
              }}
            
            />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex lg:hidden items-center">
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '1.25rem' }} />}
              onClick={showDrawer}
              style={{ 
                color: '#64FFDA', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                padding: 0,
              }}
              className="flex items-center justify-center"
            />
          </div>
        </Header>
        
        {/* Mobile Drawer */}
        <Drawer
          title={
            <span className="text-teal-300 text-lg font-semibold">
              Navigation
            </span>
          }
          placement="right"
          onClose={onClose}
          open={visible}
          closeIcon={<CloseOutlined style={{ color: '#64FFDA' }} />}
          styles={{
            header: { 
              background: '#0A192F', 
              color: '#CCD6F6',
              borderBottom: '1px solid rgba(100, 255, 218, 0.2)' 
            },
            body: { 
              background: '#0A192F', 
              padding: 0 
            },
            mask: {
              background: 'rgba(10, 25, 47, 0.7)',
              backdropFilter: 'blur(3px)',
            }
          }}
          width={280}
        >
          <Menu
            theme="dark"
            mode="vertical"
            style={{ 
              background: 'transparent',
              borderRight: 'none',
              fontSize: '1rem',
              color: '#8892B0',
            }}
            items={mobileMenuItems}
          />
          
         
        </Drawer>

        <Content style={{ minHeight: '100vh', paddingTop: '70px', background: '#0A192F' }}>
          {children}
        </Content>

        <Footer 
          style={{ 
            background: '#0A192F', 
            color: '#8892B0', 
            textAlign: 'center',
            borderTop: '1px solid rgba(100, 255, 218, 0.1)',
            padding: '20px 10px',
          }}
        >
          <div className="flex justify-center items-center flex-col sm:flex-row">
            <span className="font-medium" style={{ color: '#64FFDA' }}>Gilbert Mugabe</span>
            <span className="mx-2 hidden sm:block" style={{ color: '#8892B0' }}>|</span>
            <span>© {new Date().getFullYear()} - All Rights Reserved</span>
          </div>
        </Footer>
      </AntLayout>
    </ConfigProvider>
  );
}