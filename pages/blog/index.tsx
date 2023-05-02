import { FC, useState, useEffect } from "react"
import Image from "next/image"
import {Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button} from '@chakra-ui/react'
import { axiosInstance } from "../../axios"
import { Blog } from "@/types"
import Link from "next/link"
import { useRouter } from "next/router"

const settings = [{name: "Все блоги", image: "/user.png"}, {name: 'Создать блог', image:"/time.png"}]

const Blog: FC = () => {

    const [blogs, setblogs] = useState<Blog[]>([])
    const router = useRouter()

    const fetchBlogs = async () => {
        await axiosInstance.get('/blog/getAllBlogs').then( (res) => {
            setblogs(res.data.blogs)
        })
    }

    useEffect(() => {
        fetchBlogs()
    
    }, [])
    

    const [active, setActive] = useState<Number>(0)

    if(active === 1){
        router.push('/blog/create')
    }
    return(
        <div className='w-4/5 bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6 ml-5 bg-white'>
            <div className="flex flex-col gap-5 ml-7 mt-10">
            {
                    settings.map( (el, index) => {
                        return (
                        <div key={index} onClick={ () => setActive(index)} className={"flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 py-2 px-5 rounded-lg " + (active === index ? "bg-gray-200 hover:bg-gray-200" : "null")}>
                            <Image src={el.image} width={25} height={25} alt="Иконка"></Image>
                            <p>{el.name}</p>
                        </div>
                        )
                    })
                }
            </div>
            <div className="grid grid-cols-3 gap-6">
                {blogs.map( (el,index) => {
                    return (
                        <>
                             <Card maxW='xs'>
            <CardBody>
                <Stack mt='6' spacing='1' boxSize={'xs'}>
                <Heading size='xs'>{el.name}</Heading>
                <Text>
                        {el.description.length > 50 ? el.description.substring(0, 260) +'...' : el.description}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='1'>
                <Button variant='solid' colorScheme='blue' onClick={ () => router.push(`/blog/${el.id}`)}>
                    Редактировать
                </Button>
                </ButtonGroup>
            </CardFooter>
            </Card>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Blog