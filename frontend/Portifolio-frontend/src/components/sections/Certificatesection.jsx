import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Skeleton, Empty, message, Badge, Tooltip, Image } from 'antd';
import { motion } from 'framer-motion';
import { 
  SafetyCertificateOutlined,
  CalendarOutlined,
  GlobalOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  ZoomInOutlined,
  PictureOutlined,
  ClockCircleOutlined
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

const CertificateSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/resume/certificates`);
        setCertificates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching certificate data:', error);
        message.error('Failed to load certificate data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [apiBaseUrl]);

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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const isExpired = (expirationDate) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  const isNeverExpires = (expirationDate) => {
    return expirationDate === null;
  };

  const getCertificateStatus = (expirationDate) => {
    if (isNeverExpires(expirationDate)) {
      return { 
        text: 'No Expiration', 
        color: '#7EEAEA',
        icon: <CheckCircleOutlined />
      };
    } else if (isExpired(expirationDate)) {
      return { 
        text: 'Expired', 
        color: '#00A8A8',
        icon: <ClockCircleOutlined />
      };
    } else {
      return { 
        text: 'Valid', 
        color: '#7EEAEA',
        icon: <CheckCircleOutlined />
      };
    }
  };
  
  const handlePreview = (imagePath) => {
    setPreviewImage(`${apiBaseUrl}/public/images/certificates/${imagePath}`);
    setPreviewVisible(true);
  };

  const renderCertificateCover = (certificate) => {
    if (certificate.imagePath) {
      const imageUrl = `${apiBaseUrl}/public/images/certificates/${certificate.imagePath}`;
      
      return (
        <div
          style={{ 
            height: '180px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            background: '#003366'
          }}
          onClick={() => handlePreview(certificate.imagePath)}
        >
          <img 
            src={imageUrl}
            alt={certificate.title} 
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-certificate.png'; 
              e.target.style.objectFit = 'contain';
              e.target.style.padding = '20px';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            background: 'rgba(0, 51, 102, 0.8)',
            color: '#7EEAEA',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px'
          }}>
            <ZoomInOutlined style={{ marginRight: '5px' }} /> 
          </div>
        </div>
      );
    } else {
      return (
        <div 
          style={{ 
            height: '180px', 
            background: 'linear-gradient(135deg, #003366 0%, #006699 100%)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <PictureOutlined 
            style={{ 
              fontSize: '5rem', 
              color: 'rgba(126, 234, 234, 0.6)'
            }} 
          />
        </div>
      );
    }
  };

  return (
    <section 
      id="certificates" 
      className="py-20"
      style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
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
              Professional Development
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
              Certifications & Achievements
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
            <Paragraph 
              style={{ 
                color: '#E0F7F7',
                maxWidth: '800px',
                margin: '0 auto',
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}
            >
              A collection of industry certifications and credentials that validate my skills 
              and demonstrate my commitment to continuous learning in the field of software development.
            </Paragraph>
          </motion.div>

          <motion.div variants={itemVariants}>
            {loading ? (
              <Row gutter={[24, 24]}>
                {[...Array(4)].map((_, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Skeleton.Image active style={{ width: '100%', height: '180px' }} />
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Col>
                ))}
              </Row>
            ) : certificates.length > 0 ? (
              <Row 
                gutter={[40, 60]} 
                className="certificate-grid"
               
              >
                {certificates.map((certificate, index) => {
                  const status = getCertificateStatus(certificate.expirationDate);
                  
                  return (
                    <Col 
                      xs={24} 
                      sm={12} 
                      md={12} 
                      lg={12} 
                      key={certificate.id}
                      className="mb-8"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.3 }
                        }}
                        className="h-full"
                      >
                        <Card
                          hoverable
                          style={{ 
                            borderRadius: '12px',
                            height: isMobile ? '420px' : '450px', // Fixed consistent height
                            boxShadow: '0 2px 8px rgba(0, 51, 102, 0.15)', // Reduced shadow
                            overflow: 'hidden',
                            maxWidth: '480px',
                            margin: '0 auto',
                            background: 'rgba(0, 51, 102, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(126, 234, 234, 0.2)',
                            marginTop: isMobile ? '10px' : '20px',
                            marginLeft: isMobile ? '0px' : isTablet ? '40px' : '50px',
                            marginBottom: isMobile ? '0px' : isTablet ? '20px' : '30px',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          cover={renderCertificateCover(certificate)}
                          bodyStyle={{ 
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: isMobile ? 'calc(100% - 180px)' : 'calc(100% - 180px)', // Consistent body height
                            overflow: 'hidden'
                          }}
                          className="certificate-card"
                        >
                          <Badge.Ribbon 
                            text={status.text} 
                            color={status.color}
                            style={{ 
                              fontSize: '0.8rem', 
                              fontWeight: 'bold',
                              padding: '0 8px',
                              right: '-7px'
                            }}
                          >
                            {/* Title section - fixed height */}
                            <div style={{ minHeight: '60px', marginBottom: '12px' }}>
                              <Title level={5} style={{ 
                                color: '#FFFFFF', 
                                margin: '0 0 8px 0', 
                                fontSize: '16px',
                                lineHeight: '1.3',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {certificate.title}
                              </Title>
                            </div>
                          </Badge.Ribbon>
                          
                          {/* Issuer section - fixed height */}
                          <div style={{ minHeight: '40px', marginBottom: '12px' }}>
                            <Text strong style={{ 
                              color: '#7EEAEA', 
                              display: 'flex', 
                              alignItems: 'flex-start',
                              fontSize: '14px',
                              lineHeight: '1.3'
                            }}>
                              <GlobalOutlined style={{ marginRight: '5px', marginTop: '2px', flexShrink: 0 }} />
                              <span style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {certificate.issuer}
                              </span>
                            </Text>
                          </div>
                          
                          {/* Date section - fixed height */}
                          <div style={{ minHeight: '30px', marginBottom: '16px' }}>
                            <Text type="secondary" style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              color: '#E0F7F7',
                              fontSize: '13px'
                            }}>
                              <CalendarOutlined style={{ marginRight: '5px' }} />
                              Issued: {formatDate(certificate.issueDate)}
                            </Text>
                          </div>
                          
                          {/* Button section - positioned at bottom */}
                          <div style={{ marginTop: 'auto' }}>
                            {certificate.credentialUrl && (
                              <Button 
                                type="primary"
                                icon={<LinkOutlined />}
                                style={{ 
                                  background: '#7EEAEA', 
                                  borderColor: '#7EEAEA',
                                  color: '#003366',
                                  width: '100%',
                                  height: '36px'
                                }}
                                onClick={() => window.open(certificate.credentialUrl, '_blank')}
                              >
                                Verify Certificate
                              </Button>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <Empty 
                description={<span style={{ color: '#E0F7F7' }}>No certificates found</span>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ margin: '40px 0' }}
              />
            )}
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
          >
            <Card
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(126, 234, 234, 0.1)', // Reduced shadow
                maxWidth: '800px',
                margin: '0 auto',
                background: 'rgba(0, 51, 102, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(126, 234, 234, 0.2)',
                marginBottom:'30px'
              }}
            >
              <SafetyCertificateOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA', marginBottom: '16px' }} />
              <Title level={4} style={{ color: '#FFFFFF' }}>Continuous Professional Development</Title>
              <Paragraph style={{ color: '#E0F7F7' }}>
                I believe in investing in continuous learning to stay current with industry trends and 
                best practices. These certifications represent my dedication to professional growth and 
                mastery of key technologies in my field.
              </Paragraph>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Image Preview Modal */}
      <Image
        width={0}
        style={{ display: 'none' }}
        preview={{
          visible: previewVisible,
          onVisibleChange: (vis) => setPreviewVisible(vis),
          src: previewImage,
        }}
      />

      <style jsx global>{`
        .certificate-grid {
          margin-bottom: 2rem;
        }

        .certificate-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .certificate-card:hover {
          box-shadow: 0 4px 16px rgba(126, 234, 234, 0.2) !important;
        }

        @media (max-width: 768px) {
          .certificate-grid {
            padding-left: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificateSection;