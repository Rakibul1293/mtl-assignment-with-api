import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Typography, message } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';

const { Title } = Typography;

const List = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/')
      .then(res => {
        console.log(res);
        setAllData(res.data);
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      })
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
	  key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
	  key: 'email'
    },
    {
      title: 'Image',
      dataIndex: 'image',
	  key: 'image'
    },
    {
      title: 'Message',
      dataIndex: 'textField',
	  key: 'textField'
    },
    {
      title: 'Choice',
      dataIndex: 'selectedVal',
	  key: 'selectedVal'
    },
	{
	  title: 'Action',
	  dataIndex: 'action',
	  key: 'action',
	  render: () => <a onClick={(e: any) => handleClickUpdate(e)}>Edit</a>
    }
  ];

  const data = [{
  }];

  allData.map((user: any) => {
    data.push({
      key: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      textField: user.textField,
      selectedVal: user.selectedVal,
	  action: 'Edit'
    })
    return data;
  });
  console.log(data);
  
  const handleClickUpdate = (e: any) => {
	console.log(e.target.closest('tr').getAttribute("data-row-key"));
	const getId = e.target.closest('tr').getAttribute("data-row-key");
	console.log(getId);
	
    history.push(`/form-update/${getId}`);
  }

  const handleClick = () => {
    history.push('/form');
  }
  
  const handleLogin = () => {
    history.push('/login-form');
  }
  
  const handleRegistration = () => {
    history.push('/registration-form');
  }

  return (
    <div>
	  <Row gutter={[40, 0]}>
        <Col span={18}>
            <Button onClick={handleRegistration} block>Registration</Button>
        </Col>
        <Col span={6}>
          <Button onClick={handleLogin} block>Login</Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Title level={2}>
            User List
          </Title>
        </Col>
        <Col span={6}>
          <Button onClick={handleClick} block>Add User</Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </div>
  );
}

export default List;