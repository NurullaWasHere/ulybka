import { FC, useEffect, useState } from "react";
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
import { GetServerSideProps, GetStaticProps } from "next";
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
    id:Number,
    user_id: Number,
    signDate: Date,
    phone: String,
    fullname: String
}


const Sign: FC<IResponse> = () => {

    const [sorted, setSorted] = useState<ISortedSignResponse[]>([])
    const [amount, setamount] = useState<Number>(1)



    const {page} = useRouter().query

    const fetchData = async () => { 
        const res = await axiosInstance.get(`/sign/getSignsSortedByDate/${page}`)
        const amount = await axiosInstance.get(`/sign/getAmountOfPages`)
        console.log(res.data.result)
        console.log(amount.data.amount)
        setSorted(res.data.result)
        setamount(amount.data.amount + 1)
    }


    useEffect(() => {
        fetchData()
    }, [page])



    const router = useRouter()
    console.log(sorted)
        return (
        <div className='mt-9 bg-white w-4/5 rounded-lg border-gray-400 flex flex-col py-4 px-4'>
            <div className="flex flex-row justify-around">
                <HStack spacing={4}>
                    {Array.from({length: Number(amount)}).map((size, index) => (
                        <Tag size='md' className="cursor-pointer hover:bg-teal-800 transition duration-300 ease-out" key={index} variant='solid' colorScheme='teal' onClick={ () => router.push(`/signs/${index+1}`)}>
                        {index + 1}
                        </Tag>
                    ))}
                </HStack>
                
                <Button onClick={ () =>  router.push('/signs/create')}>Жазылым ашу</Button>

            </div>
        <TableContainer>
        <Table variant='simple'>
            {sorted.map( (el, index) => {
                return (
                    <>
                    <Thead>
                    <Tr>
                        <Th>Уақыты: </Th>
                        <Th>Телефон номері: </Th>
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
                                        <Td className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-out" onClick={ () => router.push(`/users/${del.user_id}`)}>{del.user_id === null ? "Берілген уақытқа жазылым жоқ" : String(del.fullname)}</Td>
                                        <Td >{del.phone === null ? "Бос" : String(del.phone)}</Td>
                                        <Td >{new Date(String(del.signDate)).toLocaleTimeString()}</Td>
                                        <Td className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-out" onClick={ async () => {
                                            //@ts-ignore
                                            await axiosInstance.post('/sign/deleteSign',  {id: del.id})
                                            console.log(del.id)
                                        }}>Өшіру</Td>
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
        {/* <h3 className="absolute top-2.5 right-2.5 text-red-600"> Запись успешно удалена! </h3> */}
        </div>
    )
}

// export async function getStaticPaths() {
//     const res = []
//     for (let i = 1; i < 100; i++) {
//         res.push({ params: { page: `${i}` } })        
//     }

//     return {
//       paths: res,
//       fallback: false, // can also be true or 'blocking'
//     }
//   }
  

// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await axiosInstance.get(`/sign/getSignsSortedByDate/${context.params?.page}`)
//     const amount = await axiosInstance.get(`/sign/getAmountOfPages`)
//     return {
//         props: {
//             sorted: res.data.result,
//             amount: amount.data.amount + 1
//         }
//     }
// }

export default Sign 