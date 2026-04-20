import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { getAdminUser, loginAdmin, saveAdminSession } from '@/lib/admin-api';

const { Title, Text } = Typography;

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getAdminUser();
    if (user?.role === 'admin') {
      router.replace('/admin');
    }
  }, [router]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginAdmin(values.email, values.password);
      if (!data?.user || data.user.role !== 'admin') {
        message.error('Admin access is required.');
        return;
      }
      saveAdminSession(data);
      message.success('Login successful');
      router.push('/admin');
    } catch (error) {
      message.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0A192F', padding: 16 }}>
      <Card style={{ width: '100%', maxWidth: 440, borderRadius: 12 }}>
        <Title level={3} style={{ marginBottom: 8 }}>Admin Login</Title>
        <Text type="secondary">Sign in to manage portfolio content</Text>
        <Form layout="vertical" style={{ marginTop: 20 }} onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign In
          </Button>
        </Form>
      </Card>
    </div>
  );
}
