"use client"
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Loading from "../loading/loading";
import fetchApi from "@/commons/api";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import usePusher from "@/hooks/usePusher";

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [brandsCount, setBrandsCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const token = await Cookies.get("token") as string;
        try{
            const data = await fetchApi.dashboard(token);
            setCategoriesCount(data.data.category);
            setBrandsCount(data.data.brand);
            setProductsCount(data.data.product);
            setUsersCount(data.data.user);
            setOrdersCount(data.data.order);
        }catch(err){
            toast.error("Đã có lỗi xảy ra!");
        }finally{
            setIsLoading(false);
        }
    };

    usePusher('brand', 'brand-add', fetchData);
    usePusher('brand', 'brand-delete', fetchData);
    usePusher('category', 'category-add', fetchData);
    usePusher('category', 'category-delete', fetchData);
    usePusher('product', 'product-add', fetchData);
    usePusher('product', 'product-delete', fetchData);
    usePusher('order', 'order-add-user', fetchData);
    usePusher('order', 'order-add-public', fetchData);
    usePusher('user', 'user-add', fetchData);
    usePusher('user', 'user-delete', fetchData);

    return (
        <>
            <Row xs={1} md={2} lg={4}>
                <Col className="mb-4">
                    <Card
                        bg="primary"
                        text="light"
                        className="mb-2"
                        style={{ height: '10rem' }} >
                        <Card.Body>
                            <Card.Title>BRANDS</Card.Title>
                            <Card.Text className="text-end">Count: {brandsCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-4">
                    <Card
                        bg="secondary"
                        text="light"
                        className="mb-2"
                        style={{ height: '10rem' }} >
                        <Card.Body>
                            <Card.Title>CATEGORIES</Card.Title>
                            <Card.Text className="text-end">Count: {categoriesCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-4">
                    <Card
                        bg="success"
                        text="light"
                        className="mb-2"
                        style={{ height: '10rem' }} >
                        <Card.Body>
                            <Card.Title>PRODUCTS</Card.Title>
                            <Card.Text className="text-end">Count: {productsCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-4">
                    <Card
                        bg="danger"
                        text="light"
                        className="mb-2"
                        style={{ height: '10rem' }} >
                        <Card.Body>
                            <Card.Title>USERS</Card.Title>
                            <Card.Text className="text-end">Count: {usersCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-4">
                    <Card
                        bg="warning"
                        text="light"
                        className="mb-2"
                        style={{ height: '10rem' }} >
                        <Card.Body>
                            <Card.Title>ORDERS</Card.Title>
                            <Card.Text className="text-end">Count: {ordersCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {isLoading && <Loading />}
        </>
    )
}