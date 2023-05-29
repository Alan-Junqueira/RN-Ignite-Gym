import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'

const PHOTO_SIZE = 33

type TProfileForm = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/Alan-Junqueira.png');

  const { user } = useAuth()

  const toast = useToast()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<TProfileForm>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })

  const handleUserPhotoSelect = async () => {
    try {
      setPhotoIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB",
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36
        }}
      >
        <Center
          mt={6}
          px={10}
        >
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='Nome'
                bg="gray.600"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='E-mail'
                bg="gray.600"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input
            placeholder='Senha antiga'
            bg="gray.600"
            secureTextEntry
          />

          <Input
            placeholder='Nova senha'
            bg="gray.600"
            secureTextEntry
          />

          <Input
            placeholder='Confirme nova senha'
            bg="gray.600"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
