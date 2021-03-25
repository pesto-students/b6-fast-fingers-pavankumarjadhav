import React, { useEffect, useState } from 'react';
import '../ErrorBox/ErrorBox.css'

function ErrorBox(props) {
    

   

  
    return (
        <div className="alert">
        <span className="closebtn" onClick={() => props.setError()}>&times;</span> 
        <strong>Error!</strong>{props.error}
      </div>
    )
}

export default ErrorBox

