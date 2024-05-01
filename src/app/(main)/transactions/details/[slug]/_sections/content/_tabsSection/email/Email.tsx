import Table from '@/components/table'
import useEmailTable from './_hooks/useEmailTable'
import { StyledSectionWrapper } from '../../../../_styled'

const Email = () => {
  const emailTableData = useEmailTable()

  return (
    <div>
      <StyledSectionWrapper>
        <Table
          columns={emailTableData.columns}
          isLoading={emailTableData.isLoading}
          rows={emailTableData.rows}
          title='Emails'
        />
      </StyledSectionWrapper>
    </div>
  )
}

export default Email
