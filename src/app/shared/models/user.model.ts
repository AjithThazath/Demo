/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
export enum Sex {
  MALE,
  FEMALE
}

export class User {
  private name: string;
  private username: string
  private mobile_number: number;
  private address: string;
  private sex: Sex;

  constructor(user: any) {
    this.name = user.name;
    this.username = user.username;
    this.mobile_number = user.mobile_number;
    this.address = user.address;
    this.sex = user.sex;
  }

  public getName() {
    return this.name
  }
  public getUserName() {
    return this.username
  }
  public getMobileNumber() {
    return this.mobile_number
  }
  public getSex() {
    return this.sex.toString();
  }
  public getAddress() {
    return this.address
  }

  public setAddress(address: string) {
    this.address = address;
  }

  public setMobilenumber(no: number) {
    this.mobile_number = no
  }


}