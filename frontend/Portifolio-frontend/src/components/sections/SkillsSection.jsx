import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Progress, Skeleton, Empty, Tag, message } from 'antd';
import { motion } from 'framer-motion';
import { 
  CodeOutlined, 
  DatabaseOutlined, 
  CloudServerOutlined, 
  LaptopOutlined,
  ToolOutlined,
  ApartmentOutlined,
  BranchesOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
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

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(ENDPOINTS.SKILLS);
        setSkills(response.data);
        
        const uniqueCategories = [...new Set(response.data.map(skill => skill.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills data:', error);
        message.error('Failed to load skills data');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Frontend': <LaptopOutlined />,
      'Backend': <DatabaseOutlined />,
      'DevOps': <CloudServerOutlined />,
      'Programming Languages': <CodeOutlined />,
      'Tools': <ToolOutlined />,
      'Architecture': <ApartmentOutlined />,
      'Version Control': <BranchesOutlined />,
      'Other': <AppstoreOutlined />
    };

    return iconMap[category] || <AppstoreOutlined />;
  };

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

  const getProgressColor = (level) => {
    if (level >= 90) return '#7EEAEA'; 
    if (level >= 70) return '#7EEAEA';
    if (level >= 50) return '#7EEAEA'; 
    return '#7EEAEA'; 
  };

  const getSkillLevel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const renderCategories = () => {
    return categories.map(category => {
      const categorySkills = skills.filter(skill => skill.category === category);
      const rows = Math.ceil(categorySkills.length / 3);
      
      return (
        <div key={category} className="mb-12"
         style={{
          marginLeft: isMobile ? '5px' : isTablet ? '40px' : '60px',
          marginRight: isMobile ? '5px' : isTablet ? '40px' : '60px',
         }}>
          <div className="flex items-center mb-6">
            <div 
              className="flex justify-center items-center mr-3"
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                background: 'rgba(126, 234, 234, 0.1)',
              }}
            >
              <span style={{ fontSize: '22px', color: '#7EEAEA' }}>{getCategoryIcon(category)}</span>
            </div>
            <Title 
              level={3} 
              style={{ 
                color: '#FFFFFF', 
                margin: 0,
                fontWeight: 600,
              }}
            >
              {category}
            </Title>
          </div>
          
          {/* Create rows with 3 skills each */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Row gutter={[24, 24]} key={`row-${category}-${rowIndex}`} style={{ marginBottom: '24px' }}>
              {categorySkills
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map(skill => (
                  <Col xs={24} sm={12} md={8} key={skill.id}>
                    <div
                      style={{
                        background: 'rgba(0, 51, 102, 0.7)',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 8px 16px rgba(0, 51, 102, 0.3)',
                        height: '100%',
                        border: '1px solid rgba(126, 234, 234, 0.2)',
                        backdropFilter: 'blur(5px)',
                      }}
                    >
                      <Tag 
                        color={getProgressColor(skill.level)} 
                        style={{ 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontSize: '14px',
                          fontWeight: 600,
                          marginBottom: '10px',
                          background: 'rgba(126, 234, 234, 0.1)',
                          borderColor: getProgressColor(skill.level),
                          color: '#7EEAEA',
                        }}
                      >
                        {getSkillLevel(skill.level)}
                      </Tag>
                      
                      <Title 
                        level={4} 
                        style={{ 
                          color: '#FFFFFF', 
                          marginTop: '10px', 
                          marginBottom: '16px',
                          fontSize: '18px',
                        }}
                      >
                        {skill.name}
                      </Title>
                      
                      <Progress 
                        percent={skill.level} 
                        strokeColor='#7EEAEA' 
                        showInfo={false}
                        strokeWidth={8}
                        style={{ marginBottom: '12px' }}
                        trailColor="rgba(255, 255, 255, 0.2)"
                      />
                    </div>
                  </Col>
                ))}
            </Row>
          ))}
        </div>
      );
    });
  };

  const renderSkeletonLoading = () => {
    return [...Array(2)].map((_, categoryIndex) => (
      <div key={categoryIndex} className="mb-12" style={{ marginLeft: '60px', marginRight: '40px' }}>
        <div className="flex items-center mb-6">
          <Skeleton.Avatar active size="default" shape="square" style={{ borderRadius: '8px' }} />
          <div className="ml-3" style={{ width: '200px' }}>
            <Skeleton.Input active size="default" style={{ width: '100%' }} />
          </div>
        </div>
        
        <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
          {[...Array(3)].map((_, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <div style={{ background: 'rgba(0, 51, 102, 0.7)', padding: '20px', borderRadius: '8px' }}>
                <Skeleton.Button active size="small" style={{ width: '80px', marginBottom: '12px' }} />
                <Skeleton.Input active size="default" style={{ width: '100%', marginBottom: '12px' }} />
                <Skeleton.Input active size="small" style={{ width: '100%' }} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  return (
    <section 
      id="skills" 
      className="py-20"
      style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)'
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
                paddingTop:'30px'
              }}
            >
              Technical Proficiency
            </Text>
            <Title 
              level={2}
              style={{ 
                color: '#FFFFFF',
                fontWeight: 700,
                marginBottom: '2rem',
                position: 'relative',
                display: 'inline-block',
              }}
              className="relative"
            >
              Skills & Expertise
              <div 
                 className="absolute left-1/2 transform -translate-x-1/2"
                 style={{
                   bottom: '-10px',
                   width: '150px',
                   height: '4px',
                   background: '#7EEAEA',
                   borderRadius: '2px'
                 }}
              />
            </Title>
            <Paragraph 
              style={{ 
                color: '#E0F7F7',
                maxWidth: '800px',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                margin:'0 auto',
                marginBottom:'20px'
              }}
            >
              My technical toolkit encompasses a diverse range of programming languages, frameworks, and tools
              that I've mastered throughout my software engineering journey.
            </Paragraph>
          </motion.div>

          {loading ? (
            <div>
              {renderSkeletonLoading()}
            </div>
          ) : skills.length > 0 ? (
            <div className="mt-12">
              {renderCategories()}
            </div>
          ) : (
            <Empty 
              description={<span style={{ color: '#E0F7F7' }}>No skills records found</span>} 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ margin: '40px 0', marginLeft: '60px', marginRight: '40px' }}
            />
          )}

          <motion.div variants={itemVariants} className="mt-16">
            <div style={{
              paddingLeft: isMobile ? '5px' : isTablet ? '40px' : '60px',
              paddingRight: isMobile ? '5px' : isTablet ? '40px' : '40px',
              width: '100%',
              paddingBottom:'30px' 
            }}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8}>
                  <div
                    style={{
                      background: 'rgba(0, 51, 102, 0.7)',
                      borderRadius: '12px',
                      padding: '28px',
                      height: '100%',
                      boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)',
                      border: '1px solid rgba(126, 234, 234, 0.2)',
                      backdropFilter: 'blur(5px)',
                      position: 'relative',
                      overflow: 'hidden',
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
                    <LaptopOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#FFFFFF'}}>Frontend</Title>
                    <Paragraph style={{ color: '#E0F7F7' }}>
                      Crafting responsive and intuitive user interfaces using modern technologies and frameworks
                      for exceptional user experiences.
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div
                    style={{
                      background: 'rgba(0, 51, 102, 0.7)',
                      borderRadius: '12px',
                      padding: '28px',
                      height: '100%',
                      boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)',
                      border: '1px solid rgba(126, 234, 234, 0.2)',
                      backdropFilter: 'blur(5px)',
                      position: 'relative',
                      overflow: 'hidden',
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
                    <DatabaseOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#FFFFFF' }}>Backend</Title>
                    <Paragraph style={{ color: '#E0F7F7' }}>
                      Building robust server-side solutions with a focus on performance, security, and scalability.
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div
                    style={{
                      background: 'rgba(0, 51, 102, 0.7)',
                      borderRadius: '12px',
                      padding: '28px',
                      height: '100%',
                      boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)',
                      border: '1px solid rgba(126, 234, 234, 0.2)',
                      backdropFilter: 'blur(5px)',
                      position: 'relative',
                      overflow: 'hidden',
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
                    <CloudServerOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
                    <Title level={4} style={{ color: '#FFFFFF' }}>DevOps</Title>
                    <Paragraph style={{ color: '#E0F7F7' }}>
                      Implementing efficient CI/CD pipelines and cloud infrastructure for seamless application deployment.
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;