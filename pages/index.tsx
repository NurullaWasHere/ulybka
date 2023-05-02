import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  if(typeof localStorage !== "undefined"){
    const token = localStorage.getItem('token')
    if(!token){
      router.push('/login')
    }
  }
  return (
    <div>
      
  </div>
  )
}
