import { Button, Input, InputNumber, Radio } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePickerAntd from '~/components/DatePicker/DatePickerAntd.jsx';
import LoadingState from '~/components/LoadingState/LoadingState';
import { StoreContext } from '~/context/storeContext/StoreContext';
import { fetchCurrentUser } from '~/redux/user/userAction';
import userAPI from '~/services/userProfileApi';

const UserDetail = () => {
  useEffect(() => {});
  const { currentUser } = useSelector(state => state.user);
  const { loading, setLoading, setContextError, dispatch } = useContext(StoreContext);
  const [firstNameValue, setFirstNameValue] = useState(currentUser.firstName || '');
  const [lastNameValue, setlastNameValue] = useState(currentUser.lastName || '');
  const [phoneNumberValue, setphoneNumberValue] = useState(currentUser.phoneNumber || '');
  const [genderValue, setGenderValue] = useState(currentUser.gender || '');
  const [dayOfBirthValue, setDayOfBirthValue] = useState(currentUser.dayOfBirth || '24/11/2023');
  const [ageValue, setAgeValue] = useState(currentUser.age || 13);
  const [accountTypeValue, setAccountTypeValue] = useState(currentUser.accountType || '');
  const onHandleChangeFirstName = async e => {
    setFirstNameValue(e.target.value);
  };
  const onHandleChangeLastName = e => {
    setlastNameValue(e.target.value);
  };
  const onHandleChangePhoneNumber = e => {
    setphoneNumberValue(e.target.value);
  };

  const onHanleChangeGenderValue = e => {
    setGenderValue(e.target.value);
  };

  const onHandleChangeAccountType = e => {
    setAccountTypeValue(e.target.value);
  };

  const onHandleChangeAge = value => {
    setAgeValue(value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateUser = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneNumberValue,
        gender: genderValue,
        dayOfBirth: dayOfBirthValue,
        age: ageValue,
        accountType: accountTypeValue
      };
      await userAPI.updateInfo(currentUser._id, updateUser);
      dispatch(fetchCurrentUser());
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancleSubmit = () => {
    try {
      setLoading(true);
      dispatch(fetchCurrentUser());
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='bg-white p-5 rounded relative  w-full h-auto shadow-user-profile '
    >
      <div className='bg-[#f8fafb] px-4 py-2 mb-8 shadow-user-profile rounded '>
        <div className='my-4  w-auto text-xl font-semibold'>Thông tin cơ bản</div>
        <div>
          <Input
            style={{ marginBottom: '30px' }}
            addonBefore='Họ:'
            value={firstNameValue}
            onChange={onHandleChangeFirstName}
          />
          <Input
            style={{ marginBottom: '30px' }}
            addonBefore='Tên:'
            value={lastNameValue}
            onChange={onHandleChangeLastName}
          />
          <Input
            style={{ marginBottom: '30px' }}
            addonBefore='Sđt:'
            value={phoneNumberValue}
            onChange={onHandleChangePhoneNumber}
          />
          <div className='mb-[30px]'>
            <span className='text-sm mr-5 '>Giới tính:</span>
            <Radio.Group
              onChange={onHanleChangeGenderValue}
              defaultValue={genderValue}
              value={genderValue}
            >
              <Radio value='Nam'>Nam</Radio>
              <Radio value='Nữ'>Nữ</Radio>
              <Radio value='Khác'>Khác</Radio>
            </Radio.Group>
          </div>
          <div className='text-sm flex items-center gap-40 '>
            <div>
              <span className=' mr-5 '> Ngày sinh:</span>
              <DatePickerAntd
                setDayOfBirthValue={setDayOfBirthValue}
                dayOfBirthValue={dayOfBirthValue}
              />
            </div>
            <div>
              <span> Tuổi: </span>
              <InputNumber min={13} max={150} value={ageValue} onChange={onHandleChangeAge} />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#f8fafb] mb-8 px-4 py-2 shadow-user-profile rounded '>
        <div className='my-4  w-auto text-xl font-semibold'>Loại tài khoản</div>
        <div>
          <Radio.Group
            onChange={onHandleChangeAccountType}
            defaultValue={setAccountTypeValue}
            value={accountTypeValue}
          >
            <Radio value='Học viên'>Học viên</Radio>
            <Radio value='Giảng viên'>Giảng viên</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className='text-right'>
        <Button
          style={{ marginRight: '30px' }}
          htmlType='button'
          type='primary'
          onClick={onCancleSubmit}
          danger
        >
          Hủy bỏ
        </Button>
        <Button disabled={loading ? true : false} htmlType='submit' type='primary'>
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
};

export default UserDetail;
