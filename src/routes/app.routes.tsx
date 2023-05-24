import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

type TAppRoutes = {
  home: undefined
  exercise: undefined
  profile: undefined
  history: undefined
}

export type TAppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutes>()

export const AppRoutes = () => {
  return (
    <Navigator>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="history"
        component={History}
      />
      <Screen
        name="profile"
        component={Profile}
      />
      <Screen
        name="exercise"
        component={Exercise}
      />
    </Navigator>
  )
}