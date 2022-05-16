import java.util.Scanner;
public class MultiplicationTable {
    private static Scanner sc;
    public static void main(String[] args) {
        int number,i;
        sc = new Scanner(System.in);
        System.out.println("Enter a number for which you want to create a multiplication table\n");
        number=sc.nextInt();
        for(i=0;i<=10;i++){
            System.out.println(number+ " * " + i + "="+ (number*i));
        }
    }

}
