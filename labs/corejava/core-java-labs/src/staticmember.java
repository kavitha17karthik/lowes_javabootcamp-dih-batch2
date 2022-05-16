/*class Student
{
    public String Name;
    static String schoolname="Presidency";
}*/
class Calculator
{
    static int a=10;
    static int b=20;
    public void addNumber()
    {
        System.out.println(a+b);
        a=10;
        b=10;
    }
    public static void subNumber()
    {
        System.out.println(a-b);

    }

}

public class staticmember {
    public static void main(String[] args) {

        //Student student1=new Student();
       // student1.Name="a";
       // System.out.printf("Name "+student1.Name+"school name"+Student.schoolname);
        Calculator calc=new Calculator();

        calc.addNumber();
        Calculator.subNumber();
    }
}
