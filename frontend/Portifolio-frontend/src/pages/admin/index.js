import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
  Upload,
  message,
} from 'antd';
import { PlusOutlined, LogoutOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { adminApi, clearAdminSession, getAdminUser } from '@/lib/admin-api';

const { Title, Text } = Typography;

const makeFields = (fields) => fields.map((f) => ({ required: false, type: 'text', ...f }));
const parseArray = (val) => (typeof val === 'string' ? val.split(',').map((s) => s.trim()).filter(Boolean) : val || []);

const RESOURCES = [
  { key: 'about', label: 'About', endpoint: '/about', fields: makeFields([{ name: 'fullName', required: true }, { name: 'headline', required: true }, { name: 'summary', type: 'textarea', required: true }, { name: 'biography', type: 'textarea' }, { name: 'details', type: 'textarea-array' }, { name: 'homeTagline', type: 'textarea' }, { name: 'homeDescription', type: 'textarea' }, { name: 'resumePath' }, { name: 'databases' }, { name: 'languages' }, { name: 'frameworks' }, { name: 'yearsExperience', type: 'number' }]) },
  { key: 'education', label: 'Education', endpoint: '/resume/education', fields: makeFields([{ name: 'institution', required: true }, { name: 'degree', required: true }, { name: 'fieldOfStudy', required: true }, { name: 'startDate', type: 'date', required: true }, { name: 'endDate', type: 'date' }, { name: 'description', type: 'textarea' }]) },
  { key: 'skills', label: 'Skills', endpoint: '/resume/skills', fields: makeFields([{ name: 'category', required: true }, { name: 'name', required: true }, { name: 'level', type: 'number', required: true }, { name: 'order', type: 'number' }]) },
  { key: 'experience', label: 'Experience', endpoint: '/resume/experience', fields: makeFields([{ name: 'company', required: true }, { name: 'position', required: true }, { name: 'location' }, { name: 'startDate', type: 'date', required: true }, { name: 'endDate', type: 'date' }, { name: 'description', type: 'textarea', required: true }, { name: 'technologies' }]) },
  { key: 'projects', label: 'Projects', endpoint: '/projects', fields: makeFields([{ name: 'title', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'url' }, { name: 'githubUrl' }, { name: 'imagePath' }, { name: 'technologies' }, { name: 'featured', type: 'select', options: ['true', 'false'] }, { name: 'startDate', type: 'date' }, { name: 'endDate', type: 'date' }]) },
  { key: 'certificates', label: 'Certificates', endpoint: '/resume/certificates', fields: makeFields([{ name: 'title', required: true }, { name: 'issuer', required: true }, { name: 'issueDate', type: 'date' }, { name: 'description', type: 'textarea' }, { name: 'credentialUrl' }, { name: 'imagePath' }]) },
  { key: 'blog_posts', label: 'Blog Posts', endpoint: '/blog', fields: makeFields([{ name: 'title', required: true }, { name: 'slug', required: true }, { name: 'excerpt', type: 'textarea' }, { name: 'content', type: 'textarea', required: true }, { name: 'featuredImage' }, { name: 'tags' }, { name: 'published', type: 'select', options: ['true', 'false'] }]) },
  { key: 'contact_messages', label: 'Contact Messages', endpoint: '/contact', fields: makeFields([{ name: 'name', required: true }, { name: 'email', required: true }, { name: 'subject', required: true }, { name: 'message', type: 'textarea', required: true }, { name: 'read', type: 'select', options: ['true', 'false'] }, { name: 'replied', type: 'select', options: ['true', 'false'] }]) },
  { key: 'job_proposals', label: 'Job Proposals', endpoint: '/hire/proposals', fields: makeFields([{ name: 'company', required: true }, { name: 'email', required: true }, { name: 'phone' }, { name: 'jobTitle', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'jobType', required: true }, { name: 'location' }, { name: 'salaryRange' }, { name: 'status' }, { name: 'notes', type: 'textarea' }]) },
  { key: 'users', label: 'Users', endpoint: '/auth/users', createEndpoint: '/auth/register', updateMethod: 'put', fields: makeFields([{ name: 'email', required: true }, { name: 'password' }, { name: 'fullName', required: true }, { name: 'role' }]) },
  { key: 'visitors', label: 'Visitors', endpoint: '/analytics', fields: makeFields([{ name: 'ip' }, { name: 'userAgent' }, { name: 'referrer' }, { name: 'path', required: true }, { name: 'country' }, { name: 'browser' }, { name: 'operatingSystem' }, { name: 'deviceType' }]) },
];

const ARRAY_FIELDS = new Set(['technologies', 'tags', 'databases', 'languages', 'frameworks']);
const NEWLINE_ARRAY_FIELDS = new Set(['details']);
const BOOL_FIELDS = new Set(['featured', 'published', 'read', 'replied']);

function normalizePayload(values) {
  const payload = { ...values };
  Object.keys(payload).forEach((key) => {
    if (ARRAY_FIELDS.has(key)) payload[key] = parseArray(payload[key]);
    if (NEWLINE_ARRAY_FIELDS.has(key)) payload[key] = parseArray(String(payload[key] || '').replace(/\n/g, ','));
    if (BOOL_FIELDS.has(key)) payload[key] = String(payload[key]) === 'true';
    if (payload[key] === '') payload[key] = null;
  });
  return payload;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState(RESOURCES[0].key);
  const [loading, setLoading] = useState(true);
  const [dataMap, setDataMap] = useState({});
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [form] = Form.useForm();

  const activeResource = useMemo(() => RESOURCES.find((r) => r.key === active), [active]);

  const fetchResource = async (resource) => {
    const response = await adminApi.get(resource.endpoint);
    const rows = Array.isArray(response.data) ? response.data : response.data ? [response.data] : [];
    setDataMap((prev) => ({ ...prev, [resource.key]: rows }));
  };

  const boot = async () => {
    const user = getAdminUser();
    if (!user || user.role !== 'admin') {
      router.replace('/admin/login');
      return;
    }
    setLoading(true);
    try {
      await Promise.all(RESOURCES.map((resource) => fetchResource(resource)));
    } catch (error) {
      message.error(error?.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const values = { ...row };
    Object.keys(values).forEach((k) => {
      if (ARRAY_FIELDS.has(k) && Array.isArray(values[k])) values[k] = values[k].join(', ');
      if (NEWLINE_ARRAY_FIELDS.has(k) && Array.isArray(values[k])) values[k] = values[k].join('\n');
      if (BOOL_FIELDS.has(k) && typeof values[k] === 'boolean') values[k] = values[k] ? 'true' : 'false';
    });
    form.setFieldsValue(values);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`${activeResource.endpoint}/${id}`);
      message.success('Deleted successfully');
      await fetchResource(activeResource);
    } catch (error) {
      message.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const submit = async (values) => {
    const payload = normalizePayload(values);
    setSubmitting(true);
    try {
      if (editing) {
        const method = activeResource.updateMethod || 'patch';
        await adminApi[method](`${activeResource.endpoint}/${editing.id}`, payload);
      } else {
        await adminApi.post(activeResource.createEndpoint || activeResource.endpoint, payload);
      }
      message.success('Saved successfully');
      setOpen(false);
      form.resetFields();
      await fetchResource(activeResource);
    } catch (error) {
      message.error(error?.response?.data?.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = useMemo(() => {
    const fieldCols = activeResource.fields.slice(0, 4).map((f) => ({
      title: f.name,
      dataIndex: f.name,
      key: f.name,
      render: (value) => (Array.isArray(value) ? value.join(', ') : String(value ?? '')),
    }));
    return [
      ...fieldCols,
      {
        title: 'Actions',
        key: 'actions',
        render: (_, row) => (
          <Space>
            <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(row)}>Edit</Button>
            <Popconfirm title="Delete this record?" onConfirm={() => handleDelete(row.id)}>
              <Button icon={<DeleteOutlined />} danger size="small">Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [activeResource]);

  const uploadResume = async ({ file }) => {
    setResumeUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      await adminApi.post('/about/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Resume uploaded successfully');
      await fetchResource(RESOURCES.find((r) => r.key === 'about'));
    } catch (error) {
      message.error(error?.response?.data?.message || 'Resume upload failed');
    } finally {
      setResumeUploading(false);
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}><Spin /></div>;
  }

  return (
    <div style={{ padding: 20, background: '#F5F7FA', minHeight: '100vh' }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <div>
            <Title level={3} style={{ marginBottom: 0 }}>Portfolio Admin Dashboard</Title>
            <Text type="secondary">Manage all portfolio database tables from one place</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={boot}>Refresh</Button>
            <Button icon={<LogoutOutlined />} danger onClick={() => { clearAdminSession(); router.push('/admin/login'); }}>
              Logout
            </Button>
          </Space>
        </Space>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={active} onChange={setActive} items={RESOURCES.map((resource) => ({ key: resource.key, label: resource.label }))} />
        <Space style={{ marginBottom: 12 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Create {activeResource.label.slice(0, -1) || 'Record'}</Button>
        </Space>
        <Table rowKey="id" columns={columns} dataSource={dataMap[active] || []} scroll={{ x: true }} pagination={{ pageSize: 8 }} />
        {active === 'about' && (
          <Card style={{ marginTop: 16 }} size="small" title="Resume Upload">
            <Upload customRequest={uploadResume} showUploadList={false} accept=".pdf,.doc,.docx">
              <Button icon={<UploadOutlined />} loading={resumeUploading}>
                Upload Resume
              </Button>
            </Upload>
            <Text type="secondary" style={{ marginLeft: 12 }}>
              Upload a new resume file for the Home "My Resume" button.
            </Text>
          </Card>
        )}
      </Card>

      <Modal open={open} title={`${editing ? 'Edit' : 'Create'} ${activeResource.label}`} onCancel={() => setOpen(false)} footer={null} destroyOnClose width={760}>
        <Form form={form} layout="vertical" onFinish={submit}>
          {activeResource.fields.map((field) => (
            <Form.Item key={field.name} label={field.name} name={field.name} rules={field.required ? [{ required: true, message: `${field.name} is required` }] : []}>
              {field.type === 'textarea' ? (
                <Input.TextArea rows={4} />
              ) : field.type === 'textarea-array' ? (
                <Input.TextArea rows={5} placeholder="One paragraph per line" />
              ) : field.type === 'number' ? (
                <InputNumber style={{ width: '100%' }} />
              ) : field.type === 'select' ? (
                <Select options={(field.options || []).map((v) => ({ value: v, label: v }))} />
              ) : field.type === 'date' ? (
                <Input type="date" />
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>Save</Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}
