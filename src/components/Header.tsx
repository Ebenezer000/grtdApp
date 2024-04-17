import styled from 'styled-components'
import * as PropTypes from 'prop-types'
import { transitions } from '../styles'

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

const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`

const SActiveChain = styled(SActiveAccount)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  & p {
    font-size: 0.8em;
    margin: 0;
    padding: 0;
  }
  & p:nth-child(2) {
    font-weight: bold;
  }
`

interface IHeaderStyle {
  connected: boolean
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  align-items: center;
`

const SDisconnect = styled.button<IHeaderStyle>`
  font-size: 15px;
  font-family: monospace;
  padding: 1.5% 20px;
  position: relative;
  line-height: 1em;
  background-color: rgb(64, 153, 255);
  color:white;
  border-radius: 32px;
  font-size: 16px;
  font-weight: 600;
  height: 48px;

  &:hover {
    transform: translateY(-1px);
    cursor: pointer
  }
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
