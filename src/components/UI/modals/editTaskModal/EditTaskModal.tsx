import Image from 'next/image'
import {
  ModalContent,
  StyledBackdrop,
  StyledCloseIconWrapper,
  StyledDialogCloseButton,
  StyledModal,
  StyledModalHeader,
  StyledTypography,
} from './editTaskModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import {
  ITab,
  StyledPanel,
  StyledTab,
  StyledTabs,
} from '@/components/UI/tabs/tabs.styled'
import { TabContext } from '@mui/lab'
import { SyntheticEvent, useState } from 'react'
import SubtaskSection from './_tabContent/subtaskSection/SubtaskSection'
import InformationSection from './_tabContent/informationSection'
import NotesSection from './_tabContent/notesSection/NotesSection'
import { ITaskData } from '@/data/api/api.types'
import { useGetSubTasksById, useGetTaskById } from '@/data/hooks/task'
import { ISubTask } from './editTaskModal.types'
import CloseIcon from '@/ui/icons/CloseIcon'

interface IEditTaskModalProps {
  open: boolean
  handleClose: () => void
  title: string
  id: string
  onSuccess?: () => void
}

const EditTaskModal = ({
  open,
  handleClose,
  title,
  id,
  onSuccess
}: IEditTaskModalProps) => {
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const { data: taskData, isLoading: isLoadingTaskData } = useGetTaskById(id)
  const { data: subtaskData, isLoading: isLoadingSubtaskData } =
    useGetSubTasksById(id)
  const tabs: ITab[] = [
    {
      label: 'Details',
      value: '1',
      tabContent: <InformationSection taskData={taskData as ITaskData} onSuccess={onSuccess} />,
    },
    {
      label: 'Sub-tasks',
      value: '2',
      tabContent: (
        <SubtaskSection
          taskData={taskData as ITaskData}
          subtaskData={subtaskData as ISubTask[]}
        />
      ),
    },
    {
      label: 'Notes',
      value: '3',
      tabContent: <NotesSection taskData={taskData as ITaskData} />,
    },
  ]

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>
        <StyledModalHeader>
          <StyledTypography>{title}</StyledTypography>
          <StyledDialogCloseButton onClick={handleClose}>
            <CloseIcon />
          </StyledDialogCloseButton>
        </StyledModalHeader>
        <TabContext value={value}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label='lab API tabs example'
            sx={{ mb: '12px' }}
          >
            {tabs.map((tab) => (
              <StyledTab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </StyledTabs>
          {tabs.map((tab) => (
            <StyledPanel key={tab.value} value={tab.value}>
              {tab.tabContent}
            </StyledPanel>
          ))}
        </TabContext>
      </ModalContent>
    </StyledModal>
  )
}

export default EditTaskModal
