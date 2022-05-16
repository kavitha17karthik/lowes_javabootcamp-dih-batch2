class ClassStaticVariable{
    static int a=10;

    static {
//        a=20;
        System.out.println("Value of a is:"+a);
    }
    public void display()
    {
        a=30;
        System.out.println("Value of a is:"+a);
    }
}
public class StaticVariable {
    public static void main(String[] args) {
        ClassStaticVariable sv = new ClassStaticVariable();
        /*when an object is created constructor is called automatically, when there is no constructor
        and if there are any static blocks are there inside the class..then that is called.
         */

        sv.display();
    }


}
