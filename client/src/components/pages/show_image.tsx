import React, { useEffect, useState } from 'react';
import './show_image.css';
import axios from 'axios';

const ShowImage = () => {
	// https://medium.com/@kavitanambissan/uploading-and-retrieving-a-file-from-gridfs-using-multer-958dfc9255e8
	// https://stackoverflow.com/questions/35053034/stuck-at-changing-binary-data-to-base64-gridfs-stream
	const [id, setId] = useState();
	const [imgUrl, setImgUrl] = useState();
	const [allData, setAllData] = useState([]);
	
	useEffect(() => {
    axios.get('http://localhost:5000/api/files')
		 .then(res => {
			console.log(res.data[0].filename);
			setAllData(res.data);
		 })
		.catch(err => {
		  console.log(err);
		})
	}, []);
	
	const onSubmit = async (e: any) => {
		e.preventDefault();
		
		console.log(e.target.search.value);
		const param_id = e.target.search.value;
		setId(param_id);
		
		axios.get(`http://localhost:5000/api/image/${param_id}`)
		  .then(res => {
			console.log(res);
			setImgUrl(res.data.imgurl);
		  })
		  .catch(err => {
			console.log(err);
		  })
	};
	
	const imgFileName:any[] = [];
	const data: any = allData;
	for (let i = 0; i < data.length; i++) {
	  imgFileName.push(data[i].filename);
	  console.log(data[i].filename);
	}
	console.log(imgFileName);
	console.log(allData);
	
	return (
		<div className='container mt-4 show-img'>
			<p className='h1 font-weight-light text-center mb-4'>List Of Image File</p>
			{
				imgFileName.map((data: any) => {
					return (
						<ul className="list-group">
							<li className="list-group-item text-center">{data}</li>
						</ul>
					)
				})
			}
			<p className='h1 font-weight-light text-center mt-5'>Search Image By Name</p>
			<form className="example mb-5"  onSubmit={(e) => onSubmit(e)}>
			  <input className='mt-3' type="text" placeholder="Search.." name="search" />
			  <button className='text-center' type="submit">Submit</button>
			</form>
			
			{
				imgUrl ? <img src={`${imgUrl}`} /> : <small className="font-weight-bold text-center">To see an image, please click on button and wait for second</small>
			}
		</div>
	)
}

export default ShowImage;
