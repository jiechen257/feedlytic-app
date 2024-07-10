import { useBoundStore } from '@/hooks/useBoundStore';
import { Button, DatePicker, Form, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const FilterModal = (props: any) => {
  const { modalOpen, closeModal } = props;
  const initFilterState = {
    readStatus: -1,
    hiddenStatus: -1,
    timeRange: undefined,
  };
  const [filterOptions, setFilterOptions] = useState<{
    readStatus: number;
    hiddenStatus: number;
    timeRange?: Date;
  }>(initFilterState);

  const currentMenuKey = useBoundStore((s) => s.currentMenuKey);
  const setFilterOptionsStore = useBoundStore((s) => s.setFilterOptions);

  useEffect(() => {
    console.log('currentMenuKey', currentMenuKey);
    setFilterOptions(initFilterState);
  }, [currentMenuKey]);

  useEffect(() => {
    console.log('filterOptions', filterOptions);
    setFilterOptionsStore({
      readStatus: filterOptions.readStatus,
      hiddenStatus: filterOptions.hiddenStatus,
      timeRange: filterOptions.timeRange,
    });
  }, [filterOptions]);

  const changeFilters = (_, values) => {
    const { readStatus, hiddenStatus } = values;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      readStatus,
      hiddenStatus,
    }));
  };
  const changeTimeRange = (v, dateString) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      timeRange: dateString.map((time) => new Date(time)),
    }));
  };
  const confirmFilterOptions = () => {
    closeModal();
    setFilterOptionsStore({
      readStatus: filterOptions.readStatus,
      hiddenStatus: filterOptions.hiddenStatus,
      timeRange: filterOptions.timeRange,
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
        <Form.Item label="时间范围">
          <RangePicker showTime onChange={changeTimeRange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FilterModal;
