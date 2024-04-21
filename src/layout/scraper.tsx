import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader';

const types = ['SCRAPE MEMBERS', 'ADD MEMBERS'];

type ScrapProps = {
    phone_number: string
    authCode: string
  }

interface GroupDataProps{
    group_title: string,
    group_id: number
}

interface UserBulkData{
    username: string,
    user_id: any,
    access_hash: any,
    name: string,
    group_name: string,
    group_id: any
}


function ScrapeModal(props: ScrapProps) {

    const navigate = useNavigate()
    
    const [active, setActive] = useState(types[0]);
    const [groupIds, setGroupIds] = useState<Number>(0)
    const [ownGroupIds, setOwnGroupIds] = useState<Number>(0)
    const [allGroups, setAllGroups] = useState<GroupDataProps[]>();
    const [allUsers, setAllUsers] = useState<UserBulkData[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFetched, setIsFetched] = useState<boolean>(true)

    const [isScraping, setIsScraping] = useState<boolean>(true)
    
    const [isAdding, setIsAdding] = useState<boolean>(true)


    const addGroupId = (groupId: number) => {
        setGroupIds(groupId)
    }


    const addOwnGroupId = (groupId: number) => {
        setOwnGroupIds(groupId)
    }

    async function retrieveData() {
        try{
            setIsLoading(false)
            const groupList = await axios.post(`https://grtdinterface.onrender.com/fetch_groups`,
            { headers: { "Content-Type": "application/json" }})
            setIsFetched(false)
            setIsLoading(true)
            setAllGroups(groupList?.data)
        }catch(error: any){
            console.log(error)
            alert(error?.response?.data)
        }
        
    }

    const scrapeAllMembers = async () => {
        try {
            setIsScraping(false)
            const allUsersList = await axios.post(`https://grtdinterface.onrender.com/scrape`, { channel_id: groupIds },
            { headers: { "Content-Type": "application/json" }})
            setAllUsers(allUsersList?.data)
            setActive("ADD MEMBERS")
            setIsScraping(true)
        } catch (error) {
            alert(error)
        }
    }

    const addAllRequestedMembers = async () => {
        try {
            setIsAdding(false)
            await axios.post(`https://grtdinterface.onrender.com/add`, { channel_id: ownGroupIds, users: allUsers },
            { headers: { "Content-Type": "application/json" }})
            navigate("/add")
            setIsAdding(true)
          } catch (error) {
              alert(error)
          }
    }
    

    // Use for Multiple groups
    // const addGroupId = (groupId: number) => {
    //     if(groupIds.includes(groupId)){
    //         const x = groupIds.indexOf(groupId)
    //         groupIds.splice(x, 1)
    //         setGroupIds(groupIds)
    //     }else{
    //         groupIds.push(groupId)
    //         setGroupIds(groupIds)
    //     }
    //     props.setExternalGroupIds(groupIds)
    // }

    return (
        <Container>
            <FormLayer>
                {isFetched?
                    <>
                        <StyledHolder>
                            {isLoading? "FETCH GROUPS" : "FETCHING..."}
                        </StyledHolder>
                        <StyledHolder>
                            {isLoading?
                                <SubmitButton onClick={retrieveData}>
                                    Fetch Groups
                                </SubmitButton>
                                :
                                <Loader/>
                            }
                        </StyledHolder>
                    </>
                    :
                    <>
                        <ButtonGroup>
                            {types.map(type => (
                                <Tab
                                    key={type}
                                    active={active === type}
                                    onClick={() => setActive(type)}
                                >
                                    {type}
                                </Tab>
                            ))}
                        </ButtonGroup>
                        {active === 'SCRAPE MEMBERS' &&
                        <ScrapMembers>
                            Select Group To Fetch Members
                            {allGroups?.map((group) => (
                                <StyledInput>
                                    <label key={group.group_id}>
                                        <input 
                                            type="checkbox" 
                                            value={group.group_id}
                                            checked={groupIds === group.group_id}
                                            onChange={() => addGroupId(group.group_id)}
                                            />
                                        {group.group_title}
                                    </label>
                                </StyledInput>
                            ))}
                            <SubmitButton onClick={scrapeAllMembers}>
                                {isScraping? "SCRAP SELECTED GROUP" : "SCRAPING..."}
                            </SubmitButton>
                        </ScrapMembers>
                        }
                        {active === 'ADD MEMBERS' &&
                        <AddMembers>
                            Select Group to  Add Member
                            {allGroups?.map((group) => (
                                <StyledInput>
                                    <label key={group.group_id}>
                                        <input 
                                            type="checkbox" 
                                            value={group.group_id}
                                            checked={ownGroupIds === group.group_id}
                                            onChange={() => addOwnGroupId(group.group_id)}
                                            />
                                        {group.group_title}
                                    </label>
                                </StyledInput>
                            ))}
                            <SubmitButton onClick={addAllRequestedMembers}>
                                {isAdding? "ADD TO SELECTED GROUP" : "ADDING..."}
                            </SubmitButton>
                        </AddMembers>
                        }
                    </>
                }
            </FormLayer>
        </Container>
)}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center
`
const FormLayer = styled.div`
display: block;
background: white;
color: #158DE8;
height: auto;
width: auto;
padding: 1%;
border-radius: 4%;
font-size: 17px;
border: 2px solid;
`
const StyledHolder = styled.div`
margin: 20px 0px;
border: none;
padding: 5px 40px;
text-align: center;
border-radius: 10px
font-family: monospace;
font-size: 25px;
`

const ButtonGroup = styled.div`
display: flex;
`
const Tab = styled.button<{active: any}>`
    background-color: #EBEBEB;
    color: black;
    border:none;
    font-size: 17px;
    padding: 10px 40px;
    border-radius: 5px;

    cursor: pointer;
  ${({ active }) =>
    active &&
    `
    background-color: white;
    color: rgb(64, 153, 255);
    cursor: default;
  `}
`
const ScrapMembers = styled.div`
display: block;
justify-content: center;
align-items: center;
color: #158DE8;
margin: 5% 10px;
`
const AddMembers =styled.div`
display: block;
justify-content: center;
align-items: center;
color: #158DE8;
margin: 5% 40px;
`

const StyledInput = styled.div`
  display: block;
  margin: 20px 0px;
  border: none;
  padding: 5px 10px;
  text-align: center;
  border-radius: 10px;
`
const SubmitButton = styled.button`
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
    cursor: pointer;
  }
`

export default ScrapeModal