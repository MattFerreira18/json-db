// TODO rename to @Attribute()
/**
 * use-case
 *
 * @Field({
 *  type: 'string' // can be one of: string, int, float, bool and base64
 *  required: true,
 *  key: true, // should be primary-key
 *  reference: false // should be a foreign-key
 * })
 * public get attr() {
 *  return this._attr;
 * }
 */
type AttributeTypes = 'string' | 'int' | 'float' | 'bool';

interface CommonFieldOptions {
  type: AttributeTypes;
  required?: boolean;
}

interface FieldKeyOptions {
  type: AttributeTypes;
  isKey?: boolean;
}

interface FieldReferenceOptions {
  type: AttributeTypes;
  isReference?: boolean;
}

interface FieldForeignOptions {
  type: AttributeTypes;
  required?: boolean;
  references?: string;
}

type FieldOptions = CommonFieldOptions & FieldKeyOptions & FieldReferenceOptions & FieldForeignOptions;

type Target<This, Args extends unknown[], Return> = (this: This, ...args: Args) => Return;

type DecoratorWrapper<This, Args extends unknown[], Return> = (
  this: This, ...args: Args
) => Return;

function defineMetadata<This, Args extends unknown[], Return>(
  target: Target<This, Args, Return>,
  options: FieldOptions,
) {
  // Object.defineProperty(target, 'test', { value: options });
}

function decorator(options: FieldOptions) {
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
function FieldWrapper(options: CommonFieldOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function FieldWrapper(options: FieldKeyOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function FieldWrapper(options: FieldReferenceOptions): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
function FieldWrapper(options: FieldForeignOptions): Function;

// improve code-readability
function FieldWrapper(options: FieldOptions) {
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



export default FieldWrapper;
