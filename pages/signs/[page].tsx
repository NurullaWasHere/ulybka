import { FC } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Tag,
    TableContainer,
    HStack,
    Button
  } from '@chakra-ui/react'
import { GetServerSideProps } from "next";
import { axiosInstance } from "../../axios";
import { useRouter } from "next/router";

interface IResponse{
    sorted: ISortedSignResponse[],
    amount: Number
}


interface ISortedSignResponse{
    signDate: Date,
    user_ids: IUser_id[]
}

interface IUser_id {
    user_id: Number,
    signDate: Date,
    phone: String,
    fullname: String
}


const Sign: FC<IResponse> = ({sorted, amount}) => {
    const router = useRouter()
    console.log(sorted)
        return (
        <div className='mt-9 bg-white w-4/5 border-l border-gray-400 flex flex-col'>
            <div className="flex flex-row justify-around">
                <HStack spacing={4}>
                    {Array.from({length: Number(amount)}).map((size, index) => (
                        <Tag size='md' className="cursor-pointer hover:bg-teal-800 transition duration-300 ease-out" key={index} variant='solid' colorScheme='teal' onClick={ () => router.push(`/signs/${index+1}`)}>
                        {index + 1}
                        </Tag>
                    ))}
                </HStack>
                
                <Button onClick={ () =>  router.push('/signs/create')}>Открыть запись</Button>

            </div>
        <TableContainer>
        <Table variant='simple'>
            {sorted.map( (el, index) => {
                return (
                    <>
                    <Thead>
                    <Tr>
                        <Th>Дата: </Th>
                        <Th>Номер телефона: </Th>
                        <Th>{String(el.signDate)}</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {el.user_ids.sort((a, b) => {
                            if(new Date(String(a.signDate)).getHours() > new Date(String(b.signDate)).getHours()){
                                return 1
                            }
                            if(new Date(String(a.signDate)).getHours() < new Date(String(b.signDate)).getHours()){
                                return -1
                            }
                            if(new Date(String(a.signDate)).getHours() === new Date(String(b.signDate)).getHours()){
                                new Date(String(a.signDate)).getMinutes() > new Date(String(b.signDate)).getMinutes() ? 1 : -1
                            }
                            return 1
                        }).map( (del,index) => {
                            return (
                                <>
                                    <Tr>
                                        <Td className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-out" onClick={ () => router.push(`/users/${del.user_id}`)}>{del.user_id === null ? "Нет записанных клиентов" : String(del.fullname)}</Td>
                                        <Td >{del.phone === null ? "Пусто" : String(del.phone)}</Td>
                                        <Td >{new Date(String(del.signDate)).toLocaleTimeString()}</Td>
                                        <Td className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-out" onClick={ async () => {
                                            //@ts-ignore
                                            await axiosInstance.delete('/sign/deleteSign', {signDate: del.signDate})
                                        }}>Удалить</Td>
                                    </Tr>
                                </>
                            )
                        })}
                    
                    </Tbody>
                    </>
                )
            })}
        </Table>
        </TableContainer>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axiosInstance.get(`/sign/getSignsSortedByDate/${context.params?.page}`)
    const amount = await axiosInstance.get(`/sign/getAmountOfPages`)
    return {
        props: {
            sorted: res.data.result,
            amount: amount.data.amount + 1
        }
    }
}

export default Sign 