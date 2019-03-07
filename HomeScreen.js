import React, { Component } from "react"
import { Button, Text } from "react-native-elements"
import { View, StyleSheet } from "react-native"
import SmsRetriever from "react-native-sms-retriever"

export class HomeScreen extends Component {
  state = {
    message: null,
    listening: false
  }

  _onSmsListenerPressed = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever()
      console.log(`Registered: ${registered}`)
      if (registered) {
        this.setState({ listening: registered, message: null })
        SmsRetriever.addSmsListener(event => {
          console.log(`Response: ${event.message}`)
          this.setState({ message: event.message, listening: false }, () => {
            SmsRetriever.removeSmsListener()
          })
        })
      }
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  render() {
    const { message, listening } = this.state
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text h3> SMS Listener Example </Text>
          <Button
            raised
            buttonStyle={{ width: 300, backgroundColor: "green" }}
            loading={listening}
            title="Register SMS Listening"
            onPress={() => {
              this._onSmsListenerPressed()
            }}
          />
          {listening && <Text>Waiting for message...</Text>}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text h4>{`Message Received:`}</Text>
          <Text>{`${message}`}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white"
  }
})

export default HomeScreen
