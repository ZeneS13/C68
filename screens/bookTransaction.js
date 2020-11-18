import * as React from 'react';
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCamPermission:null,
            scan:false,
            scanData:"",
            buttonState:"normal"
        }
    }

   getCamPermission=async()=>{
   const {status}  = await Permissions.askAsync(Permissions.CAMERA); 
   this.setState({hasCamPermission:status==="granted",
   scan:false,
   buttonState:"clicked"})
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
     scan:true,
     scanData:data,
     buttonState:"normal"

    })
  };


  render(){
    const hasCameraPermissions=this.state.hasCamPermissions;
    const scanned=this.state.scan;
    const buttonState=this.state.buttonState;
    if(buttonState==="clicked" && hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned={scanned?undefined:this.scanData}
            style={StyleSheet.absoluteFillObject}/>
        )
    }
    else if(buttonState==="normal"){
     
    
    return(
    <View style={styles.container}>
        <Text style={styles.displayText}>
            {hasCameraPermissions===true ? this.state.scanData : "Request Camera Permission" }
            </Text>
        <TouchableOpacity 
        onPress={this.getCameraPermissions} 
        style={styles.scanButton}>
            <Text style={styles.buttonText}>scan QR code</Text>
        </TouchableOpacity>
    </View>
    
    );
}
}
}
const styles = StyleSheet.create({
     container: { flex: 1,
         justifyContent: 'center',
          alignItems: 'center' },
      displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
      scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 }, 
      buttonText:{ fontSize: 20, } 
    });