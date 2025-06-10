import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Skeleton, Empty, Tag, message, Tabs, Modal, Divider } from 'antd';
import { 
  ReadOutlined,
  ClockCircleOutlined,
  TagOutlined,
  RightOutlined,
  BookOutlined,
  CalendarOutlined,
  CloseOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { ENDPOINTS } from '../../lib/api-config';
import ReactMarkdown from 'react-markdown';

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

const colors = {
  primary: '#003366',       
  secondary: '#7EEAEA',     
  gradient: 'linear-gradient(135deg, #003366 0%, #006699 50%, #00A8A8 100%)',
  textPrimary: '#FFFFFF', 
  textSecondary: '#E0F7F7', 
  darkCard: 'rgba(0, 51, 102, 0.7)',
  cardBorder: 'rgba(126, 234, 234, 0.2)'
};

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [fullPost, setFullPost] = useState(null);
  const [loadingFullPost, setLoadingFullPost] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.BLOG}?published=true`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        message.error('Failed to load blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
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

 
  const getAllTags = () => {
    const allTags = posts.flatMap(post => post.tags || []);
    return [...new Set(allTags)];
  };


  const getTabItems = () => {
    const items = [
      {
        key: 'all',
        label: 'All Posts'
      }
    ];
    
    getAllTags().forEach(tag => {
      items.push({
        key: tag,
        label: tag
      });
    });
    
    return items;
  };

  const formatPublishedDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = () => {
    if (activeTab === 'all') {
      return posts.filter(post => post.published);
    } else {
      return posts.filter(post => 
        post.published && post.tags && post.tags.includes(activeTab)
      );
    }
  };

  const truncateText = (text, maxLength = 160) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const fetchFullPost = async (slug) => {
    if (!slug) return;
    
    setLoadingFullPost(true);
    try {
      const response = await axios.get(`${ENDPOINTS.BLOG}/slug/${slug}`);
      setFullPost(response.data);
    } catch (error) {
      console.error('Error fetching full post:', error);
      message.error('Failed to load article details');
      setFullPost(null);
    } finally {
      setLoadingFullPost(false);
    }
  };

  const openPostModal = async (post) => {
    if (!post) return;
    
    setCurrentPost(post);
    setModalOpen(true);
    
   
    const related = post.tags && post.tags.length > 0 ? 
      posts
        .filter(p => 
          p.id !== post.id && 
          p.tags && 
          p.tags.some(tag => post.tags && post.tags.includes(tag))
        )
        .slice(0, 3) 
      : [];
    
    setRelatedPosts(related);
    

    if (post.slug) {
      await fetchFullPost(post.slug);
    }
  };

  const renderPostCard = (post) => (
    <Col xs={24} sm={12} lg={8} key={post.id}>
      <div className="post-card-animation" style={{ height: '100%' }}>
        <Card 
          hoverable
          cover={post.featuredImage && (
            <div style={{ 
              height: '200px', 
              overflow: 'hidden',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}>
              <img 
                alt={post.title} 
                src={post.featuredImage}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} 
              />
            </div>
          )}
          style={{ 
            borderRadius: '12px',
            height: '100%',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.darkCard,
            borderColor: colors.cardBorder,
            backdropFilter: 'blur(10px)'
          }}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '24px'
          }}
        >
          {/* Fixed height content container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '280px' // Fixed minimum height for content area
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <ClockCircleOutlined style={{ color: colors.textSecondary, marginRight: '8px' }} />
              <Text style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                {formatPublishedDate(post.publishedAt)}
              </Text>
            </div>
            
            <Title 
              level={4} 
              style={{ 
                color: colors.textPrimary, 
                marginTop: '0',
                marginBottom: '12px',
                minHeight: '60px', // Fixed height for title area
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              {post.title}
            </Title>
            
            <div style={{ flex: 1, marginBottom: '16px' }}>
              <Paragraph 
                style={{ 
                  color: colors.textSecondary, 
                  marginBottom: '0',
                  height: '72px', // Fixed height for 3 lines of text
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '24px'
                }}
              >
                {truncateText(post.excerpt || post.content)}
              </Paragraph>
            </div>
            
            {/* Tags container with fixed height */}
            <div style={{ 
              minHeight: '40px',
              marginBottom: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: '4px'
            }}>
              {post.tags && post.tags.length > 0 && (
                <>
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <Tag 
                      color={colors.secondary}
                      key={i} 
                      style={{ 
                        margin: '2px', 
                        color: colors.primary, 
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                      icon={<TagOutlined />}
                    >
                      {tag}
                    </Tag>
                  ))}
                  {post.tags.length > 3 && (
                    <Tag 
                      style={{ 
                        margin: '2px', 
                        color: colors.textSecondary,
                        backgroundColor: 'transparent',
                        border: `1px solid ${colors.cardBorder}`,
                        fontSize: '12px'
                      }}
                    >
                      +{post.tags.length - 3}
                    </Tag>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Button always at bottom */}
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <Button 
              type="primary" 
              icon={<ReadOutlined />}
              style={{ 
                background: colors.secondary, 
                borderColor: colors.secondary, 
                color: colors.primary,
                fontWeight: 500,
                width: '100%'
              }}
              onClick={() => openPostModal(post)}
            >
              Read Article <RightOutlined />
            </Button>
          </div>
        </Card>
      </div>
    </Col>
  );

  return (
    <section 
      id="blog" 
      className="py-20"
      style={{ 
        background: colors.gradient,
        minHeight: '100vh',
        color: colors.textSecondary,
      }}
    >
      <div className="container mx-auto px-4"
      
      style={{
         paddingLeft: isMobile ? '10px' : isTablet ? '40px' : '50px',
        paddingRight: isMobile ? '10px' : isTablet ? '40px' : '50px',
      }}
      
      >

      
        <div
          className="motion-container"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-16" variants={itemVariants}>
            <Text 
              className="uppercase tracking-wider font-semibold mb-4 block"
              style={{ 
                color: colors.secondary,
                fontSize: '1rem',
                letterSpacing: '3px',
               
                paddingTop:'20px'
              }}
            >
              Insights & Articles
            </Text>
            <Title 
              level={2}
              style={{ 
                color: colors.textPrimary,
                fontWeight: 700,
                marginBottom: '2rem',
                position: 'relative',
                display: 'inline-block'
              }}
              className="relative"
            >
              From The Blog
              <div 
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  bottom: '-10px',
                  width: '80px',
                  height: '4px',
                  background: colors.secondary,
                  borderRadius: '2px'
                }}
              />
            </Title>
          </div>

          <div className="mb-10" variants={itemVariants}>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              centered
              style={{ 
              marginBottom: '30px',
              marginLeft:'60px', 
              marginRight:'60px'
            }}
              items={getTabItems()}
              className="custom-tabs"
            />

            {loading ? (
              <Row gutter={[24, 24]} style={{ alignItems: 'stretch' }}>
                {[1, 2, 3].map(i => (
                  <Col xs={24} sm={12} lg={8} key={i} style={{ display: 'flex' }}>
                    <Card 
                      style={{ 
                        backgroundColor: colors.darkCard, 
                        borderColor: colors.cardBorder,
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <Skeleton active avatar paragraph={{ rows: 4 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : filteredPosts().length > 0 ? (
              <Row gutter={[24, 24]} style={{ alignItems: 'stretch' }}>
                {filteredPosts().map(post => renderPostCard(post))}
              </Row>
            ) : (
              <Empty 
                description={<span style={{ color: colors.textSecondary }}>No blog posts found</span>} 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            )}
          </div>
          
          <div className="text-center mt-12" variants={itemVariants}
          style={{
            paddingTop:'30px',
            paddingBottom:'30px'
          }}
          >
          
            <Card
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                maxWidth: '800px',
                margin: '0 auto',
                background: colors.darkCard,
                borderColor: colors.cardBorder,
                backdropFilter: 'blur(10px)',
                
              
              }}
            >
              <BookOutlined style={{ fontSize: '2.5rem', color: colors.secondary, marginBottom: '16px' }} />
              <Title level={4} style={{ color: colors.textPrimary }}>Knowledge Sharing</Title>
              <Paragraph style={{ color: colors.textSecondary, }}>
                I regularly write about web development, programming best practices, and emerging technologies.
                These articles reflect my passion for continuous learning and my commitment to sharing knowledge
                with the developer community.
              </Paragraph>
            
               
             
            </Card>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
        styles={{
          body: { padding: '0' },
          mask: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          content: { 
            backgroundColor: colors.primary,
            borderRadius: '12px'
          }
        }}
        closeIcon={<CloseOutlined style={{ color: colors.textPrimary, fontSize: '16px' }} />}
        destroyOnClose
      >
        {currentPost && (
          <div style={{ position: 'relative' }}>
            <Row>
              {/* Main Content Column */}
              <Col xs={24} lg={16} style={{ padding: '24px' }}>
                {loadingFullPost ? (
                  <Skeleton active avatar paragraph={{ rows: 10 }} />
                ) : (
                  <>
                    {currentPost.featuredImage && (
                      <div style={{ 
                        marginBottom: '24px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        maxHeight: '400px'
                      }}>
                        <img 
                          src={currentPost.featuredImage} 
                          alt={currentPost.title}
                          style={{ width: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    
                    <Title 
                      level={2}
                      style={{ 
                        color: colors.textPrimary,
                        marginBottom: '16px'
                      }}
                    >
                      {currentPost.title}
                    </Title>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                      <Text style={{ color: colors.textSecondary, display: 'flex', alignItems: 'center' }}>
                        <CalendarOutlined style={{ marginRight: '5px' }} />
                        {formatPublishedDate(currentPost.publishedAt)}
                      </Text>
                      
                      {currentPost.tags && currentPost.tags.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <TagOutlined style={{ color: colors.textSecondary }} />
                          {currentPost.tags.map((tag, i) => (
                            <Tag 
                              color={colors.secondary}
                              key={i}
                              style={{ color: colors.primary, fontWeight: 500 }}
                            >
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}
                    </div>

                    <Divider style={{ marginTop: 0, borderColor: colors.cardBorder }} />
                    
                    {currentPost.excerpt && (
                      <Paragraph 
                        style={{ 
                          fontSize: '1.125rem',
                          color: colors.textSecondary,
                          fontStyle: 'italic',
                          marginBottom: '24px'
                        }}
                      >
                        {currentPost.excerpt}
                      </Paragraph>
                    )}
                    
                    <div className="blog-content" style={{ 
                      fontSize: '1.05rem', 
                      lineHeight: '1.8', 
                      maxHeight: '60vh', 
                      overflow: 'auto', 
                      padding: '0 10px',
                      color: colors.textPrimary
                    }}>
                      {loadingFullPost ? (
                        <Skeleton active paragraph={{ rows: 8 }} />
                      ) : fullPost && fullPost.content ? (
                        <ReactMarkdown>{fullPost.content}</ReactMarkdown>
                      ) : (
                        <ReactMarkdown>{currentPost.content || 'No content available'}</ReactMarkdown>
                      )}
                    </div>
                  </>
                )}
              </Col>

              {/* Sidebar Column */}
              <Col xs={24} lg={8} style={{ 
                borderLeft: `1px solid ${colors.cardBorder}`, 
                padding: '24px', 
                background: 'rgba(0, 51, 102, 0.9)', 
                height: '100%' 
              }}>
                <div>
                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <>
                      <Title level={4} style={{ color: colors.textPrimary, marginBottom: '16px' }}>Related Articles</Title>
                      {relatedPosts.map(relatedPost => (
                        <div key={relatedPost.id} style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => openPostModal(relatedPost)}>
                          <Text strong style={{ color: colors.textPrimary, display: 'block', marginBottom: '4px' }}>
                            {relatedPost.title}
                          </Text>
                          <div style={{ display: 'flex', alignItems: 'center', color: colors.textSecondary, fontSize: '0.875rem' }}>
                            <CalendarOutlined style={{ marginRight: '5px' }} />
                            {formatPublishedDate(relatedPost.publishedAt)}
                          </div>
                          <Divider style={{ margin: '12px 0', borderColor: colors.cardBorder }} />
                        </div>
                      ))}
                    </>
                  )}

                  {/* Subscribe Card */}
                  <Card
                    style={{ 
                      borderRadius: '12px',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                      background: 'rgba(0, 102, 153, 0.7)',
                      borderColor: colors.cardBorder,
                     
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <ReadOutlined style={{ fontSize: '2rem', color: colors.secondary, marginBottom: '16px' }} />
                      <Title level={4} style={{ color: colors.textPrimary, marginBottom: '16px' }}>
                        Enjoyed this article?
                      </Title>
                      <Paragraph style={{ marginBottom: '24px', color: colors.textSecondary }}>
                        Check out more articles in the blog section or follow me on social media for updates.
                      </Paragraph>
                      <Button 
                        type="primary"
                        style={{ 
                          background: colors.secondary, 
                          borderColor: colors.secondary, 
                          width: '100%',
                          color: colors.primary,
                          fontWeight: 500
                        }}
                        onClick={() => setModalOpen(false)}
                      >
                        Explore More Articles
                      </Button>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default BlogSection;