import { ConfigProvider } from 'antd';

const AntdCustomTheme = ({
  children,
  colorPrimary = '#2E6BED',
  colorTextBase = 'black',
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          algorithm: true,
          colorPrimary,
          colorTextBase,
          ...rest
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdCustomTheme;
