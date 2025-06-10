import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Skeleton, Empty, Tag, message } from 'antd';
import 'antd/lib/timeline/style';
import { motion } from 'framer-motion';
import { 
  BriefcaseOutlined,
  FieldTimeOutlined,
  RocketOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { ENDPOINTS, formatDate, getMonthYearDuration } from '../../lib/api-config';

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

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(ENDPOINTS.EXPERIENCE);
        setExperiences(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching experience data:', error);
        message.error('Failed to load experience data');
        setLoading(false);
      }
    };

    fetchExperience();
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

 
  const renderExperienceContent = () => {
    if (loading) {
      return (
        <Row justify="center">
          <Col xs={24} md={20} lg={18}>
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: '20px' }} />
          </Col>
        </Row>
      );
    }
    
    if (experiences.length === 0) {
      return (
        <Empty 
          description={<span style={{ color: '#E0F7F7' }}>No experience records found</span>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ margin: '40px 0' }}
        />
      );
    }
    
  
    return (
      <div>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card 
              hoverable
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)',
                marginBottom: '20px',
                marginLeft: isMobile ? '5px' : isTablet ? '40px' : '120px',
                marginRight: isMobile ? '5px' : isTablet ? '40px' : '120px',
                background: 'rgba(0, 51, 102, 0.7)',
                border: '1px solid rgba(126, 234, 234, 0.2)',
                backdropFilter: 'blur(5px)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: '#7EEAEA',
                }}
              />
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={3} className="text-center">
                  <div 
                    style={{ 
                      background: 'rgba(126, 234, 234, 0.1)',
                      borderRadius: '50%',
                      width: '70px',
                      height: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      border: '2px solid #7EEAEA'
                    }}
                  >
                    <RocketOutlined style={{ fontSize: '2rem', color: '#7EEAEA' }} />
                  </div>
                </Col>
                <Col xs={24} md={21}>
                  <Title level={4} style={{ color: '#FFFFFF', marginBottom: '0.2rem' }}>
                    {experience.position}
                  </Title>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
                    <Text strong style={{ color: '#7EEAEA', display: 'flex', alignItems: 'center' }}>
                      <EnvironmentOutlined style={{ marginRight: '5px' }} /> {experience.company}
                      {experience.location && ` - ${experience.location}`}
                    </Text>
                    <Text style={{ color: '#E0F7F7', display: 'flex', alignItems: 'center' }}>
                      <FieldTimeOutlined style={{ marginRight: '5px' }} />
                      {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                    </Text>
                    <Text style={{ color: '#E0F7F7', display: 'flex', alignItems: 'center' }}>
                      <ClockCircleOutlined style={{ marginRight: '5px' }} />
                      {getMonthYearDuration(experience.startDate, experience.endDate)}
                    </Text>
                  </div>
                  {experience.description && (
                    <Paragraph style={{ color: '#E0F7F7', marginTop: '8px' }}>
                      {experience.description}
                    </Paragraph>
                  )}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      {experience.technologies.map((tech, i) => (
                        <Tag 
                          key={i} 
                          style={{ 
                            margin: '4px', 
                            background: 'rgba(126, 234, 234, 0.1)',
                            borderColor: '#7EEAEA',
                            color: '#7EEAEA'
                          }}
                        >
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="experience" 
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
               marginTop:'20px',
                paddingTop:'10px'
              }}
            >
              Professional Journey
            </Text>
            <Title 
              level={2}
              style={{ 
                color: '#FFFFFF',
                fontWeight: 700,
                marginBottom: '2rem',
                position: 'relative',
                display: 'inline-block'
              }}
              className="relative"
            >
              Work Experience
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

          <motion.div variants={itemVariants}>
            {renderExperienceContent()}
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(0, 51, 102, 0.3)',
                maxWidth: '800px',
                margin: '0 auto',
                background: 'rgba(0, 51, 102, 0.7)',
                border: '1px solid rgba(126, 234, 234, 0.2)',
                backdropFilter: 'blur(5px)',
                overflow: 'hidden',
                position: 'relative',
                padding: '16px',
                marginBottom:'30px'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: '#7EEAEA',
                  
                }}
              />
              <RocketOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
              <Title level={4} style={{ color: '#FFFFFF' }}>Professional Growth</Title>
              <Paragraph style={{ color: '#E0F7F7' }}>
                Each role has been a stepping stone, allowing me to develop and refine my technical skills while 
                collaborating with talented professionals. I bring this wealth of experience and problem-solving 
                mindset to every project I undertake.
              </Paragraph>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;