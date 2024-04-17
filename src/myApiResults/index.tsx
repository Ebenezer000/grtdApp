import { useState } from "react";
import { getAllHistory } from "./createMystore";
import { useEffect } from "react";
import MyHistoryBoard from './tableBoard';
import axios from "axios";

interface UserDataProps{
    phone_number: string
    username: string,
    user_id: number,
    access_hash: number,
    name: string,
    group_name: string,
    group_id: number
}

interface GroupDataProps{
    group_title: string,
    group_id: string
}

export const UserData: React.FC<UserDataProps> = ({phone_number}) => {

  const [allData, setAlldata] = useState<Record<number, UserDataProps>>({});
  let result: UserDataProps[] = [];

  async function retrieveData() {
      // Assuming checkForHistory returns a Promise that resolves to a boolean
      result = await getAllHistory(phone_number);
      setAlldata(result);
  }
  
  useEffect(() => {
      retrieveData();
  }, []);
                        

  const tableData: any[][] =[
  ]

  const reversedKeys = Object.keys(allData).map(Number); // Reversed array of keys
  for (const i of reversedKeys) {
      const data = allData[i];
      let rowData = [data.username, data.name , data.group_name]
      tableData.push(rowData)
  }

  return(

   <MyHistoryBoard data={tableData}/>
  )
}

export const GroupData: React.FC<GroupDataProps> = () => {
    const [allGroups, setAllGroups] = useState<Record<number, GroupDataProps>>({});
    let groupList: GroupDataProps[] = []

    async function retrieveData() {
        groupList = await axios.post(`https://grtdinterface.onrender.com/fetch_groups`);
        setAllGroups(groupList) 
    }
    
    useEffect(() => {
        retrieveData()
    }, []);

    const groupData: any[][] = []

    const allKeys = Object.keys(allGroups).map(Number);
    for (const i of allKeys) {
        const data = allGroups[i];
        let rowData = [data.group_title]
        groupData.push(rowData)
    }

    return(
        <>
        </>
    )
}