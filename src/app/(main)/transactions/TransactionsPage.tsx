'use client'

import Table from '@/components/table'
import { ITransactionTableWrapperProps } from './transaction.types'
import {
  TransactionProvider,
  useTransactionContext,
} from '@/app/(main)/transactions/transaction.context'
import ActionSection from '@/app/(main)/transactions/_components/actionSection'
import FilterSection from '@/app/(main)/transactions/_components/filterSection'
import ActionLeftSide from './_components/actionLeftSide'

const TransactionsPage = () => {
  return (
    <TransactionProvider>
      <TransactionTableWrapper />
    </TransactionProvider>
  )
}

const TransactionTableWrapper = ({}: ITransactionTableWrapperProps) => {
  const transactionData = useTransactionContext()

  return (
    <Table
      columns={transactionData.transactionTableData.columns}
      rows={transactionData.transactionTableData.rows}
      title='Transactions'
      actionSection={<ActionSection />}
      handleOpen={transactionData.handleOpenTransaction}
      notFoundMessage='There are no transactions to display at the moment.'
      actionsLeftSideSection={
        <ActionLeftSide
          checked={transactionData.isCheckAll}
          handleChecked={transactionData.handleCheckAll}
          selectedRows={transactionData.selectTransactions}
          handleDelete={transactionData.handleDeleteTransactions}
          isOpenDeleteModal={transactionData.isOpenDeleteModal}
          toggleDeleteModal={transactionData.toggleDeleteModal}
        />
      }
      searchValue={transactionData.search}
      setSearchValue={transactionData.setSearch}
      isLoading={transactionData.isLoading}
      pagination={{
        count: transactionData.count,
        take: transactionData.take,
        skip: transactionData.skip,
        countsRowsByOnePage: [10, 25, 50],
        setSkip: transactionData.setSkip,
        setTake: transactionData.setTake,
      }}
      filterSection={
        <FilterSection
          selectEditsParams={{
            select: transactionData.select,
            columnsForEdits:
              transactionData.transactionTableData.columnsForEdits,
            handleChange: transactionData.handleSelectChange,
          }}
          transactionCount={transactionData.count}
          onExport={transactionData.onExport}
          selectFilterParams={{
            filterData: transactionData.filterData,
            statusValue: transactionData.status,
            addressValue: transactionData.address,
            dateValue: transactionData.date,
            priceValue: transactionData.price,
            setAddressValue: transactionData.setAddress,
            setDateValue: transactionData.setDate,
            setPriceValue: transactionData.setPrice,
            setStatusValue: transactionData.setStatus,
            handleRefetch: transactionData.handleRefetch,
          }}
        />
      }
    />
  )
}

export default TransactionsPage
