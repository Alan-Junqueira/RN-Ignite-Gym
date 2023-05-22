import { Button as ButtonNative, IButtonProps, Text } from 'native-base'

interface IButton extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

export const Button = ({ title, variant = "solid", ...props }: IButton) => {
  return (
    <ButtonNative
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"

      rounded="sm"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.700"
      }}
      {...props}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNative>
  )
}
