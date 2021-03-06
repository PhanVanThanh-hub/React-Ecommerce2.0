import { Col, Row, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSizes from '../../../../Hooks/useData/useSizes';
import { formatPrice } from '../../../../utils/common';
import { addToCart } from '../../../Cart/CartSlice';
import AddCartForm from './AddCartForm';
import ThumnailProduct from './ThumnailProduct';


ModelDetail.propTypes = {
    project: PropTypes.object,
    service: PropTypes.string,
    category: PropTypes.string,
    handleOk:PropTypes.func,
    handleCancel: PropTypes.func,
    isModalVisible: PropTypes.bool,
};

ModelDetail.defaultProps = {
    project: {},
    service: "",
    category: "",
}

function ModelDetail(props) {
    const { Title } = Typography
    const { product, service, category, isModalVisible, handleOk, handleCancel } = props
    const dispatch = useDispatch();
    const {sizes} = useSizes()

    const addCart = (values) => {
        const actions = addToCart({
            id: product.id,
            product: product,
            ...values,
        })
        dispatch(actions)
    }

    const [options, setOptions] = useState([])

    useEffect(() => {
        const newOptions = product?.size?.length > 0 ? product?.size.map(id => {
            const size = sizes[sizes.findIndex(item => item.id === id)]
            return { name: size?.name, value: size?.id }
        }) : []
        if (newOptions.length > 0) {
            setOptions(newOptions)
        }
    }, [product, sizes])
    return (
        <div>
            <Modal
                title={product.title}
                width={800}
                style={{ top: 60 }}
                visible={isModalVisible}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <ThumnailProduct product={product} />
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Row>
                            <Text style={{ fontSize: "16px" }} type="secondary">{service}</Text>
                        </Row>
                        <Row>
                            <Title level={4}>{product.title}</Title>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: "16px" }}>{category}</Text>
                        </Row>
                        <Row style={{ margin: "10px 0 0 0" }}>
                            <Text style={{ color: "red", fontSize: "20px" }}>{formatPrice(product.price)}</Text>
                        </Row>
                        <Row style={{ margin: "10px 0" }}>
                            <Text style={{ fontSize: "14px" }} type="secondary">
                                - C??c b???n c?? th??? mua h??ng t???i Web 5Theway b???ng c??c h??nh th???c thanh to??n sau ????y:
                            </Text>
                            <Text style={{ fontSize: "14px" }} type="secondary">
                                C??ch 1: Thanh to??n khi nh???n h??ng t???i nh?? (COD ??? giao h??ng v?? thu ti???n t???n n??i)
                            </Text>
                            <Text style={{ fontSize: "14px" }} type="secondary">
                                C??ch 2: Thanh to??n chuy???n kho???ng tr?????c cho 5Theway (Tr?????c khi CHUY???N KHO???N c??c b???n vui l??ng nh???n tin tr?????c cho 5Theway qua Ins ho???c FB ????? ch??ng t??i ki???m tra v?? x??c nh???n ????n h??ng.)
                            </Text>
                        </Row>
                        <AddCartForm options={options} addCart={addCart}/>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default ModelDetail;