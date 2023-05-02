
import {FC} from 'react'
import s from './Sidebar.module.scss'
import Image from 'next/image'
import Link from 'next/link'


export const Sidebar: FC = () => {
  return (
    <div className={s.sideMain}>
        <h2 className='font-semibold text-lg'>Админ панель</h2>
            <Link href={"/users"} className={s.sideElem}>
        <div className={s.linkElem}>
            <Image src="/user.png" alt="" width={25} height={25}/>
            <p>Пользватели</p>
        </div>
            </Link>
            <Link href={'/services'} className={s.sideElem} >
        <div className={s.linkElem} >
            <Image src="/service.png" alt="" width={25} height={25}/>
            <p>Сервисы</p>
        </div>
            </Link>
            <Link href={'/blog'} className={s.sideElem}>
        <div className={s.linkElem}>
            <Image src="/blog.png" alt="" width={25} height={25}/>
            <p>Блог</p>
        </div>
            </Link>
        <Link href={'/signs/1'} className={s.sideElem}>
        <div className={s.linkElem}>
            <Image src="/sign.png" alt="" width={25} height={25}/>
            <p>Записи</p>
        </div>
        </Link>
        <Link href={'/employer'} className={s.sideElem}>
        <div className={s.linkElem}>
            <Image src="/employee.png" alt="" width={25} height={25}/>
            <p>Сотрудники</p>        
        </div>
        </Link>
                <Link href={'/warehouse'} className={s.sideElem}>       
        <div className={s.linkElem}>
                <Image src="/warehouse.png" alt="" width={25} height={25}/>
            <p>Склад</p>
        </div>
                </Link>
    </div>
  )
}
