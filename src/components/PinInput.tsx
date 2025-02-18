// PinInput.tsx
import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface PinInputProps {
  value?: string;
  onChange: (pin: string) => void;
  onLastDigitChange?: any;
  length?: number; // Default length is 6
}

const PinInput: React.FC<PinInputProps> = ({
  value = '',
  onChange,
  length = 6,
  onLastDigitChange,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [pin, setPin] = useState(value.padEnd(length, '')); // Ensure length consistency

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = pin.split('');
      newPin[index] = text;
      const updatedPin = newPin.join('');
      setPin(updatedPin);
      onChange(updatedPin);

      // Move to next input if not last digit
      if (text !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      if (index == 5) {
        onLastDigitChange(updatedPin);
      }
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      if ((pin[index] === undefined || pin[index]) && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newPin = pin.split('');
      newPin[index] = ''; // Clear current box
      setPin(newPin.join(''));
      onChange(newPin.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({length}).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={styles.input}
          value={pin[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={event => handleKeyPress(event, index)}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="done"
          autoFocus={index === 0}
          secureTextEntry
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    width: 40,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
    color: 'black',
  },
});

export default PinInput;
