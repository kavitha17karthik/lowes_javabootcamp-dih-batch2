
class testConstructor
{
    public testConstructor()
    {
        System.out.println("Default constructor\n");
    }
    public testConstructor(int a)
    {
        System.out.println("constructor with one int parameter"+a);

    }
    public testConstructor(String a)
    {
        System.out.println("constructor with one string parameter"+a);
    }
    public testConstructor(int a , String b)
    {
        System.out.println("constructor with two parameter"+a + b);

    }

}
public class contrustor {
    public static void main(String[] args) {

        testConstructor tc=new testConstructor();
        testConstructor tc1=new testConstructor(10);
        testConstructor tc2=new testConstructor(10,"kavitha");

    }
}
