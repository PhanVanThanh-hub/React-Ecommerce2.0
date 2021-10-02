import { ExclamationCircleOutlined, LoadingOutlined, LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Modal, Badge, Menu, Popover, Spin } from 'antd';
import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sticky } from 'react-sticky';
import { login, logout } from '../../features/Auth/AuthSlice';
import Login from '../../features/Auth/components/Login';
import { cartItemsCountSelector, cartItemsSelector } from '../../features/Cart/CartSelector';
import ListCartMini from '../../features/Cart/components/ListCartMini';
import classes from './Header.module.scss';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
HeaderComponent.propTypes = {

};

function HeaderComponent(props) {

    const cartCount = useSelector(cartItemsCountSelector)
    const listCart = useSelector(cartItemsSelector)
    const dispatch = useDispatch()
    const isLogout = window.sessionStorage.getItem("key");
    if(isLogout==null){
        localStorage.clear();
         
    }
    const loginInUser = useSelector(state => state.auth.current)
    
    const [current, setCurrent] = useState({});
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
 
    const [change,setChange] = useState(0)
    const history = useHistory();
     
    useEffect(() => {
        
        if (current.current ==="login"){
             
            if (!!loginInUser.username !== false  ){
               
                setVisible(false);
                history.push("/");
                
            }
            else{
                 
                Swal.fire({
                    icon: 'error',
                    title: 'Tài khoản hoặc mật khẩu không chính xác',
                    text: 'Vui lòng nhập lại tài khoản!',
                    
                })
            }
        }
    },[change]);

    const showModal = () => {
        setVisible(true);
    };

    const onSubmit = async (values) => {
        setConfirmLoading(true);
        try {
            const actions = login(values)  
            await dispatch(actions)
            const a=Math.random()
            setChange(a)
 
        } catch (error) {
            console.log(error)
        }
        setConfirmLoading(false);
    }
    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    const handleClick = e => {
        console.log("/:",e.key)
        setCurrent({ current: e.key });
    };

    const HandleLogout = () => {
        const actions = logout()
        dispatch(actions)
        
    }
   
    function confirmLogout() {
        const { confirm } = Modal;
        confirm({
            title: 'Bạn có muốn đăng xuất không',
            icon: <ExclamationCircleOutlined />,
            content: 'Hạy chọn đăng xuất để tiếp tục',
            okText: 'Đăng xuất',
            cancelText: 'Hủy bỏ',
            onOk() {
                HandleLogout()
              
                history.push("/");
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            },
            onCancel() { },
        });
    }

    const setVisibleLogin=()=>{ // tắt màn hình login khi chuyển sang register
        setVisible(false);
    }
    
    
    window.onunload  = function (e) {
        
        HandleLogout()
        
    };
    return (
        <div>
            <Sticky>
                {({
                    style,
                }) => (
                    <div style={{ ...style, zIndex: 1 }}>
                        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                            <Menu.Item key="homePage" className={classes.item}>
                                <Link style={{ color: "#434343", fontSize: "16px" }} to='/'>Trang chủ</Link>
                            </Menu.Item>
                            <Menu.Item key="product" className={classes.item} style={{ marginRight: "auto" }}>
                                <Link style={{ color: "#434343", fontSize: "16px" }} to='/products'>Sản phẩm</Link>
                            </Menu.Item>
                            {!isLogout && (
                                <Menu.Item key="login" icon={<LoginOutlined />} onClick={showModal} className={classes.item} style={{ fontSize: "16px" }}>
                                    Đăng nhập
                                </Menu.Item>
                            )}
                            {!!isLogout  &&   (
                                <Menu.Item key="user" className={classes.item}>
                                    <Link to='/profile'>Xin chào {loginInUser.first_name + " " + loginInUser.last_name}</Link>
                                </Menu.Item>
                            )}
                             
                            {!!isLogout && (
                                <Menu.Item key="login" icon={<LoginOutlined />} onClick={confirmLogout} className={classes.item} style={{ fontSize: "16px" }}>
                                    Đăng xuất
                                </Menu.Item>
                            )}

                            <Menu.Item key="cart" className={classes.item}>
                                <Popover
                                    placement="bottomRight"
                                    title={"Giỏ hàng"}
                                    overlayStyle={{ ...style, left: "", right: "10px", top: "6%", maxWidth: "380px" }}
                                    content={
                                        <div>
                                            <ListCartMini listCart={listCart} />
                                        </div>
                                    }
                                    trigger="click"
                                >
                                    <Badge count={cartCount} size={"small"}>
                                        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                                    </Badge>
                                </Popover>
                            </Menu.Item>
                        </Menu>
                        <Modal
                            visible={visible}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            width={600}
                            cancelText="Thoát"
                        >
                            <div style={{ padding: "50px 60px 0 60px", position: "relative" }}>
                                <Login setVisibleLogin={setVisibleLogin} onSubmit={onSubmit} />
                                {confirmLoading && <Spin style={{ position: 'absolute', top: "0", left: "0", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffffa3" }} indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}>
                                </Spin>}
                            </div>
                        </Modal>

                    </div>
                )}
            </Sticky>
        </div>
    );
}

export default HeaderComponent;