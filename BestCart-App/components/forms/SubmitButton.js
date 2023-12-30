import React from "react";
import {  } from 'react-native';
import AppButton from "../AppButton";
import {useFormikContext} from "formik";

function SubmitButton({title}) {
    const {handleSubmit} = useFormikContext();
    return <AppButton title={title} onPress={handleSubmit}/>;
}
export default SubmitButton;
