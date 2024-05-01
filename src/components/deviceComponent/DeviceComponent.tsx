import { Grid, GridProps } from '@mui/material'
import Image, { StaticImageData } from 'next/image'

interface IDeviceComponentProps {
  propsWrapper?: GridProps
  image: StaticImageData
}

export const DeviceComponent = ({
  propsWrapper,
  image,
}: IDeviceComponentProps) => {
  return (
    <Grid
      item
      sm={12}
      md={6}
      sx={{
        backgroundColor: '#FFF6ED',
        paddingLeft: '0px !important',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
      }}
      {...propsWrapper}
    >
      <Image
        unoptimized
        src={image}
        style={{
          objectFit: 'cover',
          maxWidth: '100vh',
          height: '100%',
          width: '100%',
        }}
        alt='Device Image'
      />
    </Grid>
  )
}
