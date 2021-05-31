/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import type { FC } from "react";
import { Row, Col, Divider, Table, Menu, Button, Dropdown, Space,Form, Input } from "antd";
import type { Dispatch } from "umi";
import { connect } from "umi";
import ModalCreate from "./ModalCreate";
import type { DeclarationT } from "../../data";
import { modalConfirmDelete } from "@/utils/utils";
import { RequestQueryBuilder, CondOperator } from "@nestjsx/crud-request";
import {
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import moment from "moment";

type Props = {
  dispatch: Dispatch;
  dataTable: any;
  loadingGet: boolean;
  loadingDelete: boolean;
};

const ListNew: FC<Props> = ({
  dispatch,
  dataTable,
  loadingDelete,
  loadingGet,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState<any>('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });

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

  useEffect(() => {
    const qb = RequestQueryBuilder.create();
    qb.sortBy({ field: "createdAt", order: "DESC" })
    .setLimit(pagination?.limit || 10)
    .setPage(pagination?.page || 1)
    if(search && search !== ''){
      qb.setOr({
        field: "fullName",
        operator: CondOperator.CONTAINS_LOW,
        value: search
      }).setOr({
        field: "phone",
        operator: CondOperator.CONTAINS_LOW,
        value: search
      })
    }
    dispatch({
      type: "declaration/getList",
      payload: {
        query: qb.query()
      }
    });
  }, [dispatch, pagination]);

  useEffect(() => {
    if (loadingGet === true) {
      setLoading(true);
    }
    if (loadingGet === false) {
      setLoading(false);
    }
  }, [loadingGet, dispatch]);

  useEffect(() => {
    if (
      loadingDelete === true
    ) {
      setLoading(true);
    }
    if (
      loadingDelete === false
    ) {
      const qb = RequestQueryBuilder.create();
      qb.sortBy({ field: "createdAt", order: "DESC" })
      .setLimit(pagination?.limit || 10)
    .setPage(pagination?.page || 1)

      dispatch({
        type: "declaration/getList",
        payload: {
          query: qb.query()
        }
      });
      setLoading(false);
    }
  }, [dispatch, loadingDelete]);


  const onDeleteOne = (id: any) => {
    const onOk = () =>
      dispatch({
        type: "declaration/deleteOne",
        payload: {
            id
        },
      });
    modalConfirmDelete(onOk);
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "STT",
      fixed: "left",
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Năm sinh",
      dataIndex: "yearOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (value: any) => moment(value).format('HH:MM DD/MM/YYYY')
    },
    {
      title: "Hành động",
      dataIndex: "",
      fixed: "right",
      width: 150,
      render: (value: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item
              key='edit'
              icon={<EyeOutlined />}
              onClick={() => { setIsVisibleModal(true); setData(record)}}
            >
             Chi tiết
            </Menu.Item>
            <Menu.Item
             key='delete'
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteOne(record?.id)}
            >
              Xóa
            </Menu.Item>
          </Menu>
        );
        return (
          <Row>
            <Col span={24}>
              <Dropdown overlay={menu}>
                <Button type="text">
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        );
      },
    },
  ];

  const onSearch = (values: any) => {
    setSearch(values.search)
    const qb = RequestQueryBuilder.create();
    qb.sortBy({ field: "createdAt", order: "DESC" })
    .setLimit(pagination?.limit || 10)
    .setPage(pagination?.page || 1)
    if(values?.search && values?.search !== ''){
      qb.setOr({
        field: "fullName",
        operator: CondOperator.CONTAINS_LOW,
        value: values.search
      }).setOr({
        field: "phone",
        operator: CondOperator.CONTAINS_LOW,
        value: values.search
      })
    }
    dispatch({
      type: "declaration/getList",
      payload: {
        query: qb.query()
      }
    });
  }

  return (
    <>
      <div className="layout--main__title">
        Danh sách báo cáo
      </div>
      <Divider />
      <Row gutter={24} className="mb--24">
        <Col md={12}></Col>
        <Col md={12}>
          <Space className="w--full justify-content--flexEnd">

            <Form initialValues={{ search: '' }} onFinish={onSearch}>
              <Form.Item name="search" className="mb--0">
                <Space size={2}>
                  <Input className="w--200" placeholder="Tìm kiếm" />
                  <Button htmlType="submit">
                    <SearchOutlined />
                  </Button>
                </Space>
              </Form.Item>
            </Form>

            <Button
              type="primary"
              onClick={() => {
                setIsVisibleModal(true)
              }}
            >
              <PlusOutlined className="mr--5" />
              Thêm mới
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        rowKey={(item: any) => item.id}
        loading={loading}
        columns={columns}
        dataSource={dataTable?.data?.data || []}
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          total: dataTable?.data?.total,
          showTotal: (value: any) => <b>Số lượng: {value}</b> ,
          onChange: (value: number, pageSize: any) => setPagination({ page: value, limit: pageSize}),
          current: pagination?.page || 1,
          pageSize: pagination?.limit || 10,
          pageSizeOptions: ["10", "20", "50", "100"],

        }}
      ></Table>

      <ModalCreate
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={() => {setIsVisibleModal(false); setData(null)} }
        data={data}
      />
    </>
  );
};

export default connect(
  ({
    declaration,
    loading,
  }: {
    declaration: DeclarationT;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dataTable: declaration.listDeclaration,
    loadingGet: loading.effects["declaration/getList"],
    loadingDelete: loading.effects["declaration/deleteOne"],
  })
)(ListNew);
