/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/colors',
    '@rc-component/trigger',
    '@rc-component/util',
    '@rc-component/portal',
    '@rc-component/context',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-field-form',
    'rc-input',
    'rc-trigger',
    'rc-resize-observer',
    'rc-virtual-list',
    'rc-overflow',
    'rc-motion',
    'rc-tooltip',
    'rc-dropdown',
    'rc-menu',
    'rc-table',
    'rc-tree',
    'rc-select',
    'rc-cascader',
    'rc-upload',
  ],
 
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
   
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    return config;
  },
}

module.exports = nextConfig;