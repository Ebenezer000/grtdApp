import styled from 'styled-components'

const SHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`

const Header = () => {
  return (
    <SHeader>
        <HeaderText>
          TELEGRAM SCRAPPER
        </HeaderText>
    </SHeader>
  )
}

const HeaderText = styled.h1`
font-family: monospace;
font-size: 30px;
color: rgb(64, 153, 255);
`

export default Header
