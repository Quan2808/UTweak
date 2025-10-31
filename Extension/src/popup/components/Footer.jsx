import React from 'react';
import { Typography } from '@material-tailwind/react';

export default function Footer() {
  return (
    <div className="px-4 py-3 text-center">
      <Typography variant="small" color="gray" className="text-xs">
        Drawing inspiration from various open-source projects.
      </Typography>
    </div>
  );
}