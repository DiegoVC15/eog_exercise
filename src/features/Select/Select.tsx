import React, { useState, FC, useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useAppSelector, useAppDispatch } from '../../stateManagement/Hooks/hooks';
import { getMetrics, getRequested } from '../../stateManagement/features/temps/temps';

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

function getStyles(name: string, metricName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      metricName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectChip: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMetrics());
    // // eslint-disable-next-line
    // console.log(metricName);
  }, [dispatch]);

  const theme = useTheme();
  const metrics = useAppSelector((state) => state.counter.allMetrics);
  const [metricName, setMetricName] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getRequested(metricName));
  }, [metricName]);
  const handleChange = (event: SelectChangeEvent<typeof metricName>) => {
    const {
      target: { value },
    } = event;
    setMetricName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="chip-label">Select...</InputLabel>
        <Select
          labelId="chip-label"
          id="multiple-chip"
          multiple
          value={metricName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {metrics.map((name:string) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, metricName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default MultipleSelectChip;
