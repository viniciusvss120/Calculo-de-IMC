import React from "react";
import {View, Text, TouchableOpacity, Share, Alert} from 'react-native';
import style from "./style";

export default function ResultImc(props) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Meu imc hoje é: " + props.resultImc
      })
    } catch (error) {
      Alert.alert(error.message);
    }

  }
  return (
    <View style={style.resultImc}>
      <View style={style.boxShareButton}>
        <Text style={style.imformation}>{props.messageResultImc}</Text>
        <Text style={style.numberImc}>{props.resultImc}</Text>
        <TouchableOpacity 
          onPress={onShare}
          style={style.shared}
        >
          <Text style={style.sheredText}>Shere</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}