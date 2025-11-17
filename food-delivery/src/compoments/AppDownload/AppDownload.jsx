import React from 'react'
import "./AppDownload.css"
import { asset } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Berter Experience Download <br/> Tomato App</p>
        <div className="app-dowload-platfroms">
            <img src={asset.play_store} alt="" />
            <img src={asset.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload