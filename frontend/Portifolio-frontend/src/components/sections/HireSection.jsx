import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Form, Input, Button, Select, Divider, message, Modal, Tag } from 'antd';
import { motion } from 'framer-motion';
import { 

  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  DollarOutlined,
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
const { Option } = Select;
const { TextArea } = Input;

const HireSection = () => {
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

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(ENDPOINTS.HIRE, values);
      
     
      setSubmittedData({
        ...values,
        submissionDate: new Date().toLocaleDateString(),
        submissionId: `JP-${Math.floor(100000 + Math.random() * 900000)}`
      });
      
     
      setSuccessModalVisible(true);
      form.resetFields();
    } catch (error) {
      console.error('Error submitting job proposal:', error);
      message.error('Failed to submit job proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
  };

  return (
    <section 
      id="hire" 
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
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Text 
              className="uppercase tracking-wider font-semibold mb-4 block"
              style={{ 
                color: '#7EEAEA',
                fontSize: '1rem',
                letterSpacing: '3px',
                paddingTop:'10px'
              }}
            >
              Hire Me
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
              Let's Work Together
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

          <Row gutter={[48, 24]} align="stretch">
            <Col xs={24} lg={10}>
              <motion.div variants={itemVariants}>
                <Card
                  style={{ 
                    height: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(126, 234, 234, 0.15)',
                    background: 'rgba(0, 51, 102, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 234, 234, 0.2)',
                    marginTop: isMobile ? '10px' : '20px',
                    marginLeft: isMobile ? '0px' : isTablet ? '40px' : '50px',
                    marginBottom: isMobile ? '10px' : isTablet ? '20px' : '50px',
                    
                  }}
                >
                  <Title level={3} style={{ color: '#FFFFFF', marginBottom: '1.5rem' }}>
                    Why Work With Me?
                  </Title>

                  <div>
                    <Paragraph style={{ fontSize: '16px', color: '#E0F7F7', marginBottom: '1.5rem' }}>
                      I bring expertise in full-stack development with a focus on creating 
                      scalable, maintainable, and user-friendly applications. My approach combines:
                    </Paragraph>

                    <div style={{ marginBottom: '1rem' }}>
                      <Text strong style={{ color: '#7EEAEA', fontSize: '18px' }}>
                        Technical Excellence
                      </Text>
                      <Paragraph style={{ color: '#E0F7F7', margin: '0.5rem 0 1rem' }}>
                        Proficient in modern frameworks and best practices that ensure high-quality, 
                        performant code that meets your business needs.
                      </Paragraph>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <Text strong style={{ color: '#7EEAEA', fontSize: '18px' }}>
                        Collaborative Approach
                      </Text>
                      <Paragraph style={{ color: '#E0F7F7', margin: '0.5rem 0 1rem' }}>
                        I value open communication and work closely with stakeholders to ensure 
                        project goals are met efficiently and effectively.
                      </Paragraph>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <Text strong style={{ color: '#7EEAEA', fontSize: '18px' }}>
                        Adaptability
                      </Text>
                      <Paragraph style={{ color: '#E0F7F7', margin: '0.5rem 0 1rem' }}>
                        Quick to learn and adapt to new technologies and project requirements, 
                        ensuring flexibility as your project evolves.
                      </Paragraph>
                    </div>
                  </div>

                  <Divider style={{ borderColor: 'rgba(126, 234, 234, 0.2)' }} />

                  <Title level={4} style={{ color: '#FFFFFF' }}>
                    Available For:
                  </Title>
                  <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                    <Col span={12}>
                      <Card size="small" style={{ 
                        textAlign: 'center', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 51, 102, 0.6)',
                        borderColor: 'rgba(126, 234, 234, 0.2)'
                      }}>
                        <Text strong style={{ color: '#FFFFFF' }}>Full-time Roles</Text>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card size="small" style={{ 
                        textAlign: 'center', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 51, 102, 0.6)',
                        borderColor: 'rgba(126, 234, 234, 0.2)'
                      }}>
                        <Text strong style={{ color: '#FFFFFF' }}>Contract Work</Text>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card size="small" style={{ 
                        textAlign: 'center', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 51, 102, 0.6)',
                        borderColor: 'rgba(126, 234, 234, 0.2)'
                      }}>
                        <Text strong style={{ color: '#FFFFFF' }}>Freelance Projects</Text>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card size="small" style={{ 
                        textAlign: 'center', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 51, 102, 0.6)',
                        borderColor: 'rgba(126, 234, 234, 0.2)'
                      }}>
                        <Text strong style={{ color: '#FFFFFF' }}>Consulting</Text>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={14}>
              <motion.div variants={itemVariants}>
                <Card
                  style={{ 
                    borderRadius: '12px',
                    height:'100%',
                    boxShadow: '0 25px 50px rgba(126, 234, 234, 0.15)',
                    backgroundColor: 'rgba(0, 51, 102, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 234, 234, 0.2)',
                    marginTop: isMobile ? '10px' : '20px',
                    marginRight: isMobile ? '0px' : isTablet ? '40px' : '50px',
                    marginBottom: isMobile ? '30px' : isTablet ? '20px' : '50px',
                    
                  }}
                >
                  <Title level={4} style={{ color: '#FFFFFF', marginBottom: '1.5rem' }}>
                    Submit a Job Proposal
                  </Title>
                  
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ jobType: 'Full-time' }}
                    scrollToFirstError
                   
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="company"
                          label={<span style={{ color: '#FFFFFF' }}>Company Name</span>}
                          rules={[{ required: true, message: 'Please enter company name' }]}
                        >
                          <Input 
                            prefix={<BankOutlined style={{ color: '#E0F7F7' }} />} 
                            placeholder="Acme Inc." 
                            size="large"
                            style={{ 
                              backgroundColor: 'rgba(0, 51, 102, 0.5)',
                              borderColor: 'rgba(126, 234, 234, 0.3)',
                              color: '#FFFFFF'
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="jobTitle"
                          label={<span style={{ color: '#FFFFFF' }}>Job Title</span>}
                          rules={[{ required: true, message: 'Please enter job title' }]}
                        >
                          <Input 
                            prefix={<FileTextOutlined style={{ color: '#E0F7F7' }} />} 
                            placeholder="Senior Developer" 
                            size="large"
                            style={{ 
                              backgroundColor: 'rgba(0, 51, 102, 0.5)',
                              borderColor: 'rgba(126, 234, 234, 0.3)',
                              color: '#FFFFFF'
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="email"
                          label={<span style={{ color: '#FFFFFF' }}>Email</span>}
                          rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                          ]}
                        >
                          <Input 
                            prefix={<MailOutlined style={{ color: '#E0F7F7' }} />} 
                            placeholder="contact@company.com" 
                            size="large"
                            style={{ 
                              backgroundColor: 'rgba(0, 51, 102, 0.5)',
                              borderColor: 'rgba(126, 234, 234, 0.3)',
                              color: '#FFFFFF'
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="phone"
                          label={<span style={{ color: '#FFFFFF' }}>Phone (Optional)</span>}
                        >
                          <Input 
                            prefix={<PhoneOutlined style={{ color: '#E0F7F7' }} />} 
                            placeholder="+1 234 567 8900" 
                            size="large"
                            style={{ 
                              backgroundColor: 'rgba(0, 51, 102, 0.5)',
                              borderColor: 'rgba(126, 234, 234, 0.3)',
                              color: '#FFFFFF'
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="jobType"
                          label={<span style={{ color: '#FFFFFF' }}>Job Type</span>}
                          rules={[{ required: true, message: 'Please select job type' }]}
                        >
                          <Select 
                            size="large"
                            style={{ 
                              width: '100%'
                            }}
                            dropdownStyle={{
                              backgroundColor: 'rgba(0, 51, 102, 0.9)'
                            }}
                          >
                            <Option value="Full-time">Full-time</Option>
                            <Option value="Part-time">Part-time</Option>
                            <Option value="Contract">Contract</Option>
                            <Option value="Freelance">Freelance</Option>
                            <Option value="Consulting">Consulting</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="location"
                          label={<span style={{ color: '#FFFFFF' }}>Location (Optional)</span>}
                        >
                          <Input 
                            prefix={<EnvironmentOutlined style={{ color: '#E0F7F7' }} />} 
                            placeholder="Remote or Office Location" 
                            size="large"
                            style={{ 
                              backgroundColor: 'rgba(0, 51, 102, 0.5)',
                              borderColor: 'rgba(126, 234, 234, 0.3)',
                              color: '#FFFFFF'
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="salaryRange"
                      label={<span style={{ color: '#FFFFFF' }}>Salary Range (Optional)</span>}
                    >
                      <Input 
                        prefix={<DollarOutlined style={{ color: '#E0F7F7' }} />} 
                        placeholder="e.g., 70,000-90,000 USD" 
                        size="large"
                        style={{ 
                          backgroundColor: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="description"
                      label={<span style={{ color: '#FFFFFF' }}>Job Description</span>}
                      rules={[
                        { required: true, message: 'Please enter job description' },
                        { min: 10, message: 'Description must be at least 10 characters' }
                      ]}
                    >
                      <TextArea 
                        placeholder="Please describe the job opportunity in detail..."
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        size="large"
                        style={{ 
                          backgroundColor: 'rgba(0, 51, 102, 0.5)',
                          borderColor: 'rgba(126, 234, 234, 0.3)',
                          color: '#FFFFFF'
                        }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        size="large"
                        block
                        style={{ 
                          height: '48px',
                          fontSize: '16px',
                          background: '#7EEAEA', 
                          borderColor: '#7EEAEA',
                          color: '#003366',
                          
                        }}
                      >
                        Submit Job Proposal
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
            <Title level={3} style={{ color: '#FFFFFF', marginTop: '16px', marginBottom: '8px' }}>Job Proposal Submitted!</Title>
            <Text style={{ fontSize: '16px', color: '#E0F7F7', display: 'block' }}>
              Your job proposal has been received. I'll review it shortly and get back to you.
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
                <Text strong style={{ fontSize: '16px', color: '#FFFFFF' }}>Submission Details</Text>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '16px' }}>
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Company:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.company || '—'}</Text>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Job Title:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.jobTitle || '—'}</Text>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Job Type:</Text>
                  <Tag color="#7EEAEA" style={{ color: '#003366' }}>{submittedData.jobType || '—'}</Tag>
                </div>
                
                <div>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Submission ID:</Text>
                  <Text strong style={{ color: '#FFFFFF' }}>{submittedData.submissionId || '—'}</Text>
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <Text style={{ color: '#E0F7F7', display: 'block', marginBottom: '4px' }}>Submission Date:</Text>
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

export default HireSection;