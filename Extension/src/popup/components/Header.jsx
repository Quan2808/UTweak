import React from 'react';
import { CardHeader, Typography, Chip } from '@material-tailwind/react';

export default function Header({ stats }) {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none bg-gradient-to-br from-red-600 to-red-400 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h5" color="white" className="font-bold">
            YouTube NonStop+
          </Typography>
          <Typography variant="small" color="white" className="opacity-80">
            Enhanced YouTube Experience
          </Typography>
        </div>
        {stats && (
          <Chip
            value={`v${stats.version}`}
            size="sm"
            variant="ghost"
            color="white"
            className="text-xs"
          />
        )}
      </div>
    </CardHeader>
  );
}