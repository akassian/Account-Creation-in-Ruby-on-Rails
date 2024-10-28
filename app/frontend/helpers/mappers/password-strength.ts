import { PasswordStrength } from "../constants/password-strength.enum";

export const verbalPasswordStrength = (score: number): string =>
    [PasswordStrength.VeryWeak, PasswordStrength.Weak, PasswordStrength.Acceptable, PasswordStrength.Good, PasswordStrength.Strong][score] || "";

// export const passwordStrengthColor = (score: number): string =>
//     [Colors.SolidRed, Colors.SolidOrange, Colors.SolidYellow, Colors.SolidLime, Colors.SolidGreen][score] || "";

// export const passwordStrengthClass = (score: number): { [key: string]: boolean } => ({
//     [Colors.SolidRed]: score === 0,
//     [Colors.SolidOrange]: score === 1,
//     [Colors.SolidYellow]: score === 2,
//     [Colors.SolidLime]: score === 3,
//     [Colors.SolidGreen]: score === 4,
// });
