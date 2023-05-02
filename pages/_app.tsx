import { Sidebar } from '@/components/Sidebar/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { RightBar } from '@/components/RightBar'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ChakraProvider>
      <div className='flex flex-row gap-x-3 min-h-[100vh] bg-gray-200'>
      {router.pathname !== '/login' && <><Sidebar/></>}
      <Component {...pageProps}/>
      {router.pathname !== '/login' && <><RightBar/></>}
    </div>
    </ChakraProvider>
  )
}
