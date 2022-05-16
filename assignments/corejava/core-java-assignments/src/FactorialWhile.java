
import java.util.Scanner;
public class FactorialWhile {
    private static Scanner sc;

    public static void main(String[] args) {
        int number,i=1,fact=1;
        sc = new Scanner(System.in);
        System.out.println("Enter a number for which you want to find a factorial\n");
        number=sc.nextInt();
        while(i<=number){
            fact=fact*i;
            i+=1;
        }
        System.out.println("factorial of "+ number +" is "+number+"! "+fact);
    }

}
