import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions
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
      viewButton : true
    }
  }

  takeScreenShot = () =>{
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(
      uri => this.setState({imageURI: uri}),
      error => Alert.alert("Something went wrong", error)
    );
  }

  getPDF = async() => {
    try{
      const page=PDFPage.create().setMediaBox(200,200).drawImage(this.state.imageURI, 'jpg', {
        x: 5,
        y: 25,
        width: 200,
        height: 100,
     });
     const docDir= await PDFLib.getDocumentsDirectory();
     const pdfPath=`${docDir}/ImageToPdf.pdf`;
     PDFDocument
     .create(pdfPath)
     .addPages(page)
     .write()
     .then(
       path => {
         console.log("pdf created at "+path);
       });
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
                <TouchableOpacity style={style.button} onPress={
                  async ()=>{
                    await this.setState({viewButton: false});
                    await this.takeScreenShot();
                    await this.setState({viewButton: true});
                  }
                }>
                  <Text style={style.buttonText}>Take ScreenShot</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.button} onPress={this.getPDF}>
                  <Text style={style.buttonText}>Convert To PDF</Text>
                </TouchableOpacity>
              </View> : null
          }
        </View>
      </View>
    );
  }
}
