import React, {useState} from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    TouchableOpacity,
     ScrollView
} from 'react-native';
import * as Yup from 'yup';

import Screen from "../components/Screen";
import Icon from "../components/Icon";
import {AppForm, AppFormField, ErrorMessage, SubmitButton} from "../components/forms";
import AppLogo from "../components/AppLogo";
const API = require('../Api');

const validationSchema = Yup.object().shape({
    fName: Yup.string().min(2).max(10).required().label("First name"),
    lName: Yup.string().min(2).max(10).required().label("Last name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    passwordConfirmation: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match').required().label("password Confirmation")
})
const icons = [  //remove
    {
        name: "instagram",
        func: () => console.log("instagram")
    },
    {
        name: "google",
        func: () => console.log("google")
    },
    {
        name: "facebook",
        func: () => console.log("facebook")
    },
];

function SignUpPage({navigation}) {
    const [message, setMessage] = useState('');
    // Assuming you have imported the necessary dependencies and set the endpoint URL

    const handleSubmit = async (values) => {
        setMessage('')
        const user = {
            first_name: values.fName,
            last_name: values.lName,
            email: values.email,
            password: values.password,
        };

        try {
            const response = await fetch(`${API.BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok)
                navigation.navigate("Login");
             else setMessage(`User already exists`);

        } catch (error) {
            setMessage('Something went wrong...')
        }
    };

// Call the addUser function wherever necessary, such as in a button press event


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTap='handled'>
            <Screen>
                <AppLogo/>
                <View style={{
                    width: "80%",
                    alignSelf: "center"
                }}>
                    <AppForm initialValues={{fName: '', lName:'', email: '', password: '', passwordConfirmation:''}}
                             onSubmit={handleSubmit}
                             validationSchema={validationSchema}>
                        {message && <ErrorMessage error={message}/>}
                        <View style={styles.nameInput}>
                            <View style={{marginBottom: 40, marginRight: 8}}>
                                <AppFormField
                                    name= "fName"
                                    autoCapitalize= "none"
                                    autoCorrect = {false}
                                    keyboardType="TextInput"
                                    icon ="account"
                                    placeholder="First Name"
                                    textContentType="name"
                                />
                            </View>
                            <View style={{marginBottom: 40, marginLeft: 8}}>
                                <AppFormField
                                    name= "lName"
                                    autoCapitalize= "none"
                                    autoCorrect = {false}
                                    keyboardType="TextInput"
                                    icon ="account"
                                    placeholder="Last Name"
                                    textContentType="name"
                                />
                            </View>
                        </View>
                        <View style={{marginBottom: 40}}>
                            <AppFormField
                                name="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                icon="email"
                                placeholder="Email"
                                textContentType="emailAddress"
                            />
                        </View>
                        <View style={{marginBottom: 40}}>
                            <AppFormField name="password"
                                  touched={false}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  keyboardType="password"
                                  icon="lock"
                                  placeholder="Password"
                                  secureTextEntry
                                  textContentType="password"
                            />
                        </View>
                        <View style={{marginBottom: 30}}>
                            <AppFormField name="passwordConfirmation"
                                   touched={false}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   keyboardType="password"
                                   icon="lock"
                                   placeholder="Confirm Password"
                                   secureTextEntry
                                   textContentType="password"
                            />
                        </View>
                        <SubmitButton title="Sign up"/>
                    </AppForm>

                    <View style={styles.iconsContainer}>
                        <Text style={styles.signUp}>Or Login using</Text>
                        <Pressable style={styles.forgotPassword} >
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.forgotPasswordText}>LOGIN</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>

                </View>
            </Screen>
        </ScrollView>

    );
}

const styles = StyleSheet.create({

    forgotPassword: {
        flexDirection: "row-reverse",
        paddingTop: 10,

    },
    forgotPasswordText: {
        color: "gray",
    },
    iconsContainer: {
        //flexDirection:"row",
        alignItems: "center",
        margin: 20,
    },
    signUp: {
        color: "gray",
    },
    mediaIcons: {
        flexDirection: "row",
        justifyContent: "center",
       // marginBottom: 10,
        padding: 10
    },
    nameInput: {
      //  marginBottom: 40,
        display: "flex", 
        flexDirection: "row",
        width: 132,
        // marginRight: 150

    }
})

export default SignUpPage;


