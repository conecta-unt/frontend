import * as z from "zod/v4";
import type { $ZodIssue } from "zod/v4/core";

export type ValidationSchema = z.ZodTypeAny;

export interface ValidationInputProps {
  schema?: ValidationSchema;
}

export function useValidationInput(props: ValidationInputProps) {
  const issues = ref<$ZodIssue[]>();

  const error = computed(() => {
    if (!issues.value || !issues.value.length) return undefined;
    return issues.value[0].message;
  });

  const validate = (value: unknown) => {
    if (!props.schema) return;
    const result = props.schema.safeParse(value);

    if (!result.success) {
      issues.value = result.error.issues;
    } else {
      issues.value = undefined;
    }
  };

  return {
    error,
    issues,
    validate,
  };
}
