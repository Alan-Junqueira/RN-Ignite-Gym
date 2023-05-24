import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { useTheme } from 'native-base'

type TAppRoutes = {
  home: undefined
  exercise: undefined
  profile: undefined
  history: undefined
}

export type TAppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutes>()

export const AppRoutes = () => {
  const { sizes, colors } = useTheme()

  const iconSizes = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200]
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSizes} height={iconSizes} />
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => <HistorySvg fill={color} width={iconSizes} height={iconSizes} />
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSizes} height={iconSizes} />
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
      />
    </Navigator>
  )
}