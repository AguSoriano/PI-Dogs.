import React from 'react'
import imagen from './imagene/loader.gif'
import style from './Loading.module.css'

function Loading() {
  return (
    <div className={style.loader_container}>
        <img className={style.loader} src={imagen} alt="Loading"/>
    </div>
  )
}

export default Loading