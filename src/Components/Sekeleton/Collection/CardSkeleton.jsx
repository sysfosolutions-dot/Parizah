import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const CardSkeleton = () => {
  return (
 
      <div style={{minHeight:'180px'}} className='d-flex justify-content-between flex-column mt-5'>
            <Skeleton variant="rectangular" animation="wave" height={150} className='w-100 px-2' sx={{bgcolor:'#feedc1a6'}} />
      </div>

  )
}

export default CardSkeleton
