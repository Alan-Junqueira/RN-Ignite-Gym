import { ScreenHeader } from '@components/ScreenHeader'
import { Center, Text, VStack } from 'native-base'

export const History = () => {
  return (
    <VStack flex={1}>
      <ScreenHeader 
        title="Histórico de exercícios"
      />
    </VStack>
  )
}
