import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Metric } from '../../interfaces/interfaces';

const Current: FC<Metric> = ({ metricName, value }) => (
  <Box sx={{ width: 275 }}>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          { metricName }
        </Typography>
        <Typography variant="h4" component="div">
          { value }
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default Current;
