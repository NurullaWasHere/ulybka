import { FC, useEffect, useState } from "react"
import {Menu,MenuButton, MenuList, MenuItem, Button, MenuGroup, MenuDivider  } from '@chakra-ui/react'
import { employer } from "@/types"
import { axiosInstance } from "../axios"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

export const RightBar: FC = () => {

    const [id, setId] = useState<Number>(0)
    const [employer, setEmployer] = useState<employer>()
    const router = useRouter()

    const fetchEmployer = async () => {
        await axiosInstance.get(`/emp/getEmployer/${id}`).then( (res) => {
            setEmployer(res.data.emp)
        })
    }

    useEffect(() => {
                //@ts-ignore
        const employer = window.localStorage.getItem('emp')
        fetchEmployer()        //@ts-ignore
        setId(employer)
    }, [])
   
    const onClose = () => {
        if(typeof window !== 'undefined'){
            window.localStorage.removeItem('token')
            router.push('/login')
        }
    }
    
    return (
        <div className="mt-7 mr-7">
            <Menu>
            <MenuButton as={Button} colorScheme='pink'>
                Мой профиль
            </MenuButton>
            <MenuList>
                <MenuGroup title='Profile'>
                <MenuItem onClick={ () => router.push(`/employer/${id}`)}>Мой профиль</MenuItem>
                 <MenuItem onClick={onClose}> Выйти</MenuItem>   
                </MenuGroup>
                <MenuDivider />
            </MenuList>
            </Menu>
        </div>
    )
}

