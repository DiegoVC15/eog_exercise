import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Metric = {
  metricName: string;
  value: number;
};

const Current: FC<Metric> = ({ metricName, value }) => (
  <Box sx={{ maxWidth: 275 }}>
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