import { useState } from "react";

const useInput = (validateValue: (value: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEnteredValue(event.target.value);
    };

    const valueBlurHandler = () => {
        setIsTouched(true);
    };

    const resetValue = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        resetValue
    }
}

export default useInput;