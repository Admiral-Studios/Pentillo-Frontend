import { DeviceComponent } from '@/components/deviceComponent/DeviceComponent'
import LeftSide from '../components/leftSide'
import image from '@/assets/images/onboarding/image1.webp'

const Step1 = () => {
  return (
    <>
      <LeftSide
        title='Get started now!'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        isLastStep
      />

      <DeviceComponent
        image={image}
        propsWrapper={{
          sx: {
            height: 'auto',
            alignItems: 'center',
            display: 'flex',
          },
        }}
      />
    </>
  )
}

export default Step1
