import { useState, useEffect } from 'react'
import Arrow from './images/icon-arrow.svg'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Icon from '/home/eduardo/ip-tracker/src/images/icon-location.svg'

const customIcon = new L.Icon({
  iconUrl: Icon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
})

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true })
    }
  }, [lat, lng, map])

  return null
}

export function App() {
  const API_KEY = 'at_mPnLDnsv4sQx0dUgfPKlfDNjrOEsE'
  const [ip, setIp] = useState('')

  // Estado data inicia como null (sem dados)
  const [data, setData] = useState<any>(null)

  // Localização padrão para o mapa (ex: São Paulo)
  const defaultPosition = { lat: -23.55, lng: -46.63 }

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
      <header className="flex flex-col bg-[url('/src/images/pattern-bg-desktop.png')] bg-no-repeat bg-cover bg-center w-full h-[30%] items-center justify-center gap-5 z-10 relative">
        <h1 className='text-3xl font-bold text-white '>IP Address Tracker</h1>
        <div className='bg-white flex gap-3 rounded-lg shadow-lg'>
          <input
            className='p-3 outline-none w-80'
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

      <main className='relative flex flex-col h-[70%] w-full'>
        {/* Card de informações SEMPRE aparece */}
        <div className='w-[90%] max-w-6xl bg-white absolute z-20 rounded-2xl flex p-10 top-[-60px] left-1/2 transform -translate-x-1/2 gap-7 shadow-lg'>
          <div className='flex flex-col border-r border-gray-300 w-1/4'>
            <h3 className='text-gray-400 font-bold'>IP ADDRESS</h3>
            <h1 className='text-2xl font-semibold'>{data?.ip || '--'}</h1>
          </div>
          <div className='flex flex-col border-r border-gray-300 w-1/4'>
            <h3 className='text-gray-400 font-bold'>LOCATION</h3>
            <h1 className='text-2xl font-semibold'>
              {data
                ? `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
                : '--'}
            </h1>
          </div>
          <div className='flex flex-col border-r border-gray-300 w-1/4'>
            <h3 className='text-gray-400 font-bold'>TIMEZONE</h3>
            <h1 className='text-2xl font-semibold'>
              {data ? `UTC ${data.location.timezone}` : '--'}
            </h1>
          </div>
          <div className='flex flex-col w-1/4'>
            <h3 className='text-gray-400 font-bold'>ISP</h3>
            <h1 className='text-2xl font-semibold'>{data?.isp || '--'}</h1>
          </div>
        </div>

        {/* Mapa */}
        <div className='flex-1 z-10'>
          <MapContainer
            center={[
              data?.location.lat || defaultPosition.lat,
              data?.location.lng || defaultPosition.lng,
            ]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker
              position={[
                data?.location.lat || defaultPosition.lat,
                data?.location.lng || defaultPosition.lng,
              ]}
              icon={customIcon}
            >
              <Popup>{data ? 'Localização do IP' : 'Localização padrão'}</Popup>
            </Marker>

            {/* Centraliza o mapa se houver dados novos */}
            <RecenterMap
              lat={data?.location.lat || defaultPosition.lat}
              lng={data?.location.lng || defaultPosition.lng}
            />
          </MapContainer>
        </div>
      </main>
    </div>
  )
}
