
import { FC , useState} from "react";
import {Input, RadioGroup, Select, Button, Radio, Stack} from '@chakra-ui/react'
import { Resolver } from "react-hook-form";
import { useForm } from 'react-hook-form'
import {axiosInstance} from '../../axios'
import {Service, employer} from '../../types'
import { GetServerSideProps } from "next";

type FormValues = {
    service_id: Number | null,
    signDate: Date,
    employerId: Number | null
}


const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.service_id || values.employerId  ? values : {},
      errors:{}
    };
  };

interface ICreateSign {
    services: Service[],
    employers: employer[]
}

const CreateSign:FC<ICreateSign> = ({services, employers}) => {

    const [done, setdone] = useState<boolean>(false)
    const [value, setValue] = useState<String>('1')

    const onSubmit = async (result: FormValues) => {
        console.log(result.service_id)
        await axiosInstance
          .post("/sign/createSign", {
            service_id: value === '2' ? result.service_id : null,
            signDate: result.signDate,
            employerId: value === '1' ? result.employerId : null
          })
          .then( ( res ) => {
            console.log(res.data)
            if(res.data.code === 200){
                console.log(res)
                setdone(true)
                setTimeout( () => setdone(false), 2000)
            }
          });
      };


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    return (
        <div className="mt-9 bg-white w-4/5 border-l border-gray-400 flex flex-col py-4 px-4">
            <form className='w-4/5  flex flex-col gap-6 ml-10'onSubmit={handleSubmit(onSubmit)} >
                <h1 className='flex flex-row justify-center font-medium text-xl border-b border-gray-300 pb-2'>Открыть запись</h1>
            <RadioGroup onChange={setValue} value={String(value)} className="w-3/5 flex flex-row justify-between">
                <Stack direction='row'>
                    <Radio value='1'>Для врача</Radio>
                    <Radio value='2'>Для сервиса</Radio>
                </Stack>
                </RadioGroup>
                {value === '1' &&                 
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Выберите работника</h1>
                        <Select {...register('employerId')} defaultValue={undefined}>
                            {employers.map( (el,index) => {
                                return (
                                    <option key={index} value={Number(el.id)}>{el.firstname + " " + el.lastname}</option>
                                )
                            })}
                        </Select>
                </div>}
                {value === '2' && 
                            <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                                <h1 className='font-normal text-lg px-4 py-2'>Выберите сервис</h1>
                                <Select {...register('service_id')} defaultValue={undefined}>
                                    {services.map( (el,index) => {
                                        return (
                                            <option key={index} value={Number(el.id)}>{el.name}</option>
                                        )
                                    })}
                                </Select>
                            </div>
                            }
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Выберите дату</h1>
                    <Input type="datetime-local" id=""  size={'sm'} width={'xs'} {...register("signDate", { min: 4 })}/>
                </div>
        
                {/* <div className='flex flex-row gap-5 w-4/5 border-b border-gray-300 rounded-lg  justify-between py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Выбрать автора: </h1>
                    <Select {...register('author_name')}>
                        {employers.map( (el,index) => {
                            return (
                                <option key={index} value="a">{el.firstname + " " + el.lastname}</option>
                            )
                        })}
                    </Select>
                </div> */}
                <div className='flex flex-col gap-5 w-4/5 border-b border-gray-300 rounded-lg  items-center py-4'>
                {done && <p className='text-green-500 text-lg'>Запрос совершен!</p>}
                    <Button type='submit' background={'#FC9900'} _hover={ {background: "#E4B545"}}><p className='font-light text-xl text-white'>Создать</p></Button>         
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const employers = await axiosInstance.get('/emp/getAllEmployers')
    const services = await axiosInstance.get('/service/getAllService')

    return {
        props: {
            employers: employers.data.employers,
            services: services.data.services
        }
    }
}

export default CreateSign