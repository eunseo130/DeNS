import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { getImage } from '../../api/profile'
export default function ProfileImage({
  id,
  fileImage,
  onLoad,
  ImageUpload,
  authAxios,
}) {
  const [image, setImage] = useState('')

  useEffect(() => {
    authAxios
      .get(`/profile/image/${id}`, {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers['content-type'] })
        )
        console.log(url)
        setImage(url)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <div>
      {fileImage ? (
        <div>
          <Image
            alt="sample"
            src={fileImage}
            width={180}
            height={160}
            thumbnail
          />
        </div>
      ) : (
        <div>
          {image ? (
            <Image width={180} height={160} src={image} roundedCircle />
          ) : (
            <Image
              width={180}
              height={160}
              src={require('./profile_default.png')}
              roundedCircle
            />
          )}
        </div>
      )}

      <form>
        <input
          id="imgInput"
          name="image"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onLoad}
        ></input>
        {!fileImage && (
          <Button size="sm" variant="secondary">
            <label name="ImgBtn" htmlFor="imgInput">
              프로필 사진 등록
            </label>
          </Button>
        )}
      </form>
      {fileImage && (
        <Button onClick={ImageUpload} size="sm" variant="secondary">
          저장하기
        </Button>
      )}
    </div>
  )
}
