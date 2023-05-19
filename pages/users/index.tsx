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
import { User } from '../../types'
import { useRouter } from 'next/router'



const Users: FC = () => {

    const [users, setUsers] = useState<User[]>()
    const router = useRouter()

    const fetchUsers = async () => {
        try {
            const users = await axiosInstance.get('/auth/users').then ( res =>{
                setUsers(res.data)
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
  <div className='mt-9 bg-white w-4/5  border-gray-400 px-4 py-4 rounded-lg'>
  <TableContainer>
  <Table variant='simple'>
    <TableCaption>Данный о пользвательях</TableCaption>
    <Thead>
      <Tr>
        <Th isNumeric>id</Th>
        <Th>ФИО клиента</Th>
        <Th>ИИН</Th>
        <Th>Номер телефона</Th>
        <Th>Почта</Th>
        <Th>Пароль</Th>
      </Tr>
    </Thead>
    <Tbody>
        {users?.map( el => {
            return (
                <Tr key={undefined}>
                <Td onClick={() => {router.push(`/users/${el.id}`)}} isNumeric className='hover:bg-gray-200 cursor-pointer transition duration-500 ease-in-out'><>{el.id}</></Td>
                <Td> {`${el.firstname} ${el.lastname}`}</Td>
                <Td isNumeric>{el.IIN}</Td>
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

export default Users