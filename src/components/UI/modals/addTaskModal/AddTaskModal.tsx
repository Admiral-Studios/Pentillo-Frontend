import {
  ModalContent,
  StyledBackdrop,
  StyledDialogCloseButton,
  StyledModal,
  StyledModalHeader,
  StyledTypography,
} from './addTaskModal.styled'
import { TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import SubtaskSection from './_tabContent/subtaskSection/SubtaskSection'
import InformationSection from './_tabContent/informationSection'
import NotesSection from './_tabContent/notesSection/NotesSection'
import {
  IInformationData,
  IInformationForm,
  ISubTask,
} from './addTaskModal.types'
import StepperSection from './stepperSection'
import styled from '@emotion/styled'
import { FormContextProvider } from './_context/formContext/FormContext'
import { useList } from '@/data/hooks/list'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { TYPE } from '@/types/enum'
import CloseIcon from '@/ui/icons/CloseIcon'

interface IAddTaskModalProps {
  open: boolean
  handleClose: () => void
  title: string
  id: string
  onSuccess?: () => void
  templateId?: string
  handleAddTask: (data: IInformationData) => void
}

const AddTaskModal = ({
  open,
  handleClose,
  title,
  onSuccess,
  templateId,
  handleAddTask,
}: IAddTaskModalProps) => {
  const [step, setStep] = useState<string>('1')
  const [informationData, setInformationData] = useState<
    IInformationForm | undefined
  >()
  const [subtasksData, setSubtasksData] = useState<ISubTask[] | undefined>()
  const [notes, setNotes] = useState<string>()

  const handleChange = (step: string) => {
    setStep(step)
  }

  const listData = useList({ type: TYPE.TASKS, templateId: templateId })
  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []
  console.log(listsOptions)
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
    handleAddTask(createTaskData as IInformationData)
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
          <StyledTypography>{title || 'Task Setup'}</StyledTypography>
          <StyledDialogCloseButton onClick={handleClose}>
            <CloseIcon />
          </StyledDialogCloseButton>
        </StyledModalHeader>
        <FormContextProvider>
          <TabContext value={step}>
            <StepperSection
              step={+step}
              sxWrapperProps={{ mt: '20px', mb: '12px' }}
            />
            <StyledTabPanel value='1'>
              <InformationSection
                listsOptions={listsOptions}
                templateId={templateId as string}
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
