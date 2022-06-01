export type ImageFile = {
  id: number
  filename: string
}

export type UploadImageResult = {
  file: ImageFile
}
export type UploadImageListResult = {
  fileList: ImageFile[]
}
export type GetImageListResult = {
  fileList: ImageFile[]
}
export type LoginInput =
  | {
      tel: string
    }
  | { email: string }
export type LoginResult = {
  token: string
}

export type APIResponse<T extends object> =
  | {
      error: string
    }
  | T
