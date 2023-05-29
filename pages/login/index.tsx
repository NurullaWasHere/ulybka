import { FC, useState } from "react";
import s from './Login.module.scss'
import { useForm, Resolver } from "react-hook-form";
import {axiosInstance} from "../../axios";
import { useRouter } from "next/router";
import {User} from '../../types'
import {Input, Button} from '@chakra-ui/react'

interface ISubmitResult{
    phone: String,
    password: String
}



interface ILoginResult{
    token: String,
    user: User
}

type FormValues = {
    phone: string;
    password: string;
  };

  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.phone && values.password ? values : {},
      errors: !values.phone || !values.password? 
            {
            phone: {
              type: 'required',
              message: ' Invalid',
            },
          }
        : {}
    };
  };


const Login: FC = () => {

    const router = useRouter();
    const [isError, setError] = useState<String>("")
    const [isValid, setValid] = useState<String>('')


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });

      const onSubmit = async (result: ISubmitResult) => {
        await axiosInstance
          .post("/emp/loginEmp", {
            phone: result.phone,
            password: result.password
          })
          .then( ( res ) => {
            const { token, emp } = res.data;
            console.log(token)
            if(!token){
              window.localStorage.removeItem('token');
              setError("error")
            }
            if (token) {
              console.log(emp)
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("emp", emp.id);

              setValid('valid')
              router.push('/')
            }
          });
      };


    return (
        <>
        <div className={s.loginFone}>
            <div className={s.mainLogin}>
                <p className={s.tlogin}> Кіру </p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <p className={s.fill}>Бос орындарды толтырыңыз</p>
                        <Input 
                            className={s.textField}
                            placeholder="Введите номер телефона"
                            {...register("phone", { required: "Укажите телефон", min: 4 })}
                        />
                            {/* {errors?.iin && <p>{errors.iin.message}</p>} */}
                            <Input 
                            className={s.textField}
                            placeholder="Введите пароль"
                            {...register("password", { required: "Укажите пароль", min: 4 })}
                        />
                            {isError === "error" && <p className={s.dataError}>Қате деректер!</p>}
                            <button type="submit" className="border rounded-lg bg-gray-200 px-8 py-3 w-4/5 hover:bg-gray-300 transition duration-500 ease-in-out">Кіру</button>
                </form>
            </div>

            {isValid === 'valid' && <p className={s.validData}>Деректер расталды!</p>}
            </div>
        </>
    )
  }

export default Login