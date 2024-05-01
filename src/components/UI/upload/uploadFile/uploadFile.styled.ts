import styled from '@emotion/styled'

export const StyledUploadFileWrapper = styled.div`
  position: relative;
  border: 1px dashed #f2efeb;
  border-radius: 12px;
  margin: 16px 0;
  max-width: 420px;
  width: 100%;
  cursor: pointer;
`
export const StyledUploadFileInput = styled.input``
export const StyledUploadFileLabel = styled.span`
  position: absolute;
  top: 0;
  left: 14px;
  transform: translateY(-50%);

  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  color: #aaaaaa;
`

export const StyledIsNotFileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`
export const StyledTypographyIsNotFile = styled.p`
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 17.12px;
  text-align: center;
  color: #040404;
`
export const StyledButtonIsNotFile = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.12px;
  text-align: center;
  color: #aaaaaa;
  cursor: pointer;
`
export const StyledIsFileWrapper = styled.div`
  padding: 8px 16px;
  height: 100%;
`
export const StyledIsFileList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  padding-left: 0;
  overflow: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 100%;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff902a;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff902a;
  }
`
export const StyledIsFileListItem = styled.li`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f2efeb;
  border-radius: 12px;
  .text-wrapper {
    display: flex;
    flex-direction: column;
    h3,
    span {
      font-size: 14px;
      line-height: 17.12px;
      margin: 0;
    }

    h3 {
      font-weight: 600;
      color: #1d1d1d;
    }

    span {
      color: #aaaaaa;
      text-transform: uppercase;
    }
  }

  .image-wrapper {
    cursor: pointer;
  }
`
