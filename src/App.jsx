import { useState,useEffect } from 'react'
import './App.css'
import { longdo, map, LongdoMap } from './LongdoMap';

function addMarker(lat,lng) {
  map.Overlays.add(longdo.Marker({ lon: lng, lat: lat }))
}

function App() {
  const [mapKey, setMapKey] = useState(localStorage.getItem(`KEY`) || ``)
  useEffect(() => {
    try {
      addMarker(13.744468,100.533251)
    } catch {
      console.error(`Error: add Marker`)
    }
  },[mapKey])
  return (
    <>
      <div className="App">
        <h1>Longdo Map</h1>
        <div className="">
          <input type={`password`} placeholder={`API KEY`} value={mapKey} 
          onChange={(e) => {
            e.preventDefault()
            localStorage.setItem(`KEY`, e.currentTarget.value)
            setMapKey(localStorage.getItem(`KEY`))
          }} />
          <button type={`submit`} onClick={() => {window.location.reload(false);}}>Submit</button>
        </div>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={() => {
          // map.Layers.setBase(longdo.Layers.POLITICAL);
          map.Layers.setBase(longdo.Layers.GREY);
          // https://map.longdo.com/docs/javascript/maplayers/createmap
        }} />
      </div>
    </>
  )
}

export default App
