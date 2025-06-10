import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Skeleton, Empty, Tag, message, Tabs } from 'antd';
import { motion } from 'framer-motion';
import { 
  ProjectOutlined,
  GithubOutlined,
  LinkOutlined,
  CalendarOutlined
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

const { TabPane } = Tabs;

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(ENDPOINTS.PROJECTS);
        
        console.log('Projects data:', response.data);
        
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects data:', error);
        message.error('Failed to load projects data');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const filteredProjects = () => {
    if (activeTab === 'all') {
      return projects;
    } else if (activeTab === 'featured') {
      return projects.filter(project => project.featured);
    }
    return projects;
  };
  

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    const fullUrl = `${API_URL}/uploads/${cleanPath}`;
    console.log(`Full image URL: ${fullUrl}`);
    
    return fullUrl;
  };

  const handleImageError = (e, project) => {
    console.error(`Image failed to load for project: ${project.title}, path: ${project.imagePath}`);
    
    e.target.src = '/assets/placeholder-image.png';
    
    if (!e.target.src || e.target.src.includes('placeholder-image.png')) {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMzM2NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3RUVBRUEiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    }
  };

  const renderProjectCard = (project) => (
    <Col xs={24} sm={12} lg={8} key={project.id}>
      <motion.div variants={itemVariants} style={{ height: '100%' }}>
        <Card 
          hoverable
          className="transform transition-transform duration-300 hover:translate-y-[-8px]"
          cover={
            <div style={{ 
              height: '200px', 
              overflow: 'hidden',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              background: '#003366'
            }}>
              {project.imagePath ? (
                <img 
                  alt={project.title} 
                  src={getImageUrl(project.imagePath)}
                  onError={(e) => handleImageError(e, project)}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: 'scale(1.0)'
                  }}
                  className="hover:scale-110"
                  onMouseOver={(e) => {e.currentTarget.style.transform = 'scale(1.1)'}}
                  onMouseOut={(e) => {e.currentTarget.style.transform = 'scale(1.0)'}}
                />
              ) : (
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#7EEAEA',
                  flexDirection: 'column'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>📷</div>
                  <div>No image available</div>
                </div>
              )}
            </div>
          }
          style={{ 
            borderRadius: '12px',
            height: isMobile ? '500px' : '550px', // Responsive height for mobile
            boxShadow: '0 6px 16px rgba(0, 51, 102, 0.3)',
            transition: 'all 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: '#003366',
            border: '1px solid rgba(126, 234, 234, 0.2)'
          }}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 200px)', // Subtract image height
            padding: '16px',
            overflow: 'hidden'
          }}
        >
          {project.featured && (
            <div 
              style={{ 
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#7EEAEA',
                color: '#003366',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 10
              }}
            >
              Featured
            </div>
          )}
          
          {/* Header section - fixed height */}
          <div style={{ minHeight: '80px', marginBottom: '8px' }}>
            <Title level={4} style={{ color: '#7EEAEA', margin: '0 0 8px 0', lineHeight: '1.3' }}>
              {project.title}
            </Title>
            
            {project.startDate && (
              <Text style={{ color: '#E0F7F7', display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <CalendarOutlined style={{ marginRight: '5px' }} />
                {formatDate(project.startDate)} 
                {project.endDate && ` - ${formatDate(project.endDate)}`}
              </Text>
            )}
          </div>
          
          {/* Description section - flexible but limited */}
          <div style={{ flex: '1', minHeight: '60px', maxHeight: '80px', overflow: 'hidden', marginBottom: '12px' }}>
            <Paragraph 
              style={{ 
                color: '#E0F7F7', 
                margin: '0',
                fontSize: '13px',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {project.description}
            </Paragraph>
          </div>
          
          {/* Technologies section - flexible height but constrained */}
          {project.technologies && project.technologies.length > 0 && (
            <div style={{ 
              minHeight: '60px',
              maxHeight: '120px',
              overflow: 'auto',
              marginBottom: '16px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#7EEAEA transparent'
            }}>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '4px',
                alignContent: 'flex-start'
              }}>
                {project.technologies.map((tech, i) => (
                  <Tag 
                    key={i} 
                    style={{ 
                      margin: '2px',
                      color: '#7EEAEA', 
                      borderColor: '#7EEAEA', 
                      background: 'rgba(126, 234, 234, 0.1)',
                      fontSize: '11px',
                      padding: '2px 6px',
                      height: 'auto',
                      lineHeight: '1.2'
                    }}
                  >
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          
          {/* Buttons section - fixed at bottom */}
          <div style={{ 
            marginTop: 'auto',
            display: 'flex', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {project.url && (
              <Button 
                type="primary" 
                icon={<LinkOutlined />}
                href={project.url}
                target="_blank"
                size="small"
                style={{ 
                  background: '#7EEAEA', 
                  borderColor: '#7EEAEA',
                  color: '#003366',
                  fontSize: '12px',
                  height: '28px'
                }}
              >
                View Live
              </Button>
            )}
            {project.githubUrl && (
              <Button 
                icon={<GithubOutlined />}
                href={project.githubUrl}
                target="_blank"
                size="small"
                style={{ 
                  borderColor: '#7EEAEA',
                  color: '#7EEAEA',
                  background: 'transparent',
                  fontSize: '12px',
                  height: '28px'
                }}
                className="hover:border-teal-300 hover:text-teal-300"
              >
                Source Code
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </Col>
  );

  return (
    <section 
      id="projects" 
      className="py-20"
      style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
              Portfolio Showcase
            </Text>
            <Title 
              level={2}
              style={{ 
                color: '#FFFFFF',
                fontWeight: 700,
                marginBottom: '1rem',
                position: 'relative',
                display: 'inline-block',
                textShadow: '0 2px 10px rgba(126, 234, 234, 0.3)'
              }}
              className="relative"
            >
              Recent Projects
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
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <div style={{ 
              marginLeft: isMobile ? '5px' : '60px',
               marginBottom: '32px',
                textAlign: 'left'
                 }}>
              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                centered={false}
                tabBarStyle={{
                  color: '#E0F7F7',
                  fontWeight: 600,
                }}
              >
                <TabPane 
                  tab={<span style={{ color: activeTab === 'all' ? '#7EEAEA' : '#E0F7F7', fontSize: '1rem' }}>All Projects</span>} 
                  key="all" 
                />
                <TabPane 
                  tab={<span style={{ color: activeTab === 'featured' ? '#7EEAEA' : '#E0F7F7', fontSize: '1rem' }}>Featured</span>} 
                  key="featured" 
                />
              </Tabs>
            </div>

            {loading ? (
              <Row gutter={[24, 24]} 
              >
                {[1, 2, 3].map(i => (
                  <Col xs={24} sm={12} lg={8} key={i}>
                    <Card style={{ background: '#003366', borderColor: '#7EEAEA', height: isMobile ? '500px' : '550px' }}>
                      <Skeleton active avatar paragraph={{ rows: 4 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : filteredProjects().length > 0 ? (
              <Row gutter={[24, 24]} 
              style={{ 
                marginLeft: isMobile ? '-10px' : isTablet ? '40px' : '50px',
                marginRight: isMobile ? '-10px' : isTablet ? '40px' : '40px',
                 }}>
                {filteredProjects().map(project => renderProjectCard(project))}
              </Row>
            ) : (
              <Empty 
                description={<span style={{ color: '#E0F7F7' }}>No projects found</span>} 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Card
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(126, 234, 234, 0.2)',
                maxWidth: '800px',
                margin: '0 auto',
                background: 'rgba(0, 51, 102, 0.7)',
                border: '1px solid rgba(126, 234, 234, 0.3)',
                marginBottom:'30px',
                marginTop:'30px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ProjectOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
              <Title level={4} style={{ color: '#FFFFFF' }}>Always Building</Title>
              <Paragraph style={{ color: '#E0F7F7' }}>
                These projects represent my journey as a developer, showcasing my skills, interests, and growth.
                Each project is a learning experience and a stepping stone toward solving more complex problems.
                I'm constantly working on new ideas and expanding my portfolio with innovative solutions.
              </Paragraph>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;