import type { FC} from "react";
import { useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Space,
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, useIntl } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import type { CompanyT } from "../../data";

type Props = {
  dispatch: Dispatch;
  data?: any;
  isVisibleModal: boolean;
  setIsVisibleModal: any;
};

const ModalCreateOrEdit: FC<Props> = ({
  dispatch,
  data,
  isVisibleModal,
  setIsVisibleModal,
}) => {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (data) {
      dispatch({
        type: "company/update",
        payload: {
          id: data?.id,
          data:values,
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
        }
      });
    } else {
      dispatch({
        type: "company/create",
        payload: {
          data: values,
        },
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          setIsVisibleModal(false);
        }
      });
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Modal
      title={formatMessage({
        id: !data ? "button.create" : "button.update",
      })}
      visible={isVisibleModal}
      footer={null}
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setIsVisibleModal(false);
            form.resetFields();
          }}
        />
      }
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="firstName"
          label="Họ và tên đệm"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Tên quản lý"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Tên công ty"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
            {
              type: 'email',
              message: "Không đúng định dạng Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
            {
              pattern: /^0\d{9}$/,
              message: 'Không đúng định dạng số điện thoại!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Divider />
        <Form.Item className="mb--0">
          <Space className="w--full justify-content--flexEnd">
            <Button
              onClick={() => {
                setIsVisibleModal(false);
                form.resetFields();
              }}
            >
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button htmlType="submit" type="primary">
              <FormattedMessage id={data ? "button.update" : "button.create"} />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  ({
    company,
  }: {
    company: CompanyT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    company: company.listCompany ,
  })
)(ModalCreateOrEdit);
