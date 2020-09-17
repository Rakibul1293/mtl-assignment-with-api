import React, { Fragment, useState, useEffect } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { Upload, Modal, Icon, message } from 'antd';
import { InboxOutlined, PlusOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const FileUploadExtrenal = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [text, setText] = useState(true);
  const [fileList, setFileList] = useState();
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState({});
  const [imgName, setImgName] = useState();
  const [imgUrl, setImgUrl] = useState();

  var file_list;
  const handleUpload = ({ fileList }) => {
	console.log('fileList', fileList);
	console.log(typeof fileList);
	console.log('fileList', fileList[0]);
	console.log(typeof fileList[0]);
	console.log('fileList', fileList[0].originFileObj);
	console.log(typeof fileList[0].originFileObj);
    console.log('fileList', { fileList });
    file_list = fileList[0];
	console.log(file_list);
	console.log(file_list.originFileObj);
  };
  
  const handleCancel = () => {
	  setPreviewVisible(false);
  };
  
  const handleText = () => {
	  setText(false);
  };
  
  const handlePreview = file => {
	  console.log(file.thumbUrl);
	  setPreviewImage(file.thumbUrl);
	  setPreviewTitle(file.name);
	  setPreviewVisible(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
	// problem solve by this link: 
	//https://stackoverflow.com/questions/54845951/react-antdesign-add-uploaded-images-to-formdata
	formData.append("file", file_list.originFileObj);
	console.log(formData);

    try {
      const res = await axios.post('http://localhost:5000/api/upload_external', formData, {
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
	<>
		{message ? <Message msg={message} /> : null}
		<form onSubmit={onSubmit}>
          <Progress percentage={uploadPercentage} />
			  {
				  /*
				  <Upload
					  listType="picture-card"
					  fileList={fileList}
					  onPreview={handlePreview}
					  onChange={handleUpload}
					  beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
				  >
					<div>
					  <PlusOutlined />
					  <div className="ant-upload-text">Upload</div>
					</div>
				  </Upload>
				  */
			  }
		  <Dragger 
			  name='file' 
			  multiple={false}
			  fileList={fileList} 
			  listType='picture-card' 
			  onPreview={handlePreview}
			  onChange={handleUpload}
			  onClick={handleText}
			  beforeUpload={() => false} 
		  >
			  <p className="ant-upload-drag-icon">
			    <InboxOutlined />
			  </p>
			  <p className="ant-upload-text">Click or drag file to this area to upload</p>
		  </Dragger>
		  
		  {setText && <p className="h5 p-3">Preview image, click on Image.</p>}
		  
		  <input
			  type='submit'
			  value='Upload'
			  className='btn btn-primary btn-block mt-4'
		   />
		   
		   {uploadedFile ? (
			   <div className='row mt-5'>
				  <div className='col-md-6 m-auto'>
					<h3 className='text-center'>{uploadedFile.fileName}</h3>	
					{
						imgUrl && <img style={{ width: '100%' }} src={`${imgUrl}`} />
					}
				  </div>
				</div>
		    ) : null}
		   
		   <Modal
			  visible={previewVisible}
			  title={previewTitle}
			  footer={null}
			  onCancel={handleCancel}
		   >
			  <img alt="example" style={{ width: '100%' }} src={previewImage} />
           </Modal>
		</form>
	</>
  );
};

export default FileUploadExtrenal;
