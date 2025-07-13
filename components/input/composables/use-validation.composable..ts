import * as z from "zod"

export type ValidationSchema = z.ZodTypeAny

export interface ValidationInputProps {
  schema?: ValidationSchema
}

export function useValidationInput(props: ValidationInputProps) {
  const issues = ref<z.ZodIssue[]>()

  const error = computed(() => {
    if (!issues.value?.length) return undefined
    return issues.value[0].message
  })

  const validate = (value: unknown) => {
    if (!props.schema) return
    const result = props.schema.safeParse(value)
    issues.value = result.success ? undefined : result.error.issues
  }

  return {
    error,
    issues,
    validate,
  }
}
