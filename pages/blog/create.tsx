import { Blog, employer } from '@/types'
import {FC, useState} from 'react'
import {axiosInstance} from '../../axios'
import { Input, Textarea, Button, Select} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { Resolver, useForm } from 'react-hook-form'


interface IEmpProps{
    employers: employer[]
}

type FormValues = {
    name: String,
    description: String,
    author_name: String
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.name || values.description ? values : {},
      errors:{}
    };
  };

const CreateBlog: FC<IEmpProps> = ({employers}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [done, setdone] = useState<boolean>(false)
    
    console.log(employers)

    const onSubmit = async (result: FormValues) => {
        await axiosInstance
          .post("/blog/createBlog", {
            name: result.name,
            description: result.description,
            author_name: result.author_name
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
        <div className='w-4/5 bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6 bg-white'>
            <form className='w-4/5  flex flex-col gap-6 ml-10'onSubmit={handleSubmit(onSubmit)} >
                <h1 className='flex flex-row justify-center font-medium text-xl border-b border-gray-300 pb-2'>Создать блог</h1>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Блог атауы</h1>
                    <Input type="text" id=""  size={'sm'} width={'xs'} {...register("name", { min: 4 })}/>
                </div>
                <div className='flex flex-row gap-5 w-4/5 border-b border-gray-300 rounded-lg  justify-between py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Мазмұны</h1>
                    <Textarea  size='sm' height={'2xl'} {...register("description", { min: 4 })}/>
                </div>
                <div className='flex flex-row gap-5 w-4/5 border-b border-gray-300 rounded-lg  justify-between py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'> Автор: </h1>
                    <Select {...register('author_name')}>
                        {employers.map( (el,index) => {
                            return (
                                <option key={index} value={el.firstname + " " + el.lastname}>{el.firstname + " " + el.lastname}</option>
                            )
                        })}
                    </Select>
                </div>
                <div className='flex flex-col gap-5 w-4/5 border-b border-gray-300 rounded-lg  items-center py-4'>
                {done && <p className='text-green-500 text-lg'>Өзгеріс жіберілді!</p>}
                    <Button type='submit' background={'#FC9900'} _hover={ {background: "#E4B545"}}><p className='font-light text-xl text-white'>Ашу</p></Button>         
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
        const employee = await axiosInstance.get('/emp/getAllEmployers')
        
        return {
            props: {
                employers: employee.data.employers
            }
        }

}

export default CreateBlog