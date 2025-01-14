import React from 'react';
import {TailSpin} from 'react-loader-spinner';

const Loader = ({height,width}) => {
  return (
    <div className='container-fluid' style={{display:'flex', justifyContent:'center',marginTop:'15%'}}>
       <TailSpin
  height={height || 80}
  width={width || 80}
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div>
   
  );
};

export default Loader;