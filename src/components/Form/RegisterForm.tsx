import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import ValidationComponent from 'react-native-form-validator';
import Icon from 'react-native-vector-icons/Feather';
import NavigationService from '../../services/NavigationService';
import UserService from '../../services/UserService';

export class RegisterForm extends ValidationComponent {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: null,
        error: false,
    }
    firstnameInput;
    emailInput;
    passwordInput;
    password2Input;

    submitForm = async () => {
        this.validate({
            lastname: { required: true },
            firstname: { required: true },
            email: { email: true, required: true },
            password: { required: true },
            password2: { required: true }
        });
        if (this.isFormValid()) {
            if (this.state.password == this.state.password2) {
                await UserService.signup(this.state, (res) => {
                    UserService.setAuth(res);
                    NavigationService.navigate('Home', {});
                });
            } else {
                Alert.alert('Erreur de saisie', "Les mots de passes ne correspondent pas");
            }
        } else {
            Alert.alert('Erreur de saisie', 'Les champs ne sont pas correctement remplis');
        }
    }

    render() {
        return (
            <>
                <View style={{ marginTop: -30 }}>

                    <Card containerStyle={{ borderColor: 'transparent', elevation: 0, margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                        <Text style={styles.title}>Inscription</Text>
                        <Input label="Nom" keyboardType={'default'} style={styles.inputs} value={this.state.lastname} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={lastname => this.setState({ lastname })} onSubmitEditing={() => { this.firstnameInput.focus(); }} blurOnSubmit={false}
                            leftIcon={<Icon name='user' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                        <Input ref={(firstname) => this.firstnameInput = firstname} label="Prénom" keyboardType={'default'} style={styles.inputs} value={this.state.firstname} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={firstname => this.setState({ firstname })} onSubmitEditing={() => { this.emailInput.focus(); }} blurOnSubmit={false}
                            leftIcon={<Icon name='user' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                        <Input ref={(email) => this.emailInput = email} label="Email" keyboardType={'email-address'} style={styles.inputs} value={this.state.email} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={email => this.setState({ email })} onSubmitEditing={() => { this.passwordInput.focus(); }} blurOnSubmit={false}
                            leftIcon={<Icon name='mail' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                        <Input ref={(password) => this.passwordInput = password} label="Mot de passe" secureTextEntry={true} style={styles.inputs} value={this.state.password} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={password => this.setState({ password })} onSubmitEditing={() => { this.password2Input.focus(); }} blurOnSubmit={false}
                            leftIcon={<Icon name='lock' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                        <Input ref={(password2) => this.password2Input = password2} label="Répétez votre mot de passe" secureTextEntry={true} style={styles.inputs} value={this.state.password2} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={password2 => this.setState({ password2 })} blurOnSubmit={false} onSubmitEditing={() => { this.submitForm(); }}
                            leftIcon={<Icon name='lock' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                    </Card>

                </View>
                <Button title="Inscription" buttonStyle={styles.confirmButton} titleStyle={{ fontFamily: "ProductSansBold" }} onPress={() => this.submitForm()} />
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>
                </View>

            </>
        )
    }

}

const styles = StyleSheet.create({
    inputs: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#00d8a2'
    },
    confirmButton: {
        backgroundColor: '#00d8a2',
        width: '80%',
        height: 45,
        borderRadius: 30,
        alignSelf: "center",
        marginTop: 0
    },
    title: {
        color: '#000',
        fontSize: 28,
        margin: 20,
        fontFamily: "ProductSansBold"
    },
});