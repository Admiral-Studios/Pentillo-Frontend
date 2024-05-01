import styled from '@emotion/styled'

export const StyledCardWrapper = styled.div`
  border: 1px solid #f2efeb;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`
export const StyledCardHeader = styled.div`
  display: flex;
  column-gap: 12px;

  .user-profile-image {
    width: 42px;
    height: 42px;
    border-radius: 100px;
  }
  .text-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    flex-basis: 100%;
    overflow: hidden;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    color: #424242;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    color: #aaaaaa;
    margin: 0;
  }
`
export const StyledCardBody = styled.div`
  border-top: 1px solid #e7e7e799;
  padding-top: 12px;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  li {
    min-height: 26px;
    padding: 4px 0;
    display: flex;
    column-gap: 8px;
  }
  img {
    width: 18px;
    height: 18px;
  }
  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;
  }
`
export const StyledCardFooter = styled.div`
  margin-top: auto;
`
export const StyledButtonRemove = styled.button`
  background-color: #f366661f;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  border: none;
  color: #f36666;

  min-height: 38px;
  width: 100%;

  &:disabled {
    cursor: auto;
    background-color: #aaa;
    color: #fff;
  }
`
