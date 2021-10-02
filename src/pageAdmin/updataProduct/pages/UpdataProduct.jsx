import { Col, Row } from 'antd';
import React ,{useEffect, useState}from 'react';
import AddForm from '../components/updataForm/index'
import { useDispatch } from 'react-redux';
import {postUpdataProduct} from '../updataProductSlice';
import Swal from 'sweetalert2';
import productApi from '../../../api/productApi';
FormProduct.propTypes = {

};

function FormProduct(props) {
   
    const [product,setProduct] = useState([])


    useEffect(() => {
        ; (async () => {
            try {
                const response = await productApi.getAll()                
                setProduct(response.data.results)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [])  

    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        console.log("values form:",values)
        try {
            const actions = postUpdataProduct(values)
            await dispatch(actions)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã cập nhật sản phẩm',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            
        }
    }
     
    return (
        <div>
            <Row gutter={16} style={{ justifyContent: "center"}}>
                <Col xs={{span: 24}} md={{ span: 12}}>
                    <AddForm onSubmit={onSubmit} custom={product}/>
                </Col>
            </Row>
        </div>
    );
}

export default FormProduct;