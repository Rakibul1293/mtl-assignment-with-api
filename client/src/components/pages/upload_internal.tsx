import React from 'react';
import FileUploadIntrenal from './file-upload/FileUploadInternal.js';

const UploadInternal = () => {
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>
				Please Upload Your Image
			</h4>

			<FileUploadIntrenal />
		</div>
	)
}

export default UploadInternal;