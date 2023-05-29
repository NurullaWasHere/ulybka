import { User } from "@/types";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    CircularProgress
  } from '@chakra-ui/react'
import { axiosInstance } from "../axios";
import {useState, useEffect} from 'react'

interface forId {
    id: Number | undefined
}

interface userHistory{
    id: Number,
    description: String,
    med_date: Date
}



export const UserHistory = ({id}: forId) => {

    const [hists, sethist] = useState<userHistory[]>([])

    const fetchHistoryUser = async ( ) => {
        await axiosInstance.get(`/medHist/getAllMedicineHistoryUser/${id}`).then( (res) => {
            console.log(res.data.histories)
            sethist(res.data.histories)
        })
    }
    
     useEffect(() => {
       fetchHistoryUser()
     }, [])

    return (
        <div className="w-4/5">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Td>ID</Td>
                        <Td>Дәрігер</Td>
                        <Td>Көрінген уақыты</Td>
                    </Tr>
                </Thead>
                {hists.map( (el,index) => {
                    return  (
                        <Tbody key={index}>
                            <Tr>
                                <Td><>{el.id}</></Td>
                                <Td>{el.description}</Td>
                                <Td><>{el.med_date}</></Td>
                            </Tr>
                        </Tbody>
                    )
                })}
            </Table>
        </div>
    )

}