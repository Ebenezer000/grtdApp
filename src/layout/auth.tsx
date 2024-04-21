import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type SetupProps = {
  setExternalAuthCode: (authCode: string) => void
  phoneNumber: string
}

function AuthModal(props: SetupProps) {
  
  const navigate = useNavigate()
  const [authCode, setAuthCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const insertAuthCode = (e: any) => {
    const number = e.target.value;
    setAuthCode(number);
    props.setExternalAuthCode(number)
  }

  async function retrieveData() {
    try {
      setIsLoading(true)
      const response = await axios.post(`https://grtdinterface.onrender.com/authcomplete`, { phone: props.phoneNumber,  auth: authCode },
      { headers: { "Content-Type": "application/json" }})
      navigate("/scrape")
      setIsLoading(false)
      console.log(response)
    }catch (error: any) {
      console.log(error)
      alert(error?.response?.data)
      setIsLoading(false)
    }
        
  }

  return (
    <Container>
      <FormLayer>
        <ScrapMembers>
          <StyledInput
            value={authCode}
            placeholder="Login Code"
            onChange={event => insertAuthCode(event)}
          />
            <SubmitButton onClick={retrieveData}>
              {isLoading? "Authenticating" : "Verify Auth"}
            </SubmitButton>
        </ScrapMembers>
      </FormLayer>
    </Container>
  )
}
const Container = styled.div`
height: 100vh;
width: auto;
display: flex;
justify-content: center;
align-items: center;
`
const FormLayer = styled.div`
display: block;
color: #158DE8;
margin: 0 auto;
width: auto
height:60%;
border-radius: 4%;
`

const ScrapMembers = styled.div`
display: block;
justify-content: center;
align-items: center;
color: #158DE8;
margin: 0 auto;

`
const StyledInput = styled.input`
margin: 20px 0px;
border: none;
padding: 20px 40px;
text-align: center;
border-radius: 10px
`
const SubmitButton = styled.button`
  font-size: 15px;
  font-family: monospace;
  margin-left: 10px;
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
export default AuthModal