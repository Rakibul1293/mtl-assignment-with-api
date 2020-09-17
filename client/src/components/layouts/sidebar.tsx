import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, UploadOutlined, DatabaseOutlined, FileImageOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const SideNav = () => {
    const history = useHistory();

    const handleUserClick = () => {
        history.push('/list');
    }

    const handleUploadClickExternal = () => {
        history.push('/upload_external');
    }
	
	const handleUploadClickInternal = () => {
        history.push('/upload_internal');
    }
	
	const handleImageShow = () => {
        history.push('/show-image');
    }

    return (
        <div>
            <div style={{ height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px" }}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleUserClick}>
                    <UserOutlined />
                    <span> Users</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleUploadClickExternal}>
                    <DatabaseOutlined />
                    <span> Extra Fuctionality 1</span>
                </Menu.Item>
				<Menu.Item key="3" onClick={handleUploadClickInternal}>
                    <DatabaseOutlined />
                    <span> Extra Fuctionality 2</span>
                </Menu.Item>
				<Menu.Item key="4" onClick={handleImageShow}>
                    <FileImageOutlined />
                    <span> Extra Fuctionality 3</span>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default SideNav;
