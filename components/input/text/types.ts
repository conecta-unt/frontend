import type { InputBaseProps } from "../base/base.composable";
import type { ValidationSchema } from "../composables/use-validation.composable.";

export interface InputTextProps extends InputBaseProps {
  schema?: ValidationSchema;
  showAllErrors?: boolean;
  showErrorBullets?: boolean;
}
