/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
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
import { useBoundStore } from '@/hooks/useBoundStore';

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  finishSourceAdd: () => void;
}

interface DataType {
  key: string;
  name: string;
  icon: number;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Icon',
    dataIndex: 'icon',
    render: (text) => (
      <img
        src={text}
        alt="icon"
        className="po-ab w-[24px] h-[24px] mt-1 ml-1"
      />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Url',
    dataIndex: 'url',
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
  const { modalOpen, closeModal, finishSourceAdd } = props;
  const addSource = useBoundStore((state) => state.addSource);
  const menu = useBoundStore((s) => s.menu);

  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );
  useEffect(() => {
    const formData = menu.map((v) => ({
      name: v.label,
      icon: v.logo,
      url: v.key,
      key: v.key,
    }));
    setDataSource(formData as any);
  }, [menu]);

  const onFinish = async (values: { inputUrl: string }) => {
    await addSource(values.inputUrl, '');
    message.success(`Submit success! ${values}`);
    finishSourceAdd();
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

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
