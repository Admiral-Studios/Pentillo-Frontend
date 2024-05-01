import styled from '@emotion/styled'
import Box from '@mui/material/Box'

const StyledSelectEdit = styled(Box)`
  position: relative;
  .select__button {
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #f2efeb;
    padding-left: 16px;
    padding-right: 16px;
    min-height: 32px;
    max-height: 32px;
    display: flex;
    align-items: center;
    column-gap: 15.68px;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    color: #aaaaaa;
  }
  .select__popup {
    top: 0;
    right: 0;
    position: absolute;
    width: 320px;
    max-height: 552px;
    box-shadow: 10px 4px 40px 0px #e0e9f380;
    border: 1px solid #e7e7e7;
    border-radius: 16px;
    transform: translateY(40px);
    z-index: 10;
    background-color: #fff;
  }
  .select__popupBody {
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
    padding: 12px;
    list-style: none;
  }

  .item__body {
  }

  .item__input {
    margin-top: 20px;
    width: 100%;
  }
  .item__dropdownList {
    position: absolute;
  }
  .item__dropdownListItem {
  }
`
const SelectBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`
const ItemHeader = styled.div<{ isOpen?: boolean }>`
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2efeb;

  img {
    transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease-in-out;
  }
`
const ItemBody = styled('div')<{ isOpen?: boolean }>`
  overflow: hidden;
  height: auto;
  max-height: ${(props) => (props.isOpen ? '9999px' : '0px')};
  transition-property: max-height;
  transition-duration: 0.3s;
  transition-timing-function: ${(props) =>
    props.isOpen ? 'cubic-bezier(1, 0, 1, 0)' : 'cubic-bezier(0, 1, 0, 1)'};
`

const ListSelected = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-left: 0;
  list-style: none;
`

const ListItemSelected = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px 9px 16px;
  border-radius: 8px;
  background-color: #F3F5F7;

  img {
    cursor: pointer;
  }
`

export {
  ItemBody,
  ItemHeader,
  ListItemSelected,
  ListSelected,
  SelectBodyItem,
  StyledSelectEdit,
}
