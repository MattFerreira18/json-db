// TODO rename to @Attribute()
type AttributeTypes = 'string' | 'int' | 'float' | 'bool';

interface CommonAttributeOptions {
  type: AttributeTypes;
  required?: boolean;
}

interface AttributeKeyOptions {
  type: AttributeTypes;
  isKey?: boolean;
}

interface AttributeReferenceOptions {
  type: AttributeTypes;
  isReference?: boolean;
}

interface AttributeForeignOptions {
  type: AttributeTypes;
  required?: boolean;
  references?: string;
}

type AttributeOptions = CommonAttributeOptions & AttributeKeyOptions & AttributeReferenceOptions & AttributeForeignOptions;

type Target<This, Args extends unknown[], Return> = (this: This, ...args: Args) => Return;

type DecoratorWrapper<This, Args extends unknown[], Return> = (
  this: This, ...args: Args
) => Return;

function defineMetadata<This, Args extends unknown[], Return>(
  target: Target<This, Args, Return>,
  options: AttributeOptions,
) {
  // Object.defineProperty(target, 'test', { value: options });
}

function decorator(options: AttributeOptions) {
  function decoratorWrapper<This, Args extends unknown[], Return>(
    target: Target<This, Args, Return>,
    // ctx: ClassGetterDecoratorContext<This, Return>
  ) {
    // const methodName = String(ctx.name);

    defineMetadata(target, options);

    function replacementMethod(this: This, ...args: Args): Return {
      return target.call(this, ...args);
    }

    return replacementMethod;
  }


  return decoratorWrapper;
}


// change return-type
// eslint-disable-next-line @typescript-eslint/ban-types
function AttributeWrapper(options: CommonAttributeOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function AttributeWrapper(options: AttributeKeyOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function AttributeWrapper(options: AttributeReferenceOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function AttributeWrapper(options: AttributeForeignOptions): Function;

// improve code-readability
function AttributeWrapper(options: AttributeOptions) {
  const { type, isKey, isReference, references, required } = options;

  if (isKey) {
    return decorator({ isKey, type });
  }

  if (isReference) {
    return decorator({ isReference, type });
  }

  if (references) {
    return decorator({ type, references, required });
  }

  return decorator({ type, required });
}



export default AttributeWrapper;
