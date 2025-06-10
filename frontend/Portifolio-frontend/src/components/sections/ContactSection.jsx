import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Form, Input, Button, message, Divider, Modal, Tag } from 'antd';
import { motion } from 'framer-motion';
import { 
  MailOutlined,
  UserOutlined,
  MessageOutlined,
  SendOutlined,
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  CloudOutlined,
  CheckCircleFilled,
  CalendarOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { ENDPOINTS } from '../../lib/api-config';


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


const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ContactSection = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

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

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(ENDPOINTS.CONTACT, values);
      
   
      setSubmittedData({
        ...values,
        submissionDate: new Date().toLocaleDateString(),
        submissionId: `MSG-${Math.floor(100000 + Math.random() * 900000)}`
      });
      
     
      setSuccessModalVisible(true);
      form.resetFields();
    } catch (error) {
      console.error('Error sending contact message:', error);
      message.error('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
  };

  const socialLinks = [
    { icon: <LinkedinOutlined />, url: 'https://www.linkedin.com/in/gilbert-mugabe-782406253/', color: '#7EEAEA' },
    { icon: <GithubOutlined />, url: 'https://github.com/Gilbert-2', color: '#7EEAEA' },
    { icon: <TwitterOutlined />, url: 'https://x.com/rick6033', color: '#7EEAEA' },
    { icon: <CloudOutlined />, url: 'https://yourportfolio.com', color: '#7EEAEA' }
  ];

  return (
    <section 
      id="contact" 
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
              Get In Touch
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
              Contact Me
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
            <Paragraph style={{ 
              maxWidth: '700px', 
              margin: '0 auto', 
              fontSize: '1.1rem',
              color: '#E0F7F7',
              marginBottom:'20px'

            }}>
              Have a question or want to work together? Feel free to reach out to me using the form below.
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </Paragraph>
          </motion.div>

          <Row gutter={[48, 32]} justify="center" align="stretch">
            <Col xs={24} lg={10}>
              <motion.div variants={itemVariants}>
                <Card
                  style={{ 
                    borderRadius: '16px',
                    height: '100%',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    background: 'rgba(0, 51, 102, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 234, 234, 0.2)',
                    marginLeft: isMobile ? '0' : isTablet ? '40px' : '50px',
                    marginTop: isMobile ? '10' : isTablet ? '10px' : '10px',
                  }}
                >
                  <div className="text-center mb-8">
                    <div
                      style={{ 
                        background: 'rgba(126, 234, 234, 0.1)',
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '2px solid #7EEAEA'
                      }}
                    >
                      <MailOutlined style={{ fontSize: '2.5rem', color: '#7EEAEA' }} />
                    </div>
                    <Title level={3} style={{ color: '#FFFFFF', marginBottom: '6px' }}>
                      Contact Information
                    </Title>
                    <Text style={{ color: '#E0F7F7' }}>
                      Feel free to reach out through any of these channels
                    </Text>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <Title level={5} style={{ color: '#FFFFFF', marginBottom: '12px' }}>
                      Email Address
                    </Title>
                    <a 
                      href="mailto:gilrick1234567890@gmail.com"
                      style={{ 
                        color: '#7EEAEA', 
                        fontSize: '1.1rem',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      <MailOutlined style={{ marginRight: '8px' }} />
                      gilrick1234567890@gmail.com
                    </a>
                  </div>

                  <Divider style={{ margin: '24px 0', borderColor: 'rgba(126, 234, 234, 0.15)' }} />
                  
                  <div>
                    <Title level={5} style={{ color: '#FFFFFF', marginBottom: '16px' }}>
                      Connect on Social Media
                    </Title>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                      {socialLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: 'rgba(0, 51, 102, 0.7)',
                            color: link.color,
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            transition: 'all 0.3s ease',
                            border: `1px solid ${link.color}`
                          }}
                          className="hover:transform hover:scale-110 hover:shadow-lg"
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={14}>
              <motion.div variants={itemVariants}>
                <Card
                  style={{ 
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    background: 'rgba(0, 51, 102, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 234, 234, 0.2)',
                    marginRight: isMobile ? '0' : isTablet ? '40px' : '50px',
                    marginTop: isMobile ? '10' : isTablet ? '10px' : '10px',
                    marginBottom: isMobile ? '10' : isTablet ? '10px' : '50px',
                  }}
                >
                  <Title level={4} style={{ color: '#FFFFFF', marginBottom: '24px' }}>
                    Send a Message
                  </Title>
                  
                  <Form
                    form={form}
                    name="contact"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    requiredMark={false}
                  >
                    <Form.Item
                      name="name"
                      label={<span style={{ color: '#FFFFFF' }}>Your Name</span>}
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined style={{ color: '#E0F7F7' }} />} 
                        placeholder="Hero Kryton"
                        size="large"
                        style={{ 
                          background: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label={<span style={{ color: '#FFFFFF' }}>Email Address</span>}
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined style={{ color: '#E0F7F7' }} />} 
                        placeholder="herockryton@example.com"
                        size="large"
                        style={{ 
                          background: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="subject"
                      label={<span style={{ color: '#FFFFFF' }}>Subject</span>}
                      rules={[{ required: true, message: 'Please enter a subject' }]}
                    >
                      <Input 
                        prefix={<MessageOutlined style={{ color: '#E0F7F7' }} />} 
                        placeholder="How can I help you?"
                        size="large"
                        style={{ 
                          background: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="message"
                      label={<span style={{ color: '#FFFFFF' }}>Message</span>}
                      rules={[{ required: true, message: 'Please enter your message' }]}
                    >
                      <TextArea 
                        placeholder="Write your message here..."
                        rows={6}
                        style={{ 
                          background: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF',
                          resize: 'none'
                        }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        icon={<SendOutlined />}
                        style={{ 
                          backgroundColor: 'transparent',
                          borderColor: '#7EEAEA',
                          color: '#7EEAEA',
                          height: '48px',
                          width: '100%',
                          fontSize: '1.1rem',
                          borderRadius: '8px'
                        }}
                        className="hover:bg-teal-900 hover:bg-opacity-20"
                      >
                        Send Message
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        footer={null}
        closable={false}
        width={500}
        style={{ top: 20 }}
        bodyStyle={{ padding: '0' }}
      >
        <Card
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'none',
            backgroundColor: 'rgba(0, 51, 102, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(126, 234, 234, 0.2)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #7EEAEA 0%, #00A8A8 100%)',
            }}
          />
          
          <div style={{ textAlign: 'center', padding: '32px 24px 16px' }}>
            <CheckCircleFilled style={{ color: '#7EEAEA', fontSize: '72px' }} />
            <Title level={3} style={{ color: '#FFFFFF', marginTop: '16px', marginBottom: '8px' }}>
              Message Sent Successfully!
            </Title>
            <Text style={{ fontSize: '16px', color: '#E0F7F7', display: 'block' }}>
              Your message has been received. I'll get back to you as soon as possible.
            </Text>
          </div>
          
          <div style={{ padding: '0 32px 24px' }}>
            <Card
              type="inner"
              style={{ 
                borderRadius: '8px',
                backgroundColor: 'rgba(126, 234, 234, 0.05)', 
                borderColor: 'rgba(126, 234, 234, 0.2)'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ fontSize: '16px', color: '#FFFFFF' }}>Message Details</Text>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '16px' }}>
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>From:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.name || '—'}</Text>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Email:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.email || '—'}</Text>
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Subject:</Text>
                  <Tag color="#7EEAEA" style={{ color: '#003366' }}>{submittedData.subject || '—'}</Tag>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Message ID:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.submissionId || '—'}</Text>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Sent Date:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>
                    <CalendarOutlined style={{ marginRight: '8px' }} />
                    {submittedData.submissionDate || '—'}
                  </Text>
                </div>
              </div>
            </Card>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Button
                type="primary"
                onClick={handleModalClose}
                size="large"
                style={{ 
                  height: '42px',
                  minWidth: '120px',
                  fontSize: '16px',
                  background: '#7EEAEA', 
                  borderColor: '#7EEAEA',
                  color: '#003366'
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </section>
  );
};

export default ContactSection;