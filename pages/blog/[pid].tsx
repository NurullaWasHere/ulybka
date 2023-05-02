import { Blog } from '@/types'
import {FC, useState} from 'react'
import {axiosInstance} from '../../axios'
import { Input, Textarea, Button} from '@chakra-ui/react'
import { GetServerSideProps, GetStaticProps } from 'next'
import { Resolver, useForm } from 'react-hook-form'


interface IBlog{
    blog: Blog
}

type FormValues = {
    name: String,
    description: String
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.name || values.description ? values : {},
      errors:{}
    };
  };

const Blog:FC<IBlog> = ( {blog}) => {


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [done, setdone] = useState<boolean>(false)
    
    const onSubmit = async (result: FormValues) => {
        await axiosInstance
          .put("/blog/updateBlog", {
            id: blog.id,
            name: result.name,
            description: result.description
          })
          .then( ( res ) => {
            if(res.data.code === 200){
                console.log(res)
                setdone(!done)
                setTimeout( () => setdone(!done), 2000)
            }
          });
      };


    return (
        <div className='w-4/5 bg-whte border-l border-gray-300 mt-7 flex flex-row gap-6 bg-white'>
            <form className='w-4/5  flex flex-col gap-6 ml-10'onSubmit={handleSubmit(onSubmit)} >
                <h1 className='flex flex-row justify-center font-medium text-xl border-b border-gray-300 pb-2'>Редактировать</h1>
                <div className='flex flex-row gap-4 w-4/5 border-b border-gray-300 rounded-lg items-center  py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Название блога</h1>
                    <Input type="text" id="" defaultValue={String(blog?.name)} size={'sm'} width={'xs'} {...register("name", { min: 4 })}/>
                </div>
                <div className='flex flex-row gap-5 w-4/5 border-b border-gray-300 rounded-lg  justify-between py-4'>
                    <h1 className='font-normal text-lg px-4 py-2'>Описание</h1>
                    <Textarea defaultValue={String(blog?.description)} size='sm' height={'2xl'} {...register("description", { min: 4 })}/>
                </div>
                <div className='flex flex-col gap-5 w-4/5 border-b border-gray-300 rounded-lg  items-center py-4'>
                {done && <p className='text-green-500 text-lg'>Изменения приняты!</p>}
                    <Button type='submit' background={'#FC9900'} _hover={ {background: "#E4B545"}}><p className='font-light text-xl text-white'>Подтвердить</p></Button>         
                </div>
            </form>
        </div>
    )
}


export async function getStaticPaths() {
    const res = await axiosInstance.get('/blog/getAllBlogs')

    const paths = res.data.blogs.map((blog: any) => ({
    params: { pid: `${blog.id}` },
  }))

    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  

export const getStaticProps: GetStaticProps = async (context) => {
        
        const res = await axiosInstance.get(`/blog/getBlogByParams/${context.params?.pid}`)
        
        return { props: {blog: res.data.blog || null}}
}

export default Blog