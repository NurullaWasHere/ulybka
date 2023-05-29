import {FC} from 'react'
import {
    Table,
    Thead,
    Tbody,
    MenuItem,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Portal,
    PopoverCloseButton,
    PopoverHeader,
    PopoverFooter,
    PopoverBody,
    PopoverArrow,
    Input
  } from '@chakra-ui/react'
import {useEffect, useState, MouseEvent} from 'react'
import { axiosInstance } from '../../axios'
import { Product, User } from '../../types'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'


interface IWarehouse{
    products: Product[]
}


const Warehouse: FC<IWarehouse> = ({products}) => {

    const [Warehouse, setWarehouse] = useState<User[]>()
    const router = useRouter()  
    const [lid, setlid] = useState<Number>(0)

    // const fetchWarehouse = async () => {
    //     try {
    //         const Warehouse = await axiosInstance.get('/auth/Warehouse').then ( res =>{
    //             setWarehouse(res.data)
    //             console.log(res.data)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchWarehouse()
    // }, [])

    return (
        <div className='mt-9 bg-white w-4/5 rounded-lg border-gray-400 flex flex-row gap-4 px-4 py-4'>
            <div className='border-r rounded-lg w-1/5 p-x-4 flex flex-col gap-4'>
                <Menu>
                    <MenuButton as={Button} >
                        Қоймалар
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Қойма №1</MenuItem>
                    </MenuList>
                </Menu>
                <Button onClick={ () => router.push('/warehouse/create')}>Қоймаға дәріні қосу</Button>
                <Popover>
                    <PopoverTrigger>
                        <Button>Қоймадан дәріні алу</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Дәрі айдиін енгізіңіз</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody className='flex flex-row gap-1'>
                            <Input onChange={ (e) => {setlid(+e.target.value)}}/>
                            <Button colorScheme='blue' onClick={async () => await axiosInstance.delete('/product/deleteProduct', {data: {id: lid}})}>Удалить</Button>
                        </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </div>
            <div>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Қоймадағы дәрілер</TableCaption>
                        <Thead>
                        <Tr>
                            <Th isNumeric>id</Th>
                            <Th>Атауы</Th>
                            <Th>Сериялық номер</Th>
                            <Th>Шығарылу мерзімі</Th>
                            <Th>Жарамдылық мерзімі</Th>
                            <Th>Қазір бар</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {products.map( (el,index) => {
                                return (
                                <Tr key={index}>
                                    <Td>{Number(el.id)}</Td>
                                    <Td>{el.name}</Td>
                                    <Td>{Number(el.serial_number)}</Td>
                                    <Td>{new Date(String(el.created_date)).toLocaleDateString()}</Td>
                                    <Td>{new Date(String(el.expiration_date)).toLocaleDateString()}</Td>
                                    <Td>{Number(el.amount)}</Td>
                                </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                    </TableContainer>
                                </div>
                                <div>
            </div>
        </div>
    )
} 


export const getServerSideProps: GetServerSideProps = async () => {
    const products = await axiosInstance.get('/product/getAllProducts')
    
    return {
        props:{
            products: products.data.blogs
        }
    }
}


export default Warehouse