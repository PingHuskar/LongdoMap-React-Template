import { useState,useEffect } from 'react'
import './App.css'
import { longdo, map, LongdoMap } from './LongdoMap';
import Select from 'react-select';

function addMarker(lat,lng) {
  map.Overlays.add(longdo.Marker({ lon: lng, lat: lat }))
}

function App() {
  const [mapKey, setMapKey] = useState(localStorage.getItem(`KEY`) || ``)
  const [mapBase, setMapBase] = useState(localStorage.getItem(`base`) || `GREY`)

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
          <a href="https://map.longdo.com/console" target="_blank" rel="noopener noreferrer">
            Request API KEY
          </a>
          <input type={`password`} placeholder={`API KEY`} value={mapKey} 
          onChange={(e) => {
            e.preventDefault()
            localStorage.setItem(`KEY`, e.currentTarget.value)
            setMapKey(localStorage.getItem(`KEY`))
          }} />
          {/* {mapBase} */}
          <select onChange={(e) => {
            e.preventDefault()
            // alert(e.currentTarget.value)
            localStorage.setItem(`base`,e.currentTarget.value)
            setMapBase(localStorage.getItem(`base`))
            window.location.reload(false);
          }} name="mapBase" id="mapBase" value={mapBase} >
            <option value=""></option>
            <option value="NORMAL">แผนที่ปกติ (ภาษาไทย)</option>
            <option value="NORMAL_EN">แผนที่ปกติ (ภาษาอังกฤษ)</option>
            <option value="GREY">แผนที่สีเทา</option>
            <option value="POLITICAL">แผนที่การปกครอง</option>
            <option value="POI">แผนที่สถานที่ (ซูมระดับ 13-20 จึงจะเห็นข้อมูล)</option>
            <option value="GRAY_EN"> Gray-ish base layer (EN)</option>
            <option value="SPHERE_STREETS">sphere streets base layer</option>
            <option value="ARCGIS_WORLD_DARK">ArcGIS world dark base</option>
            <option value="OPENCYCLE">Open Cycle base layer</option>
            <option value="TERRAIN">Bluemarble terrain base layer</option>
            <option value="REVERSE">Upside down base layer (TH)</option>
            {/* <option value="GOOGLE_TRAFFIC">Google traffic external layer</option> */}
            {/* https://api.longdo.com/map/doc/ref.php#Layers */}
            {/* https://map.longdo.com/docs/javascript/maplayers/createmap */}
          </select>
          <button type={`submit`} onClick={() => {window.location.reload(false);}}>Submit</button>
        </div>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={() => {
          map.Layers.setBase(longdo.Layers[mapBase]);
        }} />
      </div>
    </>
  )
}

export default App
