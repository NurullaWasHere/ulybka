import { FC } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "../../axios";
import {useEffect, useState} from 'react'
import { employer } from "@/types";
import Image from "next/image";
import { EmployerCard } from "@/components/EmployerCard/EmployerCard";

const settings = [{name: "Основное", image: "/user.png"}, {name: 'Сертификаты', image:"/time.png"}]

const Employer: FC = () => {
    const router = useRouter()    

    const [employer, setEmployer] = useState<employer>()
    const [active, setActive] = useState<Number>(0)

    const {pid} = router.query

    const fetchEmployer = async () => {
        try {
            await axiosInstance.get(`/emp/getEmployer/${pid}`).then( res => {
                console.log(res.data)
                setEmployer(res.data.emp)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEmployer()
    }, [])
        return (
        <div className="mt-7 border-l border-gray-400 background-white flex flex-row gap-y-3 gap-x-7 w-4/5 bg-white px-4 py-4">
            <div className="flex flex-col gap-5 ml-7">
                <Image src={'data:image/jpeg;base64,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'} alt="Клиент" width={250} height={250}/>
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
        {active === 0 && <EmployerCard employer={employer}/>}
        {/* {active === 1 && <UserHistory id={user?.id}/>} */}
        </div>
    )
}

export default Employer