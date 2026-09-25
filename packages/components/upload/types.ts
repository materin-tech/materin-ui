export interface UploadItem {
  name: string
  size: number
  status: 'ready' | 'uploading' | 'done' | 'error'
  file?: File
}

export interface UploadProps {
  buttonText?: string
  maxSize?: number
}
