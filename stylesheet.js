import {StyleSheet, Dimensions} from 'react-native';

const Width= Dimensions.get('screen').width;
const Height= Dimensions.get('screen').height;

export default StyleSheet.create({
container : {
    flex:1,
    justifyContent: "center",
    alignItems : 'center',
    backgroundColor: '#fff' ,
    borderWidth: 1,
    borderColor: '#000'
  },
image : {
    width: Width*0.9,
    height: Height*0.35,
    resizeMode: 'contain',
    marginTop: Height*0.02
},
titleText : {
    fontSize:20,
    fontFamily: 'monospace',
    color: 'black',
    fontWeight: 'bold',
    marginTop:Height*0.01
},
descText : {
    color: 'green',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight:'900',
    marginTop: Height*0.03,
    marginLeft: Width*0.03
},
button : {
    borderWidth:1,
    marginTop:Height*0.04,
    padding: '2%',
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    width: Width*0.75,
    height: Height*0.07,
    alignItems:'center'
},
buttonText : {
    color: 'black',
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'monospace'
}
});
