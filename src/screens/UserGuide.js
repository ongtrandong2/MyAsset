
import { 
    View, 
    Text,
    KeyboardAvoidingView, 
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
import React from 'react'
import HeaderDrawer from '../components/Header_Drawer';
import CustomButton from '../components/CustomButton';
import scale from '../constants/scale';

export default function UserGuide({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.view}>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          title={'HƯỚNG DẪN SỬ DỤNG'}
          style={{
            fontSize: scale(30),
            fontFamily:'Inter-Bold',
          }}
        />
        <ScrollView>
          <Text style = {styles.title}>I. Thêm chi tiêu/ thu nhập sinh hoạt {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng  
              </Text>
              <Image 
                source={require('../assets/images/plusItem.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn <Text style={{fontFamily: 'Inter-Bold'}}>SINH HOẠT</Text> và chọn <Text style={{fontFamily: 'Inter-Bold'}}>CHI TIÊU</Text> hoặc <Text style={{fontFamily: 'Inter-Bold'}}>THU NHẬP</Text> {"\n"}
            3.	Chọn Khoản chi/ thu theo gợi ý hoặc chọn Khác để nhập khoản chi/thu mới{"\n"}
            4.	Nhập số tiền định mức {"\n"}
            5.	Nhấn <Text style={{fontFamily: 'Inter-Bold'}}>Lưu</Text>
          </Text>

          <Text style = {styles.title}>II. Mua tài sản {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng  
              </Text>
              <Image 
                source={require('../assets/images/plusItem.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn <Text style={{fontFamily: 'Inter-Bold'}}>TÀI SẢN</Text> rồi chọn <Text style={{fontFamily: 'Inter-Bold'}}>MUA</Text> {"\n"}
            3.	Nhập tên tài sản/ hiện vât {"\n"}
            4.	Chọn nguồn tiền: nếu nguồn tiền là cá nhân thì số tiền sẽ trừ vào tổng số dư, còn nếu là Khác thì tổng số dư sẽ không thay đổi {"\n"}
            5.	Nhập số tiền của tài sản trên {"\n"}
            6.	Nhập ghi chú (nếu có) {"\n"}
            7.	Nhấn <Text style={{fontFamily: 'Inter-Bold'}}>Lưu</Text>
          </Text>

          <Text style = {styles.title}>III. Bán tài sản {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng         
              </Text>
              <Image 
                source={require('../assets/images/plusItem.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn <Text style={{fontFamily: 'Inter-Bold'}}>TÀI SẢN</Text> rồi chọn <Text style={{fontFamily: 'Inter-Bold'}}>BÁN</Text> {"\n"}
            3.	Nhập tên tài sản/ hiện vât {"\n"}
            4.	Nhập số tiền của tài sản trên {"\n"}
            5.	Nhấn <Text style={{fontFamily: 'Inter-Bold'}}>Lưu</Text>
          </Text>

          <Text style = {styles.title}>IV. Tạo kế hoạch {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Kế hoạch</Text>         
              </Text>
              <Image 
                source={require('../assets/images/plan.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              2.	Nhấn biểu tượng       
              </Text>
              <Image 
                source={require('../assets/images/pen.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            3.	Chọn ngày bắt đầu và ngày kết thúc {"\n"}
            4.	Nhập định mức chi tiêu {"\n"}
            5.	Nhấn <Text style={{fontFamily: 'Inter-Bold'}}>Lưu</Text>
          </Text>

          <Text style = {styles.title}>V. Xóa kế hoạch {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Kế hoạch</Text>         
              </Text>
              <Image 
                source={require('../assets/images/plan.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              2.	Nhấn biểu tượng       
              </Text>
              <Image 
                source={require('../assets/images/bin_icon.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>của mục kế hoạch cần xóa</Text>
            </View>
            
          </Text>

          <Text style = {styles.title}>VI. Sửa kế hoạch {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Kế hoạch</Text>         
              </Text>
              <Image 
                source={require('../assets/images/plan.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              2.	Nhấn biểu tượng       
              </Text>
              <Image 
                source={require('../assets/images/pen.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>của mục kế hoạch cần sửa</Text>
            </View>
            {"\n"}
            3.	Nhập định mức chi tiêu mới {"\n"}

            <Text style={{color: 'red', fontFamily: 'Inter-Bold'}}>Lưu ý</Text>: Chỉ sửa được định mức chi tiêu của kế hoạch, không sửa được ngày bắt đầu và ngày kết thúc
          </Text>

          <Text style = {styles.title}>VII. Lịch sử chỉnh sửa kế hoạch {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Kế hoạch</Text>         
              </Text>
              <Image 
                source={require('../assets/images/plan.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2. Nhấn vào thanh kế hoạch cần xem lịch sử
          </Text>

          <Text style = {styles.title}>VIII. Thống kê Chi tiêu/ Thu nhập {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Thống kê</Text>         
              </Text>
              <Image 
                source={require('../assets/images/chart.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn mục <Text style={{fontFamily: 'Inter-Bold'}}>Chi tiêu</Text> hoặc <Text style={{fontFamily: 'Inter-Bold'}}>Thu nhập</Text>  {"\n"}
            3.	Chọn loại thống kê (<Text style={{fontFamily: 'Inter-Bold'}}>THÁNG/ NĂM/ TÙY CHỌN</Text>) {"\n"}
            4.	Chọn thời gian thống kê cần xem
          </Text>

          <Text style = {styles.title}>IX. Tài sản {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Thống kê</Text>         
              </Text>
              <Image 
                source={require('../assets/images/chart.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn mục <Text style={{fontFamily: 'Inter-Bold'}}>Tài sản</Text>  {"\n"}
            Hoặc  {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Tổng quan</Text>         
              </Text>
              <Image 
                source={require('../assets/images/home2a.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              , xem phần Tài sản</Text>         
            
            </View>
          </Text>

          <Text style = {styles.title}>X. Danh sách thu chi {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Sổ thu chi</Text>         
              </Text>
              <Image 
                source={require('../assets/images/history.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            
            Hoặc  {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Tổng quan</Text>         
              </Text>
              <Image 
                source={require('../assets/images/home2a.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              , xem phần Thu chi gần đây</Text>         
            
            </View>
          </Text>
          

          <Text style = {styles.title}>XI. Xóa thu chi {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Sổ thu chi</Text>         
              </Text>
              <Image 
                source={require('../assets/images/history.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
             </View>
            {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              2.	Nhấn biểu tượng       
              </Text>
              <Image 
                source={require('../assets/images/bin_icon.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>của mục thu chi cần xóa</Text>
            </View>
            {"\n"}
            <Text style={{color: 'red', fontFamily: 'Inter-Bold'}}>Lưu ý</Text>: Những khoản về tài sản <Text style={{fontFamily: 'Inter-Bold'}}>“ - MUA”, “ - BÁN” </Text> và <Text style={{color: '#FF9900'}}>tên hiện vật màu cam</Text> thì không thể sửa và xóa.
          </Text>


          <Text style = {styles.title}>XII. Sửa thu chi {"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Chọn muc <Text style={{fontFamily: 'Inter-Bold'}}>Sổ thu chi</Text>         
              </Text>
              <Image 
                source={require('../assets/images/history.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
             </View>
            {"\n"}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              2.	Nhấn biểu tượng       
              </Text>
              <Image 
                source={require('../assets/images/pen.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>của mục thu chi cần sửa</Text>
            </View>
            {"\n"}
            <Text style={{color: 'red', fontFamily: 'Inter-Bold'}}>Lưu ý</Text>: Những khoản về tài sản <Text style={{fontFamily: 'Inter-Bold'}}>“ - MUA”, “ - BÁN” </Text> và <Text style={{color: '#FF9900'}}>tên hiện vật màu cam</Text> thì không thể sửa và xóa.
          </Text>

          <Text style = {styles.title}>XIII. Sửa tổng số dư{"\n"} </Text>
          <Text style = {styles.content}>
            Không thể sửa trực tiếp tổng số dư. Chỉ có thể thay đổi tổng số dư thông qua nhập thu chi sinh hoạt và mua bán tài sản.
          </Text>
          
          <Text style = {styles.title}>XIV. Xem thông tin cá nhân{"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng         
              </Text>
              <Image 
                source={require('../assets/images/drawer.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn mục <Text style = {{fontFamily: 'Inter-Bold'}}>Thông tin cá nhân</Text>
          </Text>
          
          <Text style = {styles.title}>XV. Đổi mật khẩu{"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng         
              </Text>
              <Image 
                source={require('../assets/images/drawer.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn mục <Text style = {{fontFamily: 'Inter-Bold'}}>Thông tin cá nhân</Text> {"\n"}
            3.	Nhấn <Text style = {{fontFamily: 'Inter-Bold'}}>Đổi mật khẩu</Text> ở mục <Text style = {{fontFamily: 'Inter-Bold'}}>Mật khẩu</Text> 
          </Text>

          <Text style = {styles.title}>XVI. Đăng xuất{"\n"} </Text>
          <Text style = {styles.content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style ={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>
              1.	Nhấn biểu tượng         
              </Text>
              <Image 
                source={require('../assets/images/drawer.png')}
                style = {{
                  width: 20,
                  height: 20,
                }}
             /> 
            </View>
            {"\n"}
            2.	Chọn mục <Text style = {{fontFamily: 'Inter-Bold'}}>Đăng xuất</Text>
          </Text>
        </ScrollView>
     
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    //flex: 1,
    marginTop: 10,
    marginLeft: 20,
    fontFamily: 'Inter-Bold',
    fontSize: 17,
    color: 'black',
    
  },
  content: {
    //marginTop:5,
    marginLeft: 40,
    //marginRight:10,
    fontFamily: 'Inter',
    fontSize: 15,
    color: 'black',
    lineHeight: 18,
  }
})