import Arrow from './images/icon-arrow.svg'

export function App() {
  return (
    <div>
      <header className='bg-[url(/home/eduardo/ip-tracker/src/images/pattern-bg-desktop.png)] '>
        <h1>IP Address Tracker</h1>
        <div>
          <input type='text' placeholder='Search for any address or domain' />
          <button>
            <img src={Arrow} alt='' />
          </button>
        </div>
      </header>
    </div>
  )
}
