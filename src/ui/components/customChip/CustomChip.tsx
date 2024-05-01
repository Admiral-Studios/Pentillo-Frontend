'use client';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

export const CustomChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
})) as typeof Chip;
