import FieldWrapper from './field';

function getMethodsOfClassInstance(instance: GenericClass) {
  return Object.getOwnPropertyNames(instance.prototype);
}

function getGetterMethodsNames(methods: string[], instance: GenericClass) {
  return methods.filter((method) =>
    !!Object.getOwnPropertyDescriptor(instance.prototype, method)?.get
  );
}

function getEntityAttributes(methods: string[], instance: GenericClass) {
  // Object.defineProperty(instance.prototype, 'id', { enumerable: true });
  // console.log(instance.prototype.id);
}

type GenericClass = abstract new (...args: unknown[]) => unknown;

function Entity<Class extends GenericClass>(
  target: Class,
  context: ClassDecoratorContext,
) {
  const entityName = String(context.name);
  const methods = getMethodsOfClassInstance(target);
  const getterMethods = getGetterMethodsNames(methods, target);

  // console.log({ test: typeof Object.getOwnPropertyDescriptor(target.prototype, 'id')?.get });
  const attributes = getEntityAttributes(getterMethods, target);
}

export default Entity;
