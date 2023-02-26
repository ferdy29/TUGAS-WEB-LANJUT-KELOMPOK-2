import React, { useEffect, useState, useTransition } from 'react';
import './style.css';

function App() {
  const [isPending, startTransition] = useTransition();
  const [rangeHarga, setRangeHarga] = useState(0)
  const cariLaptop = () => {
    getDataLaptop()
  }
  const [selectedProcessor, setSelectedProcessor] = useState("Intel Core")
  const [selectedVGA, setSelectedVGA] = useState("Nvidia")
  const processorModels = [
    "Intel Core",
    "Intel Pentium",
    "Intel",
    "Intel Celeron",
    "AMD Ryzen",
    "AMD",
    "AMD APU",
    "AMD Athlon",
  ];
  
  const [dataLaptop, setDataLaptop] = useState([])

 
  async function getDataLaptop() {
    try {
      const res = await fetch(`/api/?range=${rangeHarga}&Prosessor=${selectedProcessor}&vga=${selectedVGA}`)
      if(!res.ok) {
        return 
      }
      
      const data = await res.json()
      console.log(data)
      setDataLaptop(data)
    }catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="container">
      <nav>
        <h1>Rekomendasi Laptop</h1>
      </nav>
      <form>
        <label htmlFor="harga">Range Harga:</label>
        <input type="range" id="harga" name="harga" value={rangeHarga} onChange={(ev) => {
          startTransition(() => {
            setRangeHarga(parseInt(ev.target.value))

          })
        }} min="0" max="100000000" step="100000" />
        {rangeHarga.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
        <br />
        <br />
        <label htmlFor="processor">Tipe Processor:</label>
        <select id="processor" onChange={(ev) => {
          setSelectedProcessor(ev.target.value)
        }} name="processor">
          {
            processorModels.map(el => (
              <option value={el} >{el}</option>
            ))
          }
        </select>
        <br />
        <label htmlFor="vga">Tipe VGA:</label>
        <select onChange={(ev) => {
          setSelectedVGA(ev.target.value)
        }} id="vga" name="vga">
          <option value="Nvidia">Nvidia</option>
          <option value="Amd">AMD</option>
          <option value="Intel">Intel</option>
        </select>
        <br />
        <input type="button" value="Cari" onClick={cariLaptop} />
      </form>
      <div id="hasil">
        {
          dataLaptop.map(el => (
            <Card key={el.id} data={el} />
          ))
        }
      </div>
    </div> 
  );
}


function Card({data}) {
  return(
    <div style={{width:"90%", minHeight:"20vh", boxShadow:"0px 0px 5px rgba(0,0,0,0.5)", margin : "2rem 0"}}>
      <div style={{width:"95%", minHeight:"95%", display:"flex", flexDirection:"column", gap : "2rem"}}>
        <h2>{data.nama_laptop}</h2>
        <ul>
          <li><b>Ukuran Layar : </b>{data.ukuran_layar}inch</li>
          <li><b>Prosessor : </b>{data.Prosessor}</li>
          <li><b>VGA : </b>{data.vga}</li>
          <li><b>RAM : </b>{data.ram}GB</li>
          <li><b>Storage : </b>{data.storage}GB</li>
          <li><b>Baterai : </b>{data.baterai}mAH</li>
          <li><b>Harga : </b>{data.harga.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</li>
        </ul>
      </div>
    </div>
  )
}

export default App;
