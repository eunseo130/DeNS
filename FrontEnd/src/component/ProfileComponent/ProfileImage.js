import React from 'react'
import { Button, Image } from 'react-bootstrap'
export default function ProfileImage({
  id,
  image,
  fileImage,
  onLoad,
  ImageUpload,
}) {
  return (
    <div>
      {fileImage?(
        <div>
          <Image
            alt="sample"
            src={fileImage}
            width={180}
            height={160}
            thumbnail
          />
        </div>
      )  :(
        <div>
          {(
            <Image
              width={180}
              height={160}
              src={`http://3.36.131.59:2222/profile/image/${id}`}
              roundedCircle
            />
          ) && (
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
        <Button size="sm" variant="secondary">
          <label name="ImgBtn" htmlFor="imgInput">
            프로필 사진 등록
          </label>
        </Button>
      </form>
      {fileImage && (
        <Button onClick={ImageUpload} size="sm" variant="secondary">
          저장하기
        </Button>
      )}
    </div>
  )
}
