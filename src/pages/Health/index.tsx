import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './styles.less';
import type { HealthT } from './data';
import { Row, Col, Form, Input, Radio, Select, Button, Card, Modal, message, Result } from 'antd';
import type { Dispatch } from 'umi';
import _ from 'lodash';
import { connect } from 'umi';

type Props = {
  dispatch: Dispatch;
  provinces: any;
  districts: any;
  wards: any;
  company: any;
  dauhieu: any;
  yeutodichte: any;
};

const dataGender = [
  {
    value: 'Nam',
    text: 'Nam',
  },
  {
    value: 'Nữ',
    text: 'Nữ',
  },
  {
    value: 'Khác',
    text: 'Khác',
  },
];

const dataNation = [
  {
    value: 'Việt Nam',
    text: 'Việt Nam',
  },
  {
    value: 'Nước ngoài',
    text: 'Nước ngoài',
  },
];

const dataType = [
  {
    value: 'patient',
    text: 'Bệnh nhân/Người nhà',
  },
  {
    value: 'staff',
    text: 'Nhân viên',
  },
  {
    value: 'customer',
    text: 'Khách đến liên hệ công tác',
  },
  {
    value: 'student',
    text: 'Học sinh/Sinh viên',
  },
];

const IndexPage: FC<Props> = ({
  dispatch,
  provinces,
  districts,
  wards,
  company,
  dauhieu,
  yeutodichte,
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState('patient');
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'health/getProvince',
    });
    dispatch({
      type: 'health/getCompany',
    });
    dispatch({
      type: 'health/getDauHieu',
    });
    dispatch({
      type: 'health/getYTDT',
    });
  }, [dispatch]);

  const onFinish = (values: any) => {
    const province = provinces?.data?.find((item: any) => item.id === values.province)?.name;
    const district = districts?.data?.find((item: any) => item.id === values.district)?.name;
    const wardNew = wards?.data?.find((item: any) => item.id === values.wards)?.name;
    const typeNew = dataType?.find((item: any) => item.value === values.type)?.text;
    const signs = _.compact(
      values?.signs?.map((value: string, index: number) => {
        if (index > 0)
          return {
            id: index,
            yesOrNo: value,
          };
        return null;
      }),
    );
    const description = values?.description || '';
    const masv = values?.masv || '';
    const khoaPhong = values?.khoaPhong || '';
    const manv = values?.manv || '';
    dispatch({
      type: 'health/postForm',
      payload: {
        data: {
          ...values,
          signs,
          province,
          district,
          wards: wardNew,
          type: typeNew,
          description,
          masv,
          khoaPhong,
          manv,
        },
      },
    }).then((res: any) => {
      if (res.statusCode === 201) {
        message.success(res?.data?.message);
        setSuccess(true);
        form.resetFields();
      }
    });
  };

  const onOpenModal = (text: any) => {
    Modal.info({
      title: 'Thông tin chi tiết',
      // eslint-disable-next-line react/no-array-index-key
      content: text.split('\n').map((item: any, index: number) => <p key={index}>{item}</p>),
      onOk() {},
      width: '70%',
      okText: 'Đồng ý',
    });
  };

  const onFieldsChange = async (changedFields: any) => {
    const name = changedFields?.[0]?.name?.[0];
    const value = changedFields?.[0]?.value;
    switch (name) {
      case 'type':
        setType(value);
        break;
      case 'province':
        dispatch({
          type: 'health/getDistrict',
          payload: {
            id: value,
          },
        });
        form.setFieldsValue({
          district: null,
          wards: null,
        });
        break;
      case 'district':
        dispatch({
          type: 'health/getWard',
          payload: {
            id: form?.getFieldValue('province'),
            data: value,
          },
        });
        form.setFieldsValue({
          wards: null,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.body}>
      {!success && (
        <>
          {' '}
          <div className={styles.body__header}>
            <div className={styles.body__header__normal}>SỞ Y TẾ TP. HỒ CHÍ MINH</div>
            <div className={styles.body__header__danger}>
              KHAI BÁO THÔNG TIN SAI LÀ VI PHẠM PHÁP LUẬT VIỆT NAM VÀ CÓ THỂ XỬ LÝ HÌNH SỰ
            </div>
          </div>
          <Card className={styles.body__form}>
            <Form onFinish={onFinish} layout="vertical" form={form} onFieldsChange={onFieldsChange}>
              <Form.Item
                label="Kiểu khai báo"
                noStyle
                style={{ marginBottom: '10px' }}
                name="type"
                labelCol={{ span: 0 }}
                className={styles.ant__label__horizontal}
                initialValue="patient"
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Radio.Group>
                  {dataType?.map((item: any) => (
                    <Radio key={item.value} value={item.value}>
                      {item.text}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Nơi khai báo/công ty"
                name="companyId"
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Select placeholder="Chọn nơi khai báo/công ty">
                  {company?.data?.data?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item?.companyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input
                  placeholder="Số điện thoại/CCCD/thẻ BHYT"
                  value={form.getFieldsValue()?.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    form.setFieldsValue({
                      phone: value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              {type === 'staff' && (
                <>
                  <Form.Item
                    label="Mã nhân viên"
                    name="manv"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Input placeholder="Mã nhân viên" />
                  </Form.Item>
                  <Form.Item
                    label="Khoa/Phòng"
                    name="khoaPhong"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Input placeholder="Khoa/Phòng" />
                  </Form.Item>
                </>
              )}
              {type === 'student' && (
                <>
                  <Form.Item
                    label="Mã học sinh/sinh viên"
                    name="masv"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Input placeholder="Mã học sinh/sinh viên" />
                  </Form.Item>
                </>
              )}

              <Row gutter={20}>
                <Col span={24} md={12}>
                  <Form.Item
                    label="Năm sinh"
                    name="yearOfBirth"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Input
                      placeholder="Năm sinh"
                      value={form.getFieldsValue()?.yearOfBirth}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        form.setFieldsValue({
                          yearOfBirth: value,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Select placeholder="Giới tính">
                      {dataGender?.map((item: any) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.text}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={24} md={6}>
                  <Form.Item
                    label="Quốc tịch"
                    name="nationality"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Select placeholder="Quốc tịch">
                      {dataNation?.map((item: any) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.text}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={6}>
                  <Form.Item
                    label="Tỉnh thành"
                    name="province"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Select placeholder="Tỉnh thành">
                      {provinces?.data?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={6}>
                  <Form.Item
                    label="Quận huyện"
                    name="district"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Select
                      placeholder="Quận huyện"
                      disabled={!districts || districts?.data?.length === 0}
                    >
                      {districts?.data?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={6}>
                  <Form.Item
                    label="Phường xã"
                    name="wards"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <Select placeholder="Phường xã" disabled={!wards || wards?.data?.length === 0}>
                      {wards?.data?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <>
                <div className={styles.form__text__header}>
                  <span className={styles.form__text__star}>*</span>
                  Trong 14 ngày qua, bạn có thấy những triệu chứng nào sau đây không?
                </div>
                <div>
                  {dauhieu?.data?.data?.map((item: any) => (
                    <Form.Item
                      label={item?.name}
                      key={item.id}
                      name={['signs', item.id]}
                      labelCol={{ span: 18 }}
                      className={styles.ant__label__horizontal}
                      rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                    >
                      <Radio.Group style={{ width: '100%' }}>
                        <Row gutter={20}>
                          <Col span={12}>
                            <Radio value="yes">Có</Radio>
                          </Col>
                          <Col span={12}>
                            <Radio value="no">Không</Radio>
                          </Col>
                        </Row>
                      </Radio.Group>
                    </Form.Item>
                  ))}
                </div>
                <div className={styles.form__text__header}>
                  <span className={styles.form__text__star}>*</span>
                  Trong thời gian vừa qua
                </div>
                <div>
                  {yeutodichte?.data?.data?.map((item: any) => (
                    <Form.Item
                      label={
                        item?.name?.length > 120 ? (
                          <>
                            {`${item?.name?.slice(0, 120)}...`}
                            <span
                              style={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => onOpenModal(item?.name)}
                            >
                              Xem thêm
                            </span>
                          </>
                        ) : (
                          item?.name
                        )
                      }
                      key={item.id}
                      name={['signs', item.id]}
                      labelCol={{ span: 18 }}
                      className={styles.ant__label__horizontal}
                      rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                    >
                      <Radio.Group style={{ width: '100%' }}>
                        <Row gutter={20}>
                          <Col span={12}>
                            <Radio value="yes">Có</Radio>
                          </Col>
                          <Col span={12}>
                            <Radio value="no">Không</Radio>
                          </Col>
                        </Row>
                      </Radio.Group>
                    </Form.Item>
                  ))}
                </div>
              </>
              <Form.Item label="Thêm" name="description" noStyle>
                <Input.TextArea
                  placeholder="Vui lòng cung cấp thêm thông tin chi tiết về triệu chứng, dịch tễ, lịch sử di chuyển (nếu có)"
                  rows={2}
                />
              </Form.Item>
              <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ width: '300px' }}>
                  Gửi
                </Button>
              </div>
            </Form>
          </Card>
        </>
      )}

      {success && (
        <Result
          status="success"
          title="KHAI BÁO Y TẾ ĐIỆN TỬ THÀNH CÔNG!"
          subTitle="Cảm ơn bạn đã khai báo y tế điện tử!"
          extra={[
            <Button type="primary" key="console" onClick={() => setSuccess(false)}>
              Về trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
};
export default connect(
  ({
    health,
  }: // loading,
  {
    health: HealthT;
    // loading: {
    //   effects: Record<string, boolean>;
    // };
  }) => ({
    provinces: health.provinces,
    districts: health.districts,
    wards: health.wards,
    company: health.company,
    dauhieu: health.dauhieu,
    yeutodichte: health.yeutodichte,
  }),
)(IndexPage);
