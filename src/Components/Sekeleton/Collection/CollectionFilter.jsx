import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const CollectionFilter = () => {
  return (
    <>
        <div style={{minHeight:'180px'}} className='d-flex justify-content-between flex-column mt-5'>
             <Skeleton variant="rectangular" animation="wave" height={40} className='w-100 px-2' sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded"  animation="wave"  height={20} className='my-1 w-75'  sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'  sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'  sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'  sx={{bgcolor:'#feedc1a6'}} />
        </div>
         <div style={{minHeight:'180px'}} className='d-flex justify-content-between flex-column mt-3'>
            <Skeleton variant="rectangular" animation="wave" height={40} className='w-100 px-2' sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded"  animation="wave"  height={20} className=' w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className=' w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className='w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className=' w-75'sx={{bgcolor:'#feedc1a6'}}  />
        </div>
         <div style={{minHeight:'180px'}} className='d-flex justify-content-between flex-column mt-3'>
             <Skeleton variant="rectangular" animation="wave" height={40} className='w-100 px-2'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded"  animation="wave"  height={20} className='my-1 w-75' sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75' sx={{bgcolor:'#feedc1a6'}} />
        </div>
         <div style={{minHeight:'180px'}} className='d-flex justify-content-between flex-column mt-3'>
             <Skeleton variant="rectangular" animation="wave" height={40} className='w-100 px-2'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded"  animation="wave"  height={20} className='my-1 w-75' sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75' sx={{bgcolor:'#feedc1a6'}} />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75'sx={{bgcolor:'#feedc1a6'}}  />
            <Skeleton variant="rounded" animation="wave"  height={20} className='my-1 w-75' sx={{bgcolor:'#feedc1a6'}} />
        </div>
    </>
  )
}

export default CollectionFilter
