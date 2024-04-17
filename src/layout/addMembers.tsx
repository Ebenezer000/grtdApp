import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import axios from 'axios'
import { FaCheckCircle } from "react-icons/fa";

type SetupProps = {
  groupList: Number
  ownGroupList: Number
}

function AddMembers(props: SetupProps) {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFinalLoading, setFinalIsLoading] = useState<boolean>(true)
  const [setError, setErrorMessage] = useState<string>("")
    const addAllRequestedMembers = async () => {
      try {
        await axios.post(`https://grtdinterface.onrender.com/scrape`, { channel_id: props.groupList },
        { headers: { "Content-Type": "application/json" }})
        setIsLoading(false)
          try {
            await axios.post(`https://grtdinterface.onrender.com/add`, { channel_id: props.ownGroupList },
            { headers: { "Content-Type": "application/json" }})
            setFinalIsLoading(false)
          } catch (error) {
              alert(error)
          }
      } catch (error) {
          alert(error)
      }
    }

    useEffect(() => {
      addAllRequestedMembers()
    }, []);

    return (
        <Container>
            <FormLayer>
              <ScrapMembers>
                {isLoading? 
                  <Loader/>
                  :
                  <>
                    {isFinalLoading?
                      <>
                        <StyledInput>
                          PROCESS 1/2 COMPLETED
                        </StyledInput>
                        <StyledInput>
                          <Loader/>
                        </StyledInput>
                      </>
                        :
                        <>
                        <StyledInput>
                          PROCESS 2/2 COMPLETED
                        </StyledInput>
                        <StyledInput>
                          <FaCheckCircle color='#158DE8' size={'70px'}/>
                        </StyledInput>
                        <StyledInput>
                          All Members have been added successfully 
                          Members with restrictions were sent the invite
                        </StyledInput>
                      </>
                    }
                  </>
                }
              </ScrapMembers>
            </FormLayer>
        </Container>
)}

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
const StyledInput = styled.div`
margin: 20px 0px;
border: none;
padding: 5px 40px;
text-align: center;
border-radius: 10px
font-family: monospace;
font-size: 25px;
`
export default AddMembers