import { Col, Row } from 'antd';
import React ,{useEffect, useState}from 'react';
import AddForm from '../components/addForm/index'
import { useDispatch } from 'react-redux';
import {postProduct} from '../addProductSlice';
import Swal from 'sweetalert2';
import sizeApi from '../../../api/sizeApi';
FormProduct.propTypes = {

};

function FormProduct(props) {
   
    const [sizes,setSizes] = useState([])


    useEffect(() => {
        ; (async () => {
            try {
                const response = await sizeApi.getAll()
                    
                setSizes(response.data)
            
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [])  

    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        console.log("values form:",values)
        try {
            console.log("valuse:",values)
            const actions = postProduct(values)
            console.log("actions",actions)
            await dispatch(actions)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã thêm sản phẩm',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            
        }
    }
     
    return (
        <div width= "600">
            <Row gutter={16} style={{justifyContent: "center"}}>
                <Col xs={{span: 24}} md={{ span: 12}}>
                    <AddForm onSubmit={onSubmit} sizes={sizes}/>
                </Col>
            </Row>
        </div>
    );
}

export default FormProduct;