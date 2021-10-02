import React ,{useState}from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';
const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      width:300
   },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function FormControlLabelPlacement(props) {
   const {  form,name,custom,changeProduct} = props
   const { formState: { }, setValue } = form
   const classes = useStyles();
   const [personName, setPersonName] = useState([]);

   

   const handleChange = (name,event) => {
   
       
      var amo=event.target.value.length;
       
      var product =event.target.value
      if (amo-1>=0){
         product=event.target.value[event.target.value.length-1]
         
      }
      setPersonName(event.target.value);
      setValue(name,product);
      changeProduct(product);
   };

   

return (
      <div>
         <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                    <>
                     <FormControl className={classes.formControl}>
                     <InputLabel id="demo-mutiple-name-label">Chọn sản phẩm</InputLabel>
                     <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={personName}
                        onChange={(e) => handleChange(field.name, e)}
                        input={<Input />}
                        MenuProps={MenuProps}
                     >
                        {custom.map((name) => (
                           <MenuItem key={name.title} value={name} >
                           {name.title}
                           </MenuItem>
                        ))}
                     </Select>
                     </FormControl>
                     </>
                )}
            />
      </div>
   );
   }

export default FormControlLabelPlacement;