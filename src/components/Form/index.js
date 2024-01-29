import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Keyboard,
  Pressable,
  FlatList
} from 'react-native';
import ResultImc from "./ResultImc/";
import style from "./style";

export default function Form() {
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageImc, setMessageImc] = useState("preencha o peso e altura")
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState("Calcular")
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  function imcCalculator(){
    let heigthFormat = height.replace(",", ".")
    let totalImc = ((weight / (heigthFormat * heigthFormat)).toFixed(2))
    setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
    setImc(totalImc)
  }

  function verificationImc() {
    if(imc === null) {
      Vibration.vibrate()
      setErrorMessage("Campo obrigatório*")
    }
  }
  function validationImc(){
    console.log(imcList)
    if( weight != null && height != null){
      imcCalculator()
      setHeight(null)
      setWeight(null)
      setMessageImc("Seu imc é igual:")
      setTextButton("Calcular Novamente")
      setErrorMessage(null)
    } else {
      verificationImc()
      setImc(null)
      setTextButton("Calcular")
      setMessageImc("preencha o peso e altura")
    }
    
  }
  return (
    <View style={style.formContext}>
      {imc == null ? 
      <Pressable onPress={Keyboard.dismiss} style={style.form}>
        <Text style={style.formLabel}>Altura</Text>
        <Text style={style.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={style.input}    
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
        />
        <Text style={style.formLabel}>Peso</Text>
        <Text style={style.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={style.input}       
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 75.365"     
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={style.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text style={style.textButtonCalculator}>{textButton}</Text>

        </TouchableOpacity>

      </Pressable>
      : 
      <View style={style.exhibitionResultImc}>
        <ResultImc 
          messageResultImc={messageImc}
          resultImc={imc}
        />
        <TouchableOpacity
          style={style.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text style={style.textButtonCalculator}>{textButton}</Text>

        </TouchableOpacity>
      </View>
    }
    <FlatList
      showsVerticalScrollIndicator= {false}
      style={style.listImcs}
      data={[...imcList].reverse()}
      renderItem={({item}) => {
        return(
          <Text style={style.resultImcItem}>
            <Text style={style.textResultItemList}>Resultado IMC =</Text>
            {item.imc}
          </Text>
        )
      }}
      keyExtractor={(item) => item.id}
    ></FlatList>
    </View>
  )
}