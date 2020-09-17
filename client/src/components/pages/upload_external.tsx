import React from 'react';
import FileUploadExtrenal from './file-upload/FileUploadExtrenal.js';

const UploadExternal = () => {
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>
				Please Upload Your Image
			</h4>

			<FileUploadExtrenal />
		</div>
	)
}

export default UploadExternal;