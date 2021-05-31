import type { FC} from "react";
import { useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Space,
  Select
} from "antd";
import type { Dispatch } from "umi";
import { connect, FormattedMessage, useIntl } from "umi";
import { CloseOutlined } from "@ant-design/icons";
import type { SignT } from "../../data";

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
        type: "sign/update",
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
        type: "sign/create",
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
          name="name"
          label="Câu hỏi"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input.TextArea rows={7} />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại câu hỏi"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
         <Select className='w-100'>
          <Select.Option value='yeu_to_dich_te' >Yếu tố dịch tễ</Select.Option>
          <Select.Option value='dau_hieu' >Dấu hiệu</Select.Option>
        </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: "form.formItem.required.message",
              }),
            },
          ]}
        >
          <Input.TextArea rows={3} />
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
    sign,
  }: {
    sign: SignT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    sign: sign.listSign ,
  })
)(ModalCreateOrEdit);
