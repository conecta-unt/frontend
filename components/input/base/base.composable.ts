import type {
  HTMLAttributes,
  InputHTMLAttributes,
  InputTypeHTMLAttribute,
  LabelHTMLAttributes,
} from "vue";

export interface InputBaseProps {
  id?: string;
  name?: string;
  label?: string;
  type?: InputTypeHTMLAttribute;
  labelProps?: LabelHTMLAttributes;
  inputProps?: InputHTMLAttributes;
  autofocus?: boolean;
  help?: string;
  helpProps?: HTMLAttributes;
  error?: string;
  errorProps?: HTMLAttributes;
  wrapperProps?: HTMLAttributes;
  innerProps?: HTMLAttributes;
}

export function useInputBase(props: InputBaseProps) {
  const id = props.id ? props.id : useId();

  const inputRef = useTemplateRef<HTMLInputElement>("input");
  const isFocused = ref(false);

  const focusInput = () => {
    if (inputRef.value) {
      inputRef.value?.focus();
      isFocused.value = true;
    }
  };

  const onfocusin = () => {
    isFocused.value = true;
  };

  const onfocusout = () => {
    isFocused.value = false;
  };

  onMounted(() => {
    if (props.autofocus) focusInput();
  });

  return {
    ...props,
    id,
    inputRef,
    isFocused,
    focusInput,
    onfocusin,
    onfocusout,
  };
}
