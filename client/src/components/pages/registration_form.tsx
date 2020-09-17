import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Input as InputField, message } from "antd";

const RegistrationForm = () => {
	const { register, handleSubmit, control, errors } = useForm();
	const history = useHistory();

	const onSubmit = (data: any) => {
		console.log(data);

		fetch("http://localhost:5000/auth/signup", {
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			message.success('Login Successfully!');
			history.push('/login-form');
		})
		.catch(err => {
			console.log(err);
			message.error(err);
		})
	}

	return (
		<div>
			<h3 className="text-muted text-center">Registration Form</h3>
			<form className="forms" onSubmit={handleSubmit(onSubmit)} >
				<input name="name" ref={register({ required: true })} placeholder="Your Name" />
				{errors.name && <span className="error">Name is required</span>}

				< input name="email" ref={register({ required: true })} placeholder="Your Email" />
				{errors.email && <span className="error">Email is required</span>}

				<input name="password" ref={register({ required: true })} type="password" placeholder="Your Password" />
				{errors.password && <span id="passErr" className="error">Password is required</span>}
				<input type="submit" />
			</form >
		</div>
	)
}

export default RegistrationForm;