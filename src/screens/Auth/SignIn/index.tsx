import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native"
import { AuthRoute, AuthStackParamList } from "../../../router/Auth";


type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.SignIn>;

export const SignIn = ({ route, navigation }: Props) => {
    return (
        <View><Text>SignIn</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text>Go back</Text></TouchableOpacity>
        </View>
    )
}