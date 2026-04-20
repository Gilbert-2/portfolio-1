import React, { useState, useEffect } from 'react';
import { Typography, Button, Space } from 'antd';
import { motion } from 'framer-motion';
import { DownloadOutlined } from '@ant-design/icons';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';
import axios from 'axios';
import { ENDPOINTS, API_URL } from '../../lib/api-config';

const { Title, Text } = Typography;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const HomeSection = () => {
  const [typedText, setTypedText] = useState('');
  const [aboutData, setAboutData] = useState(null);
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer', 'Software Tester'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const typingEffect = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    };

    const timeout = setTimeout(
      typingEffect,
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.ABOUT}/latest`);
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching home/about content:', error);
      }
    };
    fetchAbout();
  }, []);


  const handleResumeView = () => {
    const resumePath = aboutData?.resumePath || '/document/resume.pdf';
    const isAbsolute = /^https?:\/\//i.test(resumePath);
    const url = isAbsolute ? resumePath : `${API_URL}${resumePath}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="home"
      className="flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)',
        overflow: 'hidden'
      }}
    > 
      <div className="container mx-auto px-4">
        <div
          className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} items-center justify-between`}
          style={{
            minHeight: '85vh',
            marginTop: isMobile ? '40px' : '0px',
            marginLeft: isMobile ? '20px' : isTablet ? '40px' : '100px',
            paddingBottom: isMobile ? '40px' : '0'
          }}
        >
          <motion.div 
            className={isMobile ? "w-full mt-8" : isTablet ? "w-3/5" : "w-1/2"}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Text 
              className="mb-4 block text-lg"
              style={{ 
                color: '#7EEAEA',
                fontWeight: 600,
                letterSpacing: '1px',
                fontSize: isMobile ? '1rem' : '1.125rem',
                marginTop: isMobile ? '40px' : '0px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
              }} 
            >
              Hey! My Name is
            </Text>
            
            <Title 
              level={1} 
              style={{ 
                color: '#FFFFFF', 
                fontSize: isMobile ? '1.75rem' : isTablet ? '2rem' : '2.5rem', 
                fontWeight: 700,
                marginTop: 20,
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              {aboutData?.fullName ? `Eng. ${aboutData.fullName}` : 'Eng. Gilbert Mugabe'}
            </Title>
            
            <div className={`h-${isMobile ? '12' : '16'} mb-4`}>
              <Title 
                level={2} 
                style={{ 
                  minHeight: isMobile ? '2rem' : '2.5rem',
                  color: '#FFFFFF', 
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 600,
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
                }}
              >
                <span style={{ color: '#E0F7F7' }}>I'm a </span>
                <span style={{ color: '#7EEAEA' }}>{typedText}</span>
                <span className="animate-blink" style={{ color: '#7EEAEA' }}>|</span>
              </Title>
            </div>
            
            <Title 
              level={2} 
              style={{ 
                color: '#E0F7F7', 
                fontSize: isMobile ? '0.9rem' : '1rem', 
                fontWeight: 600,
                marginTop: 20,
                lineHeight: 1.5,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {aboutData?.homeTagline ||
                'Driven software engineer committed to building innovative, scalable solutions that power seamless digital experiences.'}
            </Title>
            
            <Text 
              className="text-lg mb-8 block max-w-2xl" 
              style={{
                color: '#E0F7F7', 
                lineHeight: 1.7,
                fontSize: isMobile ? '0.9rem' : '0.9rem',
                letterSpacing: '0.3px',
                textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
              }}
            >
              {aboutData?.homeDescription ||
                (isMobile
                  ? 'Versatile Full Stack Engineer delivering robust, scalable solutions. Adept with front-end and back-end technologies creating high-performance applications.'
                  : 'Versatile and results-driven Full Stack Software Engineer with a proven track record of delivering robust, scalable, and innovative solutions across the software development lifecycle. Adept at leveraging both front-end and back-end technologies to create seamless, high-performance applications. Passionate about solving complex challenges through clean code, thoughtful architecture, and user-centric design.')}
            </Text>
            
            <Space 
              size={isMobile ? "small" : "middle"} 
              className="mt-8"
              style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}
            >
              <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500}>
                <Button 
                  type="primary"
                  size={isMobile ? "middle" : "large"}
                  className="mr-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ 
                    height: isMobile ? '40px' : '48px', 
                    paddingLeft: isMobile ? '16px' : '24px', 
                    paddingRight: isMobile ? '16px' : '24px',
                    background: '#FFFFFF',
                    color: '#006699', 
                    borderColor: '#FFFFFF',
                    borderRadius: '6px',
                    marginTop: '20px',
                    fontWeight: 600,
                    width: isMobile ? '100%' : 'auto',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                
                >
                  Contact Me
                </Button>
              </ScrollLink>
              
              <Button 
                type="default"
                size={isMobile ? "middle" : "large"}
                icon={<DownloadOutlined />}
                onClick={handleResumeView}
                style={{ 
                  height: isMobile ? '40px' : '48px', 
                  paddingLeft: isMobile ? '16px' : '24px', 
                  paddingRight: isMobile ? '16px' : '24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  borderColor: '#7EEAEA',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  borderWidth: '2px',
                  marginTop: '20px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
                className="hover:border-teal-300 hover:text-teal-100 hover:bg-opacity-20 hover:bg-white"
              >
                My Resume
              </Button>
            </Space>
          </motion.div>

          <motion.div
            className={isMobile ? "w-full" : isTablet ? "w-2/5" : "w-1/2"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: isMobile ? '40px' : '10px',
              marginLeft: isMobile ? '-30px' : isTablet ? '0' : '0' 
            }}
          >
            <div 
              className="relative mx-auto" 
              style={{ 
                width: isMobile ? '220px' : isTablet ? '250px' : '300px', 
                height: isMobile ? '300px' : isTablet ? '350px' : '400px' 
              }}
            >
              <div 
                className="absolute" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: '2px solid #7EEAEA', 
                  top: isMobile ? '10px' : '20px',
                  left: isMobile ? '10px' : '20px',
                  zIndex: 1,
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              />
              
              <div 
                className="absolute" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'rgba(126, 234, 234, 0.1)', 
                  backdropFilter: 'blur(5px)',
                  zIndex: 2,
                  borderRadius: '8px',
                }}
              />
              
              <div 
                className="absolute overflow-hidden"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  zIndex: 3,
                  border: isMobile ? '3px solid #FFFFFF' : '4px solid #FFFFFF',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                  borderRadius: '8px',
                }}
              >
                <Image
                  src="/images/portifolio.jpg"
                  alt="Gilbert Mugabe"
                  fill
                  sizes="(max-width: 768px) 220px, (max-width: 1024px) 250px, 300px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 102, 153, 0.2) 0%, rgba(0, 168, 168, 0.3) 100%)',
                    zIndex: 4
                  }}
                />
              </div>
              
              {/* Add subtle animated accent */}
              <motion.div 
                className="absolute"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(126, 234, 234, 0.15)',
                  filter: 'blur(15px)',
                  top: '5%',
                  right: '-10%',
                  zIndex: 0
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              
              <motion.div 
                className="absolute"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  filter: 'blur(10px)',
                  bottom: '10%',
                  left: '-5%',
                  zIndex: 0
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;