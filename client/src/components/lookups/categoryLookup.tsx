import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MakeRequest } from '../../services/apiService';

type IProp = {
  set: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  label: string;
  labelFromLookup: string;
};

type IRequest = {
  url: string;
  method: string;
  data: Object;
  needAuthorization: boolean;
};

export default function CategoryLookup({
  set,
  url,
  label,
  labelFromLookup,
}: IProp) {
  const [formattedCategory, setFormattedCategory] = useState([]);

  const [value, setValue] = React.useState<string | null>('');
  const [inputValue, setInputValue] = React.useState('');

  const handleFetchCategory = async (): Promise<void> => {
    let formatted;
    try {
      const category = await MakeRequest(url, 'get', null, true);
      console.log('category', category);

      if (category) {
        formatted = category.map((category: any) => {
          return { label: category[labelFromLookup], id: category._id };
        });
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        console.log(errorData);
        return;
      }
    }
    console.log('setFormattedCategory', formatted);
    setFormattedCategory(formatted);
    console.log('formattedCategory', formattedCategory);
  };

  useEffect(() => {
    handleFetchCategory();
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disablePortal
      id="combo-box-demo"
      options={formattedCategory}
      sx={{ width: '100% ', marginBottom: '1rem' }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
