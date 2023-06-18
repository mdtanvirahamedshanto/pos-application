import { useState } from "react";
import Header from "../components/header/Header";
import { Table, Card, Button, message, Popconfirm } from "antd";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, deleteProduct } from "../redux/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      with: "125px",
      render: (img) => (
        <img src={img} alt="" className="w-full h-20 object-cover" />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-gray-600">{price.toFixed(2)}₺</span>
      ),
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex items-center">
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(increase(record))}
          />
          <span className="font-bold w-6 inline-block text-center">
            {record.quantity}
          </span>
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
            onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Ürün silinsin mi?")) {
                  dispatch(decrease(record));
                  message.success("Ürün sepetten silindi.");
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }}
          />
        </div>
      ),
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => (
        <span className="text-gray-600">
          {(record.quantity * record.price).toFixed(2)}₺
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Popconfirm
          title="Silmek istediğinize emin misiniz?"
          onConfirm={() => {
            message.success("Ürün sepetten silindi.");
            dispatch(deleteProduct(record));
          }}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="link" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
