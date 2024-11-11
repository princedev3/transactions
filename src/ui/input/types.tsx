export type InputBaseProps = {
  required?: boolean;
  label?: string;
  id: string;
  placeholder?: string;
  name: string;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent | string) => void;
  readonly?: boolean;
  className?: string;
};

export enum Inputs {
  CheckBox = "CheckBox",
  Date = "Date",
  Email = "Email",
  Password = "Password",
  Number = "Number",
  Otp = "Otp",
  Search = "Search",
  Select = "Select",
  Sort = "Sort",
  Tel = "Tel",
  TextArea = "TextArea",
  Text = "Text",
  Time = "Time",
  Toggle = "Toggle",
}

export interface Otp {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
}
