import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form ,Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/Form-control/InputField';
import FormControlLabelPlacement from '../../../../components/Form-control/RadioSize';
import ImageUploadFiled from '../../../../components/Form-control/ImagesField';
  

AddForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddForm(props) {
   const { onSubmit ,sizes } = props

    const schema = yup.object().shape({
        title: yup.string().required("Xin vui lòng nhập tên sản phẩm"),
        price: yup.number().min(1, "Giá phải  lớn hơn hoặc bằng 1").required("Vui lòng nhập giá sản phẩm ").typeError("Xin vui lòng nhập số!"),
        category : yup.string().required("Xin vui lòng nhập tên thể loại"),
        amout: yup.number().min(1, "Số lượng sản phẩm phải  lớn hơn hoặc bằng 1").required("Vui lòng nhập số lượng sản phẩm ").typeError("Xin vui lòng nhập số!"),
        purchasePrice: yup.number().min(1, "Giá phải  lớn hơn hoặc bằng 1").required("Vui lòng nhập giá sản phẩm ").typeError("Xin vui lòng nhập số!"),
    });

    const form = useForm({
        defaultValue: {
            title: "",
            price:"", 
            purchasePrice:"",
            category: "",
            amout:"",
            images:"",


        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        console.log("form:",values)
        if (onSubmit) {
            onSubmit(values)
        }
    }

    return (
        <div style={{ width: 600 }}>
            <Form onFinish={form.handleSubmit(handleSubmit)}>
                <div>
                    <InputField form={form} name="title" label="Nhập tên sản phẩm" />
                </div>
                <div>
                    <InputField form={form} name="price" label="Nhập giá bán sản phẩm" />
                </div>
                <div>
                    <InputField form={form} name="purchasePrice" label="Nhập giá mua sản phẩm" />
                </div>
                <div>
                    <FormControlLabelPlacement form={form} custom={sizes} name="size"/>
                </div>
                <div>
                    <InputField form={form} name="category" label="Nhập thể loại sản phẩm" />
                </div>
                <div>
                    <InputField form={form} name="amout" label="Nhập số lượng sản phẩm" />
                </div>
                <div>
                    <ImageUploadFiled form={form} name="images"/>
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