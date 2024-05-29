/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnsType } from 'antd/es/table';

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  addSource: (inputUrl: string) => void;
}

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    // eslint-disable-next-line react/destructuring-assignment
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    // eslint-disable-next-line react/destructuring-assignment
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const SourceModal = (props: ModalProps) => {
  const { modalOpen, closeModal, addSource } = props;

  const [form] = Form.useForm();

  const onFinish = (values: { inputUrl: string }) => {
    addSource(values.inputUrl);
    message.success(`Submit success! ${values}`);
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'ngtext Loong text Long text Long text Long text Long text',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Modal
      title="Subscriptions"
      open={modalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      width={700}
    >
      <div className="flex flex-col">
        <section className="mt-4 mb-6">
          <div className="font-bold text-black mb-2">OPML 文件</div>
          <div className="flex justify-items-start">
            <Button className="mr-1" type="primary">
              导入文件
            </Button>
            <Button className="" type="primary">
              导出文件
            </Button>
          </div>
        </section>
        <section className="mb-6">
          <div className="font-bold text-black mb-2">添加订阅源</div>
          <div>
            <Form
              form={form}
              layout="inline"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="inputUrl"
                rules={[{ required: true }, { type: 'url' }]}
              >
                <Input className="w-[300px]" placeholder="输入URL" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    添加订阅源
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </section>
        <section>
          <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              // rowKey array
              items={dataSource.map((i) => i.key)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                components={{
                  body: {
                    row: Row,
                  },
                }}
                rowKey="key"
                columns={columns}
                dataSource={dataSource}
              />
            </SortableContext>
          </DndContext>
        </section>
      </div>
    </Modal>
  );
};

export default SourceModal;
