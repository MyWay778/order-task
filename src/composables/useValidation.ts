import { reactive, watch } from 'vue';

interface FieldsInterface {
  [key: string]: string;
}

interface RulesInterface {
  [key: keyof FieldsInterface]: RuleInterface;
}

interface RuleInterface {
  required?: boolean;
  min?: number;
}

type ErrorsType = Record<keyof FieldsInterface, string>;

export default function useValidation(
  fields: FieldsInterface,
  rules: RulesInterface,
  options = { immediate: false }
): ErrorsType {
  const errors = reactive(
    Object.keys(fields).reduce((errors, field) => {
      if (field in rules) {
        errors[field] = '';
      }
      return errors;
    }, {} as ErrorsType)
  );

  const validate = (): void => {
    Object.entries(fields).forEach(([key, value]) => {
      const fieldRules = rules[key];

      if (!fieldRules) return;

      if (fieldRules.required && !value) {
        errors[key] = 'Обязательное поле';
      } else if (fieldRules.min && value.length < fieldRules.min) {
        errors[key] = `Минимальное число символов: ${fieldRules.min}`;
      } else {
        delete errors[key];
      }
    });
  };

  watch(
    fields,
    () => {
      validate();
    },
    { immediate: options.immediate }
  );

  return errors;
}
