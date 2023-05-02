import { Blog, employer, Ware } from '@/types'
import {FC, useState} from 'react'
import {axiosInstance} from '../../axios'
import { Input, Textarea, Button, Select} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { Resolver, useForm } from 'react-hook-form'




type FormValues = {
    name: String,
    service_image: String,
    discount: Number,
    price: Number
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.name || values.price ? values : {},
      errors:{}
    };
  };

const CreateService: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [done, setdone] = useState<boolean>(false)
    

    const onSubmit = async (result: FormValues) => {
        await axiosInstance
          .post("/service/createService", {
            name: result.name,
            service_image: result.service_image,
            discount: result.discount,
            price: result.price
          })
          .then( ( res ) => {
            if(res.data.code === 200){
                console.log(res)
                setdone(true)
                setTimeout( () => setdone(false), 2000)
            }
          });
      };


    return (
        <div className='w-4/5 bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6'>
            <form className='w-4/5  flex flex-col gap-6 ml-10'onSubmit={handleSubmit(onSubmit)} >
                <h1 className='flex flex-row justify-center font-medium text-xl border-b border-gray-300 pb-2'>Добавить сервис в базу</h1>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>НАЗВАНИЕ </h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("name", { min: 4 })}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>ЦЕНА СЕРВИСА</h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("price")}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>СКИДКА	 </h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("discount")}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>ССЫЛКА НА ИЗОБРАЖЕНИЕ</h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("service_image")}/>
                </div>

                <div className='flex flex-col gap-5 w-4/5 border-b border-gray-300 rounded-lg  items-center py-4'>
                {done && <p className='text-green-500 text-lg'>Запрос совершен!</p>}
                    <Button type='submit' background={'#FC9900'} _hover={ {background: "#E4B545"}}><p className='font-light text-xl text-white'>Создать</p></Button>         
                </div>
            </form>
        </div>
    )
}

export default CreateService