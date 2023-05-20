import { Service } from '@/types'
import {FC, useState, useEffect} from 'react'
import {axiosInstance} from '../../axios'
import { useRouter } from 'next/router'
import {Image} from '@chakra-ui/react'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { GetServerSideProps } from 'next'

const Service:FC = () => {

    const settings = [{name: "Основное", image: "/user.png"}, {name: 'Редактировать', image:"/edit.png"}]
    const [service, setservice] = useState<Service>()
    const [active, setActive] = useState<Number>(0)
    const router = useRouter()
    const {pid} = router.query
    const fetchService = async ( ) => {
        try {
            await axiosInstance.get(`/service/getService/${pid}`).then( (res) => {
                setservice(res.data.ss)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchService()
    }, [])
    

    return (
        <div className='w-4/5 bg-white border-l border-gray-300 mt-7 flex flex-row gap-6 ml-5'>
            <div className="flex flex-col gap-5 ml-7">
                <Image src={String(service?.service_image)} alt="Клиент" borderRadius='lg' width={400}/>
                {
                    settings.map( (el, index) => {
                        return (
                        <div key={index} onClick={ () => setActive(index)} className={"flex flex-row bg-white items-center gap-2 cursor-pointer hover:bg-gray-100 py-2 px-5 rounded-lg " + (active === index ? "bg-gray-200 hover:bg-gray-200" : "null")}>
                            <Image src={el.image} width={25} height={25} alt="Иконка"></Image>
                            <p>{el.name}</p>
                        </div>
                        )
                    })
                }
            </div>
            {active === 0 && <ServiceCard service={service}/>}
        </div>
    )
}

export default Service