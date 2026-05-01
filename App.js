import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Calculator from './Calculator';
import styles from './styles';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [calculator, setCalculator] = useState(new Calculator());

  const handlePress = (value) => {
    const result = calculator.handleInput(value);
    setDisplayValue(result);
  };

  const handleClear = () => {
    setCalculator(new Calculator());
    setDisplayValue('0');
  };

  const handleEquals = () => {
    const result = calculator.getResult();
    setDisplayValue(result.toString());
    setCalculator(new Calculator());
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{displayValue}</Text>
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>CLEAR</Text>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}> 
              {row.map((btn) => (
                <TouchableOpacity
                  key={btn}
                  style={[
                    styles.button,
                    btn === '=' && styles.equalsButton,
                    ['+', '-', '*', '/'].includes(btn) && styles.operatorButton,
                  ]}
                  onPress={() => {
                    if (btn === '=') {
                      handleEquals();
                    } else {
                      handlePress(btn);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>{btn}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}