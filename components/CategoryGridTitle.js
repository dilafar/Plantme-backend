import { Pressable, View , Text ,StyleSheet } from "react-native"


function CategoryGridTitle ({title,color}) {
  return (
    <View style={styles.gridItem }>
        <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => [
           styles.button,
           pressed ? styles.buttonPressed : null,
           ]}
           >
            <View style={[styles.innerContainer,{backgroundColor: color}]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View>
  )
}

export default CategoryGridTitle;

const styles = StyleSheet.create({
        gridItem: {
          flex: 1,
          margin:16,
          height: 150,
          borderRadius: 8,
          elevation: 4,
          shadowColor: "black",
          shadowOpacity: 0.25,
          backgroundColor: "white",
          shadowRadius: 8,
          shadowOffset: {width:0 , height: 2},
          overflow: "hidden"
        },
        button:{
          flex: 1,
        },
        buttonPressed: {
            opacity: 0.5
        },
        innerContainer: {
          flex: 1,
          padding: 16,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          fontWeight: "bold",
          fontSize: 18,
        }

});