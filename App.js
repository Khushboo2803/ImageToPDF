import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from 'react-native';
import style from './stylesheet';
import {captureScreen} from 'react-native-view-shot';
import RNImageToPdf from 'react-native-image-to-pdf';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      imageURI : 'https://qph.fs.quoracdn.net/main-qimg-a1e8067787ee595eeb757c0c71988146',
      viewButton : true,
      screenPath: ''
    }
  }

  getPDF = async() => {
    try{
      // To get screen shot of the screen
      await captureScreen({
        format: 'jpg',
        quality: 0.8
      })
      .then(
        uri => {
            // substring to path starts from /path/emul......
            const u = uri.substr(7);
            this.setState({screenPath: u });
        },
        error => Alert.alert("Something went wrong", error)
      );

      // convert image to pdf
      const options = {
        imagePaths: [this.state.screenPath],
        name: `${Date.now().toString()}.pdf`,
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round(
            (Dimensions.get('screen').height / Dimensions.get('screen').width) *
            900,
          ),
        },
        quality: 0.7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      ToastAndroid.show("PDF saved at location "+pdf.filePath, ToastAndroid.LONG);
      console.log(pdf.filePath);
    }
    catch(e){
      console.log(e);
    }
  }

  render(){
    return(
      <View style={style.container}>
        <Image
          source={{uri : this.state.imageURI}}
          style={style.image}
        />
        <Text style={style.titleText}>This is the image of Stegodon</Text>
        <Text style={style.descText}>In the past, stegodonts were believed to be the ancestors of the true elephants and mammoths, but currently they are believed to have no modern descendants. </Text>
        <View>
          {
              this.state.viewButton ? 
              <View>
                <TouchableOpacity style={style.button} 
                onPress={
                  async ()=>{
                    await this.setState({viewButton: false});
                    await this.getPDF();
                    await this.setState({viewButton: true});
                  }
                }>
                  <Text style={style.buttonText}>Convert To PDF</Text>
                </TouchableOpacity>
              </View> : null
          }
        </View>
      </View>
    );
  }
}
