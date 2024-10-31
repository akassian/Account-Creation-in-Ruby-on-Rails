import { Key } from "../constants/input.enum";

// TODO: short lived tooltip when user attempts to enter invalid characters
export const onKeyDownAlphanumeric = (e: any) => {
    // Allow only letters and numbers
    // TODO: limited allowing of . _ -
    if (!/[a-zA-Z0-9]/.test(e.key) && e.key !== Key.BACKSPACE && e.key !== Key.DELETE) {
        e.preventDefault();
    }
};

export const alphaNumericRegex = /^[a-zA-Z0-9]*$/;

// Alphanumeric + permitted symbols:
// ! @ # $ % ^ & * ( ) - _ + = [ ] { } ~
export const onKeyDownAlphanumericSafeSymbols = (e: any) => {
    if (!/[a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}~]/.test(e.key) && e.key !== Key.BACKSPACE && e.key !== Key.DELETE) {
        e.preventDefault();
    }
};

// At least one letter, one number, and one permitted symbol (see above)
export const passwordSymbolRequirementsRegex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}~])/;
