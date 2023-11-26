import { ConfigProvider } from 'antd';
import { forwardRef } from 'react';

const AntdCustomTheme = forwardRef(
  ({ children, className, colorPrimary = '#2E6BED', colorTextBase = 'black', ...rest }, ref) => {
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
        <div ref={ref} className={className}>
          {children}
        </div>
      </ConfigProvider>
    );
  }
);

export default AntdCustomTheme;
