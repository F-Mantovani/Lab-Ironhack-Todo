import React, { useState } from 'react'
import imageApi from "../utils/UploadImage";
import { useUser } from './UserContext';

const Profile = () => {

  const [image, setImage] = useState({ image: null })
  const { userId } = useUser()

  const uploadHandler = (e) => {
    setImage({ image: e.target.files[0] })
  }

  const sendFile = async () => {
    const formData = new FormData()
    formData.append('image', image)
    await imageApi.handleUpload(userId, formData)
  }

  return (
    <div style={{margin: "25%"}}>
      <input type="file" onChange={e => uploadHandler(e)} style={{ margin: "auto 1em"}}/>
      <button style={{padding: "0.25em 0.5em", margin: "1em auto"}} onClick={sendFile}> Send File</button>
    </div>
  )
}

export default Profile