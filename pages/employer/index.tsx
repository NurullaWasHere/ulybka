import {FC} from 'react'
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
import {useEffect, useState, MouseEvent} from 'react'
import { axiosInstance } from '../../axios'
import { employer } from '../../types'
import { useRouter } from 'next/router'



const Employers: FC = () => {

    const [employers, setEmployers] = useState<employer[]>()
    const router = useRouter()

    const fetchEmployers = async () => {
        try {
            const Employers = await axiosInstance.get('/emp/getAllEmployers').then ( res =>{
                setEmployers(res.data.employers)
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEmployers()
    }, [])

    return (
        <div className='mt-9 bg-white w-4/5 rounded-lg border-gray-400 px-4 py-4'>
            <TableContainer>
  <Table variant='simple'>
    <TableCaption>Данный о работниках</TableCaption>
    <Thead>
      <Tr>
        <Th isNumeric>id</Th>
        <Th>ФИО работника</Th>
        <Th>Должность</Th>
        <Th>Номер телефона</Th>
        <Th>Почта</Th>
        <Th>Пароль</Th>
      </Tr>
    </Thead>
    <Tbody>
        {employers?.map( el => {
            return (
                <Tr key={undefined}>
                <Td onClick={() => {router.push(`/employer/${el.id}`)}} isNumeric className='hover:bg-gray-200 cursor-pointer transition duration-500 ease-in-out'><>{el.id}</></Td>
                <Td> {`${el.firstname} ${el.lastname}`}</Td>
                <Td isNumeric>{el.job}</Td>
                <Td>{el.phone}</Td>
                <Td>{el.email}</Td>
                <Td isNumeric>{el.password}</Td>
              </Tr>
            )
        })}
    </Tbody>
  </Table>
</TableContainer>
        </div>
    )
} 

export default Employers