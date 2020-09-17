import React, { Fragment, useState, useEffect } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const FileUploadInternal = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [imgName, setImgName] = useState();
  const [imgUrl, setImgUrl] = useState();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
	console.log(formData);

    try {
      const res = await axios.post('http://localhost:5000/api/upload_img_database', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });
	  console.log(res.data);
	  console.log(res);

      const { fileName, filePath, imgUrl } = res.data;

      setUploadedFile({ fileName, filePath });
	  setImgUrl(res.data.imgUrl);
	  setImgName(res.data.file.filename);
	  
      setMessage('File Uploaded');
    } catch (err) {
		console.log(err);
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  
  console.log(uploadedFile.fileName);
  console.log(uploadedFile.filePath);
  console.log(imgUrl);
  console.log(imgName);
  
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>	
			{
				// <img style={{ width: '100%' }} src={`${uploadedFile.filePath}/${uploadedFile.fileName}`} alt='' />
				// <img style={{ width: '100%' }} src={`http://127.0.0.1:8887/${uploadedFile.fileName}`} alt='' />
				imgUrl && <img style={{ width: '100%' }} src={`${imgUrl}`} />
			}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUploadInternal;
