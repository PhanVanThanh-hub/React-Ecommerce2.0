import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form,Row } from 'antd';
import PropTypes from 'prop-types';
import React ,{useState} from 'react';
import { useForm } from 'react-hook-form';
 
import * as yup from "yup";
import InputField from '../../../../components/Form-control/InputField';
import FormControlLabelPlacement from '../../../../components/Form-control/RadioProduct';

  

AddForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddForm(props) {
    const { onSubmit ,custom } = props
    
    const [productPrice,setProduct] = useState(0)
    const [productAmout,setProductAmout] = useState(0)

    const disabled= false

    const schema = yup.object().shape({
        price: yup.number().min(1, "Giá phải  lớn hơn hoặc bằng 1").required("Vui lòng nhập giá sản phẩm ").typeError("Xin vui lòng nhập số!"),
        amout: yup.number().min(0, "Giá phải  lớn hơn hoặc bằng 0").required("Vui lòng nhập số lượng sản phẩm(nhập 0 nếu cập nhật giá sản phẩm) ").typeError("Xin vui lòng nhập số!"),
        purchasePrice: yup.number().min(0, "Giá phải  lớn hơn hoặc bằng 0").required("Vui lòng nhập giá sản phẩm(nhập 0 nếu cập nhật giá sản phẩm) ").typeError("Xin vui lòng nhập số!"),
    });

    const form = useForm({
        defaultValue: {
           
            price:"", 
            purchasePrice:"",       
            amout:"",


        },
        resolver: yupResolver(schema),
    });

    const changeProduct= (value)=>{
        setProduct(value.price)
        setProductAmout(value.amout)
     
    }

    const handleSubmit = (values) => {
   
        if (onSubmit) {
            onSubmit(values)
        }
    }
    return (
        <div style={{ width: 700 }}>
            <Form onFinish={form.handleSubmit(handleSubmit)}>
                <div>
                    <FormControlLabelPlacement form={form}  changeProduct={changeProduct}custom={custom}   name="product"/>
                </div>
                <div >
                    <InputField form={form} disabled={disabled} name="price" label="Nhập giá bán sản phẩm" place={productPrice}/>
                </div>
                <div>
                    <InputField form={form} name="purchasePrice" label="Nhập giá mua sản phẩm" />
                </div>
                 
                <div>
                    <InputField form={form} name="amout" label="Nhập số lượng sản phẩm thêm vào" place={productAmout}/>
                </div>
                
                <Row style={{ margin: "5px 0 0 0" }}>
                    <Button style={{ width: "400px" }} htmlType="submit" type="primary" shape="round" size="large">
                        Ok
                    </Button>
                </Row>
            </Form>
        </div>
    );
}

export default AddForm;