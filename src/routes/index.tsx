import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { AuthRoutes } from "./auth.routes"
import { useTheme, Box } from "native-base"
import { AppRoutes } from "./app.routes"
import { useContext } from "react"
import { AuthContext } from "@contexts/AuthContext"

export const Routes = () => {
  const contextData = useContext(AuthContext)

  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer
        theme={theme}
      >
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}