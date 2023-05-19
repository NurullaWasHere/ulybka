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
                        Склады
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Склад №1</MenuItem>
                    </MenuList>
                </Menu>
                <Button onClick={ () => router.push('/warehouse/create')}>Добавить лекарство в склад</Button>
                <Popover>
                    <PopoverTrigger>
                        <Button>Удалить лекарство из склада</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Введите айди лекарство</PopoverHeader>
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
                        <TableCaption>Лекарства в складе</TableCaption>
                        <Thead>
                        <Tr>
                            <Th isNumeric>id лекарства</Th>
                            <Th>Название</Th>
                            <Th>Серийный номер</Th>
                            <Th>Срок производства</Th>
                            <Th>Срок годности</Th>
                            <Th>В наличий</Th>
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