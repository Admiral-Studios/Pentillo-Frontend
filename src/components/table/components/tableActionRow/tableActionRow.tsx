import { Box, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import pencilIcon from '@/assets/icons/pencil-icon.svg'
import { RemoveIcon } from '@/components/UI/icons'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { MouseEvent, Ref, useState } from 'react'
import ButtonDots from '@/components/UI/buttons/buttonDots'
import styled from '@emotion/styled'
import AddIcon from '@/components/UI/icons/AddIcon'
import downloadIcon from '@/assets/icons/download-black-icon.svg'
import ListSettings from '@/components/UI/buttons/listSettings'

interface IActionRowProps {
  modalTitle: string
  modalDescription: string
  isTask?: boolean
  isTeam?: boolean
  isOwner?: boolean
  isList?: boolean
  listEditRef?: Ref<HTMLButtonElement>
  isDownload?: boolean
  deleteHandler: () => void
  editHandler?: () => void
  handleRename?: () => void
  handleAddSubtask?: () => void
  handleDownload?: () => void
}

const TableActionRow = ({
  modalTitle,
  modalDescription,
  isTask,
  isOwner,
  isTeam,
  isList,
  listEditRef,
  isDownload,
  handleDownload,
  editHandler = () => {},
  deleteHandler,
  handleAddSubtask,
  handleRename = () => {},
}: IActionRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDeleteMember = () => {
    deleteHandler()
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box ref={listEditRef}>
        {isList ? (
          <ListSettings onClick={handleClick} />
        ) : (
          <ButtonDots
            onClick={handleClick}
            style={{
              transform: isList ? 'rotateZ(90deg)' : '',
              borderColor: open ? '#717171' : '#F2EFEB',
            }}
          />
        )}
      </Box>

      <StyledMenu
        anchorEl={anchorEl}
        isTask={isTask}
        open={open}
        onClose={(event: MouseEvent<HTMLDivElement>) => {
          event.stopPropagation()
          handleCloseMenu()
        }}
      >
        {isTask && (
          <MenuItem onClick={handleAddSubtask}>
            <StyledIconWrapper>
              <AddIcon sx={{ path: { fill: '#2B2B2B' }, fontSize: '20px' }} />
            </StyledIconWrapper>
            <StyledTypography color='#2B2B2B'>Add sub-task</StyledTypography>
          </MenuItem>
        )}
        {isTeam && !isOwner ? (
          <MenuItem
            onClick={() => {
              handleOpen()
              handleCloseMenu()
            }}
          >
            <StyledIconWrapper>
              <RemoveIcon
                sx={{ path: { fill: '#DC362E' }, fontSize: '20px' }}
              />
            </StyledIconWrapper>
            <StyledTypography color='#DC362E'>Leave team</StyledTypography>
          </MenuItem>
        ) : (
          <>
            {isList ? (
              <MenuItem
                color='#424242'
                onClick={() => {
                  handleRename()
                  handleCloseMenu()
                }}
              >
                <StyledIconWrapper>
                  <Image src={pencilIcon} alt='pencil icon' />
                </StyledIconWrapper>
                <StyledTypography color='#2B2B2B'>Rename</StyledTypography>
              </MenuItem>
            ) : (
              <>
                {!isTeam && (
                  <MenuItem
                    color='#424242'
                    onClick={() => {
                      editHandler()
                      handleCloseMenu()
                    }}
                  >
                    <StyledIconWrapper>
                      <Image src={pencilIcon} alt='pencil icon' />
                    </StyledIconWrapper>
                    <StyledTypography color='#2B2B2B'>Edit</StyledTypography>
                  </MenuItem>
                )}
              </>
            )}
            {isDownload && (
              <>
                <MenuItem
                  color='#424242'
                  onClick={() => {
                    editHandler()
                    handleCloseMenu()
                  }}
                >
                  <StyledIconWrapper>
                    <Image src={pencilIcon} alt='pencil icon' />
                  </StyledIconWrapper>
                  <StyledTypography color='#2B2B2B'>Edit</StyledTypography>
                </MenuItem>
                <MenuItem
                  color='#424242'
                  onClick={() => {
                    if (handleDownload) handleDownload()
                  }}
                >
                  <StyledIconWrapper>
                    <Image src={downloadIcon} alt='download icon' />
                  </StyledIconWrapper>
                  <StyledTypography color='#2B2B2B'>
                    Download all
                  </StyledTypography>
                </MenuItem>
              </>
            )}
            <MenuItem
              onClick={() => {
                handleOpen()
                handleCloseMenu()
              }}
            >
              <StyledIconWrapper>
                <RemoveIcon
                  sx={{ path: { fill: '#DC362E' }, fontSize: '20px' }}
                />
              </StyledIconWrapper>
              <StyledTypography color='#DC362E'>
                {isTeam ? 'Delete team member' : 'Delete'}
              </StyledTypography>
            </MenuItem>
          </>
        )}
      </StyledMenu>
      <ModalDelete
        title={modalTitle}
        description={modalDescription}
        open={isOpen}
        handleClose={handleClose}
        handleDelete={handleDeleteMember}
        isTeamMember={isTeam && !isOwner}
      />
    </Box>
  )
}

const StyledMenu = styled(Menu)<{ isTask?: boolean }>`
  .MuiPaper-root {
    max-width: ${(props) => (props.isTask ? '150px' : 'fit-content')};
    width: 100%;
    border: 1px solid #f2efeb;
    border-radius: 8px;
    padding: 8px 0px 8px 0px;
    box-shadow:
      0 -2px 6px -2px rgba(16, 24, 40, 0.06),
      0 12px 16px -4px rgba(16, 24, 40, 0.12);
  }
  .MuiList-root {
    padding: 0;
  }
  .MuiButtonBase-root {
    display: flex;
    column-gap: 11.68px;
    align-items: center;
    &:hover {
      background-color: #fffbf699;
    }
  }

  a {
    display: contents;
  }
`

const StyledTypography = styled.p<{ color: string }>`
  margin: 0;
  color: ${({ color }) => color};

  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

export default TableActionRow
