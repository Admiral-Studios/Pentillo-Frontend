import Image from 'next/image'
import {
  ModalContent,
  StyledBackdrop,
  StyledCloseIconWrapper,
  StyledModal,
  StyledModalHeader,
  StyledTypography,
} from './addTaskModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import {
  ITab,
  StyledPanel,
  StyledTab,
  StyledTabs,
} from '@/components/UI/tabs/tabs.styled'
import { TabContext, TabPanel } from '@mui/lab'
import { SyntheticEvent, useState } from 'react'
import SubtaskSection from './_tabContent/subtaskSection/SubtaskSection'
import InformationSection from './_tabContent/informationSection'
import NotesSection from './_tabContent/notesSection/NotesSection'
import { ITaskData } from '@/data/api/api.types'
import {
  useCreateTask,
  useGetSubTasksById,
  useGetTaskById,
} from '@/data/hooks/task'
import {
  IInformationData,
  IInformationForm,
  ISubTask,
} from './addTaskModal.types'
import StepperSection from './stepperSection'
import styled from '@emotion/styled'
import { FormContextProvider } from './_context/formContext/FormContext'

interface IAddTaskModalProps {
  open: boolean
  handleClose: () => void
  title: string
  id: string
  onSuccess?: () => void
}

const AddTaskModal = ({ open, handleClose, title }: IAddTaskModalProps) => {
  const [step, setStep] = useState<string>('1')
  const [informationData, setInformationData] = useState<
    IInformationForm | undefined
  >()
  const [subtasksData, setSubtasksData] = useState<ISubTask[] | undefined>()
  const [notes, setNotes] = useState<string>()

  const handleChange = (step: string) => {
    setStep(step)
  }

  const { mutate: mutateCreateTask, isSuccess: isSuccessCreateTask } =
    useCreateTask({})

  const handleSetInformationData = (data: IInformationForm) => {
    setInformationData(data)
  }

  const handleSetSubtasksData = (data: ISubTask[]) => {
    setSubtasksData(data)
  }

  const handleCreateTask = (data: string) => {
    const createTaskData = {
      ...informationData,
      subTasks: subtasksData,
      notes: data,
    }
    setNotes(data)
    mutateCreateTask(createTaskData as IInformationData)
    handleClose()
    setStep('1')
    setSubtasksData(undefined)
    setInformationData(undefined)
    setNotes('')
  }
  const handleNotes = (data: string) => {
    setNotes(data)
  }

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>
        <StyledModalHeader>
          <StyledTypography>{title}</StyledTypography>
          <StyledCloseIconWrapper onClick={handleClose}>
            <Image src={closeIcon} alt='close icon' />
          </StyledCloseIconWrapper>
        </StyledModalHeader>
        <FormContextProvider>
          <TabContext value={step}>
            <StepperSection
              step={+step}
              sxWrapperProps={{ mt: '20px', mb: '12px' }}
            />
            <StyledTabPanel value='1'>
              <InformationSection
                handleNext={() => handleChange('2')}
                handleSetInformationData={handleSetInformationData}
                informationData={informationData as IInformationData}
              />
            </StyledTabPanel>
            <StyledTabPanel value='2'>
              <SubtaskSection
                handleNext={() => handleChange('3')}
                handleSetSubtasksData={handleSetSubtasksData}
                handlePrev={() => handleChange('1')}
                subtasksData={subtasksData as ISubTask[]}
              />
            </StyledTabPanel>
            <StyledTabPanel value='3'>
              <NotesSection
                handlePrev={() => handleChange('2')}
                handleCreateTask={handleCreateTask}
                notesData={notes as string}
                handleNotes={handleNotes}
              />
            </StyledTabPanel>
          </TabContext>
        </FormContextProvider>
      </ModalContent>
    </StyledModal>
  )
}

const StyledTabPanel = styled(TabPanel)`
  padding: 0;
`

export default AddTaskModal
