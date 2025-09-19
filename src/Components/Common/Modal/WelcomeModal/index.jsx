import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountContext from '../../../../Context/Account';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
};

export default function Register_Success() {
const {regSuccess, setregSuccess, userRegData, setuserRegData} = React.useContext(AccountContext)

  const handleClose = () => setregSuccess(false);

  return (
    <div className='p-0 m-0 '>
      <Modal
        open={regSuccess}
        onClose={handleClose}
        disableScrollLock={true} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="header w-100 d-flex justify-content-between ">
                    <div className="heading py-3" style={{ fontWeight: 'bold', fontSize:'20px' }}>Registered Successfully</div>
                    <span className="icon-close icon-close-popup cursor-pointer" onClick={()=> {setregSuccess(false); setuserRegData([])}}></span>
                </div>
        <p style={{ fontWeight: 'bold' }}>Please save your login details:</p>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>📱 Mobile Number:</label>
          <div className="border p-2 rounded">{userRegData[0]?.MobileNo}</div>
        </div>

        <div>
          <label>🔒 Password:</label>
          <div className="border p-2 rounded">{userRegData[0]?.Password}</div>
        </div>

        <p className="mt-3 text-danger">
          🔔 Make sure to keep these credentials safe.
        </p>
        </Box>
      </Modal>
    </div>
  );
}

