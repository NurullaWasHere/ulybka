import {FC, useState, useEffect} from 'react'
import {Card, CardBody, Image,Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'
import { Service } from '@/types'
import { axiosInstance } from '../../axios'
import { useRouter } from 'next/router'

const Services: FC = () => {

    const [services, setServices] = useState<Service[]>([])
    const [active, setActive] = useState<Number>(0)

    const router = useRouter()
   
    const fetchServices = async () => {
        try {
            await axiosInstance.get('/service/getAllService').then( (res) => {
               setServices(res.data.services)
            })
        } catch (error) {
            console.log(error)
        }
    }
    if(active === 1){
        router.push('/services/create')
    }
    useEffect(() => {
        fetchServices()
    }, [])
    const settings = [{name: "Все сервисы", image: "/user.png"}, {name: 'Создать сервис', image:"/time.png"}]
    return (
        <div className='w-4/5 bg-whte rounded-lg border-gray-300 mt-10 flex flex-row gap-6 ml-5 bg-white'>
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
            <div className='flex flex-col flex-wrap w-full h-full'>
                <h1 className='font-semibold text-2xl mt-5'> Қызмет түрлері</h1>
            <div className=' bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6 ml-5 flex-wrap'>
        {services.map( (el, index) => {
                return (
                <Card maxW='sm' key={index}>
                <CardBody>
                    <Image
                    src={String(el.service_image)}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='1'>
                    <Heading size='md'><>{el.name}</></Heading>
                    <div className='flex flex-col gap-4'>
                        <Text color='blue.600' fontSize='2xl'>
                            ${<>{el.price}</>}
                        </Text>
                        <div className='flex flex-row gap-4'>
                            <Text fontSize='2xl'>
                                БАҒАСЫ - <>{el.discount}</>%
                            </Text>
                            <Text color='red.600' fontSize='2xl'>
                                ${<>{el.price}</>}
                            </Text>
                        </div>
                    </div>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='1' className='flex flex-row gap-5'>
                    <Button variant='solid' colorScheme='blue' onClick={() => router.push(`/services/${el.id}`)}>
                        Өзгерту
                    </Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>
                )
            })}
        </div>
            </div>


        </div>
    )
}

export default Services