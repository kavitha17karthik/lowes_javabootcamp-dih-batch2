abstract class Calculator{

    public void addition(int num1,int num2)
    {
        System.out.println("Sum of "+num1 +" and "+ num2 +" is: "+ (num1+num2));
    }
    public void subtraction(int num1,int num2)
    {
        if(num1>num2)
            System.out.println("Difference of "+num1+" and "+num2 +" is: "+ (num1-num2));
        else
            System.out.println("Cannot subtract a smaller number from bigger number");
    }
    public abstract  void multiplication(int num1,int num2);
    public abstract  void division(int num1, int num2);
}
class Calculate extends Calculator{
      @Override
    public void multiplication(int num1, int num2) {
        System.out.println("Multiplication of " +num1+ " and "+ num2 +" is: " +(num1*num2));
    }
    @Override
    public void division(int num1, int num2){
        System.out.println("Division of "+ num1+" by "+num2 +" is: "+ (num1/num2));
    }
}

public class AbstractClassMethod {
    public static void main(String[] args) {
        Calculate cal = new Calculate();
        cal.addition(20,30);
        cal.subtraction(90,30);
        cal.multiplication(18,2);
        cal.division(20,4);
    }
}
