import { Entity, Attribute } from '../..';

interface UserRegister {
  id: number;
  name: string;
  age: number;
}

@Entity
class User {
  private _id = 0;
  private _name = '';
  private _age = 0;

  constructor();
  constructor(props: UserRegister);

  constructor(props?: UserRegister) {
    if (props) {
      this._id = props.id;
      this._name = props.name;
      this._age = props.age;
    }
  }

  @Attribute({ type: 'int', isKey: true })
  public get id() {
    return this._id;
  }

  // @Attribute({ type: 'float', isKey: false })
  public get name(): string {
    return this._name;
  }

  public get age(): number {
    return this._age;
  }
}

new User({ id: 10, age: 19, name: 'matheus' }).id;

export default User;
