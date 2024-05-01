import { Box, Typography } from '@mui/material'
import ButtonWithIcon from '../../buttons/buttonWithIcon'
import pencilIcon from '@/assets/icons/pencil-icon.svg'
import removeIcon from '@/assets/icons/remove-icon.svg'
import Image from 'next/image'
import { IColumn, IRow } from '@/components/table/table.types'

export const mockData: IRow[][] = [
  [
    {
      field: 'Name',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Antonio Maria Lukich
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Company',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
              span: {
                fontWeight: '600',
              },
            }}
          >
            Svarog Development
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Category',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Buyer
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Email',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            antonio1234@gmail.com
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Actions',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <ButtonWithIcon icon={<Image src={pencilIcon} alt='pencil icon' />}>
            Edit
          </ButtonWithIcon>
          <ButtonWithIcon icon={<Image src={removeIcon} alt='remove icon' />}>
            Delete
          </ButtonWithIcon>
        </Box>
      ),
    },
  ],
  [
    {
      field: 'Name',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Antonio Maria Lukich
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Company',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
              span: {
                fontWeight: '600',
              },
            }}
          >
            Svarog Development
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Category',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Buyer
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Email',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            antonio1234@gmail.com
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Actions',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <ButtonWithIcon icon={<Image src={pencilIcon} alt='pencil icon' />}>
            Edit
          </ButtonWithIcon>
          <ButtonWithIcon icon={<Image src={removeIcon} alt='remove icon' />}>
            Delete
          </ButtonWithIcon>
        </Box>
      ),
    },
  ],
  [
    {
      field: 'Name',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Antonio Maria Lukich
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Company',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
              span: {
                fontWeight: '600',
              },
            }}
          >
            Svarog Development
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Category',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            Buyer
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Email',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
            }}
          >
            antonio1234@gmail.com
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Actions',
      row: () => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <ButtonWithIcon icon={<Image src={pencilIcon} alt='pencil icon' />}>
            Edit
          </ButtonWithIcon>
          <ButtonWithIcon icon={<Image src={removeIcon} alt='remove icon' />}>
            Delete
          </ButtonWithIcon>
        </Box>
      ),
    },
  ],
]

export const mockDataHead: IColumn[] = [
  'Name',
  'Company',
  'Category',
  'Email',
  'Actions',
]
