import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { MakeRequest } from '../../services/apiService';

type IProp = {
  set: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  label: string;
  filter: String;
  labelFromLookup: string;
};

export default function CategoryLookup({
  set,
  url,
  label,
  filter,
  labelFromLookup,
}: IProp) {
  const [visibleValue, setVisibleValue] = React.useState<string | null>('');
  const [inputValue, setInputValue] = React.useState('');
  const [formattedCategory, setFormattedCategory] = useState([]);

  useMemo(async () => {
    try {
      const category = await MakeRequest(url, 'get', null, true);
      console.log('category', category);
      if (category) {
        const formatted: any = category
          .filter((category: any) => {
            return category.category === filter;
          })
          .map((category: any) => {
            return { label: category[labelFromLookup], id: category._id };
          });
        return setFormattedCategory(formatted);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        console.log(errorData);
        return;
      }
    }
  }, []);

  return (
    <Autocomplete
      value={visibleValue}
      onChange={(event: any, newValue: any) => {
        console.log(`selected ${newValue.id}`);
        setVisibleValue(newValue);
        set(newValue.id);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue: any) => {
        setInputValue(newInputValue);
      }}
      disablePortal
      id="category"
      options={formattedCategory}
      sx={{ width: '100% ', marginBottom: '1rem' }}
      renderInput={(params) => (
        <>
          <div style={{ display: 'none' }}>
            <div>{`value: ${
              visibleValue !== null
                ? `'${JSON.stringify(visibleValue)}'`
                : 'null'
            }`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
          </div>
          <TextField {...params} label={label} />
        </>
      )}
    />
  );
}
