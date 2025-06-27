import { useState } from 'react'
import Arrow from './images/icon-arrow.svg'

export function App() {
  const API_KEY = 'at_mPnLDnsv4sQx0dUgfPKlfDNjrOEsE'
  const [ip, setIp] = useState('')
  const [data, setData] = useState<any>(null)

  const fetchIpInfo = async () => {
    try {
      const resposta = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      )
      const result = await resposta.json()
      setData(result)
    } catch (err) {
      console.error('Erro ao buscar IP: ', err)
    }
  }
  return (
    <div className='flex flex-col h-screen w-full tracking-widest'>
      <header className="flex flex-col bg-[url('/src/images/pattern-bg-desktop.png')] bg-no-repeat bg-cover bg-center w-full h-[30%] items-center justify-center gap-5">
        <h1 className='text-3xl font-bold text-white '>IP Address Tracker</h1>
        <div className='bg-white flex  gap-3  rounded-lg shadow-lg'>
          <input
            className='p-3 outline-none w-2xs'
            type='text'
            placeholder='Search for any address or domain'
            onChange={(e) => setIp(e.target.value)}
          />
          <button
            onClick={fetchIpInfo}
            className='bg-black rounded-r-lg p-5 cursor-pointer'
          >
            <img src={Arrow} alt='' />
          </button>
        </div>
      </header>
      <main className='flex flex-col h-[70%] w-full bg-black items-center '>
        <div className='w-6xl bg-white absolute rounded-2xl flex p-10 mt-[-60px] gap-7  '>
          <div className='flex flex-col border-r border-gray-300 w-1/4 '>
            <h3 className='text-gray-400 font-bold'>IP ADDRESS</h3>
            <h1 className='text-2xl font-semibold'>{data?.ip}</h1>
          </div>
          <div className='flex flex-col border-r border-gray-300 w-1/4 '>
            <h3 className='text-gray-400 font-bold'>LOCATION</h3>
            <h1 className='text-2xl font-semibold'>
              {data?.location.city}, {data?.location.region},
              {data?.location.postalCode}
            </h1>
          </div>
          <div className='flex flex-col border-r border-gray-300 w-1/4 '>
            <h3 className='text-gray-400 font-bold'>TIMEZONE</h3>
            <h1 className='text-2xl font-semibold'>
              UTC {data?.location.timezone}
            </h1>
          </div>
          <div className='flex flex-col  w-1/4 '>
            <h3 className='text-gray-400 font-bold'>ISP</h3>
            <h1 className='text-2xl font-semibold'>{data?.isp}</h1>
          </div>
        </div>
        <img src='' alt='' />
      </main>
    </div>
  )
}
