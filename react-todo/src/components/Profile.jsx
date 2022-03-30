import React, { useState } from 'react'
import imageApi from "../utils/UploadImage";

const Profile = () => {

  const [image, setImage] = useState({ image: null })

  const uploadHandler = (e) => {
    setImage({ image :e.target.files[0] })
  }
  const sendFile = async () => {
    console.log(image)
    let formData = new FormData()
    console.log('formData antes do append' , formData)
    formData.append('image', image.name)
    console.log("depois do append" , formData)

  }


  return (
    <div style={{margin: "25%"}}>
      <input type="file" onChange={e => uploadHandler(e)} style={{ margin: "auto 1em"}}/>
      <button style={{padding: "0.25em 0.5em", margin: "1em auto"}} onClick={sendFile}> Send File</button>
    </div>
  )
}

export default Profile