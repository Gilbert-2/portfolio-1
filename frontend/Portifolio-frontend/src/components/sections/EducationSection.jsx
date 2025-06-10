import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Skeleton, Empty, message } from 'antd';
import { motion } from 'framer-motion';
import { 
  ReadOutlined,
  FieldTimeOutlined,
  GoldOutlined,
  TrophyOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { ENDPOINTS, formatDate } from '../../lib/api-config';

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

const EducationSection = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get(ENDPOINTS.EDUCATION);
        setEducations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching education data:', error);
        message.error('Failed to load education data');
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

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

  const renderEducationCard = (education, index) => {
    return (
      <motion.div 
        key={education.id}
        variants={itemVariants}
        className={`education-item ${index % 2 === 0 ? 'left' : 'right'}`}
        style={{
          position: 'relative',
          marginBottom: '30px',
          width: '100%'
        }}
      >
        <Card 
          hoverable
          style={{ 
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(126, 234, 234, 0.15)', 
            background: 'rgba(0, 51, 102, 0.7)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(126, 234, 234, 0.2)', 
            marginBottom: '20px',
            height: '100%'
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={3} className="text-center">
              <div 
                style={{ 
                  background: 'rgba(126, 234, 234, 0.1)', 
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '2px solid #7EEAEA' 
                }}
              >
                <ReadOutlined style={{ fontSize: '2rem', color: '#7EEAEA' }} /> 
              </div>
            </Col>
            <Col xs={24} md={21}>
              <Title level={4} style={{ color: '#FFFFFF', marginBottom: '0.2rem' }}> 
                {education.degree}
                {education.fieldOfStudy && ` - ${education.fieldOfStudy}`}
              </Title>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
                <Text strong style={{ color: '#7EEAEA', display: 'flex', alignItems: 'center' }}> 
                  <EnvironmentOutlined style={{ marginRight: '5px' }} /> {education.institution}
                </Text>
                <Text style={{ color: '#E0F7F7', display: 'flex', alignItems: 'center' }}> 
                  <FieldTimeOutlined style={{ marginRight: '5px' }} />
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </Text>
              </div>
              {education.description && (
                <Paragraph style={{ color: '#E0F7F7', marginTop: '8px' }}> 
                  {education.description}
                </Paragraph>
              )}
            </Col>
          </Row>
        </Card>

        {/* Timeline connector */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            [index % 2 === 0 ? 'right' : 'left']: '-15px',
            transform: 'translateY(-50%)',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#7EEAEA', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: '0 4px 8px rgba(126, 234, 234, 0.4)' 
          }}
        >
          <GoldOutlined style={{ fontSize: '16px', color: '#003366' }} /> 
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="education" 
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Text 
              className="uppercase tracking-wider font-semibold mb-4 block"
              style={{ 
                color: '#7EEAEA', 
                fontSize: '1rem',
                letterSpacing: '3px',
                marginTop: isMobile ? '15px' : isTablet ? '15px' : '15px',
              }}
            >
              Academic Background
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
              Education & Training
              <div 
               className="absolute left-1/2 transform -translate-x-1/2"
               style={{
                 bottom: '-10px',
                 width: '180px',
                 height: '4px',
                 background: '#7EEAEA', 
                 borderRadius: '2px'
               }}
              />
            </Title>
          </motion.div>

          {loading ? (
            <Row justify="center">
              <Col xs={24} md={20} lg={18}>
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: '20px' }} />
              </Col>
            </Row>
          ) : educations.length > 0 ? (
            <div style={{ position: 'relative' }}>
              {/* Center vertical timeline line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: 'rgba(126, 234, 234, 0.3)', 
                transform: 'translateX(-50%)',
                zIndex: 1,
              }} />
              
              {/* Education items container */}
              <div style={{ position: 'relative' }}>
                <Row 
                  gutter={[20, 24]}
                  style={{ 
                    width: '100%',
                    paddingLeft: isMobile ? '15px' : isTablet ? '60px' : '50px',
                    paddingRight: isMobile ? '0px' : isTablet ? '60px' : '40px',
                  }}
                >
                  {educations.map((education, index) => (
                    <Col
                      key={education.id}
                      xs={24}
                      md={12}
                      style={{ 
                        marginBottom: isMobile ? '16px' : '-25px',
                        paddingLeft: isMobile ? '0' : '10px',
                        paddingRight: isMobile ? '0' : '10px',
                        textAlign: 'left',
                      }}
                    >
                      {renderEducationCard(education, index)}
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          ) : (
            <Empty
              description={
                <Text style={{ color: '#E0F7F7' }}>No education records found</Text> 
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ margin: '40px 0' }}
            />
          )}
          
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(126, 234, 234, 0.15)', 
                maxWidth: '800px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.9) 0%, rgba(0, 102, 153, 0.9) 100%)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(126, 234, 234, 0.2)', 
                marginTop: '30px',
                marginBottom: '30px'
              }}
            >
              <TrophyOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} /> 
              <Title level={4} style={{ color: '#FFFFFF' }}>Continuous Learning</Title> 
              <Paragraph style={{ color: '#E0F7F7' }}> 
                Beyond formal education, I am committed to continuous learning through online courses, 
                workshops, and self-guided projects. My educational journey is ongoing as I keep 
                expanding my knowledge in the ever-evolving field of software development.
              </Paragraph>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;