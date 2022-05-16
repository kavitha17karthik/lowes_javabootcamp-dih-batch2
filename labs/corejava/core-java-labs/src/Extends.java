class Parent
{
    public Parent()
    {
        System.out.println("Inside parent");
    }
}
/*this program will display the below
* Inside parent
Inside parent
Inside Child
*
* bcos  when we ccreate a class by extending it from other class and if we create a object on the extended
* class , the parent class constructor is called first then the constructor of the extended class will be invoked
*  */
class Child extends Parent {
public Child(){
    System.out.println("Inside Child");
}
}
public class Extends {
    public static void main(String[] args) {
        Parent p=new Parent();
        Child c=new Child();
    }
}
