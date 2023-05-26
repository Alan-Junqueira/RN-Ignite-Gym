import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native';
import { TAppNavigatorRoutesProps } from '@routes/app.routes';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react';

export const Home = () => {
  const [groups, setGroups] = useState(['Costas', 'Biceps', 'Triceps', 'Ombro']);
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Curvada', 'Remada Unilateral', 'Levantamento Terra']);
  const [groupSelected, setGroupSelected] = useState('costas');

  const navigation = useNavigation<TAppNavigatorRoutesProps>()

  const handleOpenExercisesDetails = () => {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack
        flex={1}
        px={8}
      >
        <HStack
          justifyContent="space-between"
          mb={5}
        >
          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            Exercícios
          </Heading>

          <Text
            color="gray.200"
            fontSize="sm"
          >
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExercisesDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20
          }}
        />

      </VStack>
    </VStack>
  )
}
