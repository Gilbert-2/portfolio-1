import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { themeConfig } from '@/styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider theme={themeConfig}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;