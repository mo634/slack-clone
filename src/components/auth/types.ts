export type registerFlow = "signIn" | "signUp"

  

export type FormInputProps = {
  formData: {
    name?: string; // Optional
    confirmPassword?: string; // Optional
    email: string;
    password: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name?: string; // Optional
      confirmPassword?: string; // Optional
      email: string;
      password: string;
    }>
  >;
  inputValue: string;
  fieldKey: keyof FormInputProps['formData']; // Restrict to valid keys of formData
  type: string;
  placeholder: string;
  loading: boolean;
};
