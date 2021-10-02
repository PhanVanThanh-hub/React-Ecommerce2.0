import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../../utils/common';
import { cartItemsTotalSelector,cartItemsSelector } from '../CartSelector';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { cartData ,resetCart} from '../CartSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
CartTotal.propTypes = {

};

function CartTotal(props) {

    const dispatch = useDispatch();
    
  
     
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const total = useSelector(cartItemsTotalSelector)
    const cartItems = useSelector(cartItemsSelector)

    const loginInUser = useSelector(state => state.auth.current)
    const loginIn = !!loginInUser.username

    const location = (country,region)=>{
        if (country==="" || region===""){
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa chọn địa điểm',
                text: 'Bạn cần chọn quốc gia và tỉnh nhận hàng!',
                 
              })
        }
        else
        {
            if (total === 0){
            Swal.fire({
                icon: 'error',
                title: 'Giỏ hàng chưa có sản phẩm',
                text: 'Hãy chọn sản phẩm!',
                 
              })
            }
            else{
                const location={country:country ,region:region}
                onSubmit(cartItems,location)
            }
        }
             
           
         
    }
    const onSubmit = async (values,location) => {  
        try {
            const value ={values,location}
            const actions = cartData(value)
            await dispatch(actions)
            const actions1 = resetCart()
            await dispatch(actions1)
            window.location.reload();
            
        } catch (error) {
            
        }
    }
    return (
        <div>
            <Row style={{ borderBottom: "1px solid #333", padding: "0 0 10px 0" }}>
                <Text style={{ fontSize: "20px" }}>Cộng giỏ hàng</Text>
            </Row>
            <div style={{ borderBottom: "1px solid #333", padding: "10px 0" }}>
                <Row style={{ padding: "5px 0" }}>
                    <div style={{ margin: "0 auto 0 0" }}>
                        <Text style={{ fontSize: "16px" }}>Tạm tính</Text>
                    </div>
                    <div>
                        <Text style={{ fontSize: "16px", fontWeight: "600" }}>{formatPrice(total)}</Text>
                    </div>
                </Row>
                <Row style={{ padding: "5px 0" }}>
                    <div style={{ margin: "0 auto 0 0" }}>
                        <Text style={{ fontSize: "16px" }}>Giao hàng</Text>
                    </div>
                    <div>
                        <Text style={{ fontSize: "16px" }}>Tính phí giao hàng</Text>
                    </div>
                </Row>
                <Row style={{ padding: "5px 0" }}>
                    <div style={{ margin: "0 auto 0 0" }}>
                        <Text style={{ fontSize: "16px" }}>Phí ship hàng</Text>
                    </div>
                    <div>
                        <Text style={{ fontSize: "16px", fontWeight: "600" }}>{formatPrice(35000)}</Text>
                    </div>
                </Row>
            </div>
            <div style={{ borderBottom: "1px solid #333", padding: "10px 0" }}>
                <Row style={{ padding: "5px 0" }}>
                    <div style={{ margin: "0 auto 0 0" }}>
                        <Text style={{ fontSize: "18px", fontWeight: "600" }}>Tổng</Text>
                    </div>
                    <div>
                        <Text style={{ fontSize: "16px", fontWeight: "600" }}>{formatPrice(total + 35000)}</Text>
                    </div>
                </Row>
            </div>
            <div>
                <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)} />
                <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => setRegion(val)} />
            </div>
            {loginIn &&(
            <Row style={{ margin: "20px 0 0 0" }}>
                <Button onClick ={()=>location(country,region)} style={{ width: "400px" }} htmlType="submit" type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large">
                    Thanh toán ngay
                </Button>
            </Row>)
            }
        </div>
    );
}

export default CartTotal;