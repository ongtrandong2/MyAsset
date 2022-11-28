import { Dimensions } from "react-native";
const designHeight = 896;
function scale(number) {
    return (number * Dimensions.get('window').height)/designHeight;
}
export default scale;