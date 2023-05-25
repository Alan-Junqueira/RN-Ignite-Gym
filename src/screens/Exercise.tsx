import { Center, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TAppNavigatorRoutesProps } from '@routes/app.routes'

export const Exercise = () => {
  const navigation = useNavigation<TAppNavigatorRoutesProps>()
  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack
        px={8}
        bg="gray.600"
        pt={12}
      >
        <TouchableOpacity
          onPress={handleGoBack}
        >
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>
      </VStack>
    </VStack >
  )
}
