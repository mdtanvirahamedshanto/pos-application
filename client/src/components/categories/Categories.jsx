import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";

const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(values),
      });
      message.success("Kategori Başarıyla Eklendi.");
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
    console.log("Success:", values);
  };

  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      <li className="category-item">
        <span>Tümü</span>
      </li>
      <li className="category-item">
        <span>Yiyecek</span>
      </li>
      <li className="category-item">
        <span>İçecek</span>
      </li>
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl " />
      </li>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilmez!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
};

export default Categories;
