export interface HyformType {
  type: string;
  placeholder?: string;
  label: string;
  datePickerConfig?: datePickerConfigType;
  optionValue?: optionType[];
  filed: string;
  isHidden?: boolean;
}
interface optionType {
  value: string | number | boolean;
  label: string;
}
interface datePickerConfigType {
  [propName: string]: any;
}
