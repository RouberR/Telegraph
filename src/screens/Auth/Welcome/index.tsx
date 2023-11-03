import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native"
import { AuthRoute, AuthStackParamList } from "../../../router/Auth";


type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.Welcome>;

export const Welcome = ({ route, navigation }: Props) => {
    return (
        <View ><Text>Hello</Text>
        <TouchableOpacity onPress={() => navigation.navigate(AuthRoute.SignIn)}><Text>Go SignIn</Text></TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate(AuthRoute.SignUp)}><View><Text>go SignUp</Text></View></TouchableOpacity>
      
        </View>
    )
}