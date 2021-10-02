 
import React from 'react';

import { Controller } from 'react-hook-form';

function ImageUploadFiled(props) {
   const {  form,name} = props
   const { formState: {}, setValue } = form
 
   const handleChange = (name,event) => {
     
      console.log("event:",event.target.files[0].name);
      setValue(name,event.target.files[0].name);
   };
   return (
      <div>
         <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                    <>
                  <div>
                     <input type="file" accept = "image / *"  onChange={(e) => handleChange(field.name, e)} />
                  </div>
                  </>
                )}
         />
      </div>
   );
}

export default ImageUploadFiled;
