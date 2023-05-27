import { IUserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";

export const storageUserSave = async (user: IUserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}