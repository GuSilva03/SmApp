import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image,TouchableOpacity, Share } from 'react-native';
import React,{ useState, useRef } from 'react';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export default function App() {
  const [mensagem, setMensagem] = useState('Que Smzinho te abençoe! ');
  const viewRef = useRef();
  function troca(){
    fetch("https://positive-vibes-api.herokuapp.com/quotes/random").then(res => res.json()).then(mensagem => {
      setMensagem(mensagem.data)
    })}
    const onShare = async () => {
      try{
        const result = await captureRef(viewRef, {
          result: 'tmpfile',
          quality: 0.7,
          format: 'png',
          message: mensagem
        });
        console.log(result)
        await Sharing.shareAsync(result);
      }catch(err){
        console.error(err);
      }

      }
  return (
    <SafeAreaView style={styles.container} ref={viewRef}>
      <Image style={styles.tela} source={{uri:"https://pbs.twimg.com/media/EhBEozeXkAYm9iq.png"}}></Image>
      <Text style={styles.legenda}>{mensagem}</Text>
      <TouchableOpacity style={styles.button} onPress={troca}><Text>Sua Frase! </Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onShare}><Text>Compartilhe! </Text></TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aquamarine',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tela: {
    width: 420,
    height: 420,
    borderRadius: 25,
  },
  button: {
    fontSize: 22,
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'gray',
    marginTop: 10,
    justifyContent: 'center',
  },
  legenda:{
    fontSize: 20,
    color: "royalblue",
    margin: 22,
  }
});
