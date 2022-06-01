export let a = 1

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        /** `S3Storage` only */
        key: string
      }
    }
  }
}
