import { useBoundStore } from '@/hooks/useBoundStore';
import { Button, DatePicker, Form, Modal, Radio, Select } from 'antd';
import React, { useState } from 'react';

const FilterModal = (props: any) => {
  const { modalOpen, closeModal } = props;
  const [filterOptions, setFilterOptions] = useState<{
    readStatus: number;
    hiddenStatus: number;
  }>({
    readStatus: -1,
    hiddenStatus: -1,
  });

  const setFilterOptionsStore = useBoundStore((s) => s.setFilterOptions);
  const changeFilters = (_, values) => {
    const { readStatus, hiddenStatus } = values;
    setFilterOptions({
      readStatus,
      hiddenStatus,
    });
  };
  const confirmFilterOptions = () => {
    closeModal();
    setFilterOptionsStore({
      readStatus: filterOptions.readStatus,
      hiddenStatus: filterOptions.hiddenStatus,
    });
  };
  return (
    <Modal
      title="Filter Tools"
      open={modalOpen}
      onOk={confirmFilterOptions}
      onCancel={closeModal}
      width={700}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onValuesChange={changeFilters}
      >
        <Form.Item label="已读状态" name="readStatus">
          <Radio.Group>
            <Radio.Button value={-1}>全部</Radio.Button>
            <Radio.Button value={1}>已读</Radio.Button>
            <Radio.Button value={0}>未读</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="隐藏状态" name="hiddenStatus">
          <Radio.Group>
            <Radio.Button value={-1}>全部</Radio.Button>
            <Radio.Button value={1}>未隐藏</Radio.Button>
            <Radio.Button value={0}>隐藏</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="时间范围">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FilterModal;
