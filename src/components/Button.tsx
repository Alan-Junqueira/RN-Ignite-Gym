import { Button as ButtonNative, IButtonProps, Text } from 'native-base'

interface IButton extends IButtonProps {
  title: string
}

export const Button = ({ title, ...props }: IButton) => {
  return (
    <ButtonNative
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{
        bg: 'green.500'
      }}
      {...props}
    >
      <Text
        color="white"
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNative>
  )
}
