import { TabPanel } from '@mui/lab'
import AddressSection from './_tabSections/addressSection'
import styled from '@emotion/styled'
import ListingSection from './_tabSections/listingSection'
import TemplateSection from './_tabSections/templateSection'
import ContactsAndAgentsSection from './_tabSections/contactsAndAgentsSection'

interface ITabsContentProps {
  handleChange: (step: string) => void
}

const TabsContent = ({ handleChange }: ITabsContentProps) => {
  return (
    <>
      <StyledTabPanel value='1'>
        <AddressSection handleNext={() => handleChange('2')} />
      </StyledTabPanel>
      <StyledTabPanel value='2'>
        <ListingSection
          handleNext={() => handleChange('3')}
          handlePrev={() => handleChange('1')}
        />
      </StyledTabPanel>
      <StyledTabPanel value='3'>
        <ContactsAndAgentsSection
          handleNext={() => handleChange('4')}
          handlePrev={() => handleChange('2')}
        />
      </StyledTabPanel>
      <StyledTabPanel value='4'>
        <TemplateSection handlePrev={() => handleChange('3')} />
      </StyledTabPanel>
    </>
  )
}

const StyledTabPanel = styled(TabPanel)`
  padding: 0;
`

export default TabsContent
