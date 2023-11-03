import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native"
import { AuthRoute, AuthStackParamList } from "../../../router/Auth";
import { useAppSelector } from "../../../utils/Hooks";


type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Welcome>;

export const Welcome = ({ route, navigation }: Props) => {
    const count = useAppSelector((state) => state.user)
    console.log(count)
    return (
        <View ><Text>Hello</Text>
        <TouchableOpacity onPress={() => navigation.navigate(AuthRoute.SignIn)}><Text>Go SignIn</Text></TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate(AuthRoute.SignUp)}><View><Text>go SignUp</Text></View></TouchableOpacity>
      
        </View>
    )
}