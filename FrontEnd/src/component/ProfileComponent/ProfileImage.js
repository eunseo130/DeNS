import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { getImage } from '../../api/profile'
import { Link } from 'react-router-dom'

export default function ProfileImage({
  id,
  fileImage,
  onLoad,
  ImageUpload,
  authAxios,
  idCheck,
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
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
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

          <div className="mt-3">
            {idCheck ? (
              <div>
                <div>
                  <input
                    id="imgInput"
                    name="image"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onLoad}
                  ></input>
                  {!fileImage && (
                    <label
                      class="btn btn-outline-primary"
                      name="ImgBtn"
                      htmlFor="imgInput"
                    >
                      프로필 사진 등록
                    </label>
                  )}
                </div>
                {fileImage && (
                  <button
                    class="btn btn-primary"
                    onClick={ImageUpload}
                    size="sm"
                  >
                    저장하기
                  </button>
                )}
              </div>
            ) : (
              <div>
                <button className="btn btn-primary">
                  <Link to={`/auth/messenger/${id}`}>메세지</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
