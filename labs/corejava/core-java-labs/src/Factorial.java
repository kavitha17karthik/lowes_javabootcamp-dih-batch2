

import java.util.Scanner;
public class Factorial {
        private static Scanner sc;
        public static void main(String[] args) {
            int number,i,fact=1;
            sc = new Scanner(System.in);
            System.out.println("Enter a number for which you want to find a factorial\n");
            number=sc.nextInt();
            for(i=1;i<=number;i++){
                fact=fact*i;
            }
            System.out.println("factorial of "+ number +" is "+number+"! "+fact);
        }
    }
