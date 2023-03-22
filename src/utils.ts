import { camelCase, snakeCase } from 'change-case';

type CasingFunction = (input: string, options?: any) => string;

function convertCase(
  obj: Record<string, unknown>,
  casingFunction: CasingFunction
) {
  const newObj = {} as Record<string, unknown>;
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      newObj[casingFunction(key)] = (obj[key] as any[]).map(item =>
        convertCase(item, casingFunction)
      );
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[casingFunction(key)] = convertCase(
        obj[key] as Record<string, unknown>,
        casingFunction
      );
    } else {
      newObj[casingFunction(key)] = obj[key];
    }
  }
  return newObj;
}

// function that recursively converts all keys in an object to camelCase
export function objKeysToCamelCase(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return convertCase(obj, camelCase);
}

// function that recursively converts all keys in an object to snake_case
export function objKeysToSnakeCase(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return convertCase(obj, snakeCase);
}
