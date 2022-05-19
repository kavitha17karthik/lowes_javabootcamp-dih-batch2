package Calculator;
import java.util.Scanner;
//CalculatorApp - To do all arithmetic operation (addition..subtraction..multiplication..division..)

public class Calculator {
    static boolean loop = true;
    public static void main(String[] args) {

        while (loop) {
            System.out.println("Calculator App");
            System.out.println("Enter any two numbers to do arithmetic operation");
            //Using Scanner class get any two numbers from the user to do arithmetic operation
            Scanner sc1 = new Scanner(System.in);
            int num1 = sc1.nextInt();
            Scanner sc2 = new Scanner(System.in);
            int num2 = sc2.nextInt();
            System.out.println("=======================================");
            System.out.println("The numbers that you entered are " + num1 + "  and " + num2);
            System.out.println("=======================================");
            System.out.println("Now select the operation that you want to perform using these two numbers");
            System.out.println("Press 1 - Addition");
            System.out.println("Press 2 - Subtraction");
            System.out.println("Press 3 - Multiplication");
            System.out.println("Press 4 - Division");
            System.out.println("press 5 - Exit");

            Scanner sc = new Scanner(System.in);
            int choice = sc.nextInt();

                //Get input(here..what operation needs to be performed) from user using scanner class
                switch (choice) {
                    case 1:
                        System.out.println("=====================================");
                        System.out.println("Addition of " + num1 + "  and  " + num2 + " is " + (num1 + num2));
                        System.out.println("======================================");
                        break;
                    case 2:
                        System.out.println("======================================");
                        System.out.println("Subtraction of " + num1 + "  and  " + num2 + " is " + (num1 - num2));
                        System.out.println("=======================================");
                        break;
                    case 3:
                        System.out.println("======================================");
                        System.out.println("Multiplication of " + num1 + " and " + num2 + " is " + (num1 * num2));
                        System.out.println("======================================");
                        break;
                    case 4:
                        if (num2 == 0) {
                            System.out.println("division by Zero is not possible..so please enter any number other than zero for num2");

                        } else {
                            System.out.println("======================================");
                            System.out.println("Division of " + num1 + " and " + num2 + " is " + (num1 / num2));
                            System.out.println("======================================");
                        }
                        break;
                    default:
                        System.exit(0);
                }

                System.out.println("do you want to continue(Enter Y/y or N/n)");
                Scanner sc4=new Scanner(System.in);
                String input = sc4.next();
                if((input.equals("N")) || (input.equals("n"))){
                        loop=false;
                   }
            }
        }
    }


