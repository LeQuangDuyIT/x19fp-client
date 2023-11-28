import { Button, Tag } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { headerMenu } from './_rendering';
import AntdCustomTheme from '~/theme/AntdCustomTheme';
import SubMenuWrapper from './SubMenu/SubMenuWrapper';
import Create from './SubMenu/_Create';

const Header = () => {
  return (
    <div className='h-[64px] flex justify-between items-center'>
      <div className='flex items-center gap-8 z-10'>
        <h2 className='font-bold cursor-pointer'>TEST BANK</h2>
        <div className='flex'>
          {headerMenu.map(item => {
            const SubMenuContent = item.subMenu;
            return (
              <AntdCustomTheme key={item.title} colorTextBase='white'>
                <SubMenuWrapper
                  content={item.subMenu ? <SubMenuContent /> : undefined}
                  title={item.subMenuTitle}
                >
                  <Button
                    type='text'
                    className='flex items-center font-bold border-none cursor-pointer hover:opacity-80'
                  >
                    <span>{item.title}</span>
                    {item.isHot && (
                      <Tag className='ml-1.5 mr-0 text-[#3167E3] bg-white/80 border-none'>Hot</Tag>
                    )}
                    <DownOutlined className='text-[10px]' />
                  </Button>
                </SubMenuWrapper>
              </AntdCustomTheme>
            );
          })}
        </div>
      </div>
      <AntdCustomTheme className='z-10' colorTextBase='white' colorPrimary='white'>
        <div className='flex gap-2'>
          <SubMenuWrapper content={<Create />} title='Bạn muốn tạo?' placement='bottomRight'>
            <Button icon={<PlusOutlined />} ghost className='flex items-center font-bold'>
              <span>Tạo mới</span>
              <DownOutlined className='text-[10px]' />
            </Button>
          </SubMenuWrapper>
          <Button type='text' className='border-none font-bold'>
            Đăng nhập
          </Button>
          <Button ghost className='font-bold'>
            Đăng ký
          </Button>
        </div>
      </AntdCustomTheme>
    </div>
  );
};

export default Header;
