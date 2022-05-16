
import java.util.Scanner;
public class FactorialRecursive {
    private static Scanner sc;
    static int factorial(int num) {
        if (num != 0)
            return (num * factorial(num - 1));
        else
            return 1;
    }
    public static void main(String[] args) {
        int number, i, fact = 1;
        sc = new Scanner(System.in);
        System.out.println("Enter a number for which you want to find a factorial\n");
        number = sc.nextInt();
        fact = factorial(number);
        System.out.println("factorial of " + number + " is " + number + "! " + fact);
    }
}
