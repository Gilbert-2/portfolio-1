import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Tag } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ENDPOINTS } from '../../lib/api-config';

const { Title, Paragraph, Text } = Typography;

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

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const databases = aboutData?.databases?.length ? aboutData.databases : ['MongoDB', 'PostgreSQL', 'MySQL'];
  const languages = aboutData?.languages?.length ? aboutData.languages : ['TypeScript', 'JavaScript'];
  const frameworks = aboutData?.frameworks?.length
    ? aboutData.frameworks
    : ['NestJS', 'NextJS', 'ExpressJS', 'React', 'Redux', 'Tailwind CSS'];
  const detailParagraphs = aboutData?.details?.length
    ? aboutData.details
    : [
        'I specialize in both frontend and backend development, with expertise in technologies like React, Redux, TypeScript, and Tailwind CSS for creating responsive user interfaces, as well as Node.js, Express, NestJS, MongoDB, and PostgreSQL for robust server-side solutions.',
        'I hold a Bachelor of Computer Engineering with Honours at the University of Rwanda (2021-2025), which provided me with a strong technical foundation in software engineering principles.',
        'From October 2023 to March 2024, I participated in the CSR Technical Program, which significantly enhanced my skills across various technologies and best practices in software development. This program allowed me to dive deep into both frontend and backend development, cementing my path as a Full Stack Engineer.',
        "Most recently, I worked at FHR Rwanda as a Frontend Developer, where I developed a scalable financial management tools using Next.js, JavaScript, and Ant Design. I also interned at MTN Rwanda as Software Developer, where I built an Y'ello care system using Spring Boot, Java, and PostgreSQL.",
      ];
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.ABOUT}/latest`);
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section 
      id="about" 
      className="py-20"
      style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Text 
              className="uppercase tracking-wider font-semibold mb-4 block"
              style={{ 
                color: '#7EEAEA',
                fontSize: '1rem',
                letterSpacing: '3px',
                marginTop:'20px',
                paddingTop:'10px'
              }}
            >
              Get To Know Me !
            </Text>
            <Title 
              level={2}
              style={{ 
                color: '#FFFFFF', 
                fontWeight: 700,
                marginBottom: '2rem',
                marginTop: '1rem',
                position: 'relative',
                display: 'inline-block',
              }}
              className="relative"
            >
              About Me
              <div 
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  bottom: '-10px',
                  width: '80px',
                  height: '4px',
                  background: '#7EEAEA', 
                  borderRadius: '2px'
                }}
              />
            </Title>
          </motion.div>

          <Row gutter={[48, 48]} align="stretch">
            <Col xs={24} md={12}>
              <motion.div 
                variants={itemVariants}
                className="about-image-container relative h-full"
              >
                <Card
                  variant="borderless"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(126, 234, 234, 0.15)', 
                    background: 'transparent',
                    height: isMobile ? 'auto' : isTablet ? '97%' : '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: isMobile ? '100%' : isTablet ? '80%' : '90%',
                    marginLeft: isMobile ? '0' : isTablet ? '40px' : '50px',
                  }}
                >
                  <div 
                    className="mx-auto relative"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '10px solid rgba(255, 255, 255, 0.05)', 
                      boxShadow: '0 20px 40px rgba(126, 234, 234, 0.1)', 
                      position: 'relative',
                      minHeight: '400px',
                      flexGrow: 1
                    }}
                  >
                    <div
                       style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: "url('/images/profile.jpg')",
                        backgroundSize: 'contain',
                        backgroundPosition: 'cover',
                        backgroundRepeat: 'repeat',
                        backgroundColor: '#003366', 
                      }}
                    />
                
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(to top, rgba(0, 51, 102, 0.9), rgba(0, 102, 153, 0))', 
                      }}
                    />
                    
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 2
                      }}
                    >
                      <Title 
                        level={3}
                        style={{
                          color: '#FFFFFF',
                          margin: 0,
                          fontWeight: 700
                        }}
                      >
                        {aboutData?.fullName || 'Gilbert Mugabe'}
                      </Title>
                      <Text
                        style={{
                          color: '#7EEAEA',
                          fontSize: '1.2rem',
                          fontWeight: 500
                        }}
                      >
                        {aboutData?.headline || 'Full Stack Developer'}
                      </Text>
                    </div>
                    <div
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '50px' : isTablet ? '0px' : '0px',
                      right: '0px',
                      width: isMobile ? '70px' : isTablet ? '70px' : '70px',
                      height: isMobile ? '70px' : isTablet ? '70px' : '70px',
                      borderRadius: '45px',
                      backgroundColor: '#7EEAEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 16px rgba(126, 234, 234, 0.3)', 
                      zIndex: 3
                    }}
                  >
                    <span 
                      style={{ 
                        color: '#003366', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      {(aboutData?.yearsExperience || 2)}+<br/>Year Exp.
                    </span>
                  </div>
                  </div>
                  
                  {/* Technologies section */}
                  <div 
                    style={{ 
                      padding: '20px', 
                      backgroundColor: 'rgba(0, 51, 102, 0.7)', 
                      backdropFilter: 'blur(10px)',
                      borderRadius: '0 0 16px 16px',
                      marginTop: '20px',
                      border: '1px solid rgba(126, 234, 234, 0.2)',
                      marginBottom: '100px'
                    }}
                  >
                    <Text 
                      style={{ 
                        color: '#FFFFFF', 
                        marginBottom: '1rem', 
                        display: 'block', 
                        fontSize: '1.2rem',
                        fontWeight: 600 
                      }}
                    >
                      Technology Stack
                    </Text>
                    
                    {/* Databases */}
                    <div style={{ marginBottom: '15px' }}>
                      <Text 
                        style={{ 
                          color: '#7EEAEA', 
                          marginBottom: '0.5rem', 
                          display: 'block',
                          fontSize: '1rem',
                          fontWeight: 600 
                        }}
                      >
                        Databases
                      </Text>
                      <div>
                        {databases.map(db => (
                          <Tag 
                            key={db}
                            style={{ 
                              backgroundColor: 'rgba(126, 234, 234, 0.05)', 
                              color: '#E0F7F7', 
                              borderColor: '#7EEAEA',
                              marginBottom: '0.5rem',
                              marginRight: '0.5rem',
                              fontSize: '0.85rem',
                              padding: '4px 12px',
                              borderRadius: '40px',
                              fontWeight: 500
                            }}
                          >
                            {db}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div style={{ marginBottom: '15px' }}>
                      <Text 
                        style={{ 
                          color: '#7EEAEA', 
                          marginBottom: '0.5rem', 
                          display: 'block',
                          fontSize: '1rem',
                          fontWeight: 600 
                        }}
                      >
                        Languages
                      </Text>
                      <div>
                        {languages.map(lang => (
                          <Tag 
                            key={lang}
                            style={{ 
                              backgroundColor: 'rgba(126, 234, 234, 0.05)', 
                              color: '#E0F7F7', 
                              borderColor: '#7EEAEA', 
                              marginBottom: '0.5rem',
                              marginRight: '0.5rem',
                              fontSize: '0.85rem',
                              padding: '4px 12px',
                              borderRadius: '40px',
                              fontWeight: 500
                            }}
                          >
                            {lang}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks & Libraries */}
                    <div>
                      <Text 
                        style={{ 
                          color: '#7EEAEA', 
                          marginBottom: '0.5rem', 
                          display: 'block',
                          fontSize: '1rem',
                          fontWeight: 600 
                        }}
                      >
                        Frameworks & Libraries
                      </Text>
                      <div>
                        {frameworks.map(framework => (
                          <Tag 
                            key={framework}
                            style={{ 
                              backgroundColor: 'rgba(126, 234, 234, 0.05)', 
                              color: '#E0F7F7', 
                              borderColor: '#7EEAEA', 
                              marginBottom: '0.5rem',
                              marginRight: '0.5rem',
                              fontSize: '0.85rem',
                              padding: '4px 12px',
                              borderRadius: '40px',
                              fontWeight: 500
                            }}
                          >
                            {framework}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated corner accent */}
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      width: '80px',
                      height: '80px',
                      borderRadius: '10px',
                      border: '6px solid #7EEAEA', 
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      zIndex: -1
                    }}
                  />
                </Card>
              </motion.div>
            </Col>
            
            {/* About Me Content */}
            <Col xs={24} md={12}>
              <motion.div variants={itemVariants} className="h-full">
                <Card
                  variant="borderless"
                  style={{
                    boxShadow: '0 10px 30px rgba(126, 234, 234, 0.1)',
                    borderRadius: '16px',
                    background: 'rgba(0, 51, 102, 0.7)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 234, 234, 0.2)', 
                    height: isMobile ? 'auto' : isTablet ? '97%' : '90%',
                    marginLeft: isMobile ? '5px' : isTablet ? '-60px' : '-30px',
                    marginRight: isMobile ? '5px' : isTablet ? '20px' : '30px',
                    marginBottom: isMobile ? '20px' : isTablet ? '0px' : '0px',
                  }}
                  className="h-full"
                >
                  <Paragraph
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.8',
                      color: '#E0F7F7', 
                      fontWeight: 500,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {aboutData?.summary ? (
                      aboutData.summary
                    ) : (
                      <>
                        Hi! My name is <Text strong style={{ color: '#FFFFFF' }}>Gilbert Mugabe</Text> and I find immense satisfaction in creating, designing, and
                        implementing digital solutions. My venture into software development started with a profound passion for crafting innovative and
                        scalable applications that effectively address real-world challenges.
                      </>
                    )}
                  </Paragraph>
                  
                  <Paragraph
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.8',
                      color: '#E0F7F7' 
                    }}
                  >
                    {detailParagraphs[0]}
                  </Paragraph>

                  <Paragraph
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.8',
                      color: '#E0F7F7' 
                    }}
                  >
                    {detailParagraphs[1]}
                  </Paragraph>
                  
                  <Paragraph
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      color: '#E0F7F7' 
                    }}
                  >
                    {detailParagraphs[2]}
                  </Paragraph>
                  
                  <Paragraph
                    style={{
                      fontSize: '1.3rem',
                      
                      color: '#E0F7F7'
                    }}
                  >
                    {detailParagraphs[3]}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;