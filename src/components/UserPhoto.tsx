import { Image, IImageProps } from 'native-base'

interface IUserPhoto extends IImageProps {
  size: number
}

export const UserPhoto = ({ size, ...props }: IUserPhoto) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...props}
    />
  )
}
