import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('Something went wrong'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList: string = '';
    const upperCaseCharacters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharacters: string = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars: string = '0123456789';
    const specialChars: string = '!@#$%^&*()_+';

    if (upperCase) characterList += upperCaseCharacters;
    if (lowerCase) characterList += lowerCaseCharacters;
    if (symbols) characterList += specialChars;
    if (numbers) characterList += digitChars;

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
  };

  function createPassword(characters: string, passwordLength: number): string {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  }

  const resetPassword = (): void => {
    setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setSymbols(false);
    setNumbers(false);
    setIsPassGenerated(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.parentContainer]}>
      <SafeAreaView>
        <View style={[styles.sectionContainer, styles.formContainer]}>
          <Text style={[styles.sectionHeading]}>Create a Solid Password</Text>
          <Formik
            initialValues={{
              passwordLength: '',
            }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              // console.log(values);
              generatePassword(Number(values.passwordLength));
            }}>
            {({
              errors,
              touched,
              isValid, 
              handleChange,
              handleSubmit,
              handleReset,
              values,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputColumn, styles.bouncyCheckBox]}>
                    <Text style={styles.buttonText}>Password Length : </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex 8"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text>*min 8 characters and max 16 characters</Text>
                  <View style={[styles.inputWrapper, styles.bouncyCheckBox]}>
                    <Text style={styles.buttonText}>Includes lowerCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={[styles.inputWrapper, styles.bouncyCheckBox]}>
                    <Text style={styles.buttonText}>Includes upperCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={[styles.inputWrapper, styles.bouncyCheckBox]}>
                    <Text style={styles.buttonText}>Includes numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View
                    style={[
                      styles.inputWrapper,
                      styles.formActions,
                      styles.bouncyCheckBox,
                    ]}>
                    <Text style={styles.buttonText}>Includes symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#29AB87"
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      disbaled={!isValid}
                      onPress={handleSubmit}>
                      <Text style={[styles.buttonText]}>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={resetPassword}>
                      <Text style={[styles.buttonText]}>Reset Password</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
          <View style={[styles.passwordOutput]}>
            <Text selectable={true} style={[styles.passwordText]}>
              {password}
            </Text>
          </View>
          <Text>Long press to copy</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#add8e6',
  },
  sectionHeading: {
    fontWeight: 'bold',
    fontSize: 42,
    color: '#228B22',
  },
  sectionContainer: {},
  formContainer: {},
  inputWrapper: {
    margin: 5,
  },
  formActions: {},
  inputColumn: {
    alignItems: 'center',
    borderRadius: 10,
  },
  inputStyle: {},
  buttonText: {
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    width: 150,
    paddingHorizontal: 4,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  passwordText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  heading: {
    fontSize: 20,
    color: 'black',
  },
  errorText: {
    color: 'darkred',
  },
  bouncyCheckBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordOutput: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
