import React from 'react';
import { Typography, Switch } from '@material-tailwind/react';

export default function FeatureToggle({
  title,
  description,
  checked,
  onChange,
  disabled,
  color = 'red',
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 pr-3">
        <Typography variant="h6" color="blue-gray" className="font-semibold mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="text-xs leading-relaxed">
          {description}
        </Typography>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        color={color}
        disabled={disabled}
      />
    </div>
  );
}