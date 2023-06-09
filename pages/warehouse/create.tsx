import { Blog, employer, Ware } from '@/types'
import {FC, useState} from 'react'
import {axiosInstance} from '../../axios'
import { Input, Textarea, Button, Select} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { Resolver, useForm } from 'react-hook-form'


interface IEmpProps{
    wares: Ware[]
}

type FormValues = {
    name: String,
    expiration_date: Date,
    serial_number: Number,
    created_date: Date,
    amount: Number,
    WareId: Number
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.name || values.amount ? values : {},
      errors:{}
    };
  };

const CreateProduct: FC<IEmpProps> = ({wares}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [done, setdone] = useState<boolean>(false)
    
    console.log(wares)

    const onSubmit = async (result: FormValues) => {
        await axiosInstance
          .post("/product/createProduct", {
            name: result.name,
            expiration_date: result.expiration_date,
            serial_number: result.serial_number,
            amount: result.amount,
            created_date: result.created_date,
            WareId: result.WareId
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
        <div className='w-4/5 bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6 bg-white px-4 py-4'>
            <form className='w-4/5  flex flex-col gap-6 ml-10'onSubmit={handleSubmit(onSubmit)} >
                <h1 className='flex flex-row justify-center font-medium text-xl border-b border-gray-300 pb-2'>Қоймаға дәрі қосу</h1>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>АТАУЫ </h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("name", { min: 4 })}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>СЕРИЯЛЫҚ НОМЕР</h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("serial_number")}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>ШЫҒАРЫЛУ МЕРЗІМІ	 </h1>
                    <Input type="datetime-local" id=""  size={'sm'} width={'xs'} {...register("created_date")}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>ЖАРАМДЫЛЫҚ МЕРЗІМІ</h1>
                    <Input type="datetime-local" id=""  size={'sm'} width={'xs'} {...register("expiration_date")}/>
                </div>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>ҚАЗІР БАР</h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("amount")}/>
                </div>
                <div className='flex flex-row gap-5 w-4/5 border-b border-gray-300 rounded-lg  justify-between py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Қойма: </h1>
                    <Select {...register('WareId')}>
                        {wares.map( (el,index) => {
                            return (
                                <option key={index} value={Number(el.id)}>Қойма №{Number(el.id)}</option>
                            )
                        })}
                    </Select>
                </div>
                <div className='flex flex-col gap-5 w-4/5 border-b border-gray-300 rounded-lg  items-center py-4'>
                {done && <p className='text-green-500 text-lg'>Ақпарат жіберілді!</p>}
                    <Button type='submit' background={'#FC9900'} _hover={ {background: "#E4B545"}}><p className='font-light text-xl text-white'>Ашу</p></Button>         
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
        const wares = await axiosInstance.get('/ware/getAllWares')
        
        return {
            props: {
                wares: wares.data.wares
            }
        }

}

export default CreateProduct