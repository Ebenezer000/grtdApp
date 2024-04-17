import React from 'react'

interface HistoryProps{
    data:any[][];
}
const MyHistoryBoard: React.FC<HistoryProps> = ({data}) => {

    return (
         <table className="table mb-0 table-borderless">
            <thead>
               <tr>
                  <th scope="col"> Full Name </th>
                  <th scope="col"> Username </th>
                  <th scope="col"> Groupname </th>
               </tr>
            </thead>
            <tbody>
                    {data.map((row,rowIndex) =>(
                        <tr key={rowIndex}>
                            {row.map((cell,cellIndex) =>(
                                <td key={cellIndex}> {cell} </td>
                            ))} 
                        </tr>
                    ))}
            </tbody>
         </table>
  );
}

export default MyHistoryBoard
