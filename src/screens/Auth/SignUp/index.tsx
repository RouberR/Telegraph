import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native"
import { AuthRoute, AuthStackParamList } from "../../../router/Auth";


type Props = NativeStackScreenProps<AuthStackParamList, AuthRoute.SignUp>;

export const SignUp = ({ route, navigation }: Props) => {
    return (
        <View><Text>SignUp</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text>Go back</Text></TouchableOpacity>
        </View>
    )
}