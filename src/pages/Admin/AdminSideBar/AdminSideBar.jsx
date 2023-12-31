import { Collapse } from 'antd';
const AdminSideBar = () => {
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  const items = [
    {
      key: '1',
      label: 'Người dùng',
      children: <p>{text}</p>
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>
    }
  ];
  const onChange = key => {};
  return (
    <Collapse expandIconPosition='end' items={items} defaultActiveKey={['1']} onChange={onChange} />
  );
};

export default AdminSideBar;
